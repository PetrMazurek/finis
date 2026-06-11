'use client';

import React from 'react';
import { Wallet, Car, AlertTriangle, ArrowUpRight, ArrowDownLeft, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5 w-full animate-in fade-in duration-300">
      
      {/* UVÍTÁNÍ */}
      <div>
        <h2 className="text-2xl font-black text-white">Ahoj Petře 👋</h2>
        <p className="text-slate-400 text-xs mt-0.5">Tady je přehled tvého velínu pro dnešní den.</p>
      </div>

      {/* HLAVNÍ KARTA ZŮSTATKU */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5 rounded-2xl shadow-xl shadow-blue-950/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        
        <span className="text-[10px] uppercase tracking-wider font-bold text-blue-200">Celkový čistý zůstatek</span>
        <h3 className="text-3xl font-black text-white tracking-tight mt-0.5">41 701 Kč</h3>
        
        <div className="flex gap-4 mt-4 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-1.5 text-blue-100">
            <ArrowUpRight size={14} className="text-emerald-300" />
            <span>+45 000 Kč</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-100">
            <ArrowDownLeft size={14} className="text-rose-300" />
            <span>-3 299 Kč</span>
          </div>
        </div>
      </div>

      {/* CHIYTRÉ CHYSTANÉ NOTIFIKACE (WIDGETY) */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase pl-1">Akutní upozornění</h3>
        
        <div className="flex flex-col gap-2">
          {/* Upozornění na auto */}
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-start gap-3">
            <div className="p-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg shrink-0 mt-0.5">
              <AlertTriangle size={16} />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-white block">Blíží se servis oleje!</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">U tvé Octávie zbývá ujet posledních 1 300 km do doporučené výměny.</span>
            </div>
          </div>

          {/* Úspěch / Vše v pořádku */}
          <div className="bg-slate-900/40 border border-slate-800/60 p-3.5 rounded-xl flex items-start gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg shrink-0 mt-0.5">
              <CheckCircle2 size={16} />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-white block">Pravidelné platby zkontrolovány</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Všechny trvalé platby pro tento měsíc odešly v pořádku.</span>
            </div>
          </div>
        </div>
      </div>

      {/* RYCHLÝ STAV SEKCÍ */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase pl-1">Stav modulů</h3>
        <div className="grid grid-cols-2 gap-2.5">
          
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex flex-col gap-2">
            <Wallet className="text-blue-500" size={18} />
            <div>
              <span className="text-xs font-bold text-slate-300 block">Finance</span>
              <span className="text-[10px] text-slate-500">Tento měsíc ušetřeno 92%</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex flex-col gap-2">
            <Car className="text-amber-500" size={18} />
            <div>
              <span className="text-xs font-bold text-slate-300 block">Garáž</span>
              <span className="text-[10px] text-slate-500">STK platná (ještě 1.5 roku)</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}