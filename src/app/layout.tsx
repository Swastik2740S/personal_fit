import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "SwastikFit — Fat Loss Command Center",
  description: "Personal Trainer App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <div className="shell">
            <Sidebar />
            <main className="main">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
