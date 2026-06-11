'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Wallet, Car, FolderOpen } from 'lucide-react';
import FinancePage from './components/FinancePage';
import CarPage from './components/CarPage';
import DocumentPage from './components/DocumentPage';
import DashboardPage from './components/DashboardPage';

export default function Home() {
  // Stav pro sledování, která stránka je zrovna aktivní
  const [activeTab, setActiveTab] = useState<'dashboard' | 'finance' | 'auto' | 'dokumenty'>('dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* HORNÍ LIŠTA (HEADER) */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-black tracking-wider text-white">FINIS</h1>
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
          PM
        </div>
      </header>

      {/* HLAVNÍ OBSAH (Zde se mění stránky podle vybrané záložky) */}
      <main className="flex-1 pb-24 p-4 max-w-md mx-auto w-full flex flex-col gap-4">
        
        {activeTab === 'dashboard' && <DashboardPage /> }

        {activeTab === 'finance' && <FinancePage />}

        {activeTab === 'auto' && <CarPage />}

        {activeTab === 'dokumenty' && <DocumentPage />}

      </main>

      {/* SPODNÍ NAVIGAČNÍ MENU (NAVBAR) */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/80 backdrop-blur px-2 py-2 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center">
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-16 ${activeTab === 'dashboard' ? 'text-blue-500 font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <LayoutDashboard size={22} />
            <span className="text-[10px]">Přehled</span>
          </button>

          <button 
            onClick={() => setActiveTab('finance')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-16 ${activeTab === 'finance' ? 'text-blue-500 font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Wallet size={22} />
            <span className="text-[10px]">Finance</span>
          </button>

          <button 
            onClick={() => setActiveTab('auto')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-16 ${activeTab === 'auto' ? 'text-blue-500 font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Car size={22} />
            <span className="text-[10px]">Auta</span>
          </button>

          <button 
            onClick={() => setActiveTab('dokumenty')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-16 ${activeTab === 'dokumenty' ? 'text-blue-500 font-medium' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <FolderOpen size={22} />
            <span className="text-[10px]">Šanon</span>
          </button>

        </div>
      </nav>

    </div>
  );
}