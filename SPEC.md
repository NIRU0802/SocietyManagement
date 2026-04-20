# Society Management System - Specification Document

## 1. Project Overview

**Project Name:** SocietyHub - Society Management System  
**Project Type:** Web Application (PWA)  
**Core Functionality:** A comprehensive society management system for residential complexes with visitor management, flat/member tracking, finance management, complaints, and notifications.  
**Target Users:** Society administrators, residents, security guards

---

## 2. UI/UX Specification

### Layout Structure

**App Shell:**
- Collapsible sidebar navigation (280px expanded, 72px collapsed)
- Top header bar with search, notifications, and user profile
- Main content area with responsive padding

**Responsive Breakpoints:**
- Mobile: < 640px (single column, bottom nav)
- Tablet: 640px - 1024px (collapsible sidebar)
- Desktop: > 1024px (full sidebar)

### Visual Design

**Color Palette:**
- Primary: `#1E40AF` (Deep Blue)
- Primary Light: `#3B82F6` (Blue)
- Secondary: `#0F766E` (Teal)
- Accent: `#F59E0B` (Amber)
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Amber)
- Error: `#EF4444` (Red)
- Background: `#F8FAFC` (Slate 50)
- Surface: `#FFFFFF` (White)
- Text Primary: `#1E293B` (Slate 800)
- Text Secondary: `#64748B` (Slate 500)
- Border: `#E2E8F0` (Slate 200)

**Typography:**
- Font Family: Inter (Google Font)
- Headings: 
  - H1: 28px, 700 weight
  - H2: 24px, 600 weight
  - H3: 20px, 600 weight
  - H4: 16px, 600 weight
- Body: 14px, 400 weight
- Small: 12px, 400 weight

**Spacing System:**
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Visual Effects:**
- Card shadows: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`
- Elevated shadows: `0 10px 15px -3px rgba(0,0,0,0.1)`
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)
- Transitions: 200ms ease-out

### Components

**Navigation:**
- Sidebar with icons and labels
- Active state: primary color background with white text
- Hover state: light primary background

**Cards:**
- White background, subtle shadow
- 24px padding
- 8px border radius

**Buttons:**
- Primary: Solid primary color, white text
- Secondary: Outlined, primary color border
- Size: 40px height minimum (touch-friendly)
- States: hover (darken 10%), active (darken 15%), disabled (50% opacity)

**Forms:**
- Input height: 48px (mobile-friendly)
- Labels above inputs
- Error states with red border and helper text

**Data Tables:**
- Zebra striping
- Sortable columns
- Pagination

**Charts:**
- Recharts library
- Consistent color scheme matching palette

---

## 3. Functionality Specification

### Core Features

#### 3.1 Dashboard
- **Overview Cards:**
  - Total Visitors (today)
  - Monthly Income (amount)
  - Monthly Expenses (amount)
  - Pending Dues (count + amount)
- **Charts:**
  - Income vs Expense (line chart, last 6 months)
  - Expense by Category (pie chart)
- **Quick Actions:**
  - Add Visitor
  - Raise Complaint
  - Add Payment

#### 3.2 Flat & Member Management
- **Flats List:**
  - Building/Block selector
  - Flat number, floor, ownership type
  - Owner name, phone
  - Member count badge
- **Flat Details:**
  - All members linked to flat
  - Vehicles owned
  - Payment history
  - Complaints

#### 3.3 Visitor Management
- **Add Visitor Form:**
  - Visitor name, phone
  - Flat selection (autocomplete)
  - Purpose dropdown (Delivery, Guest, Service, Maintenance)
  - Vehicle details (optional)
- **Visitor Log:**
  - Filter by date range, flat, type
  - Entry time, exit time
  - Status badge (Inside/Exited)
- **Quick Check-in:**
  - QR scan simulation
  - One-tap check-in

#### 3.4 Notifications
- **Notification Types:**
  - Visitor arrival alerts
  - Payment received
  - Complaint status update
  - Notice published
- **Actions:**
  - Mark as read
  - Dismiss
  - Quick approve/reject

#### 3.5 Complaints System
- **Raise Complaint:**
  - Category (Maintenance, Noise, Parking, Security, Other)
  - Description
  - Priority (Low, Medium, High)
  - Flat selection
- **Complaint List:**
  - Status (Open, In Progress, Resolved, Closed)
  - Assigned to
  - Timeline

#### 3.6 Notice Board
- **Notice List:**
  - Title, content preview
  - Posted date
  - Priority badge
  - Posted by
- **Notice Detail:**
  - Full content
  - Attachments (if any)

#### 3.7 Vehicle Management
- **Vehicle List:**
  - Vehicle number, type
  - Flat association
  - Owner name
  - Registration status

#### 3.8 Finance & Accounting
- **Income Tracking:**
  - Type (Maintenance, Parking, Rent, Other)
  - Amount, date
  - Flat reference
  - Status (Paid/Pending)
- **Expense Tracking:**
  - Category (Electricity, Water, Maintenance, Salary, Security, Other)
  - Amount, date
  - Vendor
  - Description
- **Dashboard:**
  - Monthly comparison chart
  - Category breakdown
  - Balance summary
- **Pending Dues:**
  - Flat-wise list
  - Amount due
  - Due date

### Data Handling

**Mock Data Layer:**
- JSON-based seed data
- Service classes for data operations
- LocalStorage for persistence in demo
- In-memory state management with React Context

**Data Flow:**
- Services → Context → Components
- Optimistic updates for instant feedback
- Error handling with user-friendly messages

### Edge Cases
- Empty states with helpful messages
- Loading states with skeletons
- Form validation with inline errors
- Confirmation dialogs for destructive actions

---

## 4. PWA Requirements

**Manifest:**
- App name: SocietyHub
- Theme color: #1E40AF
- Background color: #F8FAFC
- Display: standalone
- Icons: 192x192, 512x512

**Service Worker:**
- Cache-first strategy for static assets
- Network-first for API calls (when real backend)
- Offline fallback page

**Installation:**
- iOS meta tags
- Android manifest link

---

## 5. Demo Data

### Flats
- A-101, A-102, A-201, A-202
- B-101, B-102, B-201, B-202

### Members
- 2-3 members per flat
- Mix of owners and tenants

### Visitors
- 10+ recent visitors
- Mix of delivery, guests, services
- Some inside, some exited

### Finances
- 6 months of income data
- Multiple expense categories
- Some pending dues

### Complaints
- 5+ complaints in various states

### Notices
- 3-4 active notices

---

## 6. Acceptance Criteria

1. ✅ All pages load without errors
2. ✅ Navigation works on all screen sizes
3. ✅ All forms validate input
4. ✅ Data persists across page refreshes
5. ✅ Charts display correctly
6. ✅ PWA installable on mobile
7. ✅ Offline mode shows cached content
8. ✅ Notifications appear for key actions
9. ✅ Responsive on mobile devices
10. ✅ No horizontal scroll on mobile