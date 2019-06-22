import React, { useState } from 'react';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { string, object, date, number } from 'yup';
import styled from 'styled-components';
import { parse, format } from 'date-fns';
import { DateTimePicker } from '@material-ui/pickers';

import DetailDialog from './DetailDialog';
import theme from '../theme';
import { create, update } from '../effects/index';

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

const GamesDetailDialog = ({
  data,
  opened,
  onCancel,
  onError,
  onCreate,
  onUpdate,
}) => {
  const [saving, setSaving] = useState(false);

  const onSubmit = async values => {
    try {
      if (values.played) {
        values.played = format(values.played, 'yyyy-MM-dd HH:mm:ss');
      }

      if (data) {
        await update('games', data.id, values);
        onUpdate();
      } else {
        await create('games', values);
        onCreate();
      }
    } catch (e) {
      onError(e.message);
    }
  };

  return (
    <DetailDialog
      title={data ? `Edit game ID ${data.id}` : 'Create game'}
      open={opened}
      onCancel={onCancel}
      formName="games-form"
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
          await onSubmit(values);
          setSubmitting(false);
          setSaving(false);
        }}
        render={() => (
          <Form id="games-form">
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
