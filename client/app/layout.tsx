import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthContext";
import Navigation from "@/components/common/components/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { SignOut } from "./actions/signOut";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todolist",
  description: "Simple Todolist.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider initialUser={user}>
          <div className="flex flex-col gap-4 max-w-screen items-center font-sans py-10">
            <Navigation logout={SignOut} />
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 md:px-16 px-8 rounded-xl box-shadow">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
