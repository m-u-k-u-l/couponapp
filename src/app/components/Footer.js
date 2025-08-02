'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-bold text-white">CouponApp</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your ultimate destination for the best deals and discounts. Discover amazing offers
              from your favorite brands and save money on every purchase.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://t.me/pwcouponwallahb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
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
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  All Coupons
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          {/* <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} CouponApp. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                Made with ❤️ for amazing deals
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 