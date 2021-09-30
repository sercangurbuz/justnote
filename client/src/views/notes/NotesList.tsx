import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';
import { useGetNotesQuery } from '../../generated/graphql';

interface NotesListProps {}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },

  {
    field: 'note',
    headerName: 'Notes',
    width: 700,
  },
];

function NotesList(props: NotesListProps) {
  const { data, loading } = useGetNotesQuery();

  return (
    <div style={{ height: 400, width: '100%', padding: '0 25px' }}>
      <DataGrid
        autoHeight
        loading={loading}
        rows={data?.notes ?? []}
        columns={columns}
      />
    </div>
  );
}

export default NotesList;
