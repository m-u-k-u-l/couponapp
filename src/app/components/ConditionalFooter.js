'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Check if the current route is under /dashboard
  const isDashboard = pathname.startsWith('/dashboard');
  
  // Only render footer if not on dashboard pages
  if (isDashboard) {
    return null;
  }
  
  return <Footer />;
} 