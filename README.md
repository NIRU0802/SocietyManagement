<div align="center">

# Society Management System

A modern web application for managing residential society operations.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-black?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-black?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Material-UI](https://img.shields.io/badge/MUI-9.0.0-black?style=for-the-badge&logo=mui)](https://mui.com)

</div>

---

## Features

| Module | Description |
|--------|-------------|
| 🏠 **Dashboard** | Overview of society statistics, charts & recent activities |
| 🏢 **Flats Management** | Manage residential units & resident information |
| 📝 **Complaints** | Track & resolve resident complaints |
| 📢 **Notices** | Post & view society announcements |
| 💰 **Finance** | Track maintenance bills & payments |
| 🚗 **Vehicles** | Manage registered vehicles & parking |
| 👥 **Visitors** | Log & track visitor entries |

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| npm | 9+ |

---

## Quick Setup

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

> 🌐 Open **http://localhost:3000** in your browser

### Production Build

```bash
npm run build    # Build for production
npm run start   # Start production server
```

---

## Tech Stack

### Frontend
| | |
|--|--|
| ![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?logo=next.js) | **Next.js 16** - App Router Framework |
| ![React](https://img.shields.io/badge/React-19.2.4-black?logo=react) | **React 19** - UI Library |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5-black?logo=typescript) | **TypeScript** - Language |
| ![Material-UI](https://img.shields.io/badge/MUI-9.0.0-black?logo=mui) | **Material-UI v9** - Component Library |

### Libraries
| | |
|--|--|
| ![Recharts](https://img.shields.io/badge/Recharts-3.8.1-black) | **Recharts** - Charts |
| ![date-fns](https://img.shields.io/badge/date--fns-4.1.0-black) | **date-fns** - Date Handling |
| ![Tailwind](https://img.shields.io/badge/Tailwind--4-black) | **Tailwind CSS** - Styling |
| ![PWA](https://img.shields.io/badge/PWA-Support-black) | **Service Worker** - PWA Support |

---

## Project Structure

```
society-management/
├── public/                  # Static assets
│   ├── manifest.json       # PWA manifest
│   └── icon-192.svg       # App icon
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── complaints/   # 📝 Complaints module
│   │   ├── dashboard/    # 🏠 Dashboard module
│   │   ├── finance/      # 💰 Finance module
│   │   ├── flats/        # 🏢 Flats management
│   │   ├── notices/      # 📢 Notices module
│   │   ├── vehicles/     # 🚗 Vehicles module
│   │   ├── visitors/     # 👥 Visitors module
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # 📦 Reusable components
│   ├── context/         # React Context providers
│   ├── data/            # Seed data
│   ├── services/        # Business logic
│   ├── theme.ts         # MUI theme configuration
│   └── types/           # TypeScript definitions
├── package.json
├── tsconfig.json
└── README.md
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

[MIT](LICENSE)

---

<div align="center">
Built with ❤️ using Next.js & Material-UI
</div>