import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExitToApp from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';

import logo from '../img/logo-white.svg';
import icon from '../img/icon-white.svg';
import ElevationScroll from './ElevationScroll';
import theme from '../theme';
import Games from './Games';
import Users from './Users';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  height: ${theme.spacing(8)}px;
`;

const StyledLogo = styled.img`
  height: calc(100% - ${theme.spacing(5)}px);
`;

const StyledMain = styled.main`
  margin-top: ${theme.spacing(10)}px;
`;

const StyledIcon = styled.img`
  height: ${theme.spacing(3)}px;
  margin-bottom: ${theme.spacing(1)}px;
`;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(4)}px;
`;

const Dash = ({ user, onLogout, onError }) => {
  const [page, setPage] = useState('games');

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar color="default">
          <StyledToolbar>
            <StyledLogo src={logo} alt="Logo LaserProfile" />

            <Tabs value={page} onChange={(e, value) => setPage(value)}>
              <Tab value="games" label="Games" />
              <Tab value="users" label="Users" />
            </Tabs>

            <IconButton
              aria-label="Logout"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onLogout}
              color="inherit"
            >
              <ExitToApp />
            </IconButton>
          </StyledToolbar>
        </AppBar>
      </ElevationScroll>

      <StyledMain>
        <Container maxWidth="md">
          {page === 'games' && <Games onError={onError} />}
          {page === 'users' && <Users onError={onError} />}
        </Container>
      </StyledMain>

      <StyledFooter>
        <StyledIcon src={icon} alt="Icon LaserProfile" />
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Personal laser tag game profile
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Created by '}
          <Link color="inherit" href="https://duras.me/">
            Jakub Ďuraš
          </Link>
        </Typography>
      </StyledFooter>
    </React.Fragment>
  );
};

export default Dash;
