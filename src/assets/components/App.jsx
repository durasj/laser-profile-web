import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../theme';
import Login from './Login';
import Dash from './Dash';
import { login } from '../effects';

const App = () => {
  const [user, setUser] = useState();

  const onLogin = async values => {
    try {
      const user = await login(values.email, values.password);
      setUser(user);
    } catch (e) {
      console.error(e.message);
      return;
    }
  };

  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {!user && <Login onSubmit={onLogin} />}
        {user && <Dash />}
      </MuiThemeProvider>
    </React.Fragment>
  );
};

export default App;
