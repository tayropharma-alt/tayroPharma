"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroBanner() {
  const [visible, setVisible] = useState(true);
  const [hide, setHide] = useState(false); // para animación suave

  // si el usuario lo cerró antes, no lo muestres
  useEffect(() => {
    try {
      if (localStorage.getItem("bannerCerrado") === "true") {
        setVisible(false);
      }
    } catch {}
  }, []);

  // cerrar con animación suave
  const cerrar = () => {
    setHide(true);
    setTimeout(() => {
      try {
        localStorage.setItem("bannerCerrado", "true");
      } catch {}
      setVisible(false);
    }, 600); // duración de la animación (0.6s)
  };

  // cerrar automáticamente después de 10 segundos
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      cerrar();
    }, 10000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`relative w-full z-40 transition-all duration-700 ease-in-out ${
        hide ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <Image
        src="/images/hero.png"
        alt="Bienvenidos a Tayro Pharma"
        width={1600}
        height={600}
        priority
        className="w-full h-auto object-cover shadow"
      />
      <button
        onClick={cerrar}
        className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm hover:bg-black/80 transition"
        aria-label="Cerrar banner"
      >
        ✕
      </button>
    </div>
  );
}
