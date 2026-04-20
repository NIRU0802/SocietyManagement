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
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as BalanceIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useApp } from '@/context/AppContext';
import MainLayout from '@/components/layout/MainLayout';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { Income, Expense } from '@/types';

const COLORS = ['#1E40AF', '#3B82F6', '#0F766E', '#F59E0B', '#EF4444', '#8B5CF6'];

const incomeTypeLabels: Record<string, string> = {
  maintenance: 'Maintenance',
  parking: 'Parking',
  rent: 'Rent',
  other: 'Other',
};

const expenseCategoryLabels: Record<string, string> = {
  electricity: 'Electricity',
  water: 'Water',
  maintenance: 'Maintenance',
  salary: 'Salary',
  security: 'Security',
  repair: 'Repair',
  other: 'Other',
};

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function FinancePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { getAllIncomes, getAllExpenses, getFlats, addIncome, addExpense, updateIncomeStatus, getPendingDues, financeSummary } = useApp();
  
  const [tabValue, setTabValue] = useState(0);
  const [openIncomeDialog, setOpenIncomeDialog] = useState(false);
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
  
  const [newIncome, setNewIncome] = useState({
    flatId: '',
    flatNumber: '',
    type: 'maintenance' as Income['type'],
    amount: 0,
    description: '',
    status: 'paid' as Income['status'],
    paidDate: format(new Date(), 'yyyy-MM-dd'),
  });

  const [newExpense, setNewExpense] = useState({
    category: 'electricity' as Expense['category'],
    amount: 0,
    description: '',
    vendor: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  const flats = getFlats();
  const incomes = getAllIncomes();
  const expenses = getAllExpenses();
  const pendingDues = getPendingDues();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleAddIncome = () => {
    const flat = flats.find(f => f.id === newIncome.flatId);
    addIncome({
      ...newIncome,
      flatNumber: flat?.flatNumber || undefined,
      paidDate: newIncome.status === 'paid' ? new Date().toISOString() : undefined,
      dueDate: newIncome.status === 'pending' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
    });
    setOpenIncomeDialog(false);
    setNewIncome({
      flatId: '',
      flatNumber: '',
      type: 'maintenance',
      amount: 0,
      description: '',
      status: 'paid',
      paidDate: format(new Date(), 'yyyy-MM-dd'),
    });
  };

  const handleAddExpense = () => {
    addExpense({
      ...newExpense,
      date: new Date(newExpense.date).toISOString(),
    });
    setOpenExpenseDialog(false);
    setNewExpense({
      category: 'electricity',
      amount: 0,
      description: '',
      vendor: '',
      date: format(new Date(), 'yyyy-MM-dd'),
    });
  };

  const handleMarkPaid = (id: string) => {
    updateIncomeStatus(id, 'paid');
  };

  const pendingDuesTotal = pendingDues.reduce((sum, i) => sum + i.amount, 0);

  return (
    <MainLayout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h2">Finance & Accounting</Typography>
        <Box sx={{ display: 'flex', gap: 2, mr: 1 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setOpenExpenseDialog(true)}
          >
            Add Expense
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenIncomeDialog(true)}
          >
            Add Income
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#ECFDF5' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <TrendingUpIcon sx={{ color: '#059669' }} />
                <Typography variant="body2" color="text.secondary">Total Income</Typography>
              </Box>
              <Typography variant="h2" sx={{ fontWeight: 700, color: '#059669' }}>
                {formatCurrency(financeSummary.totalIncome)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#FEF2F2' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <TrendingDownIcon sx={{ color: '#DC2626' }} />
                <Typography variant="body2" color="text.secondary">Total Expenses</Typography>
              </Box>
              <Typography variant="h2" sx={{ fontWeight: 700, color: '#DC2626' }}>
                {formatCurrency(financeSummary.totalExpenses)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: financeSummary.balance >= 0 ? '#ECFDF5' : '#FEF2F2' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <BalanceIcon sx={{ color: financeSummary.balance >= 0 ? '#059669' : '#DC2626' }} />
                <Typography variant="body2" color="text.secondary">Balance</Typography>
              </Box>
              <Typography variant="h2" sx={{ fontWeight: 700, color: financeSummary.balance >= 0 ? '#059669' : '#DC2626' }}>
                {formatCurrency(financeSummary.balance)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#FEF3C7' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <TrendingDownIcon sx={{ color: '#D97706' }} />
                <Typography variant="body2" color="text.secondary">Pending Dues</Typography>
              </Box>
              <Typography variant="h2" sx={{ fontWeight: 700, color: '#D97706' }}>
                {formatCurrency(pendingDuesTotal)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pendingDues.length} pending payments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ mb: 3 }}>Income vs Expenses (6 Months)</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financeSummary.incomeByMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                    <YAxis 
                      stroke="#64748B" 
                      fontSize={12}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                    />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      name="Income"
                      stroke="#10B981" 
                      strokeWidth={2}
                      dot={{ fill: '#10B981' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      name="Expenses"
                      stroke="#EF4444" 
                      strokeWidth={2}
                      dot={{ fill: '#EF4444' }}
                    />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ mb: 3 }}>Expense Categories</Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={financeSummary.expensesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="amount"
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    >
                      {financeSummary.expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
            <Tab label={`Income (${incomes.length})`} />
            <Tab label={`Expenses (${expenses.length})`} />
            <Tab label={`Pending Dues (${pendingDues.length})`} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Flat</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomes.map((income, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      {format(new Date(income.paidDate || income.createdAt), 'dd MMM yyyy')}
                    </TableCell>
                    <TableCell>
                      {income.flatNumber ? <Chip label={income.flatNumber} size="small" variant="outlined" /> : '-'}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={incomeTypeLabels[income.type]} 
                        size="small"
                        color={income.type === 'maintenance' ? 'primary' : 'secondary'}
                      />
                    </TableCell>
                    <TableCell>{income.description}</TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                        +{formatCurrency(income.amount)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={income.status} 
                        size="small"
                        color={income.status === 'paid' ? 'success' : 'warning'}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      {format(new Date(expense.date), 'dd MMM yyyy')}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={expenseCategoryLabels[expense.category]} 
                        size="small"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.vendor || '-'}</TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'error.main' }}>
                        -{formatCurrency(expense.amount)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Flat</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingDues.map((due, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Chip label={due.flatNumber} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={incomeTypeLabels[due.type]} 
                        size="small"
                        color={due.type === 'maintenance' ? 'primary' : 'secondary'}
                      />
                    </TableCell>
                    <TableCell>{due.description}</TableCell>
                    <TableCell>
                      {due.dueDate ? format(new Date(due.dueDate), 'dd MMM yyyy') : '-'}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'warning.main' }}>
                        {formatCurrency(due.amount)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="success"
                        onClick={() => handleMarkPaid(due.id)}
                      >
                        Mark Paid
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Card>

      <Dialog open={openIncomeDialog} onClose={() => setOpenIncomeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Income</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Flat (Optional)</InputLabel>
              <Select
                value={newIncome.flatId}
                label="Flat (Optional)"
                onChange={(e) => {
                  const flat = flats.find(f => f.id === e.target.value);
                  setNewIncome({ 
                    ...newIncome, 
                    flatId: e.target.value,
                    flatNumber: flat?.flatNumber || '',
                  });
                }}
              >
                <MenuItem value="">None</MenuItem>
                {flats.map((flat) => (
                  <MenuItem key={flat.id} value={flat.id}>
                    {flat.flatNumber} - {flat.ownerName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={newIncome.type}
                label="Type"
                onChange={(e) => setNewIncome({ ...newIncome, type: e.target.value as Income['type'] })}
              >
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="parking">Parking</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Amount"
              type="number"
              value={newIncome.amount}
              onChange={(e) => setNewIncome({ ...newIncome, amount: parseFloat(e.target.value) || 0 })}
              fullWidth
            />
            <TextField
              label="Description"
              value={newIncome.description}
              onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={newIncome.status}
                label="Status"
                onChange={(e) => setNewIncome({ ...newIncome, status: e.target.value as Income['status'] })}
              >
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIncomeDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddIncome}
            disabled={!newIncome.amount || !newIncome.description}
          >
            Add Income
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openExpenseDialog} onClose={() => setOpenExpenseDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newExpense.category}
                label="Category"
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as Expense['category'] })}
              >
                <MenuItem value="electricity">Electricity</MenuItem>
                <MenuItem value="water">Water</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="salary">Salary</MenuItem>
                <MenuItem value="security">Security</MenuItem>
                <MenuItem value="repair">Repair</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Amount"
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
              fullWidth
            />
            <TextField
              label="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              fullWidth
            />
            <TextField
              label="Vendor (Optional)"
              value={newExpense.vendor}
              onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
              fullWidth
            />
            <TextField
              label="Date"
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExpenseDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddExpense}
            disabled={!newExpense.amount || !newExpense.description}
          >
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}