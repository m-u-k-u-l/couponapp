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

            <a
              href="https://t.me/pwcouponwallahb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3"
            >
              <span className="sr-only">Telegram</span>
              <svg
                className="h-6 w-6"
                viewBox="0 0 240 240"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="120" cy="120" r="120" fill="#37AEE2" />
                <path
                  d="M100.2 161.3l-3.9 34.7c5.6 0 8-2.4 10.9-5.2l26.1-24.7 54.2 39.6c9.9 5.5 17 2.6 19.4-9l35.2-165.4 0.1-0.4c2.9-13.4-4.9-18.6-13.8-15.5L19.5 97.8c-13.1 5.1-13 12.4-2.4 15.6l43.6 13.6L180 52.6c6.2-4.1 11.9-1.9 7.2 2.6L100.2 161.3z"
                  fill="#fff"
                />
              </svg>
            </a>

            <a
              href="https://chat.whatsapp.com/GecfsIf1Kjb4oCEKWYFH30?mode=ac_t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <span className="sr-only">WhatsApp</span>
              <svg
                className="h-6 w-6"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#25D366"
                  d="M16.004 2.002c-7.731 0-13.998 6.267-13.998 13.998 0 2.468.645 4.871 1.873 6.993l-1.99 7.272 7.465-1.959a13.93 13.93 0 006.65 1.689h.001c7.731 0 13.998-6.267 13.998-13.998 0-3.741-1.457-7.26-4.102-9.905a13.953 13.953 0 00-9.897-4.09zm-.005 2.125c6.542 0 11.873 5.331 11.873 11.873 0 6.542-5.331 11.873-11.873 11.873a11.812 11.812 0 01-5.647-1.46l-.398-.219-4.424 1.161 1.18-4.314-.232-.415a11.8 11.8 0 01-1.447-5.627c0-6.542 5.331-11.873 11.873-11.873zm-3.325 5.882c-.226-.502-.465-.512-.681-.52-.176-.007-.379-.007-.581-.007-.202 0-.53.075-.809.377-.278.302-1.063 1.039-1.063 2.534s1.088 2.937 1.24 3.138c.153.2 2.113 3.356 5.204 4.567.727.314 1.295.502 1.738.641.73.232 1.393.2 1.917.122.585-.087 1.79-.73 2.044-1.434.253-.704.253-1.308.177-1.434-.076-.126-.278-.2-.581-.351-.302-.15-1.79-.879-2.067-.98-.277-.1-.479-.15-.68.151-.202.301-.78.978-.955 1.179-.176.2-.352.226-.654.076-.303-.15-1.28-.472-2.44-1.503-.902-.803-1.51-1.793-1.686-2.094-.176-.3-.019-.463.132-.613.135-.135.302-.352.453-.527.151-.175.201-.301.302-.502.101-.2.05-.377-.025-.528-.074-.15-.653-1.587-.895-2.168z"
                />
              </svg>
            </a>



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