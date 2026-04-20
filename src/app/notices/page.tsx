'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Campaign as NoticeIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useApp } from '@/context/AppContext';
import MainLayout from '@/components/layout/MainLayout';
import { Notice } from '@/types';

const priorityColors: Record<string, 'default' | 'warning' | 'error'> = {
  low: 'default',
  medium: 'warning',
  high: 'error',
};

export default function NoticesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { getAllNotices, addNotice } = useApp();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    priority: 'medium' as Notice['priority'],
    postedBy: 'Admin',
    validUntil: '',
  });

  const notices = getAllNotices();

  const handleAddNotice = () => {
    addNotice({
      ...newNotice,
      validUntil: newNotice.validUntil || undefined,
    });
    setOpenDialog(false);
    setNewNotice({
      title: '',
      content: '',
      priority: 'medium',
      postedBy: 'Admin',
      validUntil: '',
    });
  };

  return (
    <MainLayout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mr: 1 }}>
        <Typography variant="h2">Notice Board</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ minHeight: 48 }}
        >
          Post Notice
        </Button>
      </Box>

      <Grid container spacing={3}>
        {notices.map((notice, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { boxShadow: 3 },
              }}
              onClick={() => setSelectedNotice(notice)}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <NoticeIcon color="primary" />
                    <Typography variant="h4">{notice.title}</Typography>
                  </Box>
                  <Chip 
                    label={notice.priority} 
                    size="small"
                    color={priorityColors[notice.priority]}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {notice.content}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Posted by {notice.postedBy}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(notice.createdAt), 'dd MMM yyyy')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Post New Notice</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              value={newNotice.title}
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="Content"
              value={newNotice.content}
              onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
              multiline
              rows={6}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newNotice.priority}
                label="Priority"
                onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value as Notice['priority'] })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Valid Until (Optional)"
              type="date"
              value={newNotice.validUntil}
              onChange={(e) => setNewNotice({ ...newNotice, validUntil: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddNotice}
            disabled={!newNotice.title || !newNotice.content}
          >
            Post Notice
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={Boolean(selectedNotice)} 
        onClose={() => setSelectedNotice(null)} 
        maxWidth="md" 
        fullWidth
      >
        {selectedNotice && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <NoticeIcon color="primary" />
                {selectedNotice.title}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                <Chip 
                  label={selectedNotice.priority} 
                  size="small"
                  color={priorityColors[selectedNotice.priority]}
                />
                <Chip 
                  label={`Posted by ${selectedNotice.postedBy}`} 
                  size="small" 
                  variant="outlined"
                />
              </Box>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
                {selectedNotice.content}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Posted on {format(new Date(selectedNotice.createdAt), 'dd MMMM yyyy')}
                {selectedNotice.validUntil && ` • Valid until ${format(new Date(selectedNotice.validUntil), 'dd MMMM yyyy')}`}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedNotice(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </MainLayout>
  );
}