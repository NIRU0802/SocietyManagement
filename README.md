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

- **Dashboard** - Overview of society statistics, charts & recent activities
- **Flats Management** - Manage residential units & resident information
- **Complaints** - Track & resolve resident complaints
- **Notices** - Post & view society announcements
- **Finance** - Track maintenance bills & payments
- **Vehicles** - Manage registered vehicles & parking
- **Visitors** - Log & track visitor entries

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/NIRU0802/SocietyManagement.git

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Tech Stack

| Technology | Description |
|------------|-------------|
| Next.js 16 | Framework (App Router) |
| React 19 | UI Library |
| TypeScript | Language |
| Material-UI v9 | Component Library |
| Recharts | Charts |
| date-fns | Date Handling |
| Tailwind CSS | Styling |

---

## Project Structure

```
society-management/
├── public/
│   ├── manifest.json
│   └── icon-192.svg
├── src/
│   ├── app/               # Next.js pages
│   │   ├── complaints/
│   │   ├── dashboard/
│   │   ├── finance/
│   │   ├── flats/
│   │   ├── notices/
│   │   ├── vehicles/
│   │   ├── visitors/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/        # Reusable components
│   ├── context/          # React Context
│   ├── data/             # Seed data
│   ├── services/         # Business logic
│   ├── theme.ts          # MUI theme
│   └── types/            # TypeScript types
├── package.json
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