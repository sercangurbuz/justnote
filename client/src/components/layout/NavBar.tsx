import {
  AppBar,
  AppBarProps,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
} from '@mui/material';
import React, { useState } from 'react';
import Link from 'next/link';
import { Input, Menu, NotificationsOutlined, Edit } from '@mui/icons-material';
import LoginLogoutButton from './LoginLogoutButton';

interface NavBarProps extends AppBarProps {
  onMobileNavOpen?: () => void;
}

function NavBar({ onMobileNavOpen, ...rest }: NavBarProps) {
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <Link href="/">Just Note</Link>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Hidden lgDown>
          <IconButton color="inherit" size="large">
            <Badge badgeContent={4} color="error">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
          <LoginLogoutButton />
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
