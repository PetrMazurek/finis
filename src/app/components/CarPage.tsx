'use client';

import React, { useState } from 'react';
import { Car, Wrench, ShieldAlert, Calendar, PlusCircle, Gauge } from 'lucide-react';

export default function CarPage() {
  // Stavy pro formulář aktualizace tachometru
  const [tachometr, setTachometr] = useState('184200');
  const [novyStav, setNovyStav] = useState('');

  // Ukázková data tvého auta (v budoucnu propojíme s databází)
  const mojeAuto = {
    znacka: 'Škoda Octavia III',
    motor: '2.0 TDI (110 kW)',
    stkDo: '14. 10. 2027',
    dalniceDo: '28. 02. 2027',
    posledniOlej: 180000,
    intervalOleje: 15000,
  };

  // Výpočet zbývajících kilometrů do výměny oleje
  const aktualniTacho = Number(tachometr);
  const doOleje = mojeAuto.posledniOlej + mojeAuto.intervalOleje - aktualniTacho;

  return (
    <div className="flex flex-col gap-5 w-full">
      
      {/* KARTA VOZIDLA */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl relative overflow-hidden shadow-xl">
        <div className="absolute -right-6 -bottom-6 text-slate-800/20 pointer-events-none">
          <Car size={140} />
        </div>
        
        <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit block mb-1">
          Hlavní vůz
        </span>
        <h3 className="text-xl font-black text-white">{mojeAuto.znacka}</h3>
        <p className="text-xs text-slate-400 mb-4">{mojeAuto.motor}</p>

        {/* HLAVNÍ UKAZATEL TACHOMETRU */}
        <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800/60 w-fit mb-2">
          <Gauge className="text-blue-500" size={20} />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Stav tachometru</span>
            <span className="text-lg font-mono font-bold text-white tracking-wider">{Number(tachometr).toLocaleString('cs-CZ')} km</span>
          </div>
        </div>
      </div>

      {/* HLÍDAČ TERMÍNŮ (UPOZORNĚNÍ) */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldAlert size={16} className="text-amber-500" /> Důležité termíny a údržba
        </h3>

        <div className="grid grid-cols-1 gap-2">
          {/* STK */}
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Calendar size={16} className="text-slate-400" />
              <span className="text-xs font-medium">Technická kontrola (STK)</span>
            </div>
            <span className="text-xs font-bold text-emerald-400">{mojeAuto.stkDo}</span>
          </div>

          {/* Dálniční známka */}
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Calendar size={16} className="text-slate-400" />
              <span className="text-xs font-medium">Dálniční známka</span>
            </div>
            <span className="text-xs font-bold text-emerald-400">{mojeAuto.dalniceDo}</span>
          </div>

          {/* Servis motorového oleje */}
          <div className="flex flex-col gap-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Wrench size={16} className="text-slate-400" />
                <span className="text-xs font-medium">Výměna motorového oleje</span>
              </div>
              <span className={`text-xs font-bold ${doOleje < 1000 ? 'text-rose-400' : 'text-amber-400'}`}>
                za {doOleje.toLocaleString('cs-CZ')} km
              </span>
            </div>
            {/* Jednoduchý vizuální indikátor (progress bar) */}
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all" 
                style={{ width: `${Math.max(0, Math.min(100, (doOleje / mojeAuto.intervalOleje) * 100))}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* RYCHLÁ AKTUALIZACE KILOMETRŮ */}
      <form 
        onSubmit={(e) => { e.preventDefault(); if(novyStav) { setTachometr(novyStav); setNovyStav(''); } }}
        className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3"
      >
        <h3 className="text-sm font-bold text-white">Aktualizovat stav km</h3>
        <div className="flex gap-2">
          <input 
            type="number" 
            placeholder="Nový stav (např. 184500)" 
            value={novyStav}
            onChange={(e) => setNovyStav(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all text-white font-semibold text-sm px-4 rounded-xl flex items-center justify-center gap-1.5"
          >
            <PlusCircle size={16} /> Aktualizovat
          </button>
        </div>
      </form>

    </div>
  );
}