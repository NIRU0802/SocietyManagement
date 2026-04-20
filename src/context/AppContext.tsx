'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Flat, Member, Visitor, Complaint, Notice, Vehicle, 
  Income, Expense, Notification, DashboardStats, FinanceSummary
} from '@/types';
import { getInitialData, saveData } from '@/data/seedData';
import * as services from '@/services';

interface AppData {
  flats: Flat[];
  members: Member[];
  visitors: Visitor[];
  complaints: Complaint[];
  notices: Notice[];
  vehicles: Vehicle[];
  incomes: Income[];
  expenses: Expense[];
  notifications: Notification[];
}

interface AppContextType {
  data: AppData;
  stats: DashboardStats;
  financeSummary: FinanceSummary;
  refreshData: () => void;
  addVisitor: (visitor: Omit<Visitor, 'id' | 'createdAt' | 'entryTime' | 'status'>) => void;
  checkOutVisitor: (id: string) => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  updateComplaintStatus: (id: string, status: Complaint['status']) => void;
  addNotice: (notice: Omit<Notice, 'id' | 'createdAt'>) => void;
  addIncome: (income: Omit<Income, 'id' | 'createdAt'>) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  updateIncomeStatus: (id: string, status: 'paid' | 'pending') => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addFlat: (flat: Omit<Flat, 'id' | 'members' | 'vehicles' | 'createdAt'>) => void;
  addMember: (member: Omit<Member, 'id' | 'createdAt'>) => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'registeredAt'>) => void;
  deleteVehicle: (id: string) => void;
  getFlats: () => Flat[];
  getFlatById: (id: string) => Flat | undefined;
  getAllMembers: () => Member[];
  getMembersByFlat: (flatId: string) => Member[];
  getAllVehicles: () => Vehicle[];
  getAllVisitors: () => Visitor[];
  getVisitorsToday: () => Visitor[];
  getAllComplaints: () => Complaint[];
  getAllNotices: () => Notice[];
  getAllIncomes: () => Income[];
  getAllExpenses: () => Expense[];
  getNotifications: () => Notification[];
  getUnreadNotificationCount: () => number;
  getPendingDues: () => Income[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>({
    flats: [],
    members: [],
    visitors: [],
    complaints: [],
    notices: [],
    vehicles: [],
    incomes: [],
    expenses: [],
    notifications: [],
  });

  const calculateStats = useCallback((): DashboardStats => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const totalVisitorsToday = data.visitors.filter(v => 
      new Date(v.entryTime) >= today
    ).length;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyIncome = data.incomes
      .filter(i => i.status === 'paid' && new Date(i.paidDate || i.createdAt) >= startOfMonth)
      .reduce((sum, i) => sum + i.amount, 0);
    
    const monthlyExpenses = data.expenses
      .filter(e => new Date(e.date) >= startOfMonth)
      .reduce((sum, e) => sum + e.amount, 0);

    const pendingDuesCount = data.incomes.filter(i => i.status === 'pending').length;
    const pendingDues = data.incomes
      .filter(i => i.status === 'pending')
      .reduce((sum, i) => sum + i.amount, 0);

    return {
      totalVisitorsToday,
      monthlyIncome,
      monthlyExpenses,
      pendingDues,
      pendingDuesCount,
    };
  }, [data]);

  const calculateFinanceSummary = useCallback((): FinanceSummary => {
    return services.financeService.getFinanceSummary({ incomes: data.incomes, expenses: data.expenses });
  }, [data]);

  useEffect(() => {
    const initialData = getInitialData();
    setData(initialData);
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0 && data.flats.length > 0) {
      saveData(data);
    }
  }, [data]);

  const refreshData = useCallback(() => {
    const initialData = getInitialData();
    setData(initialData);
  }, []);

  const addVisitor = useCallback((visitor: Omit<Visitor, 'id' | 'createdAt' | 'entryTime' | 'status'>) => {
    const newVisitor = services.visitorService.addVisitor({ visitors: data.visitors }, visitor);
    services.notificationService.addNotification(
      { notifications: data.notifications },
      { type: 'visitor', title: 'Visitor Arrived', message: `${newVisitor.name} has arrived at ${visitor.flatNumber}` }
    );
    setData(prev => ({ ...prev, visitors: [...prev.visitors], notifications: [...prev.notifications] }));
  }, [data]);

  const checkOutVisitor = useCallback((id: string) => {
    setData(prev => {
      const newVisitors = prev.visitors.map(v => 
        v.id === id ? { ...v, exitTime: new Date().toISOString(), status: 'exited' as const } : v
      );
      const updatedVisitor = newVisitors.find(v => v.id === id);
      if (updatedVisitor) {
        const newNotification: Notification = {
          id: uuidv4(),
          type: 'visitor',
          title: 'Visitor Exited',
          message: `${updatedVisitor.name} has exited from ${updatedVisitor.flatNumber}`,
          read: false,
          createdAt: new Date().toISOString(),
        };
        return { ...prev, visitors: newVisitors, notifications: [newNotification, ...prev.notifications] };
      }
      return prev;
    });
  }, []);

  const addComplaint = useCallback((complaint: Omit<Complaint, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    services.complaintService.addComplaint({ complaints: data.complaints }, complaint);
    services.notificationService.addNotification(
      { notifications: data.notifications },
      { type: 'complaint', title: 'New Complaint', message: `New complaint registered from ${complaint.flatNumber} (${complaint.category})` }
    );
    setData(prev => ({ ...prev, complaints: [...prev.complaints], notifications: [...prev.notifications] }));
  }, [data]);

  const updateComplaintStatus = useCallback((id: string, status: Complaint['status']) => {
    services.complaintService.updateComplaintStatus({ complaints: data.complaints }, id, status);
    setData(prev => ({ ...prev, complaints: [...prev.complaints] }));
  }, [data]);

  const addNotice = useCallback((notice: Omit<Notice, 'id' | 'createdAt'>) => {
    services.noticeService.addNotice({ notices: data.notices }, notice);
    services.notificationService.addNotification(
      { notifications: data.notifications },
      { type: 'notice', title: 'New Notice', message: `${notice.title} notice published` }
    );
    setData(prev => ({ ...prev, notices: [...prev.notices], notifications: [...prev.notifications] }));
  }, [data]);

  const addIncome = useCallback((income: Omit<Income, 'id' | 'createdAt'>) => {
    services.financeService.addIncome({ incomes: data.incomes }, income);
    if (income.status === 'paid') {
      services.notificationService.addNotification(
        { notifications: data.notifications },
        { type: 'payment', title: 'Payment Received', message: `Payment of Rs. ${income.amount} received${income.flatNumber ? ` from ${income.flatNumber}` : ''}` }
      );
    }
    setData(prev => ({ ...prev, incomes: [...prev.incomes], notifications: [...prev.notifications] }));
  }, [data]);

  const addExpense = useCallback((expense: Omit<Expense, 'id' | 'createdAt'>) => {
    services.financeService.addExpense({ expenses: data.expenses }, expense);
    setData(prev => ({ ...prev, expenses: [...prev.expenses] }));
  }, [data]);

  const updateIncomeStatus = useCallback((id: string, status: 'paid' | 'pending') => {
    services.financeService.updateIncomeStatus({ incomes: data.incomes }, id, status);
    if (status === 'paid') {
      const income = data.incomes.find(i => i.id === id);
      if (income) {
        services.notificationService.addNotification(
          { notifications: data.notifications },
          { type: 'payment', title: 'Payment Received', message: `Payment of Rs. ${income.amount} marked as paid${income.flatNumber ? ` from ${income.flatNumber}` : ''}` }
        );
      }
    }
    setData(prev => ({ ...prev, incomes: [...prev.incomes], notifications: [...prev.notifications] }));
  }, [data]);

  const markNotificationRead = useCallback((id: string) => {
    services.notificationService.markAsRead({ notifications: data.notifications }, id);
    setData(prev => ({ ...prev, notifications: [...prev.notifications] }));
  }, [data]);

  const markAllNotificationsRead = useCallback(() => {
    services.notificationService.markAllAsRead({ notifications: data.notifications });
    setData(prev => ({ ...prev, notifications: [...prev.notifications] }));
  }, []);

  const addFlat = useCallback((flat: Omit<Flat, 'id' | 'members' | 'vehicles' | 'createdAt'>) => {
    services.flatService.addFlat({ flats: data.flats }, flat);
    setData(prev => ({ ...prev, flats: [...prev.flats] }));
  }, [data]);

  const addMember = useCallback((member: Omit<Member, 'id' | 'createdAt'>) => {
    services.flatService.addMember({ members: data.members }, member);
    setData(prev => ({ ...prev, members: [...prev.members] }));
  }, [data]);

  const addVehicle = useCallback((vehicle: Omit<Vehicle, 'id' | 'registeredAt'>) => {
    services.flatService.addVehicle({ vehicles: data.vehicles }, vehicle);
    setData(prev => ({ ...prev, vehicles: [...prev.vehicles] }));
  }, [data]);

  const deleteVehicle = useCallback((id: string) => {
    services.flatService.deleteVehicle({ vehicles: data.vehicles }, id);
    setData(prev => ({ ...prev, vehicles: [...prev.vehicles] }));
  }, [data]);

  const getFlats = useCallback(() => {
    return services.flatService.getAllFlats({ flats: data.flats, members: data.members, vehicles: data.vehicles });
  }, [data]);

  const getFlatById = useCallback((id: string) => {
    return services.flatService.getFlatById({ flats: data.flats, members: data.members, vehicles: data.vehicles }, id);
  }, [data]);

  const getAllMembers = useCallback(() => {
    return services.flatService.getAllMembers({ members: data.members });
  }, [data]);

  const getMembersByFlat = useCallback((flatId: string) => {
    return services.flatService.getMembersByFlat({ members: data.members }, flatId);
  }, [data]);

  const getAllVehicles = useCallback(() => {
    return services.flatService.getAllVehicles({ vehicles: data.vehicles });
  }, [data]);

  const getAllVisitors = useCallback(() => {
    return services.visitorService.getAllVisitors({ visitors: data.visitors });
  }, [data]);

  const getVisitorsToday = useCallback(() => {
    return services.visitorService.getVisitorsToday({ visitors: data.visitors });
  }, [data]);

  const getAllComplaints = useCallback(() => {
    return services.complaintService.getAllComplaints({ complaints: data.complaints });
  }, [data]);

  const getAllNotices = useCallback(() => {
    return services.noticeService.getAllNotices({ notices: data.notices });
  }, [data]);

  const getAllIncomes = useCallback(() => {
    return services.financeService.getAllIncomes({ incomes: data.incomes });
  }, [data]);

  const getAllExpenses = useCallback(() => {
    return services.financeService.getAllExpenses({ expenses: data.expenses });
  }, [data]);

  const getNotifications = useCallback(() => {
    return services.notificationService.getAllNotifications({ notifications: data.notifications });
  }, [data]);

  const getUnreadNotificationCount = useCallback(() => {
    return services.notificationService.getUnreadCount({ notifications: data.notifications });
  }, [data]);

  const getPendingDues = useCallback(() => {
    return services.financeService.getPendingDues({ incomes: data.incomes });
  }, [data]);

  const value: AppContextType = {
    data,
    stats: calculateStats(),
    financeSummary: calculateFinanceSummary(),
    refreshData,
    addVisitor,
    checkOutVisitor,
    addComplaint,
    updateComplaintStatus,
    addNotice,
    addIncome,
    addExpense,
    updateIncomeStatus,
    markNotificationRead,
    markAllNotificationsRead,
    addFlat,
    addMember,
    addVehicle,
    deleteVehicle,
    getFlats,
    getFlatById,
    getAllMembers,
    getMembersByFlat,
    getAllVehicles,
    getAllVisitors,
    getVisitorsToday,
    getAllComplaints,
    getAllNotices,
    getAllIncomes,
    getAllExpenses,
    getNotifications,
    getUnreadNotificationCount,
    getPendingDues,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}