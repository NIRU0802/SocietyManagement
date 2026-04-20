'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Box,
  Avatar,
  InputBase,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const pageNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/flats': 'Flats & Members',
  '/visitors': 'Visitor Management',
  '/vehicles': 'Vehicle Management',
  '/complaints': 'Complaints',
  '/notices': 'Notice Board',
  '/finance': 'Finance & Accounting',
};

export default function Header({ onMenuClick }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const { getUnreadNotificationCount } = useApp();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);

  const unreadCount = getUnreadNotificationCount();
  
  const getPageTitle = () => {
    for (const [path, name] of Object.entries(pageNames)) {
      if (pathname.startsWith(path.split('?')[0])) return name;
    }
    return 'SocietyHub';
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        {isMobile && (
          <IconButton onClick={onMenuClick} edge="start">
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography variant="h3" sx={{ fontWeight: 600, flexGrow: 0 }}>
          {getPageTitle()}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'background.default',
              borderRadius: 2,
              px: 2,
              py: 0.5,
              width: 280,
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Search..."
              sx={{ flex: 1, fontSize: 14 }}
            />
          </Box>
        )}

        <IconButton onClick={handleNotifClick}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={notifAnchorEl}
          open={Boolean(notifAnchorEl)}
          onClose={() => setNotifAnchorEl(null)}
          slotProps={{
            paper: {
              sx: { width: 320, maxHeight: 400 },
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h4">Notifications</Typography>
          </Box>
          <MenuItem onClick={() => { setNotifAnchorEl(null); }}>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>New visitor arrived</Typography>
              <Typography variant="body2" color="text.secondary">Amazon Delivery at A-101</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => { setNotifAnchorEl(null); }}>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Payment received</Typography>
              <Typography variant="body2" color="text.secondary">Rs. 10,500 from A-201</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => { setNotifAnchorEl(null); }}>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>New complaint</Typography>
              <Typography variant="body2" color="text.secondary">B-102 - Security issue</Typography>
            </Box>
          </MenuItem>
        </Menu>

        <IconButton onClick={handleProfileClick}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
            <PersonIcon />
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Settings</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}