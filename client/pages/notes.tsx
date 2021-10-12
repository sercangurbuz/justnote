import React from 'react';
import NotesView from '../src/views/notes/notes';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

interface NotesProps {}

function Notes(props: NotesProps) {
  return <NotesView {...props} />;
}

export default withPageAuthRequired(Notes);
