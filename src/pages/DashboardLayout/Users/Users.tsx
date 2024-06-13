import useSWR from 'swr';
import axios, { BASE_URL } from '../../../axios/axios';

import Table from '../../../components/Table/Table';
import { type GridRenderCellParams, type GridColDef, type GridRowsProp } from '@mui/x-data-grid';

import formatDate from '../../../helpers/formatDate';
import Spinner from '../../../UI/Spinner/Spinner';
import Title from '../../../UI/Title/Title';
import { IUser } from '../../../types/User';
import { Avatar } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const fetcher = (url: string) => axios.get(url).then(({ data }) => data);

const Users = () => {
  const { data } = useSWR<IUser[]>('/user/getAll', fetcher);
  const navigate = useNavigate();

  if (!data) {
    return <Spinner />;
  }

  const renderImgCell = (params: GridRenderCellParams) => {
    return <Avatar src={params.row.img ? BASE_URL + params.row.img : ''} />;
  };

  const rows: GridRowsProp = data.map((user: IUser) => ({
    id: user.id,
    img: user.img,
    name: user.name,
    email: user.email,
    address: user.address,
    phone: user.phone,
    createdAt: formatDate(user.createdAt),
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
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'createdAt', headerName: 'Registration date', width: 200 },
  ];

  return (
    <div className="h-max">
      <Title />

        <Table
          columns={columns}
          rows={rows}
          isNotSelectable
          onRowClick={(item) => {
            navigate(`${item.id}`);
          }}
        />
    </div>
  );
};

export default Users;
