import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from '@mui/material';
import React from 'react';
import NavItem from './NavItem';
import { Edit, PanoramaFishEye } from '@mui/icons-material';

interface SideBarProps {
  onMobileClose?: () => void;
  openMobile?: boolean;
}

const user = {
  avatar: '/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
};

const items = [
  {
    href: '/app/dashboard',
    icon: PanoramaFishEye,
    title: 'Dashboard',
  },
  {
    href: '/app/customers',
    icon: Edit,
    title: 'Customers',
  },
];

function SideBar({ onMobileClose, openMobile }: SideBarProps) {
  const content = <span></span>;
  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

export default SideBar;
