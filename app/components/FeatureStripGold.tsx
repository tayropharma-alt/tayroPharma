"use client";

import { ShieldCheck, Truck, ReceiptText } from "lucide-react";
import React from "react";

export default function FeatureStripGold() {
  const features = [
    {
      icon: <ShieldCheck className="size-7" />,
      title: "Acta de Secretaría de Salud",
    },
    {
      icon: <Truck className="size-7" />,
      title: "Envíos Rápidos",
    },
    {
      icon: <ReceiptText className="size-7" />,
      title: "Facturación Electrónica",
    },
  ];

  return (
    <section
      className="
        w-full 
        bg-[#fdfbf6]              /* 🎨 blanco elegante tipo marfil */
        text-[#d4af37]            /* texto dorado */
        py-6 
        m-0 
        p-0 
        relative 
        translate-y-[60px]        /* ⬇️ sigue bajando igual que antes */
        z-[5]
        shadow-[0_-4px_10px_rgba(0,0,0,0.15)]  /* sombra suave */
        border-t border-[#e8d18a] /* línea dorada superior sutil */
      "
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-wrap items-center justify-center gap-10">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105"
          >
            <div
              className="flex items-center justify-center w-14 h-14 rounded-full 
                         bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-white 
                         shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              {f.icon}
            </div>
            <h3 className="mt-3 font-semibold text-sm sm:text-base tracking-wide text-[#b8860b]">
              {f.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
