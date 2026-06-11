'use client';

import React from 'react';
import { Folder, FileText, UploadCloud, ShieldCheck, HardDrive } from 'lucide-react';

export default function DocumentPage() {
  // Ukázková data nahraných dokumentů
  const slozky = [
    { nazev: 'Pojištění a Smlouvy', souboru: 4, barva: 'text-blue-500' },
    { nazev: 'Dokumenty k autu', souboru: 2, barva: 'text-amber-500' },
    { nazev: 'Bydlení a Energie', souboru: 5, barva: 'text-emerald-500' },
  ];

  const posledniDokumenty = [
    { id: 1, nazev: 'Kupni_smlouva_Octavia.pdf', velikost: '2.4 MB', datum: '10. 06. 2026' },
    { id: 2, nazev: 'Zelena_karta_2026.pdf', velikost: '840 KB', datum: '01. 05. 2026' },
    { id: 3, nazev: 'Smlouva_Elektrina_CEZ.pdf', velikost: '1.1 MB', datum: '15. 04. 2026' },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      
      {/* INFORMACE O ÚLOŽIŠTI */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl">
            <HardDrive size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">Cloudové úložiště</span>
            <span className="text-sm font-bold text-white">Využito 4.3 MB z 500 MB</span>
          </div>
        </div>
        <span className="text-[11px] font-bold text-slate-500 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">Gratis</span>
      </div>

      {/* DRAG & DROP BOX PRO NAHRÁVÁNÍ */}
      <div className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-slate-900/40 hover:bg-slate-900/80 transition-all p-6 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer text-center group">
        <div className="p-3 bg-slate-950 rounded-full text-slate-500 group-hover:text-blue-400 group-hover:scale-110 transition-all border border-slate-800">
          <UploadCloud size={24} />
        </div>
        <div>
          <span className="text-sm font-semibold text-slate-200 block">Nahrát nový dokument</span>
          <span className="text-xs text-slate-500">Klikni nebo přetáhni soubor sem (PDF, PNG, JPG)</span>
        </div>
      </div>

      {/* RYCHLÉ SLOŽKY */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase pl-1">Složky</h3>
        <div className="grid grid-cols-1 gap-2">
          {slozky.map((slozka, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between hover:bg-slate-900/80 cursor-pointer transition-all">
              <div className="flex items-center gap-3">
                <Folder className={slozka.barva} size={20} />
                <span className="text-sm font-semibold text-slate-200">{slozka.nazev}</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">{slozka.souboru} soubory</span>
            </div>
          ))}
        </div>
      </div>

      {/* POSLEDNÍ SOUBORY */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase pl-1">Nedávno přidané</h3>
        <div className="flex flex-col gap-1.5">
          {posledniDokumenty.map((doc) => (
            <div key={doc.id} className="bg-slate-900/50 border border-slate-800/50 px-4 py-3 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="text-slate-400" size={18} />
                <div>
                  <span className="text-sm font-medium text-white block max-w-[180px] truncate">{doc.nazev}</span>
                  <span className="text-[11px] text-slate-500">{doc.datum} • {doc.velikost}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg cursor-pointer hover:text-white hover:border-slate-700 transition-all">
                Zobrazit
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}