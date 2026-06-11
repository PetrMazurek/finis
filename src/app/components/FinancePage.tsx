'use client';

import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, TrendingDown, Calendar, Percent, Trash2 } from 'lucide-react';

// Definice toho, jak vypadá jedna transakce
interface Transakce {
  id: number;
  nazev: string;
  castka: number;
  kategorie: string;
  datum: string;
  jePravidelna: boolean;
  denVMesici?: string;
}

export default function FinancePage() {
  // Stavy pro formulář
  const [nazev, setNazev] = useState('');
  const [castka, setCastka] = useState('');
  const [kategorie, setKategorie] = useState('Potraviny');
  const [jePravidelna, setJePravidelna] = useState(false);
  const [denVMesici, setDenVMesici] = useState('11');

  // Hlavní stav pro seznam všech transakcí
  const [transakce, setTransakce] = useState<Transakce[]>([]);

  // 1. Načtení dat z paměti prohlížeče při spuštění stránky
  useEffect(() => {
    const ulozeneTransakce = localStorage.getItem('finis_transakce');
    if (ulozeneTransakce) {
      setTransakce(JSON.parse(ulozeneTransakce));
    } else {
      // Výchozí data, pokud je paměť prázdná
      const vychozi = [
        { id: 1, nazev: 'Netflix', castka: -249, kategorie: 'Zábava', datum: '05. 06. 2026', jePravidelna: true },
      ];
      setTransakce(vychozi);
      localStorage.setItem('finis_transakce', JSON.stringify(vychozi));
    }
  }, []);

  // 2. Funkce pro přidání nové transakce (CHYTRÁ verze)
  const pridejTransakci = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nazev || !castka) return alert('Vyplň název a částku!');

    // Převedeme text na absolutní (kladné) číslo, abychom měli čistý základ
    const absolutniHodnota = Math.abs(Number(castka));
    
    // Pokud je kategorie "Příjem", necháme plus. Pro všechno ostatní dáme automaticky mínus.
    const finalniCastka = kategorie === 'Příjem' ? absolutniHodnota : -absolutniHodnota;

    const nova: Transakce = {
      id: Date.now(),
      nazev,
      castka: finalniCastka, // <--- Sem posíláme chytře upravenou částku
      kategorie,
      datum: new Date().toLocaleDateString('cs-CZ'),
      jePravidelna,
      denVMesici: jePravidelna ? denVMesici : undefined
    };

    const aktualizovanySeznam = [nova, ...transakce];
    setTransakce(aktualizovanySeznam);
    localStorage.setItem('finis_transakce', JSON.stringify(aktualizovanySeznam));

    // Vyčištění formuláře
    setNazev('');
    setCastka('');
    setJePravidelna(false);
  };

  // 3. Funkce pro smazání transakce
  const smazTransakci = (id: number) => {
    const filtrovanySeznam = transakce.filter(t => t.id !== id);
    setTransakce(filtrovanySeznam);
    localStorage.setItem('finis_transakce', JSON.stringify(filtrovanySeznam));
  };

  // 4. Výpočty statistik za běhu
  const prijmy = transakce.filter(t => t.castka > 0).reduce((sum, t) => sum + t.castka, 0);
  const vydaje = Math.abs(transakce.filter(t => t.castka < 0).reduce((sum, t) => sum + t.castka, 0));

  return (
    <div className="flex flex-col gap-5 w-full">
      
      {/* STATISTIKY MĚSÍCE (Počítají se dynamicky) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <TrendingUp size={14} /> Příjmy
          </div>
          <span className="text-xl font-bold text-white">{prijmy.toLocaleString('cs-CZ')} Kč</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium">
            <TrendingDown size={14} /> Výdaje
          </div>
          <span className="text-xl font-bold text-white">{vydaje.toLocaleString('cs-CZ')} Kč</span>
        </div>
      </div>

      {/* FORMULÁŘ */}
      <form onSubmit={pridejTransakci} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3 shadow-xl">
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
            placeholder="Částka (Kč)" 
            value={castka}
            onChange={(e) => setCastka(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
            <div className="flex items-center gap-2 pl-6 pt-1">
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
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all text-white font-semibold text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 mt-1"
        >
          <PlusCircle size={16} /> Uložit transakci
        </button>
      </form>

      {/* SEZNAM HISTORIE */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase pl-1">Poslední pohyby</h3>
        <div className="flex flex-col gap-1.5">
          {transakce.map((item) => (
            <div key={item.id} className="bg-slate-900/60 border border-slate-800/60 px-4 py-3 rounded-xl flex items-center justify-between group">
              <div>
                <span className="text-sm font-semibold text-white block">{item.nazev}</span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  {item.kategorie} • {item.datum}
                  {item.jePravidelna && <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1 rounded">Trvalá ({item.denVMesici}.)</span>}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold ${item.castka > 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {item.castka > 0 ? `+${item.castka}` : item.castka} Kč
                </span>
                {/* Tlačítko na smazání */}
                <button 
                  onClick={() => smazTransakci(item.id)}
                  className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}