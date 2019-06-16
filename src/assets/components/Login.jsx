import React from 'react';
import { Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { string, object } from 'yup';
import styled from 'styled-components';

import logo from '../img/logo.svg';
import theme from '../theme';

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  > * {
    width: 100%;
    max-width: 20rem;
  }
  background: ${theme.palette.background.default};
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 14rem;
  }
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    margin: 1rem 0 0 0;
  }
  > button {
    margin: 2rem 0 0 0;
  }
`;

const schema = object().shape({
  email: string()
    .email()
    .required(),
  password: string().required(),
});

const Login = ({ onSubmit }) => {
  return (
    <LoginWrapper>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          await onSubmit(values);
          setSubmitting(false);
        }}
        render={({ isSubmitting }) => (
          <Form>
            <Logo>
              <img src={logo} alt="Logo LaserProfile" />
            </Logo>
            <FieldsWrapper>
              <Field
                name="email"
                type="email"
                label="Email"
                component={TextField}
              />
              <Field
                type="password"
                label="Password"
                name="password"
                component={TextField}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </Button>
            </FieldsWrapper>
          </Form>
        )}
      />
    </LoginWrapper>
  );
};

export default Login;
