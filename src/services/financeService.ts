import { Income, Expense, FinanceSummary } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class FinanceService {
  getAllIncomes(data: { incomes: Income[] }): Income[] {
    return [...data.incomes].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getAllExpenses(data: { expenses: Expense[] }): Expense[] {
    return [...data.expenses].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  getMonthlyIncome(data: { incomes: Income[] }): number {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return data.incomes
      .filter(i => i.status === 'paid' && new Date(i.paidDate || i.createdAt) >= startOfMonth)
      .reduce((sum, i) => sum + i.amount, 0);
  }

  getMonthlyExpenses(data: { expenses: Expense[] }): number {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return data.expenses
      .filter(e => new Date(e.date) >= startOfMonth)
      .reduce((sum, e) => sum + e.amount, 0);
  }

  getPendingDues(data: { incomes: Income[] }): Income[] {
    return data.incomes.filter(i => i.status === 'pending');
  }

  getPendingDuesTotal(data: { incomes: Income[] }): number {
    return data.incomes
      .filter(i => i.status === 'pending')
      .reduce((sum, i) => sum + i.amount, 0);
  }

  addIncome(data: { incomes: Income[] }, income: Omit<Income, 'id' | 'createdAt'>): Income {
    const newIncome: Income = {
      ...income,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    data.incomes.push(newIncome);
    return newIncome;
  }

  addExpense(data: { expenses: Expense[] }, expense: Omit<Expense, 'id' | 'createdAt'>): Expense {
    const newExpense: Expense = {
      ...expense,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    data.expenses.push(newExpense);
    return newExpense;
  }

  updateIncomeStatus(data: { incomes: Income[] }, id: string, status: 'paid' | 'pending'): Income | undefined {
    const index = data.incomes.findIndex(i => i.id === id);
    if (index === -1) return undefined;
    data.incomes[index] = {
      ...data.incomes[index],
      status,
      paidDate: status === 'paid' ? new Date().toISOString() : undefined,
    };
    return data.incomes[index];
  }

  deleteIncome(data: { incomes: Income[] }, id: string): boolean {
    const index = data.incomes.findIndex(i => i.id === id);
    if (index === -1) return false;
    data.incomes.splice(index, 1);
    return true;
  }

  deleteExpense(data: { expenses: Expense[] }, id: string): boolean {
    const index = data.expenses.findIndex(e => e.id === id);
    if (index === -1) return false;
    data.expenses.splice(index, 1);
    return true;
  }

  getFinanceSummary(data: { incomes: Income[]; expenses: Expense[] }): FinanceSummary {
    const totalIncome = data.incomes
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + i.amount, 0);
    const totalExpenses = data.expenses.reduce((sum, e) => sum + e.amount, 0);
    
    const incomeByMonth: { month: string; income: number; expenses: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthIncome = data.incomes
        .filter(i => {
          const d = new Date(i.paidDate || i.createdAt);
          return i.status === 'paid' && d >= monthStart && d <= monthEnd;
        })
        .reduce((sum, i) => sum + i.amount, 0);
      
      const monthExpenses = data.expenses
        .filter(e => {
          const d = new Date(e.date);
          return d >= monthStart && d <= monthEnd;
        })
        .reduce((sum, e) => sum + e.amount, 0);
      
      incomeByMonth.push({
        month: months[date.getMonth()],
        income: monthIncome,
        expenses: monthExpenses,
      });
    }

    const categoryMap = new Map<string, number>();
    data.expenses.forEach(e => {
      categoryMap.set(e.category, (categoryMap.get(e.category) || 0) + e.amount);
    });
    const expensesByCategory = Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      amount,
    }));

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      incomeByMonth,
      expensesByCategory,
    };
  }
}

export const financeService = new FinanceService();