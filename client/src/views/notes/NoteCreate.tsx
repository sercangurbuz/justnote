import { Save } from '@mui/icons-material';
import { IconButton, styled, InputAdornment, TextField } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import React from 'react';
import {
  GetNotesDocument,
  useCreateNoteMutation,
} from '../../generated/graphql';

interface NoteCreateProps {}

const NoteWrapper = styled('div')({
  minHeight: '40vh',
  display: 'flex',
  placeContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
});

function NoteCreate(props: NoteCreateProps) {
  const [saveNote, { loading, data }] = useCreateNoteMutation({
    refetchQueries: [{ query: GetNotesDocument, variables: { title: 'note' } }],
  });

  return (
    <NoteWrapper>
      <Formik
        initialValues={{
          note: '',
        }}
        validationSchema={Yup.object().shape({
          note: Yup.string().min(5).required('Note is missing'),
        })}
        onSubmit={async ({ note }, { resetForm }) => {
          await saveNote({
            variables: { data: { note } },
          });

          resetForm();
        }}
      >
        {({
          errors,
          handleSubmit,
          touched,
          values,
          handleChange,
          submitForm,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <TextField
              label="Bir not yazın..."
              variant="standard"
              name="note"
              maxRows={6}
              value={values.note}
              onChange={handleChange}
              error={Boolean(touched.note && errors.note)}
              helperText={touched.note && errors.note ? errors.note : ''}
              multiline
              size="medium"
              sx={{ width: '60%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      disabled={loading}
                      color="primary"
                      onClick={submitForm}
                    >
                      <Save />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        )}
      </Formik>
    </NoteWrapper>
  );
}

export default NoteCreate;
