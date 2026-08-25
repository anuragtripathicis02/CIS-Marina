import type { Metadata } from 'next';
import './globals.css';
import ApiUrlBridge from '../components/ApiUrlBridge';

export const metadata: Metadata = {
  title: 'Smart Yacht & Marina Management Platform',
  description: 'The operating system for global yacht charter, fleet, marina and concierge operations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased">
        <ApiUrlBridge />
        {children}
      </body>
    </html>
  );
}
