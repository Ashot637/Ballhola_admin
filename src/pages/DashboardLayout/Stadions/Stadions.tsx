import useSWR from 'swr';
import axios, { BASE_URL } from '../../../axios/axios';
import { useNavigate } from 'react-router-dom';

import Table from '../../../components/Table/Table';
import type {
  GridColDef,
  GridRowsProp,
  GridRowSelectionModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';

import Spinner from '../../../UI/Spinner/Spinner';
import { useState } from 'react';
import Title from '../../../UI/Title/Title';

import { MdEdit } from 'react-icons/md';
import { Avatar } from '@mui/material';

import { type IStadion } from '../../../types/Stadion';

const fetcher = (url: string) => axios.get(url).then(({ data }) => data);

const Stadions = () => {
  const { data, mutate } = useSWR<IStadion[]>('/stadion/getAll', fetcher);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  if (!data) {
    return <Spinner />;
  }

  const renderEditCell = (params: GridRenderCellParams) => {
    return (
      <div className="flex jst-end cp">
        <MdEdit
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`${params.id}/edit`);
          }}
        />
      </div>
    );
  };

  const renderImgCell = (params: GridRenderCellParams) => {
    return <Avatar src={BASE_URL + params.row.img} />;
  };

  const onSelectItem = (items: GridRowSelectionModel) => {
    setSelectedItems(items as number[]);
  };

  const onDeleteItems = async () => {
    await axios.delete('/stadion/delete', { data: { ids: selectedItems } });
    mutate();
  };

  const rows: GridRowsProp = data.map((stadion: IStadion) => ({
    id: stadion.id,
    title: stadion.title_en,
    address: stadion.address_en,
    img: stadion.img,
  }));

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'img',
      headerName: 'Image',
      width: 100,
      renderCell: renderImgCell,
      sortable: false,
      filterable: false,
    },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'address', headerName: 'Address', width: 300 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: renderEditCell,
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <div className="h-max">
      <Title onDeleteItems={onDeleteItems} selectedItems={selectedItems} />
      <div className="h-max pb-65">
        <Table columns={columns} rows={rows} onSelectItem={onSelectItem} />
      </div>
    </div>
  );
};

export default Stadions;
