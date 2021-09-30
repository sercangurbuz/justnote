import { Button, ListItem, ListItemProps } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';

interface NavItemProps extends ListItemProps {
  href?: string;
  icon?: React.ComponentType<any>;
  title?: string;
}

function NavItem({ href, icon: Icon, title, ...rest }: NavItemProps) {
  const { pathname } = useRouter();
  const active = href ? pathname === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0,
      }}
      {...rest}
    >
      <Button
        component="a"
        href={href}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && { color: 'primary.main' }),
          '& svg': {
            mr: 1,
          },
        }}
      >
        {Icon && <Icon size="20" />}
        <span>{title}</span>
      </Button>
    </ListItem>
  );
}

export default NavItem;
