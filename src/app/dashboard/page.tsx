'use client';

import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { 
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
  Report as ReportIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
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
} from 'recharts';

const COLORS = ['#1E40AF', '#3B82F6', '#0F766E', '#F59E0B', '#EF4444'];

export default function DashboardPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { stats, financeSummary, getAllVisitors, getAllComplaints, getAllNotices } = useApp();

  const visitorsToday = getAllVisitors().filter(v => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(v.entryTime) >= today;
  });

  const activeComplaints = getAllComplaints().filter(c => 
    c.status === 'open' || c.status === 'in_progress'
  ).length;

  const recentNotices = getAllNotices().slice(0, 3);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const statCards = [
    { 
      title: 'Visitors Today', 
      value: visitorsToday.length, 
      icon: <PeopleIcon />, 
      color: '#3B82F6',
      path: '/visitors',
    },
    { 
      title: 'Monthly Income', 
      value: formatCurrency(stats.monthlyIncome), 
      icon: <MoneyIcon />, 
      color: '#10B981',
      path: '/finance',
    },
    { 
      title: 'Monthly Expenses', 
      value: formatCurrency(stats.monthlyExpenses), 
      icon: <TrendingUpIcon />, 
      color: '#EF4444',
      path: '/finance',
    },
    { 
      title: 'Pending Dues', 
      value: formatCurrency(stats.pendingDues), 
      subtitle: `${stats.pendingDuesCount} pending`,
      icon: <WarningIcon />, 
      color: '#F59E0B',
      path: '/finance',
    },
  ];

  const quickActions = [
    { label: 'Add Visitor', icon: <PersonAddIcon />, path: '/visitors', color: 'primary' },
    { label: 'Raise Complaint', icon: <ReportIcon />, path: '/complaints', color: 'warning' },
    { label: 'Add Payment', icon: <AddIcon />, path: '/finance', color: 'success' },
  ];

  return (
    <MainLayout>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {statCards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  },
                }}
                onClick={() => router.push(card.path)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="h2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        {card.value}
                      </Typography>
                      {card.subtitle && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {card.subtitle}
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: `${card.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: card.color,
                      }}
                    >
                      {card.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                Income vs Expenses
              </Typography>
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
                    <Tooltip 
                      formatter={(value) => formatCurrency(value as number)}
                      contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      name="Income" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      dot={{ fill: '#10B981', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      name="Expenses" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      dot={{ fill: '#EF4444', strokeWidth: 2 }}
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
              <Typography variant="h4" sx={{ mb: 3 }}>
                Expense Breakdown
              </Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={financeSummary.expensesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="amount"
                    >
                      {financeSummary.expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    startIcon={action.icon}
                    onClick={() => router.push(action.path)}
                    sx={{
                      justifyContent: 'flex-start',
                      borderColor: 'divider',
                      color: 'text.primary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.main',
                        color: 'white',
                      },
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Active Complaints</Typography>
                <Chip 
                  label={activeComplaints} 
                  color="warning" 
                  size="small"
                  onClick={() => router.push('/complaints')}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
              {getAllComplaints().slice(0, 3).map((complaint, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    p: 2, 
                    mb: 1, 
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  onClick={() => router.push('/complaints')}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                    {complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {complaint.flatNumber} - {complaint.description.slice(0, 40)}...
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Recent Notices</Typography>
                <Button 
                  size="small" 
                  onClick={() => router.push('/notices')}
                >
                  View All
                </Button>
              </Box>
              {recentNotices.map((notice, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    p: 2, 
                    mb: 1, 
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  onClick={() => router.push('/notices')}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {notice.title}
                    </Typography>
                    <Chip 
                      label={notice.priority} 
                      size="small"
                      color={notice.priority === 'high' ? 'error' : notice.priority === 'medium' ? 'warning' : 'default'}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Posted by {notice.postedBy}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
}