<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4f46e5,100:7c3aed&height=250&section=header&text=Society%20Management%20System&fontSize=55&animation=fadeIn&desc=A%20modern%20web%20app%20for%20residential%20society%20operations&descAlignY=55&descAlign=Center" />
</p>

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-black?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-black?style=for-the-badge&logo=typescript)
![Material-UI](https://img.shields.io/badge/MUI-9.0.0-black?style=for-the-badge&logo=mui)

</div>

---

## 📋 Features

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

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| npm | 9+ |

### Quick Setup

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
npm run start    # Start production server
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: MUI v9 + Tailwind CSS

### Libraries
- **Charts**: Recharts
- **Dates**: date-fns
- **IDs**: uuid
- **PWA**: Service Worker

---

## 📁 Project Structure

```
society-management/
├── public/
│   ├── manifest.json      # PWA manifest
│   └── icon-192.svg     # App icon
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── complaints/ # 👎 Complaints module
│   │   ├── dashboard/  # 📊 Dashboard module
│   │   ├── finance/    # 💵 Finance module
│   │   ├── flats/     # 🏢 Flats management
│   │   ├── notices/   # 📢 Notices module
│   │   ├── vehicles/ # 🚗 Vehicles module
│   │   ├── visitors/  # 👥 Visitors module
│   │   ├── layout.tsx # Root layout
│   │   └── page.tsx   # Home page
│   ├── components/    # Reusable components
│   ├── context/       # React Context
│   ├── data/         # Seed data
│   ├── services/     # Business logic
│   ├── theme.ts      # MUI theme
│   └── types/       # TypeScript types
├── package.json
└── README.md
```

---

## 📸 Screenshots

| Dashboard | Flats | Complaints |
|:---------:|:----:|:----------:|
| ![Dashboard](./public/screenshots/dashboard.png) | ![Flats](./public/screenshots/flats.png) | ![Complaints](./public/screenshots/complaints.png) |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

---

<p align="center">
  <sub>Built with ❤️ using Next.js & Material-UI</sub>
</p>