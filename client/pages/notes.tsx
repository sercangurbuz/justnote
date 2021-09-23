import React from 'react';
import NotesView from '../src/views/notes/notes';

interface NotesProps {}

function Notes(props: NotesProps) {
  return <NotesView {...props} />;
}

export default Notes;
