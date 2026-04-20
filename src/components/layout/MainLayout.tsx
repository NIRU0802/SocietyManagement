'use client';

import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const DRAWER_WIDTH = 280;

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header onMenuClick={handleDrawerToggle} />

      <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          pt: 9,
          width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH - 150}px)` },
          ml: { xs: 0, sm: 0, md: `${DRAWER_WIDTH - 150}px` },
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}