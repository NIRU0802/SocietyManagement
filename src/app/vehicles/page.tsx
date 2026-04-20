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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DirectionsCar as CarIcon,
  TwoWheeler as BikeIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useApp } from '@/context/AppContext';
import MainLayout from '@/components/layout/MainLayout';
import { Vehicle } from '@/types';

export default function VehiclesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { getAllVehicles, getFlats, addVehicle, deleteVehicle } = useApp();
  
  const [openDialog, setOpenDialog] = useState(false);
  
  const [newVehicle, setNewVehicle] = useState({
    flatId: '',
    flatNumber: '',
    vehicleNumber: '',
    type: 'car' as Vehicle['type'],
    brand: '',
    model: '',
    color: '',
  });

  const flats = getFlats();
  const vehicles = getAllVehicles();

  const handleAddVehicle = () => {
    const flat = flats.find(f => f.id === newVehicle.flatId);
    addVehicle({
      ...newVehicle,
      flatNumber: flat?.flatNumber || newVehicle.flatNumber,
    });
    setOpenDialog(false);
    setNewVehicle({
      flatId: '',
      flatNumber: '',
      vehicleNumber: '',
      type: 'car',
      brand: '',
      model: '',
      color: '',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      deleteVehicle(id);
    }
  };

  const getVehicleIcon = (type: string) => {
    return type === 'car' ? <CarIcon /> : <BikeIcon />;
  };

  return (
    <MainLayout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h2">Vehicle Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ minHeight: 48 }}
        >
          Add Vehicle
        </Button>
      </Box>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle</TableCell>
                <TableCell>Flat</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Brand/Model</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Registered</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getVehicleIcon(vehicle.type)}
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {vehicle.vehicleNumber}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={vehicle.flatNumber} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={vehicle.type === 'car' ? 'Car' : vehicle.type === 'bike' ? 'Bike' : 'Other'} 
                      size="small"
                      color={vehicle.type === 'car' ? 'primary' : 'secondary'}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {vehicle.brand} {vehicle.model}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box 
                        sx={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: 1,
                          bgcolor: vehicle.color?.toLowerCase() || 'grey',
                          border: '1px solid',
                          borderColor: 'divider',
                        }} 
                      />
                      <Typography variant="body2">{vehicle.color}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {format(new Date(vehicle.registeredAt), 'dd MMM yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      color="error" 
                      size="small"
                      onClick={() => handleDelete(vehicle.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Vehicle</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Flat</InputLabel>
              <Select
                value={newVehicle.flatId}
                label="Flat"
                onChange={(e) => {
                  const flat = flats.find(f => f.id === e.target.value);
                  setNewVehicle({ 
                    ...newVehicle, 
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
              label="Vehicle Number"
              value={newVehicle.vehicleNumber}
              onChange={(e) => setNewVehicle({ ...newVehicle, vehicleNumber: e.target.value.toUpperCase() })}
              fullWidth
              placeholder="e.g., MH-01-AB-1234"
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={newVehicle.type}
                label="Type"
                onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value as Vehicle['type'] })}
              >
                <MenuItem value="car">Car</MenuItem>
                <MenuItem value="bike">Bike</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Brand"
              value={newVehicle.brand}
              onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
              fullWidth
            />
            <TextField
              label="Model"
              value={newVehicle.model}
              onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
              fullWidth
            />
            <TextField
              label="Color"
              value={newVehicle.color}
              onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddVehicle}
            disabled={!newVehicle.vehicleNumber || !newVehicle.flatId}
          >
            Add Vehicle
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}