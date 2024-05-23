import { type FC } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridRowsProp,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import styles from "./table.module.scss";

interface TableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  onSelectItem?: (items: GridRowSelectionModel) => void;
  isNotSelectable?: boolean;
  onRowClick?: (item: any) => void;
}

const Table: FC<TableProps> = ({
  rows,
  columns,
  onSelectItem,
  isNotSelectable,
  onRowClick,
}) => {
  if (isNotSelectable) {
    return (
      <DataGrid
       rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        onRowClick={onRowClick}
      />
    );
  }

  return (
    <DataGrid
    className={styles.table}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10, 25]}
      checkboxSelection
      onRowSelectionModelChange={onSelectItem}
    />
  );
};

export default Table;
