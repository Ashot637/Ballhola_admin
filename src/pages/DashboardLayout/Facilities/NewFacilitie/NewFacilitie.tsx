import { useState, useEffect, type FC, type FormEvent, useRef } from 'react';
import classes from './newFacilitie.module.scss';

import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Input from '../../../../UI/Input/Input';
import Button from '../../../../UI/Button/Button';

import axios, { BASE_URL } from '../../../../axios/axios';

import Spinner from '../../../../UI/Spinner/Spinner';
import { IFacilitie } from '../../../../types/Facilitie';

const NewFacilitie: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title_en, setTitle_en] = useState<string>('');
  const [title_ru, setTitle_ru] = useState<string>('');
  const [title_am, setTitle_am] = useState<string>('');
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      axios.get<IFacilitie>('/facilitie/getOne/' + id).then(({ data }) => {
        setTitle_en(data.title_en);
        setTitle_ru(data.title_ru);
        setTitle_am(data.title_am);
        setImgUrl(data.img);
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
    formData.append('img', selectedImg as File);
    if (!id) {
      await axios.post('/facilitie/create', formData);
    } else {
      await axios.patch('/facilitie/update/' + id, formData);
    }
    navigate('admin/dashboard/facilities');
  };

  if (id && !imgUrl) {
    return <Spinner />;
  }

  return (
    <div className="h-max">
      <div className="flex c-gap-10 mb-15">
        <Link to={'/admin/dashboard/facilities'}>
          <IoIosArrowRoundBack size={45} className={classes.icon} />
        </Link>
        <h2 className="title">{id ? 'Edit Stadium' : 'New Stadium'}</h2>
      </div>
      <div className="h-max pb-65">
        <form className={classes.form} onSubmit={onSubmit}>
          <Input value={title_en} onChange={setTitle_en} label="Title (English)" />
          <Input value={title_ru} onChange={setTitle_ru} label="Title (Russian)" />
          <Input value={title_am} onChange={setTitle_am} label="Title (Armenian)" />
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
            disabled={!title_en || !title_ru || !title_am || !imgUrl}
            className={classes.btn}
            value={id ? 'Edit' : 'Create'}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default NewFacilitie;
