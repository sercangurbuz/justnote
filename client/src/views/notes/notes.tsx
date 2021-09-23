import { gql } from '@apollo/client';
import { Button } from '@mui/material';
import React from 'react';
import { useGetNotesQuery } from '../../generated/graphql';

interface NotesProps {}

function Notes(props: NotesProps) {
  const { data, loading } = useGetNotesQuery({ variables: { title: 'note' } });

  return (
    <ul>
      {data?.notes.map((note) => (
        <>
          <li key={note.id}>{note.title}</li>
          <Button variant="contained">Hello World</Button>;
        </>
      ))}
    </ul>
  );
}

export default Notes;
