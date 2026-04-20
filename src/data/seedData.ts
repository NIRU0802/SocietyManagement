import { Flat, Member, Visitor, Complaint, Notice, Vehicle, Income, Expense, Notification } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const today = new Date();
const formatDate = (d: Date) => d.toISOString();
const addDays = (d: Date, days: number) => new Date(d.getTime() + days * 24 * 60 * 60 * 1000);
const subDays = (d: Date, days: number) => new Date(d.getTime() - days * 24 * 60 * 60 * 1000);
const subMonths = (d: Date, months: number) => new Date(d.getFullYear(), d.getMonth() - months, d.getDate());

export const seedFlats: Flat[] = [
  {
    id: uuidv4(),
    flatNumber: 'A-101',
    block: 'A',
    floor: 1,
    type: 'owner',
    ownerName: 'Rajesh Kumar',
    ownerPhone: '9876543210',
    ownerEmail: 'rajesh.kumar@email.com',
    size: '2BHK',
    members: [],
    vehicles: [],
    createdAt: formatDate(subDays(today, 365)),
  },
  {
    id: uuidv4(),
    flatNumber: 'A-102',
    block: 'A',
    floor: 1,
    type: 'tenant',
    ownerName: 'Suresh Patel',
    ownerPhone: '9876543211',
    size: '2BHK',
    members: [],
    vehicles: [],
    createdAt: formatDate(subDays(today, 200)),
  },
  {
    id: uuidv4(),
    flatNumber: 'A-201',
    block: 'A',
    floor: 2,
    type: 'owner',
    ownerName: 'Anita Sharma',
    ownerPhone: '9876543212',
    ownerEmail: 'anita.sharma@email.com',
    size: '3BHK',
    members: [],
    vehicles: [],
    createdAt: formatDate(subDays(today, 300)),
  },
  {
    id: uuidv4(),
    flatNumber: 'A-202',
    block: 'A',
    floor: 2,
    type: 'owner',
    ownerName: 'Mahesh Gupta',
    ownerPhone: '9876543213',
    size: '3BHK',
    members: [],
    vehicles: [],
    createdAt: formatDate(subDays(today, 150)),
  },
  {
    id: uuidv4(),
    flatNumber: 'B-101',
    block: 'B',
    floor: 1,
    type: 'tenant',
    ownerName: 'Vijay Malhotra',
    ownerPhone: '9876543214',
    size: '2BHK',
    members: [],
    vehicles: [],
    createdAt: formatDate(subDays(today, 180)),
  },
  {
    id: uuidv4(),
    flatNumber: 'B-102',
    block: 'B',
    floor: 1,
    type: 'owner',
    ownerName: 'Priya Menon',
    ownerPhone: '9876543215',
    ownerEmail: 'priya.menon@email.com',
    size: '2BHK',
    members: [],
    vehicles: [],
    createdAt: formatDate(subDays(today, 250)),
  },
  {
    id: uuidv4(),
    flatNumber: 'B-201',
    block: 'B',
    floor: 2,
    type: 'owner',
    ownerName: 'Arun Joshi',
    ownerPhone: '9876543216',
    size: '3BHK',
    members: [],
    vehicles: [],
    createdAt: formatDate(subDays(today, 100)),
  },
  {
    id: uuidv4(),
    flatNumber: 'B-202',
    block: 'B',
    floor: 2,
    type: 'tenant',
    ownerName: 'Kiran Rao',
    ownerPhone: '9876543217',
    size: '3BHK',
    members: [],
    vehicles: [],
    createdAt: formatDate(subDays(today, 90)),
  },
];

export const seedMembers: Member[] = [
  { id: uuidv4(), flatId: seedFlats[0].id, name: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh.kumar@email.com', relation: 'owner', isPrimary: true, createdAt: formatDate(subDays(today, 365)) },
  { id: uuidv4(), flatId: seedFlats[0].id, name: 'Sunita Rajesh', phone: '9876543218', relation: 'family', isPrimary: false, createdAt: formatDate(subDays(today, 365)) },
  { id: uuidv4(), flatId: seedFlats[0].id, name: 'Krishna Rajesh', phone: '9876543219', relation: 'family', isPrimary: false, createdAt: formatDate(subDays(today, 350)) },
  { id: uuidv4(), flatId: seedFlats[1].id, name: 'Amit Singh', phone: '9876543220', relation: 'tenant', isPrimary: true, createdAt: formatDate(subDays(today, 200)) },
  { id: uuidv4(), flatId: seedFlats[1].id, name: 'Preeti Singh', phone: '9876543221', relation: 'family', isPrimary: false, createdAt: formatDate(subDays(today, 200)) },
  { id: uuidv4(), flatId: seedFlats[2].id, name: 'Anita Sharma', phone: '9876543212', email: 'anita.sharma@email.com', relation: 'owner', isPrimary: true, createdAt: formatDate(subDays(today, 300)) },
  { id: uuidv4(), flatId: seedFlats[2].id, name: 'Raj Sharma', phone: '9876543222', relation: 'family', isPrimary: false, createdAt: formatDate(subDays(today, 300)) },
  { id: uuidv4(), flatId: seedFlats[3].id, name: 'Mahesh Gupta', phone: '9876543213', relation: 'owner', isPrimary: true, createdAt: formatDate(subDays(today, 150)) },
  { id: uuidv4(), flatId: seedFlats[3].id, name: 'Lakshmi Gupta', phone: '9876543223', relation: 'family', isPrimary: false, createdAt: formatDate(subDays(today, 150)) },
  { id: uuidv4(), flatId: seedFlats[4].id, name: 'Rahul Verma', phone: '9876543224', relation: 'tenant', isPrimary: true, createdAt: formatDate(subDays(today, 180)) },
  { id: uuidv4(), flatId: seedFlats[5].id, name: 'Priya Menon', phone: '9876543215', email: 'priya.menon@email.com', relation: 'owner', isPrimary: true, createdAt: formatDate(subDays(today, 250)) },
  { id: uuidv4(), flatId: seedFlats[5].id, name: 'Dev Menon', phone: '9876543225', relation: 'family', isPrimary: false, createdAt: formatDate(subDays(today, 250)) },
  { id: uuidv4(), flatId: seedFlats[6].id, name: 'Arun Joshi', phone: '9876543216', relation: 'owner', isPrimary: true, createdAt: formatDate(subDays(today, 100)) },
  { id: uuidv4(), flatId: seedFlats[6].id, name: 'Saritha Joshi', phone: '9876543226', relation: 'family', isPrimary: false, createdAt: formatDate(subDays(today, 100)) },
  { id: uuidv4(), flatId: seedFlats[6].id, name: 'Aditya Joshi', phone: '9876543227', relation: 'family', isPrimary: false, createdAt: formatDate(subDays(today, 95)) },
  { id: uuidv4(), flatId: seedFlats[7].id, name: 'Sneha Rao', phone: '9876543228', relation: 'tenant', isPrimary: true, createdAt: formatDate(subDays(today, 90)) },
];

export const seedVehicles: Vehicle[] = [
  { id: uuidv4(), flatId: seedFlats[0].id, flatNumber: 'A-101', vehicleNumber: 'MH-01-AB-1234', type: 'car', brand: 'Honda', model: 'City', color: 'Silver', registeredAt: formatDate(subDays(today, 300)) },
  { id: uuidv4(), flatId: seedFlats[0].id, flatNumber: 'A-101', vehicleNumber: 'MH-01-CD-5678', type: 'bike', brand: 'Hero', model: 'Splendor', color: 'Black', registeredAt: formatDate(subDays(today, 200)) },
  { id: uuidv4(), flatId: seedFlats[2].id, flatNumber: 'A-201', vehicleNumber: 'MH-01-EF-9012', type: 'car', brand: 'Toyota', model: 'Innova', color: 'White', registeredAt: formatDate(subDays(today, 250)) },
  { id: uuidv4(), flatId: seedFlats[3].id, flatNumber: 'A-202', vehicleNumber: 'MH-01-GH-3456', type: 'car', brand: 'Hyundai', model: 'Creta', color: 'Red', registeredAt: formatDate(subDays(today, 100)) },
  { id: uuidv4(), flatId: seedFlats[5].id, flatNumber: 'B-102', vehicleNumber: 'MH-01-IJ-7890', type: 'car', brand: 'Maruti', model: 'Swift', color: 'Blue', registeredAt: formatDate(subDays(today, 180)) },
  { id: uuidv4(), flatId: seedFlats[6].id, flatNumber: 'B-201', vehicleNumber: 'MH-01-KL-1122', type: 'car', brand: 'Kia', model: 'Seltos', color: 'Gray', registeredAt: formatDate(subDays(today, 80)) },
  { id: uuidv4(), flatId: seedFlats[6].id, flatNumber: 'B-201', vehicleNumber: 'MH-01-MN-3344', type: 'bike', brand: 'Bajaj', model: 'Pulsar', color: 'Orange', registeredAt: formatDate(subDays(today, 70)) },
];

export const seedVisitors: Visitor[] = [
  { id: uuidv4(), flatId: seedFlats[0].id, flatNumber: 'A-101', name: 'Amazon Delivery', phone: '9876000001', purpose: 'delivery', vehicleNumber: 'MH-01-PO-1111', vehicleType: 'car', entryTime: formatDate(subDays(today, 0)), status: 'inside', createdAt: formatDate(subDays(today, 0)) },
  { id: uuidv4(), flatId: seedFlats[2].id, flatNumber: 'A-201', name: 'Swiggy Delivery', phone: '9876000002', purpose: 'delivery', entryTime: formatDate(subDays(today, 0)), status: 'inside', createdAt: formatDate(subDays(today, 0)) },
  { id: uuidv4(), flatId: seedFlats[1].id, flatNumber: 'A-102', name: 'Rahul Friend', phone: '9876000003', purpose: 'guest', vehicleNumber: 'MH-01-QR-2222', vehicleType: 'car', entryTime: formatDate(subDays(today, 0)), exitTime: formatDate(new Date(today.getTime() + 2 * 60 * 60 * 1000)), status: 'exited', visitedBy: 'Amit Singh', createdAt: formatDate(subDays(today, 0)) },
  { id: uuidv4(), flatId: seedFlats[3].id, flatNumber: 'A-202', name: 'Zomato Delivery', phone: '9876000004', purpose: 'delivery', entryTime: formatDate(subDays(today, 0)), status: 'inside', createdAt: formatDate(subDays(today, 0)) },
  { id: uuidv4(), flatId: seedFlats[5].id, flatNumber: 'B-102', name: 'Electrician - Raju', phone: '9876000005', purpose: 'service', entryTime: formatDate(subDays(today, 1)), exitTime: formatDate(subDays(today, 1)), status: 'exited', visitedBy: 'Priya Menon', createdAt: formatDate(subDays(today, 1)) },
  { id: uuidv4(), flatId: seedFlats[4].id, flatNumber: 'B-101', name: 'Mumtaz Cousin', phone: '9876000006', purpose: 'guest', vehicleNumber: 'MH-01-ST-3333', vehicleType: 'car', entryTime: formatDate(subDays(today, 1)), exitTime: formatDate(subDays(today, 1)), status: 'exited', visitedBy: 'Rahul Verma', createdAt: formatDate(subDays(today, 1)) },
  { id: uuidv4(), flatId: seedFlats[6].id, flatNumber: 'B-201', name: 'AC Repair Tech', phone: '9876000007', purpose: 'maintenance', entryTime: formatDate(subDays(today, 2)), exitTime: formatDate(subDays(today, 2)), status: 'exited', visitedBy: 'Arun Joshi', createdAt: formatDate(subDays(today, 2)) },
  { id: uuidv4(), flatId: seedFlats[0].id, flatNumber: 'A-101', name: 'Zepto Delivery', phone: '9876000008', purpose: 'delivery', entryTime: formatDate(subDays(today, 2)), status: 'inside', createdAt: formatDate(subDays(today, 2)) },
  { id: uuidv4(), flatId: seedFlats[7].id, flatNumber: 'B-202', name: 'Friend - Sanjay', phone: '9876000009', purpose: 'guest', entryTime: formatDate(subDays(today, 3)), exitTime: formatDate(subDays(today, 3)), status: 'exited', visitedBy: 'Sneha Rao', createdAt: formatDate(subDays(today, 3)) },
  { id: uuidv4(), flatId: seedFlats[2].id, flatNumber: 'A-201', name: 'Packers & Movers', phone: '9876000010', purpose: 'service', vehicleNumber: 'MH-01-UV-4444', vehicleType: 'car', entryTime: formatDate(subDays(today, 5)), exitTime: formatDate(subDays(today, 5)), status: 'exited', visitedBy: 'Anita Sharma', createdAt: formatDate(subDays(today, 5)) },
  { id: uuidv4(), flatId: seedFlats[4].id, flatNumber: 'B-101', name: 'Dominos Delivery', phone: '9876000011', purpose: 'delivery', entryTime: formatDate(subDays(today, 7)), exitTime: formatDate(subDays(today, 7)), status: 'exited', visitedBy: 'Rahul Verma', createdAt: formatDate(subDays(today, 7)) },
  { id: uuidv4(), flatId: seedFlats[3].id, flatNumber: 'A-202', name: 'Plumber - Kali', phone: '9876000012', purpose: 'maintenance', entryTime: formatDate(subDays(today, 10)), exitTime: formatDate(subDays(today, 10)), status: 'exited', visitedBy: 'Mahesh Gupta', createdAt: formatDate(subDays(today, 10)) },
];

export const seedComplaints: Complaint[] = [
  { id: uuidv4(), flatId: seedFlats[0].id, flatNumber: 'A-101', category: 'maintenance', description: 'Water leakage in bathroom ceiling. Need immediate repair as it\'s affecting the flat below.', priority: 'high', status: 'in_progress', assignedTo: 'Maintenance Team', createdAt: formatDate(subDays(today, 5)), updatedAt: formatDate(subDays(today, 3)) },
  { id: uuidv4(), flatId: seedFlats[2].id, flatNumber: 'A-201', category: 'noise', description: 'Loud music playing after 10 PM on weekends. Disturbing the peace.', priority: 'medium', status: 'open', createdAt: formatDate(subDays(today, 2)), updatedAt: formatDate(subDays(today, 2)) },
  { id: uuidv4(), flatId: seedFlats[4].id, flatNumber: 'B-101', category: 'parking', description: 'Car parked in front of my flat without permission. Please remove it.', priority: 'low', status: 'resolved', assignedTo: 'Security', resolvedAt: formatDate(subDays(today, 3)), createdAt: formatDate(subDays(today, 10)), updatedAt: formatDate(subDays(today, 3)) },
  { id: uuidv4(), flatId: seedFlats[5].id, flatNumber: 'B-102', category: 'security', description: 'Gate intercom not working. Unable to communicate with visitors.', priority: 'high', status: 'open', createdAt: formatDate(subDays(today, 1)), updatedAt: formatDate(subDays(today, 1)) },
  { id: uuidv4(), flatId: seedFlats[6].id, flatNumber: 'B-201', category: 'maintenance', description: 'Lift not working properly. Getting stuck between floors.', priority: 'high', status: 'in_progress', assignedTo: 'Elevator Company', createdAt: formatDate(subDays(today, 7)), updatedAt: formatDate(subDays(today, 4)) },
  { id: uuidv4(), flatId: seedFlats[3].id, flatNumber: 'A-202', category: 'other', description: 'Stray dogs in the parking area. Safety concern for children.', priority: 'medium', status: 'closed', assignedTo: 'Security', resolvedAt: formatDate(subDays(today, 15)), createdAt: formatDate(subDays(today, 20)), updatedAt: formatDate(subDays(today, 15)) },
];

export const seedNotices: Notice[] = [
  { id: uuidv4(), title: 'Annual General Meeting', content: 'Dear Residents,\n\nWe cordially invite you to the Annual General Meeting scheduled for 25th April 2026 at 4:00 PM in the Community Hall.\n\nAgenda:\n1. Financial Report\n2. Maintenance Charges Review\n3. Election of New Committee Members\n4. Any Other Business\n\nPlease attend on time. Refreshments will be provided.\n\nRegards,\nSociety Management Committee', priority: 'high', postedBy: 'Admin', createdAt: formatDate(subDays(today, 5)), validUntil: formatDate(addDays(today, 10)) },
  { id: uuidv4(), title: 'Water Supply Maintenance', content: 'Please be informed that water supply will be temporarily interrupted on 20th April 2026 from 9:00 AM to 2:00 PM for maintenance work.\n\nPlease store adequate water during this period.\n\nSorry for the inconvenience.\n\n- Maintenance Team', priority: 'medium', postedBy: 'Maintenance', createdAt: formatDate(subDays(today, 3)), validUntil: formatDate(addDays(today, 1)) },
  { id: uuidv4(), title: 'New Security Protocol', content: 'From 1st May 2026, all visitors must register at the security gate. No unverified visitors will be allowed inside the premises.\n\nVehicle stickers will be issued to all residents. Please collect from the security office.\n\n- Security Team', priority: 'high', postedBy: 'Security', createdAt: formatDate(subDays(today, 10)), validUntil: formatDate(addDays(today, 20)) },
  { id: uuidv4(), title: 'Parking Rules Update', content: 'New parking rules effective from 15th April 2026:\n- 2-wheelers: Rs. 500/year\n- 4-wheelers: Rs. 1000/year\n- Guest parking: Rs. 50/visit\n\nPlease renew your parking passes at the earliest.\n\n- Committee', priority: 'low', postedBy: 'Admin', createdAt: formatDate(subDays(today, 15)), validUntil: formatDate(addDays(today, 15)) },
];

export const seedIncomes: Income[] = [
  { id: uuidv4(), flatId: seedFlats[0].id, flatNumber: 'A-101', type: 'maintenance', amount: 8500, description: 'April 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 5)), createdAt: formatDate(subDays(today, 30)) },
  { id: uuidv4(), flatId: seedFlats[1].id, flatNumber: 'A-102', type: 'maintenance', amount: 7500, description: 'April 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 10)), createdAt: formatDate(subDays(today, 30)) },
  { id: uuidv4(), flatId: seedFlats[2].id, flatNumber: 'A-201', type: 'maintenance', amount: 10500, description: 'April 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 2)), createdAt: formatDate(subDays(today, 30)) },
  { id: uuidv4(), flatId: seedFlats[3].id, flatNumber: 'A-202', type: 'maintenance', amount: 10500, description: 'April 2026 Maintenance', status: 'pending', dueDate: formatDate(addDays(today, 5)), createdAt: formatDate(subDays(today, 30)) },
  { id: uuidv4(), flatId: seedFlats[4].id, flatNumber: 'B-101', type: 'maintenance', amount: 7500, description: 'April 2026 Maintenance', status: 'pending', dueDate: formatDate(addDays(today, 5)), createdAt: formatDate(subDays(today, 30)) },
  { id: uuidv4(), flatId: seedFlats[5].id, flatNumber: 'B-102', type: 'maintenance', amount: 8500, description: 'April 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 1)), createdAt: formatDate(subDays(today, 30)) },
  { id: uuidv4(), flatId: seedFlats[6].id, flatNumber: 'B-201', type: 'maintenance', amount: 10500, description: 'April 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 3)), createdAt: formatDate(subDays(today, 30)) },
  { id: uuidv4(), flatId: seedFlats[7].id, flatNumber: 'B-202', type: 'maintenance', amount: 9500, description: 'April 2026 Maintenance', status: 'pending', dueDate: formatDate(addDays(today, 5)), createdAt: formatDate(subDays(today, 30)) },
  { id: uuidv4(), flatId: seedFlats[0].id, flatNumber: 'A-101', type: 'parking', amount: 1000, description: 'Car Parking - April', status: 'paid', paidDate: formatDate(subDays(today, 5)), createdAt: formatDate(subDays(today, 5)) },
  { id: uuidv4(), flatId: seedFlats[2].id, flatNumber: 'A-201', type: 'parking', amount: 1000, description: 'Car Parking - April', status: 'paid', paidDate: formatDate(subDays(today, 2)), createdAt: formatDate(subDays(today, 5)) },
  { id: uuidv4(), flatId: seedFlats[5].id, flatNumber: 'B-102', type: 'parking', amount: 500, description: 'Bike Parking - April', status: 'paid', paidDate: formatDate(subDays(today, 1)), createdAt: formatDate(subDays(today, 5)) },
  { id: uuidv4(), type: 'other', amount: 15000, description: 'Clubhouse Rental - March Event', status: 'paid', paidDate: formatDate(subDays(today, 20)), createdAt: formatDate(subDays(today, 20)) },
  { id: uuidv4(), type: 'other', amount: 5000, description: 'Laundry Service Commission', status: 'paid', paidDate: formatDate(subDays(today, 25)), createdAt: formatDate(subDays(today, 25)) },
  { id: uuidv4(), flatId: seedFlats[0].id, flatNumber: 'A-101', type: 'maintenance', amount: 8500, description: 'March 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 35)), createdAt: formatDate(subDays(today, 60)) },
  { id: uuidv4(), flatId: seedFlats[1].id, flatNumber: 'A-102', type: 'maintenance', amount: 7500, description: 'March 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 38)), createdAt: formatDate(subDays(today, 60)) },
  { id: uuidv4(), flatId: seedFlats[2].id, flatNumber: 'A-201', type: 'maintenance', amount: 10500, description: 'March 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 30)), createdAt: formatDate(subDays(today, 60)) },
  { id: uuidv4(), flatId: seedFlats[3].id, flatNumber: 'A-202', type: 'maintenance', amount: 10500, description: 'March 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 32)), createdAt: formatDate(subDays(today, 60)) },
  { id: uuidv4(), flatId: seedFlats[4].id, flatNumber: 'B-101', type: 'maintenance', amount: 7500, description: 'March 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 40)), createdAt: formatDate(subDays(today, 60)) },
  { id: uuidv4(), flatId: seedFlats[5].id, flatNumber: 'B-102', type: 'maintenance', amount: 8500, description: 'March 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 35)), createdAt: formatDate(subDays(today, 60)) },
  { id: uuidv4(), flatId: seedFlats[6].id, flatNumber: 'B-201', type: 'maintenance', amount: 10500, description: 'March 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 33)), createdAt: formatDate(subDays(today, 60)) },
  { id: uuidv4(), flatId: seedFlats[7].id, flatNumber: 'B-202', type: 'maintenance', amount: 9500, description: 'March 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 36)), createdAt: formatDate(subDays(today, 60)) },
  { id: uuidv4(), flatId: seedFlats[0].id, flatNumber: 'A-101', type: 'maintenance', amount: 8500, description: 'February 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 65)), createdAt: formatDate(subDays(today, 90)) },
  { id: uuidv4(), flatId: seedFlats[1].id, flatNumber: 'A-102', type: 'maintenance', amount: 7500, description: 'February 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 68)), createdAt: formatDate(subDays(today, 90)) },
  { id: uuidv4(), flatId: seedFlats[2].id, flatNumber: 'A-201', type: 'maintenance', amount: 10500, description: 'February 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 60)), createdAt: formatDate(subDays(today, 90)) },
  { id: uuidv4(), flatId: seedFlats[3].id, flatNumber: 'A-202', type: 'maintenance', amount: 10500, description: 'February 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 62)), createdAt: formatDate(subDays(today, 90)) },
  { id: uuidv4(), flatId: seedFlats[4].id, flatNumber: 'B-101', type: 'maintenance', amount: 7500, description: 'February 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 70)), createdAt: formatDate(subDays(today, 90)) },
  { id: uuidv4(), flatId: seedFlats[5].id, flatNumber: 'B-102', type: 'maintenance', amount: 8500, description: 'February 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 65)), createdAt: formatDate(subDays(today, 90)) },
  { id: uuidv4(), flatId: seedFlats[6].id, flatNumber: 'B-201', type: 'maintenance', amount: 10500, description: 'February 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 63)), createdAt: formatDate(subDays(today, 90)) },
  { id: uuidv4(), flatId: seedFlats[7].id, flatNumber: 'B-202', type: 'maintenance', amount: 9500, description: 'February 2026 Maintenance', status: 'paid', paidDate: formatDate(subDays(today, 66)), createdAt: formatDate(subDays(today, 90)) },
];

export const seedExpenses: Expense[] = [
  { id: uuidv4(), category: 'electricity', amount: 45000, description: 'Monthly Electricity Bill - March', date: formatDate(subDays(today, 5)), createdAt: formatDate(subDays(today, 5)) },
  { id: uuidv4(), category: 'water', amount: 15000, description: 'Water Supply & Maintenance', date: formatDate(subDays(today, 10)), createdAt: formatDate(subDays(today, 10)) },
  { id: uuidv4(), category: 'security', amount: 85000, description: 'Security Staff Salary - March', date: formatDate(subDays(today, 1)), createdAt: formatDate(subDays(today, 1)) },
  { id: uuidv4(), category: 'maintenance', amount: 25000, description: 'Common Area Cleaning', date: formatDate(subDays(today, 15)), createdAt: formatDate(subDays(today, 15)) },
  { id: uuidv4(), category: 'salary', amount: 35000, description: 'Administrative Staff Salary - March', date: formatDate(subDays(today, 1)), createdAt: formatDate(subDays(today, 1)) },
  { id: uuidv4(), category: 'repair', amount: 18000, description: 'Lift Maintenance Contract', date: formatDate(subDays(today, 20)), createdAt: formatDate(subDays(today, 20)) },
  { id: uuidv4(), category: 'repair', amount: 8500, description: 'Park & Garden Maintenance', date: formatDate(subDays(today, 12)), createdAt: formatDate(subDays(today, 12)) },
  { id: uuidv4(), category: 'other', amount: 12000, description: 'Insurance Premium', date: formatDate(subDays(today, 25)), createdAt: formatDate(subDays(today, 25)) },
  { id: uuidv4(), category: 'electricity', amount: 42000, description: 'Monthly Electricity Bill - February', date: formatDate(subDays(today, 35)), createdAt: formatDate(subDays(today, 35)) },
  { id: uuidv4(), category: 'water', amount: 14000, description: 'Water Supply - February', date: formatDate(subDays(today, 40)), createdAt: formatDate(subDays(today, 40)) },
  { id: uuidv4(), category: 'security', amount: 85000, description: 'Security Staff Salary - February', date: formatDate(subDays(today, 31)), createdAt: formatDate(subDays(today, 31)) },
  { id: uuidv4(), category: 'salary', amount: 35000, description: 'Administrative Staff Salary - February', date: formatDate(subDays(today, 31)), createdAt: formatDate(subDays(today, 31)) },
  { id: uuidv4(), category: 'maintenance', amount: 22000, description: 'Common Area Cleaning - February', date: formatDate(subDays(today, 45)), createdAt: formatDate(subDays(today, 45)) },
  { id: uuidv4(), category: 'repair', amount: 35000, description: 'Parking Area Repairs', date: formatDate(subDays(today, 50)), createdAt: formatDate(subDays(today, 50)) },
  { id: uuidv4(), category: 'electricity', amount: 38000, description: 'Monthly Electricity Bill - January', date: formatDate(subDays(today, 65)), createdAt: formatDate(subDays(today, 65)) },
  { id: uuidv4(), category: 'water', amount: 13000, description: 'Water Supply - January', date: formatDate(subDays(today, 70)), createdAt: formatDate(subDays(today, 70)) },
  { id: uuidv4(), category: 'security', amount: 80000, description: 'Security Staff Salary - January', date: formatDate(subDays(today, 61)), createdAt: formatDate(subDays(today, 61)) },
  { id: uuidv4(), category: 'salary', amount: 32000, description: 'Administrative Staff Salary - January', date: formatDate(subDays(today, 61)), createdAt: formatDate(subDays(today, 61)) },
  { id: uuidv4(), category: 'maintenance', amount: 20000, description: 'Common Area Cleaning - January', date: formatDate(subDays(today, 75)), createdAt: formatDate(subDays(today, 75)) },
  { id: uuidv4(), category: 'other', amount: 25000, description: 'Festival Decorations', date: formatDate(subDays(today, 80)), createdAt: formatDate(subDays(today, 80)) },
];

export const seedNotifications: Notification[] = [
  { id: uuidv4(), type: 'visitor', title: 'Visitor Arrived', message: 'Amazon Delivery has arrived at A-101', read: false, data: { visitorId: seedVisitors[0].id }, createdAt: formatDate(subDays(today, 0)) },
  { id: uuidv4(), type: 'visitor', title: 'Visitor Arrived', message: 'Swiggy Delivery has arrived at A-201', read: false, data: { visitorId: seedVisitors[1].id }, createdAt: formatDate(subDays(today, 0)) },
  { id: uuidv4(), type: 'visitor', title: 'Visitor Arrived', message: 'Zomato Delivery has arrived at A-202', read: false, data: { visitorId: seedVisitors[3].id }, createdAt: formatDate(subDays(today, 0)) },
  { id: uuidv4(), type: 'payment', title: 'Payment Received', message: 'Maintenance payment of Rs. 10,500 received from A-201', read: false, data: { flatId: seedFlats[2].id }, createdAt: formatDate(subDays(today, 2)) },
  { id: uuidv4(), type: 'complaint', title: 'New Complaint', message: 'New complaint registered from B-102 (Security)', read: false, data: { complaintId: seedComplaints[3].id }, createdAt: formatDate(subDays(today, 1)) },
  { id: uuidv4(), type: 'notice', title: 'New Notice', message: 'Annual General Meeting notice published', read: true, data: { noticeId: seedNotices[0].id }, createdAt: formatDate(subDays(today, 5)) },
  { id: uuidv4(), type: 'visitor', title: 'Visitor Exited', message: 'Rahul Friend has exited from A-102', read: true, data: { visitorId: seedVisitors[2].id }, createdAt: formatDate(subDays(today, 0)) },
  { id: uuidv4(), type: 'payment', title: 'Payment Received', message: 'Parking fee of Rs. 1,000 received from A-101', read: true, data: { flatId: seedFlats[0].id }, createdAt: formatDate(subDays(today, 5)) },
];

const STORAGE_KEY = 'societyHubData';

export function getInitialData() {
  const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    flats: seedFlats,
    members: seedMembers,
    visitors: seedVisitors,
    complaints: seedComplaints,
    notices: seedNotices,
    vehicles: seedVehicles,
    incomes: seedIncomes,
    expenses: seedExpenses,
    notifications: seedNotifications,
  };
}

export function saveData(data: { flats: unknown[]; members: unknown[]; visitors: unknown[]; complaints: unknown[]; notices: unknown[]; vehicles: unknown[]; incomes: unknown[]; expenses: unknown[]; notifications: unknown[] }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}