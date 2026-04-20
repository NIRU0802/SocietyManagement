import { Complaint } from '@/types';
import { v4 as uuidv4 } from 'uuid';

class ComplaintService {
  getAllComplaints(data: { complaints: Complaint[] }): Complaint[] {
    return [...data.complaints].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getComplaintById(data: { complaints: Complaint[] }, id: string): Complaint | undefined {
    return data.complaints.find(c => c.id === id);
  }

  getComplaintsByFlat(data: { complaints: Complaint[] }, flatId: string): Complaint[] {
    return data.complaints.filter(c => c.flatId === flatId);
  }

  getComplaintsByStatus(data: { complaints: Complaint[] }, status: Complaint['status']): Complaint[] {
    return data.complaints.filter(c => c.status === status);
  }

  addComplaint(data: { complaints: Complaint[] }, complaint: Omit<Complaint, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Complaint {
    const newComplaint: Complaint = {
      ...complaint,
      id: uuidv4(),
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.complaints.push(newComplaint);
    return newComplaint;
  }

  updateComplaintStatus(data: { complaints: Complaint[] }, id: string, status: Complaint['status']): Complaint | undefined {
    const index = data.complaints.findIndex(c => c.id === id);
    if (index === -1) return undefined;
    data.complaints[index] = {
      ...data.complaints[index],
      status,
      updatedAt: new Date().toISOString(),
      resolvedAt: status === 'resolved' || status === 'closed' ? new Date().toISOString() : undefined,
    };
    return data.complaints[index];
  }

  assignComplaint(data: { complaints: Complaint[] }, id: string, assignedTo: string): Complaint | undefined {
    const index = data.complaints.findIndex(c => c.id === id);
    if (index === -1) return undefined;
    data.complaints[index] = {
      ...data.complaints[index],
      assignedTo,
      updatedAt: new Date().toISOString(),
    };
    return data.complaints[index];
  }

  deleteComplaint(data: { complaints: Complaint[] }, id: string): boolean {
    const index = data.complaints.findIndex(c => c.id === id);
    if (index === -1) return false;
    data.complaints.splice(index, 1);
    return true;
  }
}

export const complaintService = new ComplaintService();