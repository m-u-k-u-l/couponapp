'use client';

import Link from 'next/link';
import { useAuth } from './AuthContext';

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
              CouponApp
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* <Link href="/" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              All Coupons
            </Link> */}

            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <span className="text-gray-600 px-3 py-2 text-sm">
                  Welcome, {user.fullName}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* <Link href="/login" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Register
                </Link> */}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 