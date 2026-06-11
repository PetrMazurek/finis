'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Wallet, Car, FolderOpen } from 'lucide-react';
import FinancePage from './components/FinancePage';

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
        
        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Ahoj Petře 👋</h2>
            <p className="text-slate-400 text-sm">Tady bude tvůj hlavní přehled dnešního dne.</p>
            {/* Sem brzy přidáme widgety */}
          </div>
        )}

        {activeTab === 'finance' && <FinancePage />}

        {activeTab === 'auto' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Garáž a Servis</h2>
            <p className="text-slate-400 text-sm">Hlídání tachometru, STK a údržby tvých aut.</p>
            {/* Sem přijde správa aut */}
          </div>
        )}

        {activeTab === 'dokumenty' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Digitální Šanon</h2>
            <p className="text-slate-400 text-sm">Bezpečné úložiště smluv a důležitých dokumentů.</p>
            {/* Sem přijde nahrávání souborů */}
          </div>
        )}

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