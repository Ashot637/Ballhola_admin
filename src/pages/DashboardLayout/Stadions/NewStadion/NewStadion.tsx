import { useState, useEffect, type FC, type FormEvent, useRef } from 'react';
import classes from './newStadion.module.scss';

import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Input from '../../../../UI/Input/Input';
import Button from '../../../../UI/Button/Button';

import axios, { BASE_URL } from '../../../../axios/axios';

import Spinner from '../../../../UI/Spinner/Spinner';

import Chip from '@mui/material/Chip';
import { IFacilitie } from '../../../../types/Facilitie';
import useSWR from 'swr';
import { Avatar } from '@mui/material';
import { IStadion } from '../../../../types/Stadion';

const fetcher = (url: string) => axios.get(url).then(({ data }) => data);

const NewStadion: FC = () => {
  const { data: facilities } = useSWR<IFacilitie[]>('/facilitie/getAll', fetcher);
  const navigate = useNavigate();
  const { id } = useParams();

  const [title_en, setTitle_en] = useState<string>('');
  const [title_ru, setTitle_ru] = useState<string>('');
  const [title_am, setTitle_am] = useState<string>('');
  const [address_en, setAddress_en] = useState<string>('');
  const [address_ru, setAddress_ru] = useState<string>('');
  const [address_am, setAddress_am] = useState<string>('');
  const [phone_number, setPhone_number] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [selectedFacilities, setSelectedFacilities] = useState<IFacilitie[]>([]);
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      axios.get<IStadion>('/stadion/getOne/' + id).then(({ data }) => {
        setTitle_en(data.title_en);
        setTitle_ru(data.title_ru);
        setTitle_am(data.title_am);
        setAddress_en(data.address_ru);
        setAddress_ru(data.address_ru);
        setAddress_am(data.address_am);
        setSelectedFacilities(data.facilities);
        setImgUrl(data.img);
        setPhone_number(data.phone_number);
        setPassword(data.password);
        setName(data.name);
      });
    }
  }, [id]);

  const onUploadFile = () => {
    fileRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title_en', title_en);
    formData.append('title_ru', title_ru);
    formData.append('title_am', title_am);
    formData.append('address_en', address_en);
    formData.append('address_ru', address_ru);
    formData.append('address_am', address_am);
    formData.append('phone', phone_number);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('facilitiesIds', JSON.stringify(selectedFacilities.map((f) => f.id)));
    formData.append('img', selectedImg as File);
    if (!id) {
      await axios.post('/stadion/create', formData);
    } else {
      await axios.patch('/stadion/update/' + id, formData);
    }
    navigate('/dashboard/stadions');
  };

  if (id && !imgUrl) {
    return <Spinner />;
  }

  return (
    <div className="h-max">
      <div className="flex c-gap-10 mb-15">
        <Link to={'/dashboard/stadions'}>
          <IoIosArrowRoundBack size={45} className={classes.icon} />
        </Link>
        <h2 className="title">{id ? 'Edit Stadion' : 'New Stadion'}</h2>
      </div>
      <div className="h-max pb-65">
        <form className={classes.form} onSubmit={onSubmit}>
          <Input value={title_en} onChange={setTitle_en} label="Title (English)" />
          <Input value={title_ru} onChange={setTitle_ru} label="Title (Russian)" />
          <Input value={title_am} onChange={setTitle_am} label="Title (Armenian)" />
          <Input value={address_en} onChange={setAddress_en} label="Address (English)" />
          <Input value={address_ru} onChange={setAddress_ru} label="Address (Russian)" />
          <Input value={address_am} onChange={setAddress_am} label="Address (Armenian)" />
          <Input
            disabled={!!id}
            value={phone_number}
            onChange={setPhone_number}
            label="Stadium owner phone number"
          />
          <Input disabled={!!id} value={name} onChange={setName} label="Name" />
          {!id && <Input value={password} onChange={setPassword} label="Stadium owner password" />}
          <label className={classes.label}>Faiclities</label>
          <div className="flex c-gap-10 wrap">
            {selectedFacilities.map((selectedFacilitie) => {
              return (
                <Chip
                  key={selectedFacilitie.id}
                  avatar={<Avatar src={BASE_URL + selectedFacilitie.img} />}
                  label={selectedFacilitie.title_en}
                  onDelete={() =>
                    setSelectedFacilities((prev) =>
                      prev.filter((p) => p.id !== selectedFacilitie.id),
                    )
                  }
                />
              );
            })}
          </div>
          <div className={classes.facilities}>
            {facilities?.map((facilitie) => {
              if (selectedFacilities.find((f) => f.id === facilitie.id)) return undefined;
              return (
                <div
                  key={facilitie.id}
                  className={classes.facilitie}
                  onClick={() => setSelectedFacilities((prev) => [...prev, facilitie])}>
                  <img src={BASE_URL + facilitie.img} alt="Facilitie" width={30} height={30} />
                  <p>{facilitie.title_en}</p>
                </div>
              );
            })}
          </div>

          <label className={classes.label}>Image</label>
          {imgUrl && (
            <img
              width={200}
              src={(imgUrl as string).startsWith('data') ? (imgUrl as string) : BASE_URL + imgUrl}
              alt="Stadion"
            />
          )}
          <div className={classes.fileInput} onClick={onUploadFile}>
            <p>{imgUrl ? 'Change image' : 'Upload image'}</p>
          </div>
          <input
            accept="image/*"
            type="file"
            style={{ display: 'none' }}
            ref={fileRef}
            onChange={onFileChange}
          />
          <Button
            disabled={
              !title_en ||
              !title_ru ||
              !title_am ||
              !address_en ||
              !address_ru ||
              !address_am ||
              !password ||
              !phone_number ||
              !imgUrl
            }
            className={classes.btn}
            value={id ? 'Edit' : 'Create'}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default NewStadion;
