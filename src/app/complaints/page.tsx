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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  CheckCircle as ResolveIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useApp } from '@/context/AppContext';
import MainLayout from '@/components/layout/MainLayout';
import { Complaint } from '@/types';

const statusColors: Record<string, 'default' | 'warning' | 'success' | 'error'> = {
  open: 'warning',
  in_progress: 'default',
  resolved: 'success',
  closed: 'success',
};

const priorityColors: Record<string, 'default' | 'warning' | 'error'> = {
  low: 'default',
  medium: 'warning',
  high: 'error',
};

export default function ComplaintsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { getAllComplaints, getFlats, addComplaint, updateComplaintStatus } = useApp();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [newComplaint, setNewComplaint] = useState({
    flatId: '',
    flatNumber: '',
    category: 'maintenance' as Complaint['category'],
    description: '',
    priority: 'medium' as Complaint['priority'],
  });

  const flats = getFlats();
  const complaints = getAllComplaints();

  const filteredComplaints = complaints.filter(c => 
    filterStatus === 'all' || c.status === filterStatus
  );

  const handleAddComplaint = () => {
    const flat = flats.find(f => f.id === newComplaint.flatId);
    addComplaint({
      ...newComplaint,
      flatNumber: flat?.flatNumber || newComplaint.flatNumber,
    });
    setOpenDialog(false);
    setNewComplaint({
      flatId: '',
      flatNumber: '',
      category: 'maintenance',
      description: '',
      priority: 'medium',
    });
  };

  const handleStatusChange = (id: string, status: Complaint['status']) => {
    updateComplaintStatus(id, status);
  };

  return (
    <MainLayout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h2">Complaints</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ minHeight: 48 }}
        >
          Raise Complaint
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 300px', maxWidth: { md: '300px' } }}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: { md: 'right' } }}>
                {filteredComplaints.length} complaints
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Flat</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredComplaints.map((complaint, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Chip label={complaint.flatNumber} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {complaint.category}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 250 }} noWrap>
                      {complaint.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={complaint.priority} 
                      size="small"
                      color={priorityColors[complaint.priority]}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={complaint.status === 'in_progress' ? 'In Progress' : complaint.status} 
                      size="small"
                      color={statusColors[complaint.status]}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {format(new Date(complaint.createdAt), 'dd MMM yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {complaint.status !== 'resolved' && complaint.status !== 'closed' && (
                      <Button
                        size="small"
                        startIcon={<ResolveIcon />}
                        onClick={() => handleStatusChange(complaint.id, 'resolved')}
                        variant="outlined"
                        color="success"
                      >
                        Resolve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Raise Complaint</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Flat</InputLabel>
              <Select
                value={newComplaint.flatId}
                label="Flat"
                onChange={(e) => {
                  const flat = flats.find(f => f.id === e.target.value);
                  setNewComplaint({ 
                    ...newComplaint, 
                    flatId: e.target.value,
                    flatNumber: flat?.flatNumber || '',
                  });
                }}
              >
                {flats.map((flat) => (
                  <MenuItem key={flat.id} value={flat.id}>
                    {flat.flatNumber} - {flat.ownerName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newComplaint.category}
                label="Category"
                onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value as Complaint['category'] })}
              >
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="noise">Noise</MenuItem>
                <MenuItem value="parking">Parking</MenuItem>
                <MenuItem value="security">Security</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              value={newComplaint.description}
              onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
              multiline
              rows={4}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newComplaint.priority}
                label="Priority"
                onChange={(e) => setNewComplaint({ ...newComplaint, priority: e.target.value as Complaint['priority'] })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddComplaint}
            disabled={!newComplaint.flatId || !newComplaint.description}
          >
            Submit Complaint
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}