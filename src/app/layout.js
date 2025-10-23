// ROOT LAYOUT - Wraps all routes

import "./globals.css";

export const metadata = {
  title: "K1 Freight",
  description: "Premium Freight Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
