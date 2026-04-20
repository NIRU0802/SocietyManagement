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
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  ExitToApp as ExitIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useApp } from '@/context/AppContext';
import MainLayout from '@/components/layout/MainLayout';
import { Visitor } from '@/types';

const purposeLabels: Record<string, string> = {
  delivery: 'Delivery',
  guest: 'Guest',
  service: 'Service',
  maintenance: 'Maintenance',
  other: 'Other',
};

export default function VisitorsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { getAllVisitors, getFlats, addVisitor, checkOutVisitor } = useApp();

  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [newVisitor, setNewVisitor] = useState({
    flatId: '',
    flatNumber: '',
    name: '',
    phone: '',
    purpose: 'delivery' as Visitor['purpose'],
    vehicleNumber: '',
  });

  const flats = getFlats();
  const visitors = getAllVisitors();

  const filteredVisitors = visitors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || v.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddVisitor = () => {
    const flat = flats.find(f => f.id === newVisitor.flatId);
    addVisitor({
      ...newVisitor,
      flatNumber: flat?.flatNumber || newVisitor.flatNumber,
    });
    setOpenDialog(false);
    setNewVisitor({
      flatId: '',
      flatNumber: '',
      name: '',
      phone: '',
      purpose: 'delivery',
      vehicleNumber: '',
    });
  };

  const handleCheckOut = (id: string) => {
    checkOutVisitor(id);
  };

  const getStatusColor = (status: string) => {
    return status === 'inside' ? 'success' : 'default';
  };

  return (
    <MainLayout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mr: 1 }}>
        <Typography variant="h2">Visitor Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ minHeight: 48 }}
        >
          Check In Visitor
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 300px', maxWidth: { md: '300px' } }}>
              <TextField
                placeholder="Search by name, flat, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
            <Box sx={{ flex: '1 1 150px', maxWidth: { md: '150px' } }}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="inside">Inside</MenuItem>
                  <MenuItem value="exited">Exited</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: { md: 'right' } }}>
                {filteredVisitors.length} visitors found
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
                <TableCell>Visitor</TableCell>
                <TableCell>Flat</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell>Entry Time</TableCell>
                <TableCell>Exit Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVisitors.map((visitor, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {visitor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {visitor.phone}
                    </Typography>
                    {visitor.vehicleNumber && (
                      <Typography variant="body2" color="text.secondary">
                        Vehicle: {visitor.vehicleNumber}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip label={visitor.flatNumber} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={purposeLabels[visitor.purpose]}
                      size="small"
                      color={visitor.purpose === 'delivery' ? 'primary' : visitor.purpose === 'guest' ? 'secondary' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {format(new Date(visitor.entryTime), 'dd MMM, HH:mm')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {visitor.exitTime ? (
                      <Typography variant="body2">
                        {format(new Date(visitor.exitTime), 'dd MMM, HH:mm')}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">-</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={visitor.status === 'inside' ? 'Inside' : 'Exited'}
                      size="small"
                      color={getStatusColor(visitor.status)}
                    />
                  </TableCell>
                  <TableCell>
                    {visitor.status === 'inside' && (
                      <Button
                        size="small"
                        startIcon={<ExitIcon />}
                        onClick={() => handleCheckOut(visitor.id)}
                        variant="outlined"
                      >
                        Check Out
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
        <DialogTitle>Check In Visitor</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Flat</InputLabel>
              <Select
                value={newVisitor.flatId}
                label="Flat"
                onChange={(e) => {
                  const flat = flats.find(f => f.id === e.target.value);
                  setNewVisitor({
                    ...newVisitor,
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
            <TextField
              label="Visitor Name"
              value={newVisitor.name}
              onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Phone Number"
              value={newVisitor.phone}
              onChange={(e) => setNewVisitor({ ...newVisitor, phone: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Purpose</InputLabel>
              <Select
                value={newVisitor.purpose}
                label="Purpose"
                onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value as Visitor['purpose'] })}
              >
                <MenuItem value="delivery">Delivery</MenuItem>
                <MenuItem value="guest">Guest</MenuItem>
                <MenuItem value="service">Service</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Vehicle Number (Optional)"
              value={newVisitor.vehicleNumber}
              onChange={(e) => setNewVisitor({ ...newVisitor, vehicleNumber: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddVisitor} disabled={!newVisitor.name || !newVisitor.flatId}>
            Check In
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}