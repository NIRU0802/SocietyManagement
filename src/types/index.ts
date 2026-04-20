export interface Flat {
  id: string;
  flatNumber: string;
  block: string;
  floor: number;
  type: 'owner' | 'tenant';
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  size: string;
  members: Member[];
  vehicles: Vehicle[];
  createdAt: string;
}

export interface Member {
  id: string;
  flatId: string;
  name: string;
  phone: string;
  email?: string;
  relation: 'owner' | 'family' | 'tenant';
  aadhaar?: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface Visitor {
  id: string;
  flatId: string;
  flatNumber: string;
  name: string;
  phone: string;
  purpose: 'delivery' | 'guest' | 'service' | 'maintenance' | 'other';
  vehicleNumber?: string;
  vehicleType?: 'car' | 'bike' | 'other';
  entryTime: string;
  exitTime?: string;
  status: 'inside' | 'exited';
  visitedBy?: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  flatId: string;
  flatNumber: string;
  category: 'maintenance' | 'noise' | 'parking' | 'security' | 'other';
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  postedBy: string;
  createdAt: string;
  validUntil?: string;
}

export interface Vehicle {
  id: string;
  flatId: string;
  flatNumber: string;
  vehicleNumber: string;
  type: 'car' | 'bike' | 'other';
  brand?: string;
  model?: string;
  color?: string;
  registeredAt: string;
}

export interface Income {
  id: string;
  flatId?: string;
  flatNumber?: string;
  type: 'maintenance' | 'parking' | 'rent' | 'other';
  amount: number;
  description?: string;
  status: 'paid' | 'pending';
  dueDate?: string;
  paidDate?: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  category: 'electricity' | 'water' | 'maintenance' | 'salary' | 'security' | 'repair' | 'other';
  amount: number;
  description: string;
  vendor?: string;
  date: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'visitor' | 'payment' | 'complaint' | 'notice';
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}

export interface DashboardStats {
  totalVisitorsToday: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  pendingDues: number;
  pendingDuesCount: number;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  incomeByMonth: { month: string; income: number; expenses: number }[];
  expensesByCategory: { category: string; amount: number }[];
}