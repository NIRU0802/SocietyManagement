import { Flat, Member, Vehicle } from '@/types';
import { v4 as uuidv4 } from 'uuid';

class FlatService {
  getAllFlats(data: { flats: Flat[]; members: Member[]; vehicles: Vehicle[] }): Flat[] {
    return data.flats.map(flat => ({
      ...flat,
      members: data.members.filter(m => m.flatId === flat.id),
      vehicles: data.vehicles.filter(v => v.flatId === flat.id),
    }));
  }

  getFlatById(data: { flats: Flat[]; members: Member[]; vehicles: Vehicle[] }, id: string): Flat | undefined {
    const flat = data.flats.find(f => f.id === id);
    if (!flat) return undefined;
    return {
      ...flat,
      members: data.members.filter(m => m.flatId === flat.id),
      vehicles: data.vehicles.filter(v => v.flatId === flat.id),
    };
  }

  addFlat(data: { flats: Flat[] }, flat: Omit<Flat, 'id' | 'members' | 'vehicles' | 'createdAt'>): Flat {
    const newFlat: Flat = {
      ...flat,
      id: uuidv4(),
      members: [],
      vehicles: [],
      createdAt: new Date().toISOString(),
    };
    data.flats.push(newFlat);
    return newFlat;
  }

  updateFlat(data: { flats: Flat[] }, id: string, updates: Partial<Flat>): Flat | undefined {
    const index = data.flats.findIndex(f => f.id === id);
    if (index === -1) return undefined;
    data.flats[index] = { ...data.flats[index], ...updates };
    return data.flats[index];
  }

  deleteFlat(data: { flats: Flat[] }, id: string): boolean {
    const index = data.flats.findIndex(f => f.id === id);
    if (index === -1) return false;
    data.flats.splice(index, 1);
    return true;
  }

  getAllMembers(data: { members: Member[] }): Member[] {
    return data.members;
  }

  getMembersByFlat(data: { members: Member[] }, flatId: string): Member[] {
    return data.members.filter(m => m.flatId === flatId);
  }

  addMember(data: { members: Member[] }, member: Omit<Member, 'id' | 'createdAt'>): Member {
    const newMember: Member = {
      ...member,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    data.members.push(newMember);
    return newMember;
  }

  updateMember(data: { members: Member[] }, id: string, updates: Partial<Member>): Member | undefined {
    const index = data.members.findIndex(m => m.id === id);
    if (index === -1) return undefined;
    data.members[index] = { ...data.members[index], ...updates };
    return data.members[index];
  }

  deleteMember(data: { members: Member[] }, id: string): boolean {
    const index = data.members.findIndex(m => m.id === id);
    if (index === -1) return false;
    data.members.splice(index, 1);
    return true;
  }

  getAllVehicles(data: { vehicles: Vehicle[] }): Vehicle[] {
    return data.vehicles;
  }

  addVehicle(data: { vehicles: Vehicle[] }, vehicle: Omit<Vehicle, 'id' | 'registeredAt'>): Vehicle {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: uuidv4(),
      registeredAt: new Date().toISOString(),
    };
    data.vehicles.push(newVehicle);
    return newVehicle;
  }

  deleteVehicle(data: { vehicles: Vehicle[] }, id: string): boolean {
    const index = data.vehicles.findIndex(v => v.id === id);
    if (index === -1) return false;
    data.vehicles.splice(index, 1);
    return true;
  }
}

export const flatService = new FlatService();