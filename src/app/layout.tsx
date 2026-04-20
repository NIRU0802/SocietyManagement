import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import ThemeRegistry from './ThemeRegistry';
import ServiceWorkerRegistration from '@/components/common/ServiceWorkerRegistration';

export const metadata: Metadata = {
  title: 'SocietyHub - Society Management System',
  description: 'A comprehensive society management system for residential complexes',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SocietyHub',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E40AF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>
          <AppProvider>
            <ServiceWorkerRegistration />
            {children}
          </AppProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}