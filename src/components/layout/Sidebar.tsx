'use client';

import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Apartment as ApartmentIcon,
  People as PeopleIcon,
  DirectionsCar as VehicleIcon,
  Assignment as ComplaintIcon,
  Campaign as NoticeIcon,
  Receipt as FinanceIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 72;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Flats', icon: <ApartmentIcon />, path: '/flats' },
  { text: 'Members', icon: <PeopleIcon />, path: '/flats?tab=members' },
  { text: 'Visitors', icon: <PersonIcon />, path: '/visitors' },
  { text: 'Vehicles', icon: <VehicleIcon />, path: '/vehicles' },
  { text: 'Complaints', icon: <ComplaintIcon />, path: '/complaints' },
  { text: 'Notices', icon: <NoticeIcon />, path: '/notices' },
  { text: 'Finance', icon: <FinanceIcon />, path: '/finance' },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(path.split('?')[0]);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) onClose();
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ApartmentIcon sx={{ color: 'white', fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
            SocietyHub
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 11 }}>
            Management System
          </Typography>
        </Box>
      </Box>

      <List sx={{ flex: 1, py: 1, px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                py: 1.5,
                bgcolor: isActive(item.path) ? 'primary.main' : 'transparent',
                color: isActive(item.path) ? 'white' : 'text.primary',
                '&:hover': {
                  bgcolor: isActive(item.path) ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive(item.path) ? 'white' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', fontSize: 11 }}>
          © 2026 SocietyHub Demo
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? open : true}
      onClose={onClose}
      sx={{
        width: isMobile ? DRAWER_WIDTH : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          border: 'none',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}