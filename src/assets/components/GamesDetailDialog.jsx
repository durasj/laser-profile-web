import React, { useState } from 'react';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { string, object, date, number } from 'yup';
import styled from 'styled-components';
import { parse } from 'date-fns';
import { DateTimePicker } from '@material-ui/pickers';

import DetailDialog from './DetailDialog';
import theme from '../theme';

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    margin-bottom: ${theme.spacing(2)}px;
  }
`;

const schema = object().shape({
  played: date().required(),
  mode: string().required(),
  players: number()
    .min(1)
    .required(),
  teams: string(),
  settings: string(),
});

const GamesDetailDialog = ({ data, opened, onCancel }) => {
  const [saving, setSaving] = useState(false);

  return (
    <DetailDialog
      title={data ? `Edit game ID ${data.id}` : 'Create game'}
      open={opened}
      onCancel={onCancel}
      formName="games"
      submitting={saving}
    >
      <Formik
        initialValues={
          data
            ? {
                played: parse(data.played, 'yyyy-MM-dd HH:mm:ss', new Date()),
                mode: data.mode,
                players: data.players,
                teams: data.teams || '',
                settings: data.settings || '',
              }
            : {
                played: new Date(),
                mode: 'Default',
                players: 8,
                teams: '',
                settings: '',
              }
        }
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          setSaving(true);
          // await onSubmit(values);
          setSubmitting(false);
          setSaving(false);
        }}
        render={() => (
          <Form name="games">
            <FieldsContainer>
              <Field
                name="played"
                label="Date and time"
                ampm={false}
                component={DateTimePicker}
              />
              <Field
                type="text"
                label="Mode"
                name="mode"
                component={TextField}
              />
              <Field
                type="number"
                label="Players"
                name="players"
                component={TextField}
              />
              <Field
                type="text"
                label="Teams"
                name="teams"
                helperText="FFA for no teams or e.g. 2vs2"
                component={TextField}
              />
              <Field
                type="text"
                label="Settings"
                name="settings"
                helperText="Additional special settings"
                component={TextField}
              />
            </FieldsContainer>
          </Form>
        )}
      />
    </DetailDialog>
  );
};

export default React.memo(GamesDetailDialog);
