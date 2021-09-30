import { styled } from '@mui/material/styles';
import React, { PropsWithChildren, useState } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';

interface LayoutProps {}

const LayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
}));

const LayoutWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256,
  },
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const LayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
});

function Layout({ children }: PropsWithChildren<LayoutProps>) {
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  return (
    <LayoutRoot>
      <NavBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SideBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <LayoutWrapper>
        <LayoutContainer>
          <LayoutContent>{children}</LayoutContent>
        </LayoutContainer>
      </LayoutWrapper>
    </LayoutRoot>
  );
}

export default Layout;
