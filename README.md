# Society Management System

A modern web application for managing residential society operations, built with Next.js, React, and Material-UI.

![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-black?style=flat&logo=react)
![Material-UI](https://img.shields.io/badge/MUI-9.0.0-black?style=flat&logo=mui)

## Features

- **Dashboard** - Overview of society statistics and recent activities
- **Flats Management** - Manage residential units and resident information
- **Complaints** - Track and resolve resident complaints
- **Notices** - Post and view society announcements
- **Finance** - Track maintenance bills and payments
- **Vehicles** - Manage registered vehicles and parking
- **Visitors** - Log and track visitor entries

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI Framework**: Material-UI (MUI) v9
- **Charts**: Recharts
- **Date Handling**: date-fns
- **PWA**: Service Worker support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/NIRU0802/SocietyManagement.git

# Navigate to project directory
cd SocietyManagement

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
society-management/
├── public/                  # Static assets
│   ├── manifest.json       # PWA manifest
│   └── icon-192.svg       # App icon
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── complaints/   # Complaints module
│   │   ├── dashboard/    # Dashboard module
│   │   ├── finance/      # Finance module
│   │   ├── flats/        # Flats management
│   │   ├── notices/      # Notices module
│   │   ├── vehicles/     # Vehicles module
│   │   ├── visitors/     # Visitors module
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable components
│   ├── context/          # React Context providers
│   ├── data/             # Seed data
│   ├── services/         # Business logic
│   ├── theme.ts          # MUI theme configuration
│   └── types/            # TypeScript definitions
├── package.json
├── tsconfig.json
└── README.md
```

## License

MIT License