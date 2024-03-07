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

import { type IFacilitie } from '../../../types/Facilitie';

const fetcher = (url: string) => axios.get(url).then(({ data }) => data);

const Facilities = () => {
  const { data, mutate } = useSWR<IFacilitie[]>('/facilitie/getAll', fetcher);
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
    await axios.delete('/facilitie/delete', { data: { ids: selectedItems } });
    mutate();
  };

  const rows: GridRowsProp = data.map((facilitie: IFacilitie) => ({
    id: facilitie.id,
    title: facilitie.title_en,
    img: facilitie.img,
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
    { field: 'title', headerName: 'Title', width: 200 },
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

export default Facilities;
