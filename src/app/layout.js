import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./components/AuthContext";
import ConditionalFooter from "./components/ConditionalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CouponApp - User Management",
  description: "A complete user management system with authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <div className="flex-1">
            {children}
          </div>
          <ConditionalFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
