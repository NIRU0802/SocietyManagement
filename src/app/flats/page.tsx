'use client';

import React, { useState, Suspense } from 'react';
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
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Phone as PhoneIcon,
  DirectionsCar as CarIcon,
  People as PeopleIcon,
  Apartment as ApartmentIcon,
} from '@mui/icons-material';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import MainLayout from '@/components/layout/MainLayout';
import { Flat } from '@/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function FlatsContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab = tabParam === 'members' ? 1 : 0;

  const [tabValue, setTabValue] = useState(initialTab);
  const [openDialog, setOpenDialog] = useState(false);
  const [openMemberDialog, setOpenMemberDialog] = useState(false);

  const [newFlat, setNewFlat] = useState({
    flatNumber: '',
    block: 'A',
    floor: 1,
    type: 'owner' as 'owner' | 'tenant',
    ownerName: '',
    ownerPhone: '',
    size: '2BHK',
  });

  const [newMember, setNewMember] = useState({
    flatId: '',
    name: '',
    phone: '',
    relation: 'family' as 'owner' | 'family' | 'tenant',
    isPrimary: false,
  });

  const { getFlats, getAllMembers, addFlat, addMember } = useApp();
  const flats = getFlats();
  const members = getAllMembers();

  const handleAddFlat = () => {
    addFlat(newFlat);
    setOpenDialog(false);
    setNewFlat({ flatNumber: '', block: 'A', floor: 1, type: 'owner', ownerName: '', ownerPhone: '', size: '2BHK' });
  };

  const handleAddMember = () => {
    addMember(newMember);
    setOpenMemberDialog(false);
    setNewMember({ flatId: '', name: '', phone: '', relation: 'family', isPrimary: false });
  };

  const getMemberCount = (flatId: string) => members.filter(m => m.flatId === flatId).length;
  const getVehicleCount = (flatId: string) => flats.find(f => f.id === flatId)?.vehicles.length || 0;

  return (
    <MainLayout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h2">Flats & Members</Typography>
        <Box sx={{ display: 'flex', gap: 1, mr: 1 }}>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpenMemberDialog(true)}>Add Member</Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>Add Flat</Button>
        </Box>
      </Box>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
            <Tab label="Flats" />
            <Tab label="All Members" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {flats.map((flat, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Card variant="outlined" sx={{ cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', boxShadow: 2 } }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h3" sx={{ fontWeight: 700 }}>{flat.flatNumber}</Typography>
                          <Typography variant="body2" color="text.secondary">Block {flat.block} • Floor {flat.floor}</Typography>
                        </Box>
                        <Chip label={flat.type} size="small" color={flat.type === 'owner' ? 'primary' : 'secondary'} sx={{ textTransform: 'capitalize' }} />
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{flat.ownerName}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">{flat.ownerPhone}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip icon={<PeopleIcon sx={{ fontSize: 14 }} />} label={`${getMemberCount(flat.id)} Members`} size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); setTabValue(1); }} />
                        <Chip icon={<CarIcon sx={{ fontSize: 14 }} />} label={`${getVehicleCount(flat.id)} Vehicles`} size="small" variant="outlined" />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {members.map((member, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Card variant="outlined" sx={{ cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', boxShadow: 2 } }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h3" sx={{ fontWeight: 700 }}>{member.name}</Typography>
                          {member.isPrimary && <Chip label="Primary" size="small" sx={{ mt: 0.5 }} color="primary" />}
                        </Box>
                        <Chip label={member.relation === 'owner' ? 'Owner' : member.relation === 'tenant' ? 'Tenant' : 'Family'} size="small" color={member.relation === 'owner' ? 'primary' : member.relation === 'tenant' ? 'warning' : 'default'} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <ApartmentIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">{flats.find(f => f.id === member.flatId)?.flatNumber || '-'}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">{member.phone}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Flat</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label="Flat Number" value={newFlat.flatNumber} onChange={(e) => setNewFlat({ ...newFlat, flatNumber: e.target.value })} fullWidth />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Block</InputLabel>
                <Select value={newFlat.block} label="Block" onChange={(e) => setNewFlat({ ...newFlat, block: e.target.value })}>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Floor" type="number" value={newFlat.floor} onChange={(e) => setNewFlat({ ...newFlat, floor: parseInt(e.target.value) || 1 })} fullWidth />
            </Box>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={newFlat.type} label="Type" onChange={(e) => setNewFlat({ ...newFlat, type: e.target.value as 'owner' | 'tenant' })}>
                <MenuItem value="owner">Owner</MenuItem>
                <MenuItem value="tenant">Tenant</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Owner Name" value={newFlat.ownerName} onChange={(e) => setNewFlat({ ...newFlat, ownerName: e.target.value })} fullWidth />
            <TextField label="Owner Phone" value={newFlat.ownerPhone} onChange={(e) => setNewFlat({ ...newFlat, ownerPhone: e.target.value })} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select value={newFlat.size} label="Size" onChange={(e) => setNewFlat({ ...newFlat, size: e.target.value })}>
                <MenuItem value="1BHK">1BHK</MenuItem>
                <MenuItem value="2BHK">2BHK</MenuItem>
                <MenuItem value="3BHK">3BHK</MenuItem>
                <MenuItem value="4BHK">4BHK</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddFlat}>Add Flat</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openMemberDialog} onClose={() => setOpenMemberDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Member</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Flat</InputLabel>
              <Select value={newMember.flatId} label="Flat" onChange={(e) => setNewMember({ ...newMember, flatId: e.target.value })}>
                {flats.map((flat) => (<MenuItem key={flat.id} value={flat.id}>{flat.flatNumber}</MenuItem>))}
              </Select>
            </FormControl>
            <TextField label="Name" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} fullWidth />
            <TextField label="Phone" value={newMember.phone} onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Relation</InputLabel>
              <Select value={newMember.relation} label="Relation" onChange={(e) => setNewMember({ ...newMember, relation: e.target.value as 'owner' | 'family' | 'tenant' })}>
                <MenuItem value="owner">Owner</MenuItem>
                <MenuItem value="family">Family</MenuItem>
                <MenuItem value="tenant">Tenant</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMemberDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddMember}>Add Member</Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}

export default function FlatsPage() {
  return (
    <Suspense fallback={<Box sx={{ p: 4, textAlign: 'center' }}><Typography>Loading...</Typography></Box>}>
      <FlatsContent />
    </Suspense>
  );
}