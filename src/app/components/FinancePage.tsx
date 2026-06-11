'use client';

import React, { useState } from 'react';
import { PlusCircle, TrendingUp, TrendingDown, Calendar, Percent } from 'lucide-react';

export default function FinancePage() {
  // Stavy pro formulář
  const [nazev, setNazev] = useState('');
  const [castka, setCastka] = useState('');
  const [kategorie, setKategorie] = useState('Potraviny');
  const [jePravidelna, setJePravidelna] = useState(false);
  const [denVMesici, setDenVMesici] = useState('11'); // Výchozí dnešní den (11. červen)

  // Ukázková data, abychom viděli, jak to bude vypadat s historií a analýzou
  const ukazkovaHistorie = [
    { id: 1, nazev: 'Lidl', castka: -1250, kategorie: 'Potraviny', datum: '11. 06. 2026' },
    { id: 2, nazev: 'Benzina', castka: -1800, kategorie: 'Auto', datum: '10. 06. 2026' },
    { id: 3, nazev: 'Výplata', castka: 45000, kategorie: 'Příjem', datum: '09. 06. 2026' },
    { id: 4, nazev: 'Netflix', castka: -249, kategorie: 'Zábava', datum: '05. 06. 2026', jePravidelna: true },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      
      {/* MINI STATISTIKY MĚSÍCE */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <TrendingUp size={14} /> Příjmy
          </div>
          <span className="text-xl font-bold text-white">45 000 Kč</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium">
            <TrendingDown size={14} /> Výdaje
          </div>
          <span className="text-xl font-bold text-white">3 299 Kč</span>
        </div>
      </div>

      {/* DETAILNÍ ANALÝZA (Kterou jsi chtěl) */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Percent size={16} className="text-blue-500" /> Mezimesíční analýza TOP výdajů
          </h3>
        </div>
        <div className="space-y-2">
          {/* Ukázka kategorie Auto */}
          <div className="flex items-center justify-between bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/40">
            <div>
              <span className="text-sm font-medium block">🚗 Auto</span>
              <span className="text-xs text-slate-400">Tento měsíc: 1 800 Kč</span>
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              📈 +15 % vs min. měsíc
            </span>
          </div>
          {/* Ukázka kategorie Potraviny */}
          <div className="flex items-center justify-between bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/40">
            <div>
              <span className="text-sm font-medium block">🛒 Potraviny</span>
              <span className="text-xs text-slate-400">Tento měsíc: 1 250 Kč</span>
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              📉 -8 % vs min. měsíc
            </span>
          </div>
        </div>
      </div>

      {/* FORMULÁŘ PRO NOVÝ ZÁPIS */}
      <form className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-1">Zapsat novou položku</h3>
        
        <div className="grid grid-cols-2 gap-2">
          <input 
            type="text" 
            placeholder="Název (např. Lidl)" 
            value={nazev}
            onChange={(e) => setNazev(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <input 
            type="number" 
            placeholder="Částka (+/-)" 
            value={castka}
            onChange={(e) => setCastka(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <select 
          value={kategorie}
          onChange={(e) => setKategorie(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        >
          <option value="Potraviny">🛒 Potraviny</option>
          <option value="Auto">🚗 Auto</option>
          <option value="Bydlení">🏠 Bydlení</option>
          <option value="Zábava">🎉 Zábava</option>
          <option value="Ostatní">⚙️ Ostatní</option>
          <option value="Příjem">💰 Příjem</option>
        </select>

        {/* TVOJE GENIÁLNÍ ZAŠKRTÁVÁTKO PRO AUTOMATICKÉ PLATBY */}
        <div className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl flex flex-col gap-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input 
              type="checkbox"
              checked={jePravidelna}
              onChange={(e) => setJePravidelna(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0 focus:ring-offset-0"
            />
            <span className="text-xs text-slate-300 font-medium">Opakovat automaticky každý měsíc?</span>
          </label>

          {jePravidelna && (
            <div className="flex items-center gap-2 pl-6 pt-1 animate-in fade-in duration-200">
              <Calendar size={14} className="text-blue-500" />
              <span className="text-xs text-slate-400">Strhnout každý</span>
              <input 
                type="number" 
                min="1" 
                max="31"
                value={denVMesici}
                onChange={(e) => setDenVMesici(e.target.value)}
                className="w-12 bg-slate-900 border border-slate-700 rounded-lg px-1.5 py-0.5 text-center text-xs text-white font-bold focus:outline-none"
              />
              <span className="text-xs text-slate-400">. den v měsíci</span>
            </div>
          )}
        </div>

        <button 
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all text-white font-semibold text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 mt-1"
        >
          <PlusCircle size={16} /> Uložit transakci
        </button>
      </form>

      {/* SEZNAM HISTORIE */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase pl-1">Poslední pohyby</h3>
        <div className="flex flex-col gap-1.5">
          {ukazkovaHistorie.map((item) => (
            <div key={item.id} className="bg-slate-900/60 border border-slate-800/60 px-4 py-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-white block">{item.nazev}</span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  {item.kategorie} • {item.datum}
                  {item.jePravidelna && <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1 rounded">Trvalá</span>}
                </span>
              </div>
              <span className={`text-sm font-bold ${item.castka > 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                {item.castka > 0 ? `+${item.castka}` : item.castka} Kč
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}