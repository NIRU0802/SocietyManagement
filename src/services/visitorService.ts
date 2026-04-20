import { Visitor } from '@/types';
import { v4 as uuidv4 } from 'uuid';

class VisitorService {
  getAllVisitors(data: { visitors: Visitor[] }): Visitor[] {
    return [...data.visitors].sort((a, b) => 
      new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime()
    );
  }

  getVisitorsToday(data: { visitors: Visitor[] }): Visitor[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return data.visitors.filter(v => new Date(v.entryTime) >= today);
  }

  getVisitorsInside(data: { visitors: Visitor[] }): Visitor[] {
    return data.visitors.filter(v => v.status === 'inside');
  }

  getVisitorById(data: { visitors: Visitor[] }, id: string): Visitor | undefined {
    return data.visitors.find(v => v.id === id);
  }

  addVisitor(data: { visitors: Visitor[] }, visitor: Omit<Visitor, 'id' | 'createdAt' | 'entryTime' | 'status'>): Visitor {
    const newVisitor: Visitor = {
      ...visitor,
      id: uuidv4(),
      entryTime: new Date().toISOString(),
      status: 'inside',
      createdAt: new Date().toISOString(),
    };
    data.visitors.push(newVisitor);
    return newVisitor;
  }

  checkOutVisitor(data: { visitors: Visitor[] }, id: string): Visitor | undefined {
    const index = data.visitors.findIndex(v => v.id === id);
    if (index === -1) return undefined;
    const updatedVisitor = {
      ...data.visitors[index],
      exitTime: new Date().toISOString(),
      status: 'exited' as const,
    };
    const newVisitors = [...data.visitors];
    newVisitors[index] = updatedVisitor;
    data.visitors = newVisitors;
    return updatedVisitor;
  }

  deleteVisitor(data: { visitors: Visitor[] }, id: string): boolean {
    const index = data.visitors.findIndex(v => v.id === id);
    if (index === -1) return false;
    data.visitors.splice(index, 1);
    return true;
  }

  getVisitorsByFlat(data: { visitors: Visitor[] }, flatId: string): Visitor[] {
    return data.visitors.filter(v => v.flatId === flatId);
  }
}

export const visitorService = new VisitorService();