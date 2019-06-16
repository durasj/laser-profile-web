import React, { useState } from 'react';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { string, object } from 'yup';
import styled from 'styled-components';
import generator from 'generate-password-browser';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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
  nick: string().required(),
  email: string()
    .email()
    .required(),
  password: string().min(8),
  role: string().required(),
});

const GamesDetailDialog = ({ data, opened, onCancel }) => {
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
                nick: data.nick,
                email: data.email,
                password: '',
                role: data.role,
              }
            : {
                nick: '',
                email: '',
                password: generator.generate({
                  length: 8,
                  numbers: true,
                  excludeSimilarCharacters: true,
                }),
                role: '',
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
                type="text"
                label="Nick"
                name="nick"
                component={TextField}
              />
              <Field
                type="email"
                label="Email"
                name="email"
                component={TextField}
              />
              <Field
                type={showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                placeholder="Not changed if empty"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                component={TextField}
              />
              <Field
                type="role"
                label="Role"
                name="role"
                select
                component={TextField}
              >
                <MenuItem value="admin">Administrator</MenuItem>
                <MenuItem value="operator">Operator</MenuItem>
                <MenuItem value="player">Player</MenuItem>
              </Field>
            </FieldsContainer>
          </Form>
        )}
      />
    </DetailDialog>
  );
};

export default React.memo(GamesDetailDialog);
