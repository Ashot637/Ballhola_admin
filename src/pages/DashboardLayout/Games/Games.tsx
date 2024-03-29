import useSWR from 'swr';
import axios from '../../../axios/axios';
import { Link, useNavigate } from 'react-router-dom';

import Table from '../../../components/Table/Table';
import type {
  GridColDef,
  GridRowsProp,
  GridRowSelectionModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';

import formatDate from '../../../helpers/formatDate';
import Spinner from '../../../UI/Spinner/Spinner';
import { useState } from 'react';
import Title from '../../../UI/Title/Title';

import { MdEdit } from 'react-icons/md';

import { type IGame } from '../../../types/Game';
import dayjs from 'dayjs';

const fetcher = (url: string) => axios.post(url).then(({ data }) => data);

const Games = () => {
  const { data, mutate } = useSWR<IGame[]>('/game/getAllFromAdminPanel', fetcher);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  if (!data) {
    return <Spinner />;
  }

  const onSelectItem = (items: GridRowSelectionModel) => {
    setSelectedItems(items as number[]);
  };

  const renderEditCell = (params: GridRenderCellParams) => {
    console.log(params.id);
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

  const onDeleteItems = async () => {
    await axios.delete('/game/delete', { data: { ids: selectedItems } });
    mutate();
  };

  const rows: GridRowsProp = data.map((game: IGame) => ({
    id: game.id,
    price: game.price,
    stadionName: game.stadion.title_en,
    startTime: formatDate(game.startTime),
    endTime: formatDate(game.endTime),
    playersCount: game.playersCount + '/' + game.maxPlayersCount,
    stadionId: game.stadion.id,
    available: dayjs(game.startTime).isAfter(dayjs()) ? '🟢' : '🔴',
  }));

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'stadionName',
      headerName: 'Stadion Name',
      width: 250,
      renderCell: (params) => (
        <Link to={`/dashboard/stadions/${params.row.stadionId}/edit`}>{params.value}</Link>
      ),
    },
    { field: 'startTime', headerName: 'Start Time', width: 150 },
    { field: 'endTime', headerName: 'End Time', width: 150 },
    { field: 'playersCount', headerName: 'Players Count', width: 150 },
    { field: 'price', headerName: 'Price', width: 70 },
    { field: 'available', headerName: 'Available', width: 70 },
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

export default Games;
