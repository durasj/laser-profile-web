import React, { useState, useLayoutEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';

import theme from '../theme';
import Login from './Login';
import Dash from './Dash';
import { login, getLogged, logout } from '../effects/index';

const App = () => {
  const [user, setUser] = useState();
  const [snackbars, setSnackbars] = useState([]);
  useLayoutEffect(() => {
    // Check if the user is already logged in with first render
    const user = getLogged();
    if (user) {
      setUser(user);
    }
  }, []);

  const onLogin = async values => {
    try {
      const user = await login(values.email, values.password);
      setUser(user);
    } catch (e) {
      setSnackbars([
        ...snackbars,
        {
          id: Math.random()
            .toString(18)
            .slice(2),
          message: e.message,
        },
      ]);
      return;
    }
  };

  const onLogout = () => {
    logout();
    setUser(undefined);
  };

  const onError = message =>
    setSnackbars([
      ...snackbars,
      {
        id: Math.random()
          .toString(18)
          .slice(2),
        message,
      },
    ]);

  const onSnackClose = id => setSnackbars(snackbars.filter(s => s.id !== id));

  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {!user && <Login onSubmit={onLogin} />}
        {user && <Dash user={user} onLogout={onLogout} onError={onError} />}
        {snackbars.map(snackbar => (
          <Snackbar
            key={snackbar.id}
            open={true}
            autoHideDuration={6000}
            onClose={(e, reason) =>
              reason === 'timeout' && onSnackClose(snackbar.id)
            }
            message={snackbar.message}
          />
        ))}
      </MuiThemeProvider>
    </React.Fragment>
  );
};

export default App;
