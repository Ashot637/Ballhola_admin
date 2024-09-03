import { type FC } from 'react';
import { type IGame } from '../../../../../types/Game';
import type { GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';
import formatDate from '../../../../../helpers/formatDate';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import Table from '../../../../../components/Table/Table';

interface ISingleUserGames {
  games: IGame[];
}

const SingleUserGames: FC<ISingleUserGames> = ({ games }) => {
  const navigate = useNavigate();
  const renderEditCell = (params: GridRenderCellParams) => {
    return (
      <div className="flex jst-end cp">
        <MdEdit
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/dashboard/games/${params.id}/edit`);
          }}
        />
      </div>
    );
  };

  const rows: GridRowsProp = games.map((game) => ({
    id: game.id,
    // price: game.priceOneHour,
    price: game.priceOneHour ?? game.priceOneHourAndHalf,
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
      headerName: 'Stadium Name',
      width: 250,
      renderCell: (params) => (
        <Link to={`/dashboard/stadiums/${params.row.stadionId}/edit`}>{params.value}</Link>
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
    <div>
      <Table columns={columns} rows={rows} isNotSelectable />
    </div>
  );
};

export default SingleUserGames;
