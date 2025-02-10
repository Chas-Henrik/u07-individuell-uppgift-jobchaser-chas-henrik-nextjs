'use client'

// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React, { useState } from 'react';
import "./globals.css";
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import { ThemeContext } from "@/themeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Job Chaser",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState({ darkTheme: false, toggleTheme: toggleTheme});

  function toggleTheme():void {
      console.log('toggleTheme');
      setTheme(prevTheme => ({ ...prevTheme, darkTheme: !prevTheme.darkTheme }));
  }

  const themeStyles = {
    backgroundColor: theme.darkTheme ? '#333' : '#fff',
    color: theme.darkTheme ? '#fff' : '#333',
    paddingBottom: '13rem', /* Get darkTheme for the main margin (13rem) too */
  };

  return (
    <html lang="en">
      <ThemeContext.Provider value={theme}>
          <body
            style={themeStyles}
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Header/>
            {children}
            <Footer>Footer</Footer>
          </body>
      </ThemeContext.Provider>
    </html>
  );
}
