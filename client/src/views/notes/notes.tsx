import React from 'react';
import NotesList from './NotesList';
import NoteCreate from './NoteCreate';

interface NotesProps {}

function Notes(props: NotesProps) {
  return (
    <>
      <NoteCreate />
      <NotesList />
    </>
  );
}

export default Notes;
