import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutWrapper from "@/components/LayoutWrapper";

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
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en">
        <head>
          {/* Apply the saved UI theme before paint to avoid a flash (FOUC). */}
          <script
            dangerouslySetInnerHTML={{
              __html:
                "try{var t=localStorage.getItem('sf:ui-theme');if(t==='liquid'||t==='classic')document.documentElement.dataset.ui=t;}catch(e){}",
            }}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <LayoutWrapper>{children}</LayoutWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
