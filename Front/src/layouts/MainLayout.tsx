import Footer from '@/pages/components/Footer'
import Header from '@/pages/components/Header'
import React from 'react'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white pt-20">
      <Header />

      <main className="flex-grow w-full flex justify-center items-start px-4">
        {children}
      </main>

      <Footer />
    </div>
  );
};

