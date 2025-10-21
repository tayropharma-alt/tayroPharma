"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Script from "next/script";




// ================== Tipos ==================
export type Producto = {
  id: number | string;
  nombre: string;
  precio: number;
  categoria: string;
  imagen?: string;
  stock: number;
  masVendido?: boolean;
  ivaIncluido?: boolean;
};

export type ProductoEnCarrito = Producto & { cantidad: number };

// ================== Categorías ==================
const categorias = [
  "Más Vendidos",
  "Genfar",
  "Naturales",
  "Recipe",
  "Antigripales",
  "MK",
  "Bioquifar",
  "Laproff",
  "Ecar",
  "Colmed",
  "CoasPharma",
  "AG",
  "Memphis",
  "La Sante",
  "Ampolleteria",
  "Jarabes y soluciones",
  "Cremas y Ungüentos",
  "Gotas",
  "Anticonceptivos",
  "Biosanitarios",
];

// ================== Utilidades ==================
const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const toWordSet = (s: string) =>
  new Set(
    normalize(s)
      .replace(/[^a-z0-9%]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
  );

// ================== Sufijos por laboratorio (solo para WhatsApp) ==================
const SUFIJOS: Record<string, string> = {
  Genfar: "(GF)",
  MK: "(MK)",
  Memphis: "(Memphis)",
  Colmed: "(Colmed)",
  Ecar: "(Ecar)",
  CoasPharma: "(Coas)",
  Laproff: "(LP)",
  "La Sante": "(LS)",
  Recipe: "(Recipe)",
  AG: "(AG)",
  Bioquifar: "(Bioqui)",
};

// Quita cualquier " (Algo)" al final, por si en el inventario viene con (GF), (MK), etc.
const nombreUI = (nombre: string) => nombre.replace(/\s*\([^)]+\)\s*$/u, "").trim();

// Construye etiqueta para WhatsApp (base limpio + sufijo por categoría, sin duplicar)
const nombreWhatsApp = (nombre: string, categoria: string) => {
  const base = nombreUI(nombre);
  const suf = SUFIJOS[categoria] ?? "";
  return suf ? `${base} ${suf}` : base;
};

// ================== Fuente de datos (inyecta tus productos aquí) ==================
// IMPORTANTE: Trae tus productos desde donde los mantengas:
// import { productos } from "@/data/productos";
// o pásalos como prop si prefieres.
// Para este archivo dejamos la variable declarada vacía.

// ================== Datos (tu inventario) ==================
const productos: Producto[] = [
{ id: 1, nombre: "Advil Ultra x40 Caps", precio: 75600, categoria: "Más Vendidos", imagen: "/adult.png", stock: 50, masVendido: true },
{ id: 1005, nombre: "Advil Espalda y Cuello x20 Caps", precio: 43900, categoria: "Más Vendidos", imagen: "/escu2.png", stock: 50, masVendido: true },
  { id: 2, nombre: "Advil Gripa x20 Caps", precio: 33500, categoria: "Más Vendidos", imagen: "/advilgrip.png", stock: 50, masVendido: true },
  { id: 899, nombre: "Dolpack (Calza Electrica)", precio: 6000, categoria: "Más Vendidos", imagen: "/dolpack.png", stock: 50, masVendido: true },
  { id: 3, nombre: "Dolex 500mg x100 Tbs", precio: 76700, categoria: "Más Vendidos", imagen: "/dolera.png", stock: 50, masVendido: true },
  { id: 4, nombre: "Dolex Gripa x48 Tbs", precio: 59000, categoria: "Más Vendidos", imagen: "/dolexgrip.png", stock: 50, masVendido: true },
  { id: 5, nombre: "Dolex Forte x50 Tbs", precio: 80600, categoria: "Más Vendidos", imagen: "/dolexf.png", stock: 50, masVendido: true },
  { id: 6, nombre: "Advil Max x40 Caps", precio: 75600, categoria: "Más Vendidos", imagen: "/admax.png", stock: 50, masVendido: true },
  { id: 7, nombre: "Dolex Niños 2+ Jarabe 90ml", precio: 15900, categoria: "Más Vendidos", imagen: "/2++.png", stock: 20, masVendido: true },
  { id: 8, nombre: "Dolex Niños 7+ Jarabe 120ml", precio: 23900, categoria: "Más Vendidos", imagen: "/ad7.png", stock: 20, masVendido: true },
  { id: 9, nombre: "Dolex 1–24 Jarabe 60ml", precio: 13900, categoria: "Más Vendidos", imagen: "/bebe.png", stock: 20, masVendido: true },
  { id: 10, nombre: "Dolex Niños 2+ 100mg x20 Tbs", precio: 17900, categoria: "Más Vendidos", imagen: "/2tb.png", stock: 20, masVendido: true },
  { id: 877, nombre: "Relaxkov (Tizacnidina) 4mg x20 Tbs", precio: 24600, categoria: "Más Vendidos", imagen: "/kov4.png", stock: 45, masVendido: true },
  { id: 999, nombre: "Mioflex (Metocarbamol) 750mg x20 Tbs", precio: 8000, categoria: "Más Vendidos", imagen: "/mioflex.png", stock: 45, masVendido: true },
  { id: 989, nombre: "Metocarbamol 750mg x20 Tbs (Anglo)", precio: 10000, categoria: "Más Vendidos", imagen: "/bamol.png", stock: 110, masVendido: true },
  { id: 786, nombre: "Gastrum Plux x10 Sachets", precio: 16600, categoria: "Más Vendidos", imagen: "/gastrum.png", stock: 60, masVendido: true },
  { id: 776, nombre: "Gazu (Pantoprazol) 40mg x14 Caps", precio: 22800, categoria: "Más Vendidos", imagen: "/gazu.png", stock: 60, masVendido: true },

  { id: 11, nombre: "Vaselina Pura Kevs x50gr", precio: 4411, categoria: "Más Vendidos", imagen: "/v50.png", stock: 100, masVendido: true, ivaIncluido: true },
  { id: 12, nombre: "Condones Te Amo x48und x3", precio: 33000, categoria: "Más Vendidos", imagen: "/teamo.png", stock: 0, masVendido: true },
  { id: 13, nombre: "Advil Children Jarabe 60ml", precio: 21000, categoria: "Más Vendidos", imagen: "/advilchil.png", stock: 20, masVendido: true },
  { id: 14, nombre: "Dolex Activgel x20 Caps", precio: 27800, categoria: "Más Vendidos", imagen: "/dolactiv.png", stock: 20, masVendido: true },
  { id: 15, nombre: "Advil Fem x10 Tbs", precio: 19200, categoria: "Más Vendidos", imagen: "/afen.png", stock: 9, masVendido: true },
  { id: 16, nombre: "Vaselina Pura Kevs x100gr", precio: 5940, categoria: "Más Vendidos", imagen: "/v100.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 17, nombre: "Vaselina Blanca en Lata x12und", precio: 4189, categoria: "Más Vendidos", imagen: "/vb.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 18, nombre: "Vaselina en Lata Colores x12und", precio: 4205, categoria: "Más Vendidos", imagen: "/vco.png", stock: 100, masVendido: true, ivaIncluido: true },
  { id: 19, nombre: "Manteca de Cacao Kevs (Sabores) x12und", precio: 18190, categoria: "Más Vendidos", imagen: "/kevss.png", stock: 50, masVendido: true, ivaIncluido: true },
  { id: 673, nombre: "Manteca de Cacao Kevs (Natural) x12und", precio: 18190, categoria: "Más Vendidos", imagen: "/kevsn.png", stock: 50, masVendido: true, ivaIncluido: true },
  { id: 640, nombre: "Vaselina en Lata Roja x12und", precio: 4205, categoria: "Más Vendidos", imagen: "/vr.png", stock: 100, masVendido: true, ivaIncluido: true },

  { id: 23, nombre: "Advil Gripa Max x40 Caps", precio: 76700, categoria: "Más Vendidos", imagen: "/gripmax.png", stock: 12, masVendido: true },
  { id: 24, nombre: "Enalapril 20mg x250 Tbs", precio:22000, categoria: "Más Vendidos", imagen: "/enaa.png", stock: 20, masVendido: true },
  { id: 28, nombre: "Pomada Libertador", precio: 11000, categoria: "Más Vendidos", imagen: "/libert.png", stock: 20, masVendido: true },
  { id: 30, nombre: "Salbumed Salbutamol Inhalador 100mcg", precio: 5700, categoria: "Más Vendidos", imagen: "/salbumed.png", stock: 2000, masVendido: true },
  { id: 31, nombre: "Procatec Ciprofloxacina 500mg x10 Tbs", precio: 4000, categoria: "Más Vendidos", imagen: "/proca.png", stock: 200, masVendido: true },
  { id: 32, nombre: "Pedialyte 60meq 500ml", precio: 8200, categoria: "Más Vendidos", imagen: "/p1.png", stock: 20, masVendido: true },
  { id: 777, nombre: "Amokem CV (Amoxicilina + Ácido Clavulánico) 875 + 125 mg x14 Tbs", precio: 34000, categoria: "Más Vendidos", imagen: "/aclav.png", stock: 20, masVendido: true },

  { id: 34, nombre: "Fosfocbrina x100 Caps", precio: 24546, categoria: "Más Vendidos", imagen: "/fosfo.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 36, nombre: "Tor Proctologica Crema x10gr", precio: 9600, categoria: "Más Vendidos", imagen: "/torp.png", stock: 100, masVendido: true },
  { id: 38, nombre: "Buscapina Fem x24", precio: 37000, categoria: "Más Vendidos", imagen: "/bfen.png", stock: 20, masVendido: true },
  { id: 39, nombre: "Gastrofull Doble Acción x24 Sachets", precio: 36200, categoria: "CoasPharma", imagen: "/gastrofu.png", stock: 20, masVendido: true },
  { id: 41, nombre: "Lomotil x12 Cajas de 4 Tbs", precio: 74000, categoria: "Más Vendidos", imagen: "/lomotil.png", stock: 20, masVendido: true },
  { id: 42, nombre: "Erassin 100mg x2 Tbs", precio: 9000, categoria: "Más Vendidos", imagen: "/era.png", stock: 20, masVendido: true },
  { id: 45, nombre: "Dexalyl (Dexametasona Fosfato) 0,750mg x20 Tbs", precio: 26800, categoria: "Más Vendidos", imagen: "/dexatb.png", stock: 20, masVendido: true },

  { id: 46, nombre: "Sugastrin (Sulcralfato) 1g x20 Tbs", precio: 13500, categoria: "Más Vendidos", imagen: "/sugas.png", stock: 50, masVendido: true },
  { id: 49, nombre: "Dolpack solución bucal", precio: 12879, categoria: "Más Vendidos", imagen: "/dolenj.png", stock: 50, masVendido: true, ivaIncluido: true },
  { id: 51, nombre: "Domeboro (Acetato de Aluminio) x30 Sobres", precio: 24700, categoria: "Más Vendidos", imagen: "/dome.png", stock: 20, masVendido: true },
  { id: 52, nombre: "Mieltertos Pastillas x12 Sobres de 4 Pastillas", precio: 21000, categoria: "Más Vendidos", imagen: "/mielpast.png", stock: 20, masVendido: true },
  { id: 53, nombre: "Levotiroxina 100mcg x50 Tbs (Siegfried)", precio: 11600, categoria: "Más Vendidos", imagen: "/sie100.png", stock: 0, masVendido: true },
  { id: 54, nombre: "Novoxican (Meloxicam 15mg) x10 Tbs", precio: 2700, categoria: "Más Vendidos", imagen: "/novcan.png", stock: 0, masVendido: true },

  { id: 55, nombre: "Impomel (Meloxicam 15mg) x10 Tbs", precio: 3200, categoria: "Más Vendidos", imagen: "/impomel.png", stock: 20, masVendido: true },
  { id: 56, nombre: "Inoxicam (Meloxicam) 15mg x10 Tbs", precio: 2700, categoria: "Más Vendidos", imagen: "/inoxi.png", stock: 100, masVendido: true },
  { id: 57, nombre: "Veran D (Piroxicam 20mg) x10 Caps", precio: 6700, categoria: "Más Vendidos", imagen: "/verand.png", stock: 0, masVendido: true },
  { id: 58, nombre: "Metformina 850mg x30 Tbs (Pisa)", precio: 6000, categoria: "Más Vendidos", imagen: "/pisa6.png", stock: 20, masVendido: true },
  { id: 59, nombre: "Omeprazol 20mg x250 Cap (Anglo)", precio: 31000, categoria: "Más Vendidos", imagen: "/omeprazola.png", stock: 100, masVendido: true },
  { id: 627, nombre: "Omeprazol 20mg x300 Cap (Farmacol)", precio: 34700, categoria: "Más Vendidos", imagen: "/omefar.png", stock: 100, masVendido: true },
  { id: 60, nombre: "Deltmoxi (Amoxicilina) 500mg x100 Caps", precio: 24700, categoria: "Más Vendidos", imagen: "/delmox.png", stock: 0, masVendido: true },
  { id: 61, nombre: "Okap Forte (Acetaminofén + Cafeína) x10 Caps", precio: 7900, categoria: "Más Vendidos", imagen: "/ofo.png", stock: 0, masVendido: true },
  { id: 64, nombre: "Losartán 50mg x30 Tbs (Expofarma)", precio: 3500, categoria: "Más Vendidos", imagen: "/le.png", stock: 0, masVendido: true },
  { id: 678, nombre: "Gestavit DHA x30 Caps", precio: 89400, categoria: "Más Vendidos", imagen: "/gtad.png", stock: 20, masVendido: true },

  { id: 66, nombre: "Movidol x8 Tbs", precio: 9000, categoria: "Más Vendidos", imagen: "/movi8.png", stock: 20, masVendido: true },
  { id: 67, nombre: "Vencedor (Mata Callo - Ácido Salicílico)", precio: 5700, categoria: "Más Vendidos", imagen: "/vence.png", stock: 100, masVendido: true },
  { id: 68, nombre: "Tropxim-F (Metronidazol 500mg + Clotrimazol 100mg) x10 Óvulos", precio: 21900, categoria: "Más Vendidos", imagen: "/tovul.png", stock: 20, masVendido: true },
  { id: 69, nombre: "Gastrimeb (Alginato de Sodio + Simeticona) 360ml", precio: 23200, categoria: "Más Vendidos", imagen: "/gastri.png", stock: 20, masVendido: true },
  { id: 70, nombre: "Migradol (Ergotamina + Cafeína) x30 Tbs", precio: 39900, categoria: "Más Vendidos", imagen: "/migra.png", stock: 30, masVendido: true },
  { id: 71, nombre: "Nodol Plus (Acetaminofén 325mg + Hidrocodona 5mg) x10 Tbs", precio: 32200, categoria: "Más Vendidos", imagen: "/ndpl.png", stock: 20, masVendido: true },
  { id: 671,nombre: "Nodol Forte (Acetaminofén 325mg + Codeína Fosfato 30mg) x30 Tbs", precio: 25300, categoria: "Más Vendidos", imagen: "/nfort.png", stock: 20, masVendido: true },
  { id: 672,nombre: "Fibrinexam (Ácido Tranexámico) 500mg x10 Tbs", precio: 30000, categoria: "Más Vendidos", imagen: "/fibri.png", stock: 20, masVendido: true },
  { id: 72, nombre: "Diosmit (Diosmectita 3%) x6 Sobres", precio: 14300, categoria: "Más Vendidos", imagen: "/diosmi.png", stock: 20, masVendido: true },
  { id: 73, nombre: "Sinverty (Dimenhidrinato 50mg) x72 Tbs", precio: 20900, categoria: "Más Vendidos", imagen: "/Sinvert.png", stock: 20, masVendido: true },

  { id: 74, nombre: "Langenix (Lansoprazol 30mg) x30 Caps", precio: 6400, categoria: "Más Vendidos", imagen: "/lange.png", stock: 20, masVendido: true },
  { id: 75, nombre: "X Ray Dol x48 Tbs", precio: 61000, categoria: "Más Vendidos", imagen: "/x48.png", stock: 20, masVendido: true },
  { id: 611, nombre: "X Ray Dol x12 Tbs", precio: 16000, categoria: "Más Vendidos", imagen: "/xray12.png", stock: 0, masVendido: true },
  { id: 76, nombre: "Dolpack Kids (Ácido Hialurónico + Regaliz) x10ml", precio: 12879, categoria: "Más Vendidos", imagen: "/nenepack.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 77, nombre: "Solomoxy (Amoxicilina 500mg) x60 Caps", precio: 18000, categoria: "Más Vendidos", imagen: "/solo.png", stock: 20, masVendido: true },
  { id: 79, nombre: "Cefalexina 500mg x50 Caps (Anglo)", precio: 27200, categoria: "Más Vendidos", imagen: "/ceprax.png", stock: 20, masVendido: true },
  { id: 80, nombre: "Amdelt (Ampicilina 500mg) x100 Caps", precio: 33500, categoria: "Más Vendidos", imagen: "/ampidelta.png", stock: 20, masVendido: true },
  { id: 82, nombre: "Buscapina Compuesta x30 Comp", precio: 41000, categoria: "Más Vendidos", imagen: "/bc.png", stock: 40, masVendido: true },
  { id: 83, nombre: "Skin-Mantle (Acetato de Aluminio) x120ml", precio: 2572, categoria: "Más Vendidos", imagen: "/skin.png", stock: 0, masVendido: true, ivaIncluido: true },
  { id: 84, nombre: "Clonidina 0.150mg x50 Tbs (Anglo)", precio: 8600, categoria: "Más Vendidos", imagen: "/clon.png", stock: 20, masVendido: true },

  { id: 85, nombre: "Rhinospray (Furoato de Mometasona) 0.05 x18ml", precio: 20400, categoria: "Más Vendidos", imagen: "/rhino.png", stock: 0, masVendido: true },
  { id: 86, nombre: "Alka-Seltzer x60 Tab (Bayer)", precio: 40900, categoria: "Más Vendidos", imagen: "/alka.png", stock: 20, masVendido: true },
  { id: 87, nombre: "Electrolit x625ml", precio: 6800, categoria: "Más Vendidos", imagen: "/elec.png", stock: 20, masVendido: true },
  { id: 88, nombre: "Muvett S (Trimebutina 200mg + Simeticona 120mg) x21 Tbs", precio: 35000, categoria: "Más Vendidos", imagen: "/muvetts.png", stock: 0, masVendido: true },
  { id: 89, nombre: "Enterogermina 2000 Millones/5ml", precio: 55800, categoria: "Más Vendidos", imagen: "/entero.png", stock: 60, masVendido: true },
  { id: 90, nombre: "Manteca de Cacao Zica x12 Und Tipo Labial", precio: 3080, categoria: "Más Vendidos", imagen: "/zica.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 91, nombre: "Trivag Fem (Solución Vaginal) x120ml (Tridex)", precio: 9583, categoria: "Más Vendidos", imagen: "/triv.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 92, nombre: "Vaselina Pura Kevs x470gr", precio: 12370, categoria: "Más Vendidos", imagen: "/v470.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 93, nombre: "Aspirina Efervescente x50 Tbs", precio: 40900, categoria: "Más Vendidos", imagen: "/aspie.png", stock: 20, masVendido: true },
  { id: 94, nombre: "Hydrastick Protector Labial (Totalmax)", precio: 6000, categoria: "Más Vendidos", imagen: "/hydrastick.png", stock: 0, masVendido: true },

  { id: 95, nombre: "K-Llosíl x20ml", precio: 13200, categoria: "Más Vendidos", imagen: "/kllo.png", stock: 20, masVendido: true },
  { id: 96, nombre: "A-Listant Prueba de Embarazo Cassette x1 Und", precio: 1500, categoria: "Más Vendidos", imagen: "/prube.png", stock: 20, masVendido: true },
  { id: 97, nombre: "Sevedol Extra Fuerte x60 Tbs", precio: 66400, categoria: "Más Vendidos", imagen: "/s60d.png", stock: 100, masVendido: true },
  { id: 98, nombre: "Lumbal Forte x36 Tbs", precio: 56500, categoria: "Más Vendidos", imagen: "/lumbal.png", stock: 20, masVendido: true },
  { id: 99, nombre: "Dolorsin Fem x36 Cap", precio: 44000, categoria: "Más Vendidos", imagen: "/dolorfem.png", stock: 20, masVendido: true },
  { id: 100, nombre: "Vitaril Gel Tópico Castaño de Indias x60gr", precio: 25109, categoria: "Cremas y Ungüentos", imagen: "/vitatril.png", stock: 20, ivaIncluido: true },
{ id: 102, nombre: "Solhidrex (Sales de Rehidratación Oral) x30 Sobres", precio: 58000, categoria: "Más Vendidos", imagen: "/solhidrex.png", stock: 20, masVendido: true },
{ id: 103, nombre: "Dolofen 500mg (Acetaminofén) x60 Caps", precio: 27000, categoria: "Más Vendidos", imagen: "/dolo.png", stock: 20, masVendido: true },
{ id: 104, nombre: "Vaselina de Limón en Lata x12 Und", precio: 4104, categoria: "Más Vendidos", imagen: "/vl.png", stock: 20, masVendido: true, ivaIncluido: true },
{ id: 105, nombre: "Bispeptol (Diosmectita) x9 Sobres de 3gr", precio: 18800, categoria: "Más Vendidos", imagen: "/bisp.png", stock: 0, masVendido: true },
{ id: 111, nombre: "Mareol (Dimenhidrinato) 50mg x72 Tbs", precio: 46000, categoria: "Más Vendidos", imagen: "/mareol.png", stock: 20, masVendido: true },

{ id: 112, nombre: "Tacna (Sultamicilina) 375mg x10 Tbs", precio: 34800, categoria: "Más Vendidos", imagen: "/tac.png", stock: 0, masVendido: true },
{ id: 114, nombre: "Redoxon Total x20 Tbs", precio: 32823, categoria: "Más Vendidos", imagen: "/redo.png", stock: 30, masVendido: true, ivaIncluido: true },
{ id: 115, nombre: "Beclorin Beclometasona Nasal", precio: 11600, categoria: "Más Vendidos", imagen: "/beclorin.png", stock: 0, masVendido: true }, // Próximo a llegar
{ id: 118, nombre: "Acnotin (Isotretinoina) USP 20 mg x30 Caps", precio: 78000, categoria: "Más Vendidos", imagen: "/acno.png", stock: 0, masVendido: true },
{ id: 119, nombre: "Zincovit Vitamina C + Zinc x100 Tbs", precio: 20800, categoria: "Más Vendidos", imagen: "/zincovit.png", stock: 20, masVendido: true },
{ id: 120, nombre: "Pranexxin (Nitazoxanida 500mg) x6 Tbs", precio: 10500, categoria: "Más Vendidos", imagen: "/pranexx.png", stock: 200, masVendido: true },
{ id: 121, nombre: "Vyasil (Sildenafilo 50mg) x2 Tbs", precio: 2900, categoria: "Más Vendidos", imagen: "/vyasil.png", stock: 20, masVendido: true },

{ id: 122, nombre: "Metformina 850mg x250 Tbs", precio: 60700, categoria: "Más Vendidos", imagen: "/met250.png", stock: 20, masVendido: true },
{ id: 123, nombre: "Lindazol x3 Ovulos", precio: 18600, categoria: "Más Vendidos", imagen: "/lindaovu.png", stock: 20, masVendido: true },
{ id: 124, nombre: "Neubalin 75mg x30 Caps", precio: 16300, categoria: "Más Vendidos", imagen: "/neu.png", stock: 0, masVendido: true }, // Próximo a llegar
{ id: 125, nombre: "Bisacodilo 5mg x100 Tbs (Humax)", precio: 12000, categoria: "Más Vendidos", imagen: "/bhum.png", stock: 20, masVendido: true },
{ id: 126, nombre: "Ibunflash Migran x30 Caps", precio: 55000, categoria: "Más Vendidos", imagen: "/ibuflashx30.png", stock: 20, masVendido: true },
{ id: 127, nombre: "Ibunflash Migran x8 Caps", precio: 14600, categoria: "Más Vendidos", imagen: "/i88.png", stock: 20, masVendido: true },

//GENFAR//
{ id: 128, nombre: "Silimarina 150mg x20 Cap (GF)", precio: 15600, categoria: "Genfar", imagen: "/silima.png", stock: 20 },
{ id: 129, nombre: "Ibuprofeno 800mg x50 Tbs (GF)", precio: 9200, categoria: "Genfar", imagen: "/ibu800gf.png", stock: 50 },
{ id: 130, nombre: "Metronidazol 500mg x100 Tbs (GF)", precio: 15600, categoria: "Genfar", imagen: "/m5100.png", stock: 20 },
{ id: 131, nombre: "Quetiapina 25mg x30 Comp (GF)", precio: 9000, categoria: "Genfar", imagen: "/que.png", stock: 0 }, // Próximo a llegar
{ id: 132, nombre: "Tamsulosina Clorhidrato 0.4mg x30 Cap (GF)", precio: 25000, categoria: "Genfar", imagen: "/tansgf.png", stock: 20 },
{ id: 133, nombre: "Cefalexina 500mg x10 Cap (GF)", precio: 5400, categoria: "Genfar", imagen: "/cefgf.png", stock: 100 },
{ id: 134, nombre: "Dexametasona 8mg/2ml x10 Amp (GF)", precio: 16500, categoria: "Genfar", imagen: "/dgf.png", stock: 0 },
{ id: 135, nombre: "Lansoprazol 30mg x14 Cap (GF)", precio: 8000, categoria: "Genfar", imagen: "/langf.png", stock: 20 },
{ id: 136, nombre: "Azitromicina 200mg/5ml x15ml (suspensión) (GF)", precio: 9500, categoria: "Genfar", imagen: "/azisgf.png", stock: 0 }, // Próximo a llegar
{ id: 137, nombre: "Amoxicilina 500mg x50 Caps (GF)", precio: 17800, categoria: "Genfar", imagen: "/amogf.png", stock: 0 },
{ id: 1137, nombre: "Amoxicilina Suspensión 250mg x100 ml (GF)", precio: 6000, categoria: "Genfar", imagen: "/agf2.png", stock: 100 },
{ id: 138, nombre: "Carvedilol 6,25 mg x30 Tbs (GF)", precio: 7900, categoria: "Genfar", imagen: "/c6gf.png", stock: 100 }, // Próximo a llegar

{ id: 139, nombre: "Tramadol 50mg x10 Caps (GF)", precio: 8100, categoria: "Genfar", imagen: "/tgf.png", stock: 0 },
{ id: 140, nombre: "Fluconazol 200mg x4 Caps (GF)", precio: 7200, categoria: "Genfar", imagen: "/flgf.png", stock: 0 },
{ id: 141, nombre: "Doxiciclina 100mg x10 Tbs (GF)", precio: 5700, categoria: "Genfar", imagen: "/doxicigf.png", stock: 50 },
{ id: 142, nombre: "Cefalexina Suspensión 250mg x60ml (GF)", precio: 6000, categoria: "Genfar", imagen: "/cesgf.png", stock: 20 },
{ id: 144, nombre: "Diclofenaco 50mg x30 Tbs (GF)", precio: 3500, categoria: "Genfar", imagen: "/d50fgg.png", stock: 0 }, // Próximo a llegar
{ id: 145, nombre: "Diclofenaco 75mg/3ml x10 Amp (GF)", precio: 11800, categoria: "Genfar", imagen: "/digf.png", stock: 100 }, // Próximo a llegar
{ id: 146, nombre: "Lincomicina 600mg/2ml x10 Amp (GF)", precio: 18000, categoria: "Genfar", imagen: "/l600.png", stock: 200 },
{ id: 147, nombre: "Genfar Kids (Ibuprofeno) Suspensión x120ml (GF)", precio: 7000, categoria: "Genfar", imagen: "/gfk.png", stock: 200 },

{ id: 148, nombre: "Trimebutina 200mg x30 Tbs (GF)", precio: 13900, categoria: "Genfar", imagen: "/tgf200.png", stock: 20 },
{ id: 149, nombre: "Valsartán 160mg x14 Tbs (GF)", precio: 12900, categoria: "Genfar", imagen: "/val160.png", stock: 0 },
{ id: 150, nombre: "Ácido Acetilsalicílico 100mg x100 Tbs (GF)", precio: 15600, categoria: "Genfar", imagen: "/aa.png", stock: 120 },
{ id: 151, nombre: "Losartán + Hidroclotiazida 50mg/12.5mg x30 Tbs (GF)", precio: 23000, categoria: "Genfar", imagen: "/lhgf.png", stock: 0 }, // Próximo a llegar
{ id: 152, nombre: "Furosemida 40mg x100 Tbs (GF)", precio: 10500, categoria: "Genfar", imagen: "/fugf.png", stock: 0 },
{ id: 153, nombre: "Pregabalina 75mg x30 Cap (GF)", precio: 20800, categoria: "Genfar", imagen: "/pregaa.png", stock: 40 }, // Próximo a llegar
{ id: 154, nombre: "Diosmina Hesperidina 450mg/50mg x30 Tbs (GF)", precio: 17500, categoria: "Genfar", imagen: "/dhgf4.png", stock: 100 }, // Próximo a llegar
{ id: 155, nombre: "Tinidazol 500mg x8 Tbs (GF)", precio: 3400, categoria: "Genfar", imagen: "/t500gf.png", stock: 0 },
{ id: 156, nombre: "Celecoxib 200mg x10 Caps", precio: 5600, categoria: "Genfar", imagen: "/celogf.png", stock: 20 },
{ id: 157, nombre: "Triconjugada x40gr Genfar (GF)", precio: 18000, categoria: "Genfar", imagen: "/tricogf40.png", stock: 20 },
{ id: 620, nombre: "Triconjugada x20gr Genfar (GF)", precio: 10400, categoria: "Genfar", imagen: "/tricofg20.png", stock: 20 },
{ id: 650, nombre: "Ivermectina Gotas 0.6% x5 ml (GF)", precio: 8200, categoria: "Genfar", imagen: "/ivergf.png", stock: 50 },

{ id: 158, nombre: "Aciclovir Suspensión 100mg/5ml x90ml (GF)", precio: 17700, categoria: "Genfar", imagen: "/asus.png", stock: 20 },
{ id: 159, nombre: "Valsartán 80mg x14 Tbs (GF)", precio: 6200, categoria: "Genfar", imagen: "/val80.png", stock: 0 },
{ id: 160, nombre: "Dicloxacilina 500mg x50 caps GF (GF)", precio: 46800, categoria: "Genfar", imagen: "/dggg.png", stock: 50 }, // Próximo a llegar
{ id: 161, nombre: "Betametasona 0.05% x40gr (GF)", precio: 11500, categoria: "Genfar", imagen: "/bgf005.png", stock: 20 },
{ id: 162, nombre: "Metoclopramida 10mg/2ml x5 Amp (GF)", precio: 17000, categoria: "Genfar", imagen: "/metogf.png", stock: 0 }, // Próximo a llegar
{ id: 164, nombre: "Betametasona 0.1 x40gr (GF)", precio: 14600, categoria: "Genfar", imagen: "/bgf01.png", stock: 67 }, // Próximo a llegar
{ id: 166, nombre: "Etoricoxib 120mg x7 Tbs (GF)", precio: 14800, categoria: "Genfar", imagen: "/eto1.png", stock: 80 },
{ id: 167, nombre: "Naproxeno 250mg x10 Tbs (GF)", precio: 2400, categoria: "Genfar", imagen: "/n25.png", stock: 20 },

{ id: 168, nombre: "Tinidazol 1g x4 Tbs (GF)", precio: 2100, categoria: "Genfar", imagen: "/t1grgf.png", stock: 200 },
{ id: 169, nombre: "Amitriptilina 25mg x30 Tbs (GF)", precio: 5400, categoria: "Genfar", imagen: "/amitrigf.png", stock: 50 },
{ id: 171, nombre: "Hidroclorotiazida 25mg x30 Tbs (GF)", precio: 2600, categoria: "Genfar", imagen: "/h25mg.png", stock: 0 },
{ id: 173, nombre: "Ketoprofeno Gel al 2.5% x40gr (GF)", precio: 16000, categoria: "Genfar", imagen: "/kegf.png", stock: 0 },
{ id: 174, nombre: "N-Acetilcisteína 600mg x10 Sobres (GF)", precio: 14500, categoria: "Genfar", imagen: "/n-a.png", stock: 20 },
{ id: 175, nombre: "Montelukast 10mg x30 Tbs (GF)", precio: 34500, categoria: "Genfar", imagen: "/mont10.png", stock: 20 },
{ id: 177, nombre: "Montelukast 4mg x30 Tbs (GF)", precio: 16300, categoria: "Genfar", imagen: "/mont4.png", stock: 20 },


//NATURALES//
{ id: 20, nombre: "Ginkgo Biloba 120mg x60 Tbs", precio: 10300, categoria: "Naturales", imagen: "/gink.png", stock: 0 },
{ id: 178, nombre: "Colageno 500mg x30 Caps", precio: 12888, categoria: "Naturales", imagen: "/cola.png", stock: 0, ivaIncluido: true },
{ id: 179, nombre: "Omega 3 x30 Caps Naturalmente", precio: 13720, categoria: "Naturales", imagen: "/ome3.png", stock: 20, ivaIncluido: true },
{ id: 180, nombre: "Biotina 900mcg x30 Caps", precio: 14176, categoria: "Naturales", imagen: "/biot.png", stock: 0, ivaIncluido: true },
{ id: 181, nombre: "Vit Max (Complejo B + Zinc) x30 Caps", precio: 13299, categoria: "Naturales", imagen: "/vitmax.png", stock: 0, ivaIncluido: true },
{ id: 182, nombre: "Omega 3 x30 Caps Totalmax", precio: 13712, categoria: "Naturales", imagen: "/ome3to.png", stock: 20, ivaIncluido: true },
{ id: 184, nombre: "Vitamina E + Selenio (1000 UI + 35mcg) x30 Caps", precio: 16100, categoria: "Naturales", imagen: "/ves.png", stock: 20, ivaIncluido: true },
{ id: 185, nombre: "Veramiel Pastillas x24 Sobres x4", precio: 25300, categoria: "Naturales", imagen: "/veramielp.png", stock: 50 },
{ id: 186, nombre: "Lyptus Miel x24 Sobres x5 Pastillas", precio: 25300, categoria: "Naturales", imagen: "/lyps.png", stock: 80 },
{ id: 187, nombre: "Citrato de Magnesio x100 Tbs Masticables", precio: 27000, categoria: "Naturales", imagen: "/cmn.png", stock: 0, ivaIncluido: true },
{ id: 188, nombre: "Cloruro de Magnesio x60 Caps", precio: 19478, categoria: "Naturales", imagen: "/trigo.png", stock: 20, ivaIncluido: true },
{ id: 189, nombre: "Colageno + Biotina x30 Caps (Totalmax)", precio: 13997, categoria: "Naturales", imagen: "/cb.png", stock: 20, ivaIncluido: true },
{ id: 190, nombre: "Complejo B + Zinc x30 Caps (Totalmax)", precio: 13997, categoria: "Naturales", imagen: "/comtot.png", stock: 20, ivaIncluido: true },
{ id: 192, nombre: "Firb-Max x300gr", precio: 18600, categoria: "Naturales", imagen: "/fibr.png", stock: 20 },
{ id: 193, nombre: "Broquisan Tabletas x20 Sobres", precio: 32000, categoria: "Naturales", imagen: "/bpast.png", stock: 20 },
{ id: 194, nombre: "Bronquisan Jalea (Adultos) x240ml", precio: 10000, categoria: "Naturales", imagen: "/badu.png", stock: 20 },
{ id: 195, nombre: "Bronquisan Jalea (Niños) x240ml", precio: 10000, categoria: "Naturales", imagen: "/bkids.png", stock: 20 },
// ===== RECIPE =====
{ id: 197, nombre: "Trazodona Clorhidrato 50 mg x50 Tbs", precio: 10700, categoria: "Recipe", imagen: "/trazo.png", stock: 20 },
{ id: 198, nombre: "Sildenafil 50 mg x2 Tbs", precio: 1000, categoria: "Recipe", imagen: "/silr.png", stock: 200000 },
{ id: 199, nombre: "Desonida al 0,05% x15 Gr", precio: 8500, categoria: "Recipe", imagen: "/desor.png", stock: 50 },          // Próximo a llegar
{ id: 200, nombre: "Ketotifeno 1mg x30 tbs", precio: 6000, categoria: "Recipe", imagen: "/ketotir.png", stock: 100 },       // Próximo a llegar
{ id: 203, nombre: "Zopiclona 7.5 mg x30 Tbs", precio: 13900, categoria: "Recipe", imagen: "/zopi.png", stock: 20 },
{ id: 204, nombre: "Nitrofurantoina 100 mg x40 Tbs", precio: 14000, categoria: "Recipe", imagen: "/nsan.png", stock: 20 },
{ id: 978, nombre: "Bisacodilo 5Mg x100 Tbs", precio: 17500, categoria: "Recipe", imagen: "/bisar.png", stock: 30 },

// ===== ANTIGRIPALES =====
{ id: 205, nombre: "Pax Noche x24 Sobres", precio: 49900, categoria: "Antigripales", imagen: "/paxn.png", stock: 20 },
{ id: 206, nombre: "Pax Día x24 Sobres", precio: 49900, categoria: "Antigripales", imagen: "/paxd.png", stock: 20 },
{ id: 207, nombre: "Respirin Gripa x100 Caps", precio: 25900, categoria: "Antigripales", imagen: "/respi.png", stock: 20 },
{ id: 208, nombre: "Congestex x60 Cap", precio: 44000, categoria: "Antigripales", imagen: "/congcap.png", stock: 20 },
{ id: 210, nombre: "Mieltertos Día x24 Sobres", precio: 41200, categoria: "Antigripales", imagen: "/mield.png", stock: 20 },
{ id: 213, nombre: "Mieltertos Noche x24 Sobres", precio: 41200, categoria: "Antigripales", imagen: "/mielnoc.png", stock: 20 },

{ id: 214, nombre: "Ashar Gripa x100 Cap", precio: 54600, categoria: "Antigripales", imagen: "/ashar.png", stock: 0 },
{ id: 215, nombre: "Noxpirin Noche x24 Sobres", precio: 46000, categoria: "Antigripales", imagen: "/noxno.png", stock: 20 },
{ id: 888, nombre: "Noxpirin Noche x50 Sobres", precio: 82500, categoria: "Antigripales", imagen: "/no50.png", stock: 3 },
{ id: 216, nombre: "Noxpirin Día x24 Sobres", precio: 46000, categoria: "Antigripales", imagen: "/noxdia.png", stock: 20 },
{ id: 217, nombre: "Zetygrip 4 x100 Caps", precio: 37900, categoria: "Antigripales", imagen: "/Zety4.png", stock: 20 },
{ id: 218, nombre: "Noxpirin Plus x100 Caps", precio: 95600, categoria: "Antigripales", imagen: "/nox100.png", stock: 0 },
{ id: 630, nombre: "Noxpirin Plus x48 Caps", precio: 45600, categoria: "Antigripales", imagen: "/noxpi48.png", stock: 20 },
{ id: 219, nombre: "Zetygrip4 Noche x30 Sobres", precio: 35600, categoria: "Antigripales", imagen: "/z4n.png", stock: 20 },
{ id: 220, nombre: "Dolicox Grip Noche x24 Sobres", precio: 28800, categoria: "Antigripales", imagen: "/dolicox.png", stock: 20 },
// ===== MK =====
{ id: 221, nombre: "Com Bonfiest Plus (x20 Bonfiest x6 Duraflex Muscular x6 Noraver Noche)", precio: 75700, categoria: "MK", imagen: "/bonfi.png", stock: 20 },
{ id: 222, nombre: "Combo Sal de Frutas Lua x16 Lua x6 Gastrofast x5 Kola Granulada", precio: 53000, categoria: "MK", imagen: "/comblua.png", stock: 0 },
{ id: 223, nombre: "Levotiroxina 75mg x30 Tbs", precio: 17900, categoria: "MK", imagen: "/lev75.png", stock: 10 }, // Próximo a llegar
{ id: 224, nombre: "Noraver Garganta x12 (Cereza, Menta y Naranja Miel)", precio: 19300, categoria: "MK", imagen: "/11111.png", stock: 100 },
{ id: 225, nombre: "Noraver Garganta x24 (Cereza, Menta y Naranja Miel)", precio: 38400, categoria: "MK", imagen: "/ng24.png", stock: 100 },
{ id: 226, nombre: "Ibuprofeno 800mg x30 Cap Líquidas", precio: 30200, categoria: "MK", imagen: "/ibucapk.png", stock: 50 },
{ id: 227, nombre: "Verapamilo 120mg x30 Tbs", precio: 6500, categoria: "MK", imagen: "/verapa.png", stock: 0 },
{ id: 228, nombre: "Noraver Fast Total (Gripa y Tos) x12 Cap", precio: 27000, categoria: "MK", imagen: "/nf12.png", stock: 20 },
{ id: 229, nombre: "Levotiroxina 25mg x30 Tbs", precio: 16500, categoria: "MK", imagen: "/lev25.png", stock: 20 },

{ id: 230, nombre: "Fenitoina Sódica 100mg x50 Caps", precio: 19500, categoria: "MK", imagen: "/fenit.png", stock: 0 }, // Próximo a llegar
{ id: 231, nombre: "ASA 100mg (Ácido Acetilsalicílico) x100 Tbs", precio: 24400, categoria: "MK", imagen: "/asa.png", stock: 20 },
{ id: 232, nombre: "Vitamina C x100 Tbs", precio: 44700, categoria: "MK", imagen: "/vitacmk.png", stock: 20 },
{ id: 233, nombre: "Norfloxacina 400mg x14 Tbs", precio: 7800, categoria: "MK", imagen: "/normk.png", stock: 0 },
{ id: 234, nombre: "Enalapril 20mg x30 Tbs", precio: 7800, categoria: "MK", imagen: "/enalamk.png", stock: 0 },
{ id: 235, nombre: "Levotiroxina 100mcg x30 Tbs", precio: 18800, categoria: "MK", imagen: "/lev100.png", stock: 6 },
{ id: 237, nombre: "Hidróxido de Magnesio 120ml", precio: 7300, categoria: "MK", imagen: "/hmag.png", stock: 40 },
{ id: 238, nombre: "Diclofenaco 100mg x20 Caps", precio: 14800, categoria: "MK", imagen: "/diclomk.png", stock: 100 },
{ id: 619, nombre: "Crema Blankisima x32 Gr", precio: 16500, categoria: "MK", imagen: "/blankisima.png", stock: 20 },
{ id: 680, nombre: "Ungüento #2 tubo x12 Gr", precio: 9500, categoria: "MK", imagen: "/n2.png", stock: 20 },

{ id: 239, nombre: "Alivrub x12 Latas", precio: 43400, categoria: "MK", imagen: "/alivrub.png", stock: 0 },
{ id: 240, nombre: "Yodora Clásico x32 Gr x2", precio: 16474, categoria: "MK", imagen: "/32x2.png", stock: 50, ivaIncluido: true },
{ id: 624, nombre: "Yodora Clásico x60 Gr x2", precio: 27965, categoria: "MK", imagen: "/60x2.png", stock: 50, ivaIncluido: true },
{ id: 625, nombre: "Yodora Clásico 60+32 Gr", precio: 23800, categoria: "MK", imagen: "/6032.png", stock: 50, ivaIncluido: true },
{ id: 242, nombre: "Noraver Noche x6 Sobres 15gr", precio: 14700, categoria: "MK", imagen: "/nora6.png", stock: 30 },
{ id: 243, nombre: "Noraver Día x12 Sobres 15gr", precio: 29400, categoria: "MK", imagen: "/nora12.png", stock: 20 },
{ id: 244, nombre: "Nitrofurantoina 100mg x40 Cap", precio: 26000, categoria: "MK", imagen: "/nitro.png", stock: 0 },
{ id: 245, nombre: "Metronidazol x10 Óvulos Mk", precio: 12000, categoria: "MK", imagen: "/momk.png", stock: 20 },
{ id: 246, nombre: "Gastrofast x12 Sachets", precio: 30700, categoria: "MK", imagen: "/gasmk.png", stock: 0 },


{ id: 249, nombre: "Levotiroxina Sódica 50mcg x30 Tbs", precio: 16800, categoria: "MK", imagen: "/lev50.png", stock: 30 },
{ id: 251, nombre: "Piroxicam 20mg x10 Caps", precio: 4500, categoria: "MK", imagen: "/piromk.png", stock: 150 },
{ id: 252, nombre: "Vick Vaporub x50gr", precio: 15000, categoria: "MK", imagen: "/vickp.png", stock: 0 },
{ id: 253, nombre: "Carvedilol 6.25mg x30 Tbs", precio: 9500, categoria: "MK", imagen: "/carmk6.png", stock: 20 },
{ id: 254, nombre: "Levotiroxina Sódica 125mcg x30 Tbs", precio: 28800, categoria: "MK", imagen: "/lev125.png", stock: 0 },
{ id: 255, nombre: "Levotiroxina Sódica 150mcg x30 Tbs", precio: 32000, categoria: "MK", imagen: "/lev150.png", stock: 0 },

// ===== BIOQUIFAR =====
{ id: 222, nombre: "Fungisterol Shampoo de 100ml", precio: 13800, categoria: "Bioquifar", imagen: "/fun100.png", stock: 100 },
{ id: 223, nombre: "Fungisterol Shampoo de 200ml", precio: 24900, categoria: "Bioquifar", imagen: "/fun200.png", stock: 100 },
{ id: 224, nombre: "Cortisolona Hidrocortisona Loción x30g", precio: 3200, categoria: "Bioquifar", imagen: "/corti.png", stock: 30 },
{ id: 227, nombre: "Lamdotil x16 Tbs", precio: 9500, categoria: "Bioquifar", imagen: "/lando.png", stock: 0 },
{ id: 228, nombre: "Zifluvis 200mg x30 Sobres de 3gr", precio: 20400, categoria: "Bioquifar", imagen: "/ziflu200.png", stock: 0 },
{ id: 229, nombre: "Warfar (Warfarina Sódica) 5mg x30 Tbs", precio: 12100, categoria: "Bioquifar", imagen: "/war.png", stock: 20 },
{ id: 230, nombre: "Bupiridol (Acetaminofén 325mg + Codeína 30mg) x30 Tbs", precio: 12000, categoria: "Bioquifar", imagen: "/bupi.png", stock: 5 },
{ id: 231, nombre: "Pirel (Pamoato de Pirantel) Suspensión x30ml", precio: 3500, categoria: "Bioquifar", imagen: "/pirelsss.png", stock: 40 },
{ id: 651, nombre: "Pirel (Pamoato de Pirantel) 250mg x6 Tbs", precio: 7800, categoria: "Bioquifar", imagen: "/pm6.png", stock: 20 },
{ id: 233, nombre: "Sertranquil (Sertralina 100mg) x10 Tbs", precio: 11200, categoria: "Bioquifar", imagen: "/sertranquil.png", stock: 20 },
{ id: 234, nombre: "Cindimizol (Fluconazol) 200mg x5 Caps", precio: 7700, categoria: "Bioquifar", imagen: "/cindi.png", stock: 120 },


{ id: 240, nombre: "Zivical (Carbonato de Calcio) 600mg x30 Tbs", precio: 10000, categoria: "Bioquifar", imagen: "/zivi.png", stock: 0 },
{ id: 241, nombre: "Zivical-D (Vitamina D3 200UI + Calcio 600mg) x20 Tbs", precio: 8300, categoria: "Bioquifar", imagen: "/zivid.png", stock: 20 },
{ id: 246, nombre: "Lozarten (Losartán) 100mg x30 Tbs", precio: 9700, categoria: "Bioquifar", imagen: "/lten.png", stock: 0 },
{ id: 247, nombre: "Dosaldin x20 Tbs", precio: 15900, categoria: "Bioquifar", imagen: "/dosal.png", stock: 40 },
{ id: 250, nombre: "Espamydol (Ibuprofeno 500mg + Metocarbamol 200mg) x20 Tbs", precio: 18800, categoria: "Bioquifar", imagen: "/espa.png", stock: 0 },
{ id: 252, nombre: "Ainedix (Aceclofenaco) 100mg x10 Tbs", precio: 7300, categoria: "Bioquifar", imagen: "/ained.png", stock: 50 },
{ id: 254, nombre: "Diglufor (Metformina) 850mg x30 Tab", precio: 9800, categoria: "Bioquifar", imagen: "/DIGLU.png", stock: 0 },
{ id: 255, nombre: "Metroxazide (Metronidazol + Nifuroxazide) x18 Tbs", precio: 14000, categoria: "Bioquifar", imagen: "/zide.png", stock: 100 },

{ id: 259, nombre: "ActiViral (Aciclovir 800mg) x10 Tbs", precio: 13400, categoria: "Bioquifar", imagen: "/acti.png", stock: 0 },
{ id: 260, nombre: "Vaio (Betahistina) 8mg x30 Tbs", precio: 21800, categoria: "Bioquifar", imagen: "/vaio.png", stock: 0 },
{ id: 261, nombre: "Verelis (Tadalafilo 5mg) x4 Tbs", precio: 9000, categoria: "Bioquifar", imagen: "/vere.png", stock: 200 },
{ id: 262, nombre: "Mebicitrof (Metronidazol) Suspensión x120ml", precio: 7400, categoria: "Bioquifar", imagen: "/mebi.png", stock: 0 },
{ id: 263, nombre: "Fungisterol (Ketoconazol) 2% x30gr", precio: 6400, categoria: "Bioquifar", imagen: "/fungkc.png", stock: 100 },



// ===== LAPROFF =====
{ id: 266, nombre: "Loratadina 10mg x400 Tbs", precio: 37500, categoria: "Laproff", imagen: "/lora400.png", stock: 20 },
{ id: 267, nombre: "Losartán Potásico 50mg x300 Tbs", precio: 24400, categoria: "Laproff", imagen: "/l50lp.png", stock: 5 },
{ id: 268, nombre: "Amoxicilina 500mg x300 Caps", precio: 83800, categoria: "Laproff", imagen: "/amo300lp.png", stock: 10 },
{ id: 269, nombre: "Nitrofurantoína 100mg x300 Caps", precio: 103000, categoria: "Laproff", imagen: "/nitrolp.png", stock: 0 },
{ id: 270, nombre: "Metocarbamol 750mg x300 Tbs", precio: 93200, categoria: "Laproff", imagen: "/mlp.png", stock: 20 },
{ id: 271, nombre: "Ibuprofeno 400mg x300 Tbs", precio: 47900, categoria: "Laproff", imagen: "/i400.png", stock: 20 },
{ id: 272, nombre: "Ibuprofeno 800mg x300 Tbs", precio: 52500, categoria: "Laproff", imagen: "/i800.png", stock: 20 },
{ id: 273, nombre: "Tiamina 300mg x250 Tbs", precio: 39700, categoria: "Laproff", imagen: "/tiaa.png", stock: 7 },
{ id: 274, nombre: "Carbamazepina 200mg x300 Tbs", precio: 125000, categoria: "Laproff", imagen: "/car300.png", stock: 4 }, // Próximo a llegar
{ id: 811, nombre: "Esomeprazol 20mg x100 Tbs", precio: 51800, categoria: "Laproff", imagen: "/e40pp.png", stock: 20 },

{ id: 275, nombre: "Naproxeno 500mg x300 Tbs", precio: 83600, categoria: "Laproff", imagen: "/nap500.png", stock: 20 },
{ id: 276, nombre: "Naproxeno 250mg x300 Tbs", precio: 58900, categoria: "Laproff", imagen: "/n.png", stock: 10 },
{ id: 277, nombre: "Acetaminofén 500mg x300 Tbs", precio: 15500, categoria: "Laproff", imagen: "/acet300lp.png", stock: 120 },
{ id: 278, nombre: "Sulfato Ferroso 300mg x300 Tbs", precio: 26300, categoria: "Laproff", imagen: "/sflp.png", stock: 10 },
{ id: 279, nombre: "Sildenafilo 50mg x50 Tbs", precio: 19300, categoria: "Laproff", imagen: "/slp50.png", stock: 8 },
{ id: 280, nombre: "Ácido Fólico 1mg x400 Tbs", precio: 27900, categoria: "Laproff", imagen: "/aflp1mg.png", stock: 10 },
{ id: 281, nombre: "Amitriptilina 25mg x400 Tbs", precio: 43400, categoria: "Laproff", imagen: "/ami25lp.png", stock: 10 },
{ id: 282, nombre: "Albendazol 200mg x50 Tbs", precio: 18800, categoria: "Laproff", imagen: "/al200.png", stock: 0 },
{ id: 283, nombre: "Cetirizina 10mg x400 Tbs", precio: 35600, categoria: "Laproff", imagen: "/ceti400.png", stock: 20 },

{ id: 284, nombre: "Diclofenaco 50mg x400 Tbs", precio: 33200, categoria: "Laproff", imagen: "/di400.png", stock: 10 },
{ id: 285, nombre: "Acetaminofén Gotas x30ml", precio: 4300, categoria: "Laproff", imagen: "/acesus.png", stock: 20 },
{ id: 286, nombre: "Betametasona 0.1% x40gr", precio: 4900, categoria: "Laproff", imagen: "/betame001lp.png", stock: 120 },
{ id: 287, nombre: "Hidroclorotiazida 25mg x400 Tbs", precio: 25200, categoria: "Laproff", imagen: "/hr400.png", stock: 10 },
{ id: 288, nombre: "Aciclovir 800mg x50 Tbs", precio: 42500, categoria: "Laproff", imagen: "/aci800.png", stock: 20 },
{ id: 289, nombre: "Prednisolona 5mg x100 Tbs", precio: 8400, categoria: "Laproff", imagen: "/pred100.png", stock: 70 },
{ id: 290, nombre: "Loperamida 2mg x240 Tbs", precio: 59500, categoria: "Laproff", imagen: "/lope240.png", stock: 20 },
{ id: 291, nombre: "Atorvastatina 20mg x50 Tbs", precio: 6500, categoria: "Laproff", imagen: "/at20.png", stock: 20 },
{ id: 292, nombre: "Minoxidil 5% x60ml", precio: 16400, categoria: "Laproff", imagen: "/minox.png", stock: 50 },

{ id: 293, nombre: "Atorvastatina 40mg x30 Tbs", precio: 18200, categoria: "Laproff", imagen: "/atv40.png", stock: 20 },
{ id: 294, nombre: "Amlodipino 5mg x10 Tbs", precio: 1400, categoria: "Laproff", imagen: "/pino.png", stock: 100 },
{ id: 295, nombre: "Aciclovir 800mg x10 Tbs", precio: 9200, categoria: "Laproff", imagen: "/aci81.png", stock: 20 },
{ id: 296, nombre: "Levofloxacina 500mg x7 Tbs", precio: 13900, categoria: "Laproff", imagen: "/le507.png", stock: 50 },
{ id: 297, nombre: "Loperamida 2mg x6 Tbs", precio: 2400, categoria: "Laproff", imagen: "/lope6.png", stock: 50 },
{ id: 298, nombre: "Carbamazepina 200mg x30 Tbs", precio: 12600, categoria: "Laproff", imagen: "/carba30.png", stock: 20 },
{ id: 299, nombre: "Hioscina N-Bromuro 10mg x50 Tbs", precio: 15000, categoria: "Laproff", imagen: "/hiosc.png", stock: 60 },
{ id: 300, nombre: "Colchicina 0.5mg x40 Tbs", precio: 4700, categoria: "Laproff", imagen: "/colh.png", stock: 50 },
{ id: 301, nombre: "Espironolactona 25mg x20 Tbs", precio: 5800, categoria: "Laproff", imagen: "/espi20.png", stock: 0 },
{ id: 633, nombre: "Zopiclona 7,5mg x50 Tbs", precio: 18500, categoria: "Laproff", imagen: "/zopi50lp.png", stock: 60 },

{ id: 302, nombre: "Betahistina Diclorhidrato 8mg x20 Tbs", precio: 21000, categoria: "Laproff", imagen: "/blp8m.png", stock: 40 },
{ id: 303, nombre: "Clotrimazol Tópica 1% x40gr", precio: 3800, categoria: "Laproff", imagen: "/clotplp.png", stock: 20 },
{ id: 304, nombre: "Clotrimazol 1% Solución Tópica x30ml", precio: 3500, categoria: "Laproff", imagen: "/clo1s.png", stock: 140 },
{ id: 305, nombre: "Tadalafilo 20mg x4 Tbs", precio: 7000, categoria: "Laproff", imagen: "/tadalp.png", stock: 70 },
{ id: 306, nombre: "Metoprolol 50mg x30 Tbs", precio: 6000, categoria: "Laproff", imagen: "/melp.png", stock: 50 },
{ id: 307, nombre: "Orocal + D Calcio 600mg + Vit D3 200UI x30 Tbs", precio: 11800, categoria: "Laproff", imagen: "/orod.png", stock: 10 },
{ id: 308, nombre: "Betametasona 0.05% x40gr", precio: 5000, categoria: "Laproff", imagen: "/betam005lp.png", stock: 100 },
{ id: 309, nombre: "Clobetasol Propionato 0.05% x40gr", precio: 6900, categoria: "Laproff", imagen: "/clobelp.png", stock: 125 },
{ id: 310, nombre: "Aciclovir Ungüento 5% x15gr", precio: 5400, categoria: "Laproff", imagen: "/aci15.png", stock: 0 },

{ id: 311, nombre: "Furosemida 40mg x300 Tbs", precio: 29000, categoria: "Laproff", imagen: "/f40lp.png", stock: 5 },
{ id: 312, nombre: "Mometasona Furoato 0.1% x15gr", precio: 14300, categoria: "Laproff", imagen: "/momelp.png", stock: 30 }, // Próximo a llegar
{ id: 313, nombre: "Cefalexina 500mg x100 Caps", precio: 59600, categoria: "Laproff", imagen: "/cefa500.png", stock: 12 },
{ id: 314, nombre: "Ácido Fusídico 2% x15gr", precio: 5900, categoria: "Laproff", imagen: "/aflp.png", stock: 35 },
{ id: 315, nombre: "Desloratadina 5mg x10 Tbs", precio: 5200, categoria: "Laproff", imagen: "/dlp5.png", stock: 60 },
{ id: 316, nombre: "Acetaminofén 325mg + Fosfato de Codeína 30mg x100 Tbs", precio: 52800, categoria: "Laproff", imagen: "/acode.png", stock: 21 },
{ id: 317, nombre: "Orocal 600mg x30 Tbs", precio: 12700, categoria: "Laproff", imagen: "/oro.png", stock: 40 },
{ id: 318, nombre: "Enerzinc x90ml", precio: 6500, categoria: "Laproff", imagen: "/ener.png", stock: 27 },
{ id: 319, nombre: "Clotrimazol Vaginal 1% x40gr", precio: 5200, categoria: "Laproff", imagen: "/cvlp.png", stock: 30 },
{ id: 631, nombre: "Clopidogrel 75mg x10 Tbs", precio: 7100, categoria: "Laproff", imagen: "/copid.png", stock: 30 },

{ id: 320, nombre: "Desloratadina 60ml", precio: 5000, categoria: "Laproff", imagen: "/deslolp.png", stock: 140 },
{ id: 321, nombre: "Guayaprof 120ml", precio: 3600, categoria: "Laproff", imagen: "/guaya.png", stock: 145 },
{ id: 322, nombre: "Ambroxol Pediátrico x120ml", precio: 5900, categoria: "Laproff", imagen: "/ambn.png", stock: 70 },
{ id: 323, nombre: "Ambroxol Adulto x120ml", precio: 5900, categoria: "Laproff", imagen: "/ambad.png", stock: 110 },
{ id: 324, nombre: "Ketotifeno 100ml", precio: 3600, categoria: "Laproff", imagen: "/feno.png", stock: 150 },
{ id: 325, nombre: "Salbutamol 120ml", precio: 3400, categoria: "Laproff", imagen: "/sallp.png", stock: 0 },
{ id: 326, nombre: "Loratadina 100ml", precio: 4400, categoria: "Laproff", imagen: "/ljr.png", stock: 200 },
{ id: 327, nombre: "Sulfato Ferroso 120ml", precio: 4100, categoria: "Laproff", imagen: "/s12.png", stock: 40 },
{ id: 328, nombre: "Difenhidramina 120ml", precio: 4400, categoria: "Laproff", imagen: "/difenlp.png", stock: 100 },
{ id: 329, nombre: "Esomeprazol 40mg x100 Tbs", precio: 89600, categoria: "Laproff", imagen: "/eee40.png", stock: 7 },
{ id: 632, nombre: "Ketoconazol 200mg x300 Tbs", precio: 120000, categoria: "Laproff", imagen: "/keto300.png", stock: 8 },

// ===== ECAR =====
{ id: 333, nombre: "Complejo B x250 Tbs", precio: 18800, categoria: "Ecar", imagen: "/cm250e.png", stock: 25 },
{ id: 334, nombre: "Ceterizina 10mg x400 Tbs", precio: 34300, categoria: "Ecar", imagen: "/cet400.png", stock: 12 },
{ id: 336, nombre: "Tiamina 300mg x250 Tbs", precio: 31300, categoria: "Ecar", imagen: "/tia.png", stock: 0 },
{ id: 337, nombre: "Dipirona 500mg x50 Tbs", precio: 14000, categoria: "Ecar", imagen: "/dipiro.png", stock: 160 },
{ id: 339, nombre: "Losartán 50mg x300 Tbs", precio: 22000, categoria: "Ecar", imagen: "/losar300.png", stock: 70 },
{ id: 1039, nombre: "Losartán + Hidroclorotiazida 50 + 12.5 mg x30 Tbs", precio: 17500, categoria: "Ecar", imagen: "/lh30e.png", stock: 70 },
{ id: 340, nombre: "Clorferinamina 4mg x20 tbs", precio: 2400, categoria: "Ecar", imagen: "/clorcec.png", stock: 450 },
{ id: 343, nombre: "Complejo B Jarabe x120ml", precio: 6900, categoria: "Ecar", imagen: "/cbjbr.png", stock: 0 },
{ id: 344, nombre: "Trimetoprim Sulfa 40mg + 200mg/5ml x120ml", precio: 5400, categoria: "Ecar", imagen: "/tri40120.png", stock: 25 },
{ id: 345, nombre: "Trimetoprim Sulfa 40mg + 200mg/5ml x60ml", precio: 3300, categoria: "Ecar", imagen: "/t60ml.png", stock: 0 },
{ id: 346, nombre: "Trimetoprim Sulfa 80mg + 400mg/5ml x120ml", precio: 7900, categoria: "Ecar", imagen: "/tri80120.png", stock: 25 },

{ id: 612, nombre: "Vitamina C Vical x100 tbs", precio: 22900, categoria: "Ecar", imagen: "/vvcal.png", stock: 0 },
{ id: 615, nombre: "Pasedol 50mg x100 tbs", precio: 22900, categoria: "Ecar", imagen: "/pdol.png", stock: 50 },
{ id: 622, nombre: "Complejo b 10 ml x1 vial (Ecar)", precio: 6500, categoria: "Ecar", imagen: "/cb10ml.png", stock: 120 },
{ id: 623, nombre: "Tiamina 10 ml x1 vial (Ecar)", precio: 5400, categoria: "Ecar", imagen: "/tia10ml.png", stock: 120 },
{ id: 693, nombre: "Vitamina B12 x10 x1 vial (Ecar)", precio: 9500, categoria: "Ecar", imagen: "/b1210.png", stock: 0 },
// ===== COLMED =====
{ id: 350, nombre: "Levotiroxina 100mcg x30 Tbs", precio: 9000, categoria: "Colmed", imagen: "/lev1003.png", stock: 100 }, // Próximo a llegar
{ id: 351, nombre: "Esomeprazol 20mg x30 Tbs", precio: 21700, categoria: "Colmed", imagen: "/eso20c.png", stock: 15 },
{ id: 355, nombre: "Complejo B 2ml x3 Amp", precio: 9700, categoria: "Colmed", imagen: "/cbx3.png", stock: 30 }, 
{ id: 358, nombre: "Levotiroxina Sódica 50mcg x30 Tbs", precio: 8700, categoria: "Colmed", imagen: "/l50co3.png", stock: 100 }, // Próximo a llegar
{ id: 958, nombre: "Levotiroxina Sódica 50mcg x150 Tbs", precio: 28000, categoria: "Colmed", imagen: "/le50150.png", stock: 100 }, 
{ id: 359, nombre: "Metronidazol 500mg x10 Óvulos", precio: 9000, categoria: "Colmed", imagen: "/movu.png", stock: 200 },
{ id: 361, nombre: "Gentamicina Gotas 0.3% x6ml", precio: 5700, categoria: "Colmed", imagen: "/gentac.png", stock: 142 },
{ id: 362, nombre: "Beta + Beta 1ml x1 Amp", precio: 9500, categoria: "Colmed", imagen: "/beta1ml.png", stock: 0 },
{ id: 364, nombre: "Trimebutina + Simeticona 200mg/120mg x30 Tbs", precio: 56200, categoria: "Colmed", imagen: "/ts56.png", stock: 0 },
{ id: 366, nombre: "Vitamina E 400 U.I x100 Cap", precio: 26700, categoria: "Colmed", imagen: "/veco1.png", stock: 8 }, // Próximo a llegar
// ===== COASPHARMA =====
{ id: 367, nombre: "Glibenclamida 5mg x30 Tbs", precio: 1900, categoria: "CoasPharma", imagen: "/glibe.png", stock: 110 },
{ id: 368, nombre: "Secnidazol 500mg", precio: 3400, categoria: "CoasPharma", imagen: "/sec500c.png", stock: 120 },
{ id: 369, nombre: "Amlodipino 5mg x10 Tbs", precio: 1500, categoria: "CoasPharma", imagen: "/am5mg.png", stock: 400 },
{ id: 370, nombre: "Metoclopramida 10mg x30 Tbs", precio: 2900, categoria: "CoasPharma", imagen: "/mtcc.png", stock: 70 },
{ id: 371, nombre: "Propanolol 40mg x20 Tbs", precio: 1700, categoria: "CoasPharma", imagen: "/propa.png", stock: 200 },
{ id: 372, nombre: "Clorfeniramina Maleato 4mg x20 Tbs", precio: 2300, categoria: "CoasPharma", imagen: "/clorco.png", stock: 0 },
{ id: 373, nombre: "Prednisolona 5mg x30 Tbs", precio: 2900, categoria: "CoasPharma", imagen: "/pred30.png", stock: 20 },
{ id: 374, nombre: "Piroxicam 20mg x10 Cap", precio: 3300, categoria: "CoasPharma", imagen: "/piroxx.png", stock: 20 },
{ id: 633, nombre: "Norfloxacino 400mg x20 Tbs", precio: 7500, categoria: "CoasPharma", imagen: "/norco.png", stock: 60 },
{ id: 636, nombre: "Trimebutina 200mg x20 Tbs", precio: 8600, categoria: "CoasPharma", imagen: "/tri20.png", stock: 70 },
{ id: 637, nombre: "Loratadina 10mg x10 Tbs", precio: 1300, categoria: "CoasPharma", imagen: "/lco10m.png", stock: 80 },
{ id: 639, nombre: "Trimetoprima + Sulfametoxazol 160/800 mg x10 Tbs", precio: 4300, categoria: "CoasPharma", imagen: "/tsco.png", stock: 140 },

{ id: 376, nombre: "Amoxicilina 500mg x100 Caps", precio: 28900, categoria: "CoasPharma", imagen: "/amo100.png", stock: 20 },
{ id: 377, nombre: "Claritromicina 500mg x10 Tbs", precio: 17800, categoria: "CoasPharma", imagen: "/clari.png", stock: 6 }, // Próximo a llegar
{ id: 379, nombre: "Fluoxetina 20mg x14 Tbs", precio: 2200, categoria: "CoasPharma", imagen: "/fc.png", stock: 100 },
{ id: 381, nombre: "Clotrimazol Vaginal al 1% x40gr", precio: 6100, categoria: "CoasPharma", imagen: "/crevaco.png", stock: 80 },
{ id: 382, nombre: "Furosemida 40mg x100 Tbs", precio: 9900, categoria: "CoasPharma", imagen: "/furo100.png", stock: 10 },
{ id: 383, nombre: "Iseptic Garganta Menta y Frutos Rojos x12 Tbs", precio: 9600, categoria: "CoasPharma", imagen: "/isep.png", stock: 20 },
{ id: 384, nombre: "Enalapril 5mg x50 Tbs", precio: 5800, categoria: "CoasPharma", imagen: "/en5mg.png", stock: 40 },
{ id: 638, nombre: "Losartan 50mg x30 Tbs", precio: 3300, categoria: "CoasPharma", imagen: "/l50c.png", stock: 0 },

{ id: 385, nombre: "Desloratadina Niños x60ml", precio: 5200, categoria: "CoasPharma", imagen: "/dscos.png", stock: 30 },
{ id: 386, nombre: "Naproxeno 250mg x10 Tbs", precio: 1700, categoria: "CoasPharma", imagen: "/n250co.png", stock: 100 }, // Próximo a llegar
{ id: 387, nombre: "Ibuprofeno + Metocarbamol x24 Tbs", precio: 17300, categoria: "CoasPharma", imagen: "/im.png", stock: 0 },
{ id: 388, nombre: "Ácido Fusídico 2% x15gr", precio: 7900, categoria: "CoasPharma", imagen: "/acidofc.png", stock: 100 },
{ id: 389, nombre: "Naproxeno Sódico 125mg/5ml x80ml", precio: 8400, categoria: "CoasPharma", imagen: "/napcoas.png", stock: 60 },
{ id: 390, nombre: "Dermaskin x20gr", precio: 10000, categoria: "CoasPharma", imagen: "/derma20.png", stock: 30 },
{ id: 391, nombre: "Acetaminofén x300 Tbs", precio: 15300, categoria: "CoasPharma", imagen: "/ace500co.png", stock: 20 },
{ id: 392, nombre: "Albendazol 200mg x2", precio: 1100, categoria: "CoasPharma", imagen: "/al200c.png", stock: 160 },
{ id: 393, nombre: "Dermaskin x40gr", precio: 17000, categoria: "CoasPharma", imagen: "/derma40.png", stock: 10 },
{ id: 634, nombre: "Amlodipino 10mg x10 Tbs", precio: 2000, categoria: "CoasPharma", imagen: "/amlo10.png", stock: 30 },

{ id: 394, nombre: "Ketoconazol 200mg x10 Tbs", precio: 3200, categoria: "CoasPharma", imagen: "/ketotbsc.png", stock: 0 }, // Próximo a llegar
{ id: 398, nombre: "Ampicilina 500mg x50 Cap", precio: 18600, categoria: "CoasPharma", imagen: "/amp500c.png", stock: 0 },
{ id: 399, nombre: "Ampicilina 1g x100 Tbs", precio: 81500, categoria: "CoasPharma", imagen: "/amp1g.png", stock: 10 }, // Próximo a llegar
{ id: 400, nombre: "Amoxicilina Suspensión x100ml", precio: 5400, categoria: "CoasPharma", imagen: "/as251.png", stock: 220 },
{ id: 401, nombre: "Clindamicina 300mg x24 Cap", precio: 25000, categoria: "CoasPharma", imagen: "/clinco24.png", stock: 10 },


{ id: 403, nombre: "Amoxicilina Suspensión x60ml", precio: 4200, categoria: "CoasPharma", imagen: "/as60.png", stock: 120 },
{ id: 404, nombre: "Dicloxacilina 250mg/5ml x80ml", precio: 18300, categoria: "CoasPharma", imagen: "/diclosusco.png", stock: 0 }, // Próximo a llegar
{ id: 406, nombre: "Benzoato de Bencilo x120ml", precio: 7000, categoria: "CoasPharma", imagen: "/benzo.png", stock: 200 },
{ id: 407, nombre: "Metronidazol Suspensión x120ml", precio: 6600, categoria: "CoasPharma", imagen: "/m250c.png", stock: 120 },
{ id: 408, nombre: "Hidróxido de Aluminio/Magnesio/Simeticona x150ml", precio: 5700, categoria: "CoasPharma", imagen: "/hd150.png", stock: 100 },
{ id: 778, nombre: "Hidróxido de Aluminio/Magnesio/Simeticona x360ml", precio: 7600, categoria: "CoasPharma", imagen: "/ha360.png", stock: 0 },
{ id: 411, nombre: "Aciclovir Ungüento 5% x15gr", precio: 5000, categoria: "CoasPharma", imagen: "/aciunc.png", stock: 173 },
{ id: 617, nombre: "Hidrocortisona al 1% x15gr", precio: 4400, categoria: "CoasPharma", imagen: "/hidrocoas.png", stock: 50 },

{ id: 413, nombre: "Ibuprofeno Suspensión x120ml", precio: 4400, categoria: "CoasPharma", imagen: "/ibusc.png", stock: 50 },
{ id: 416, nombre: "Hidróxido Magnesia 8.5% x120ml", precio: 4500, categoria: "CoasPharma", imagen: "/hmc.png", stock: 80 },
{ id: 417, nombre: "Naproxeno 500mg x10 Tbs", precio: 4100, categoria: "CoasPharma", imagen: "/nap500co.png", stock: 0 }, // Próximo a llegar
{ id: 418, nombre: "Metoclopramida Gotas 4mg/ml x30ml", precio: 4700, categoria: "CoasPharma", imagen: "/mgco.png", stock: 160 },
{ id: 419, nombre: "Doxiciclina 100mg x10 Cap", precio: 3900, categoria: "CoasPharma", imagen: "/doxico.png", stock: 80 },
{ id: 420, nombre: "Aciclovir 200mg x25 Tbs", precio: 8300, categoria: "CoasPharma", imagen: "/ac200.png", stock: 50 },

{ id: 635, nombre: "Tinidazol 500mg x8 Tbs", precio: 2900, categoria: "CoasPharma", imagen: "/tini.png", stock: 0 },
{ id: 421, nombre: "Hidroxicina Clorhidrato 25mg x20 Tbs", precio: 3200, categoria: "CoasPharma", imagen: "/hxina.png", stock: 30 },
{ id: 422, nombre: "Prednisolona 5mg x300 Tbs", precio: 24000, categoria: "CoasPharma", imagen: "/pred300.png", stock: 60 },
{ id: 424, nombre: "Ibuprofeno 400mg x60 Tbs", precio: 8000, categoria: "CoasPharma", imagen: "/i400c.png", stock: 10 },
{ id: 425, nombre: "Enalapril 20mg x20 Tbs", precio: 2200, categoria: "CoasPharma", imagen: "/ec20t.png", stock: 80 },
{ id: 426, nombre: "Secnidazol 1g x2 Tbs", precio: 3400, categoria: "CoasPharma", imagen: "/sec1g.png", stock: 120 },

// ===== AG =====
{ id: 428, nombre: "Diclofenaco Retard 100mg x20 Cap", precio: 7000, categoria: "AG", imagen: "/diret.png", stock: 160 },
{ id: 429, nombre: "Ibuprofeno 800mg x50 Cap", precio: 7800, categoria: "AG", imagen: "/ibuag8.png", stock: 160 },
{ id: 430, nombre: "Dicloxacilina 500mg x50 Cap", precio: 22500, categoria: "AG", imagen: "/dicloxag50.png", stock: 0 }, // Próximo a llegar
{ id: 433, nombre: "Acetaminofén 500mg x100 Tbs", precio: 5300, categoria: "AG", imagen: "/ace500.png", stock: 350 },
{ id: 434, nombre: "Losartán 50mg x30 Tbs", precio: 3600, categoria: "AG", imagen: "/lo50ag.png", stock: 0 },

{ id: 436, nombre: "Naproxeno 250mg x10 Tbs", precio: 2600, categoria: "AG", imagen: "/nap250.png", stock: 20 },
{ id: 441, nombre: "Betametasona al 0.1% 20gr", precio: 5600, categoria: "AG", imagen: "/beta01ag.png", stock: 230 },
{ id: 442, nombre: "Betametasona 0.05% 20gr", precio: 5200, categoria: "AG", imagen: "/betag005.png", stock: 20 },
{ id: 445, nombre: "Hidrocortisona 0.1% x15gr", precio: 3800, categoria: "AG", imagen: "/hidroag.png", stock: 0 },
// ===== MEMPHIS =====
{ id: 446, nombre: "Azitromicina 500mg x3 Tbs", precio: 3000, categoria: "Memphis", imagen: "/az500.png", stock: 420 },
{ id: 447, nombre: "Alopurinol 100mg x30 Tbs", precio: 12200, categoria: "Memphis", imagen: "/alo100.png", stock: 20 },
{ id: 448, nombre: "Alopurinol 300mg x30 Tbs", precio: 12900, categoria: "Memphis", imagen: "/alo300.png", stock: 0 },
{ id: 449, nombre: "Cetirizina 10mg x10 Tbs", precio: 1900, categoria: "Memphis", imagen: "/ceti10.png", stock: 120 },
{ id: 450, nombre: "Acetaminofén + Hioscina x20 Tbs", precio: 12600, categoria: "Memphis", imagen: "/acethmem.png", stock: 30 },
{ id: 451, nombre: "Sulfadiazina de Plata 1% x30gr", precio: 6600, categoria: "Memphis", imagen: "/sulfamem.png", stock: 50 },
{ id: 452, nombre: "Naproxeno 250mg x10 Caps", precio: 3000, categoria: "Memphis", imagen: "/n250c.png", stock: 100 },
{ id: 453, nombre: "Flunarizina 10mg x20 Tbs", precio: 4400, categoria: "Memphis", imagen: "/flume.png", stock: 0 },
{ id: 454, nombre: "Crema Tottys (Óxido de Zinc + Nistatina) x40gr", precio: 11400, categoria: "Memphis", imagen: "/tottys.png", stock: 10 },


{ id: 457, nombre: "Losartán 100mg x30 Tbs", precio: 7900, categoria: "Memphis", imagen: "/l.png", stock: 80 },
{ id: 1457, nombre: "Losartán 50mg x30 Tbs (Memphis)", precio: 4500, categoria: "Memphis", imagen: "/lmem.png", stock: 100 },
{ id: 458, nombre: "Diclofenaco Gel al 1% x50gr", precio: 7000, categoria: "Memphis", imagen: "/diclomemp.png", stock: 230 },
{ id: 460, nombre: "Desloratadina 5mg x10 Tbs", precio: 5300, categoria: "Memphis", imagen: "/desmem.png", stock: 110 },   // Próximo a llegar
{ id: 461, nombre: "Amitriptilina Clorhidrato 25mg x30 Tbs", precio: 4800, categoria: "Memphis", imagen: "/ami25.png", stock: 90 },
{ id: 463, nombre: "Metocarbamol 750mg x10 Tbs", precio: 5100, categoria: "Memphis", imagen: "/meto750.png", stock: 0 },  // Próximo a llegar

{ id: 464, nombre: "Trimetoprima Sulfa F 160/800mg x20 Tbs", precio: 8000, categoria: "Memphis", imagen: "/memtri.png", stock: 200 },
{ id: 465, nombre: "Trimebutina 200mg x30 Tbs", precio: 14800, categoria: "Memphis", imagen: "/trimebu.png", stock: 20 },
{ id: 466, nombre: "Diclofenaco 50mg x30 Tbs", precio: 4000, categoria: "Memphis", imagen: "/dix30.png", stock: 20 },  // Próximo a llegar
{ id: 623, nombre: "Loratadina 10mg x10 tbs (Memphis)", precio: 1400, categoria: "Memphis", imagen: "/lorata.png", stock: 180 },
{ id: 468, nombre: "Pamoato de Pirantel x15ml", precio: 2800, categoria: "Memphis", imagen: "/ato.png", stock: 140 },
{ id: 614, nombre: "Sertralina 50mg x10 tbs", precio: 5100, categoria: "Memphis", imagen: "/lina.png", stock: 142 },
{ id: 471, nombre: "Hidroclorotiazida 25mg x30 Tbs", precio: 3400, categoria: "Memphis", imagen: "/hi2530.png", stock: 110 },
{ id: 622, nombre: "Hidroxicina HCl 25Mg x20 Tbs", precio: 3300, categoria: "Memphis", imagen: "/hcl.png", stock: 10 },
{ id: 472, nombre: "Clotrimazol 1% Solución Tópica x30ml", precio: 3300, categoria: "Memphis", imagen: "/clo1m.png", stock: 120 }, // Próximo a llegar

{ id: 473, nombre: "Carvedilol 12.5mg x30 Tbs", precio: 8700, categoria: "Memphis", imagen: "/car125.png", stock: 130 },
{ id: 474, nombre: "Amlodipino 10mg x10 Tbs", precio: 2000, categoria: "Memphis", imagen: "/a10mg.png", stock: 20 },
{ id: 475, nombre: "Clotrimazol Vaginal al 2% x20gr", precio: 13000, categoria: "Memphis", imagen: "/clotr2.png", stock: 0 }, // Próximo a llegar
{ id: 476, nombre: "Carvedilol 6.25mg x30 Tbs", precio: 6000, categoria: "Memphis", imagen: "/car625.png", stock: 280 },
{ id: 477, nombre: "Clindamicina 300mg x40 Caps", precio: 37900, categoria: "Memphis", imagen: "/clin40.png", stock: 9 },
// LA SANTE //
{ id: 480, nombre: "Omeprazol 20mg x100 Cap",     precio: 11500,  categoria: "La Sante", imagen: "/omels.png", stock: 50 }, 
{ id: 484, nombre: "Amoxicilina Suspensión 250mg/5ml x100ml", precio: 5800, categoria: "La Sante", imagen: "/amox10.png", stock: 400 },
{ id: 486, nombre: "Oximetazolina 0.05% x15ml (Adulto)", precio: 11500, categoria: "La Sante", imagen: "/oxils05.png", stock: 60 },
{ id: 629, nombre: "Loratadina Suspension x100 ml", precio: 5200, categoria: "La Sante", imagen: "/lorls.png", stock: 10 },
// Ampolletería (continuando la numeración)
{ id: 487, nombre: "Dexametasona Fosfato 8mg/2ml (Bolsa) x10 und", precio: 6500,  categoria: "Ampolleteria", imagen: "/dexafar.png", stock: 150 },
{ id: 488, nombre: "Dexablas Dexametasona 8mg/2ml x5 amp",            precio: 8500,  categoria: "Ampolleteria", imagen: "/dexablas8.png", stock: 130 },
{ id: 8964, nombre: "Dexablas Dexametasona 4mg/2ml x5 amp",            precio: 7900,  categoria: "Ampolleteria", imagen: "/dexa4.png", stock: 62 },
{ id: 490, nombre: "Betazkov (Betametasona) 8mg/2ml x5 amp",          precio: 8600,  categoria: "Ampolleteria", imagen: "/betazkov.png", stock: 20 },
{ id: 491, nombre: "Meblainex (Meloxicam) 15mg/1.5ml x5 amp",         precio: 11200, categoria: "Ampolleteria", imagen: "/meblai.png", stock: 280 },
{ id: 492, nombre: "Ondansetrón 8mg/4ml x1 Amp (Blau)",                              precio: 3400, categoria: "Ampolleteria", imagen: "/onda.png", stock: 20 },
{ id: 493, nombre: "Diclofenaco Sódico 75mg/3ml x10 amp (Farmionni)", precio: 6900,  categoria: "Ampolleteria", imagen: "/dfarm.png", stock: 300  }, // Próximo
{ id: 494, nombre: "Neurobión 3+3",                                   precio: 36000, categoria: "Ampolleteria", imagen: "/nx6.png", stock: 0  }, 
{ id: 495, nombre: "Lincofar (Lincomicina) 600mg/2ml x10 amp",        precio: 18500, categoria: "Ampolleteria", imagen: "/lincof.png", stock: 0  }, // Próximo

{ id: 496, nombre: "K-Delprazol (Omeprazol) x1 vial",                 precio: 3900,  categoria: "Ampolleteria", imagen: "/k-del.png", stock: 0 },
{ id: 497, nombre: "Antidol B1+B6+B1 2ml x3 amp",                     precio: 19800, categoria: "Ampolleteria", imagen: "/antidol.png", stock: 0 },
{ id: 498, nombre: "Gentamicina 160mg/2ml x10 amp (Farmionni)",       precio: 14000, categoria: "Ampolleteria", imagen: "/gentafar.png", stock: 70 },
{ id: 499, nombre: "Bedoyecta x3 amp",                                precio: 36500, categoria: "Ampolleteria", imagen: "/bedoy.png", stock: 100 },
{ id: 500, nombre: "Penicilina 1.2 mill x1 vial (Sigma)",             precio: 2500,  categoria: "Ampolleteria", imagen: "/pen1.2.png", stock: 240 },
{ id: 501, nombre: "N-butil Bromuro de Hioscina x10 amp (Farmionni)",             precio: 12000,  categoria: "Ampolleteria", imagen: "/hios.png", stock: 30 },
{ id: 503, nombre: "Vitamina C 500mg/5ml x1 amp (Ecar)",              precio: 7000,  categoria: "Ecar", imagen: "/vitcec.png", stock: 220 },
{ id: 504, nombre: "Clindamicina 600mg/4ml bolsa x10 und",            precio: 28000, categoria: "Ampolleteria", imagen: "/clinryan.png", stock: 6 },

{ id: 505, nombre: " Ampidelt Ampicilina/Sulbactam 1.5 g IM/IV x1 vial (Delta)",precio: 2600,  categoria: "Ampolleteria", imagen: "/ampidelt.png", stock: 4500 },
{ id: 506, nombre: "Ferropurum (Sacarato de hidróxido férrico) x1 amp 100mg/5ml", precio: 15000, categoria: "Ampolleteria", imagen: "/ferro.png", stock: 10 }, // Próximo
{ id: 508, nombre: "Hioscina + Dipirona 20mg + 2.5g/5ml x1 amp (Ryan)",      precio: 2900,  categoria: "Ampolleteria", imagen: "/hsry.png", stock: 120 },
{ id: 510, nombre: "Tramadol 100mg/2ml (IV/IM/SC) x10 amp (Farmionni)",           precio: 11500, categoria: "Ampolleteria", imagen: "/trafar.png", stock: 30 },
{ id: 511, nombre: "Pisacaina 2% 20mg/ml 50ml",                       precio: 9000,  categoria: "Ampolleteria", imagen: "/pisa.png", stock: 120 },
{ id: 512, nombre: "CeftriDelt (Ceftriaxona) 1 Gr x1 vial",           precio: 3200,  categoria: "Ampolleteria", imagen: "/ceftridelt.png", stock: 80  },  // Próximo
// ——— Jarabes y soluciones ———

{ id: 514, nombre: "Dosflem Adultos x120 ml", precio: 6600, categoria: "Jarabes y soluciones", imagen: "/dosad.png", stock: 200 },
{ id: 515, nombre: "Dosflem Niños x120 ml", precio: 6600, categoria: "Jarabes y soluciones", imagen: "/dni.png", stock: 0 },
{ id: 516, nombre: "Clorfeniramina x120 ml (Ecar)", precio: 3300, categoria: "Ecar", imagen: "/clore.png", stock: 890 },
{ id: 517, nombre: "Nistatina 100.000 UI x60 ml (Labinco)", precio: 6800, categoria: "Jarabes y soluciones", imagen: "/nislam.png", stock: 0 },
{ id: 518, nombre: "Didayabral (Multivitamínico) x240 ml", precio: 12800, categoria: "Jarabes y soluciones", imagen: "/dida.png", stock: 8 },
{ id: 519, nombre: "Dolistan (Ibuprofeno) x120 ml", precio: 5500, categoria: "Jarabes y soluciones", imagen: "/dolis.png", stock: 100 },

{ id: 522, nombre: "Broncomiel (Hedera Helix + Propóleo) x120 ml", precio: 7600, categoria: "Jarabes y soluciones", imagen: "/bronco.png", stock: 180 },
{ id: 523, nombre: "Mixagogo x120 ml", precio: 10700, categoria: "Jarabes y soluciones", imagen: "/mixa.png", stock: 50 },
{ id: 524, nombre: "Mucotrop Adulto x120 ml", precio: 7100, categoria: "Jarabes y soluciones", imagen: "/mucoad.png", stock: 80 },
{ id: 525, nombre: "Acetaminofén x120 ml", precio: 3500, categoria: "Laproff", imagen: "/120ml.png", stock: 300 },
{ id: 526, nombre: "Acetaminofén x90 ml", precio: 3000, categoria: "Laproff", imagen: "/90ml.png", stock: 850 },
{ id: 527, nombre: "Avalpric x120 ml 250 mg/5 ml", precio: 9500, categoria: "Bioquifar", imagen: "/aval.png", stock: 0 },
{ id: 528, nombre: "Privatos (Hedera Helix) x120 ml", precio: 17200, categoria: "Jarabes y soluciones", imagen: "/priva.png", stock: 30 },
{ id: 530, nombre: "Mucotrop Pediátrico (Bromhexina) x120 ml", precio: 6900, categoria: "Jarabes y soluciones", imagen: "/muconi.png", stock: 110 },

{ id: 532, nombre: "Pranexxin (Nitazoxanida 2%) x60 ml", precio: 13600, categoria: "Jarabes y soluciones", imagen: "/prasus.png", stock: 30 },
{ id: 533, nombre: "Cetirizina 0.1% x60 ml (Memphis)", precio: 6000, categoria: "Memphis", imagen: "/cetimep.png", stock: 40 },
{ id: 534, nombre: "Trimicort (Clobetasol) Solución x60 ml", precio: 14200, categoria: "Jarabes y soluciones", imagen: "/trimisol.png", stock: 40 },
{ id: 535, nombre: "Agua Oxigenada (OSA) x120 ml", precio: 2200, categoria: "Jarabes y soluciones", imagen: "/osa.png", stock: 280 },
{ id: 536, nombre: "Congestex Kids x90 ml", precio: 11200, categoria: "Jarabes y soluciones", imagen: "/congesu.png", stock: 50 },
{ id: 537, nombre: "Alginacid x360 ml", precio: 16500, categoria: "Jarabes y soluciones", imagen: "/algin.png", stock: 0 },
{ id: 540, nombre: "Mucofan (Hedera Helix) x120 ml", precio: 8500, categoria: "Jarabes y soluciones", imagen: "/muco.png", stock: 0 },
{ id: 544, nombre: "Noglupec (Dextrometorfano + Guayacolato) sin azúcar x120 ml", precio: 11800, categoria: "Jarabes y soluciones", imagen: "/noglp.png", stock: 100 },
{ id: 545, nombre: "Veramiel Niños x120 ml", precio: 8100, categoria: "Jarabes y soluciones", imagen: "/verani.png", stock: 25 },
{ id: 546, nombre: "Veramiel Adultos x120 ml", precio: 8100, categoria: "Jarabes y soluciones", imagen: "/veraad.png", stock: 30 },
{ id: 548, nombre: "Flemalis (N-Acetilcisteína + Guayacolato) x120 ml", precio: 16500, categoria: "Jarabes y soluciones", imagen: "/flema.png", stock: 120 },

{ id: 549, nombre: "Noktos Adultos (Bromhexina + Guayacolato) x120 ml", precio: 7800, categoria: "Jarabes y soluciones", imagen: "/nokad.png", stock: 30 },
{ id: 550, nombre: "Noktos Niños (Bromhexina + Guayacolato) x120 ml", precio: 7800, categoria: "Jarabes y soluciones", imagen: "/nokni.png", stock: 140 },
{ id: 551, nombre: "Bronsinex (Ambroxol HCl + Clenbuterol) x120 ml", precio: 9300, categoria: "Bioquifar", imagen: "/brons.png", stock: 20 },
{ id: 552, nombre: "Zetygrip 4 x120 ml", precio: 10400, categoria: "Jarabes y soluciones", imagen: "/zetysus.png", stock: 80 },
{ id: 553, nombre: "Zetygrip 4 x60 ml", precio: 7900, categoria: "Jarabes y soluciones", imagen: "/z60ml.png", stock: 80 },
{ id: 557, nombre: "Desloratadina 0.05% x60 ml (Memphis)", precio: 4900, categoria: "Memphis", imagen: "/deskids.png", stock: 25 },

{ id: 558, nombre: "Multi Soluter x50 ml", precio: 8400, categoria: "Jarabes y soluciones", imagen: "/multso.png", stock: 50, ivaIncluido: true },
{ id: 559, nombre: "Triatusic (Dextrometorfano + Ambroxol + Teofilina) x120 ml", precio: 12000, categoria: "Bioquifar", imagen: "/tria.png", stock: 0 },
{ id: 560, nombre: "Komilon Appetite (Multivitamínico) x360 ml", precio: 12400, categoria: "Jarabes y soluciones", imagen: "/komi.png", stock: 70 },
{ id: 561, nombre: "Multicebrin (Multivitamínico) x360 ml", precio: 11100, categoria: "Jarabes y soluciones", imagen: "/multic.png", stock: 90 },
{ id: 562, nombre: "Dihidrocodeína Bitartrato 2.42 mg/ml x120 ml (Humax)", precio: 6500, categoria: "Jarabes y soluciones", imagen: "/dihid.png", stock: 90 },
{ id: 563, nombre: "Albendazol Suspensión (Laproff) x20 ml", precio: 1800, categoria: "Laproff", imagen: "/aslp2.png", stock: 40 },
{ id: 564, nombre: "Furotil (Metronidazol 5.0 g + Nifuroxanida) x120 ml", precio: 12700, categoria: "Jarabes y soluciones", imagen: "/furotil.png", stock: 0 },
{ id: 964, nombre: "Taxen (Nitazoxanida) x30 ml", precio: 8200, categoria: "Jarabes y soluciones", imagen: "/ta3.png", stock: 50 },


{ id: 567, nombre: "Albendazol Suspensión 4% x20 ml (CoasPharma)", precio: 1900, categoria: "CoasPharma", imagen: "/a4s.png", stock: 120 },
{ id: 568, nombre: "Vitaban Jalea x240 ml", precio: 17200, categoria: "Jarabes y soluciones", imagen: "/vitaban.png", stock: 35 },
{ id: 569, nombre: "Caladerm Rosa Suspensión x120 ml", precio: 9300, categoria: "Jarabes y soluciones", imagen: "/crosa.png", stock: 200 },
{ id: 571, nombre: "Bactroderm (Yodo-Povidona) Solución x60 ml", precio: 5800, categoria: "Ecar", imagen: "/bsol.png", stock: 280 },
{ id: 572, nombre: "Bactroderm (Yodo-Povidona) Bucogaringeo x60 ml", precio: 5600, categoria: "Ecar", imagen: "/bbuc.png", stock: 120 },
{ id: 800, nombre: "Bactroderm (Yodo-Povidona) Espuma x60 ml", precio: 7200, categoria: "Ecar", imagen: "/baces.png", stock: 0 },
{ id: 733, nombre: "Drenolax Pluss x120 ml", precio: 11000, categoria: "Jarabes y soluciones", imagen: "/dreno.png", stock: 60 },
{ id: 8010, nombre: "Impothos (Sin Azucar) x120 ml", precio: 9500, categoria: "Jarabes y soluciones", imagen: "/impot.png", stock: 60 },

// --- Cremas y Ungüentos ---
{ id: 517, nombre: "Fitobremg x32 Gr", precio: 21300, categoria: "Cremas y Ungüentos", imagen: "/fito.png", stock: 0 },
{ id: 518, nombre: "Neotrisona (Triconjugada) x20 Gr", precio: 6100, categoria: "Cremas y Ungüentos", imagen: "/creneo.png", stock: 120 },
{ id: 520, nombre: "Micigent Gentamicina Crema 40 Gr", precio: 10400, categoria: "Cremas y Ungüentos", imagen: "/micigent.png", stock: 0 },
{ id: 521, nombre: "Fenacalm (Diclofenaco) Gel x50 Gr", precio: 6800, categoria: "Cremas y Ungüentos", imagen: "/fenacalm.png", stock: 50 },
{ id: 522, nombre: "Benlic (Triconjugada) 20 Gr", precio: 9700, categoria: "Cremas y Ungüentos", imagen: "/benlic20.png", stock: 230 },
{ id: 523, nombre: "Benlic (Triconjugada) 40 Gr", precio: 15600, categoria: "Cremas y Ungüentos", imagen: "/benlic40.png", stock: 120 },
{ id: 524, nombre: "Nelind Crema x40 Gr", precio: 13000, categoria: "Cremas y Ungüentos", imagen: "/nldim.png", stock: 0 },
{ id: 525, nombre: "Tisat Nistatina 100.000 U.I Crema 30 Gr", precio: 11000, categoria: "Cremas y Ungüentos", imagen: "/tisat.png", stock: 10 },
{ id: 618, nombre: "Crema Furm mometasona al 0.1% x15 Gr", precio: 9900, categoria: "Cremas y Ungüentos", imagen: "/furm.png", stock: 20 },
{ id: 779, nombre: "Dermakron x20 Gr", precio: 6000, categoria: "Cremas y Ungüentos", imagen: "/dkron.png", stock: 200 },

{ id: 527, nombre: "Piroxicam Gel 0.5% 40 Gr (Vitalis)", precio: 5800, categoria: "Cremas y Ungüentos", imagen: "/pirovit.png", stock: 90 }, // Próximo
{ id: 529, nombre: "Vivirsón Aciclovir Ungüento al 5% x15 Gr", precio: 4300, categoria: "Cremas y Ungüentos", imagen: "/vivirson.png", stock: 20 },
{ id: 530, nombre: "Gyno Confort (Clotrimazol) Vaginal al 2% x20 Gr", precio: 11500, categoria: "Cremas y Ungüentos", imagen: "/gynoc.png", stock: 35 },
{ id: 531, nombre: "Nitrofurazona 0.2% Pomada x40 Gr (Anglo)", precio: 6400, categoria: "Cremas y Ungüentos", imagen: "/nitrofuang.png", stock: 15 },
{ id: 532, nombre: "Lindazol Crema Vaginal (Clotrimazol 2% + Clindamicina 2%) 20 Gr", precio: 16000, categoria: "Cremas y Ungüentos", imagen: "/lindacre.png", stock: 0 },
{ id: 534, nombre: "Vclocli (Clotrimazol + Clindamicina) al 2% x20 Gr", precio: 13700, categoria: "Cremas y Ungüentos", imagen: "/vclocli.png", stock: 0 },

{ id: 535, nombre: "Nixoderm Ungüento x20 Gr", precio: 9200, categoria: "Cremas y Ungüentos", imagen: "/nixod.png", stock: 0 },
{ id: 935, nombre: "Vaxomizol (Terbinafina) al 1% x20 Gr", precio: 8900, categoria: "Cremas y Ungüentos", imagen: "/vaxo.png", stock: 0 },
{ id: 536, nombre: "Pomada Verde x23 Gr (Tridex)", precio: 7742, categoria: "Cremas y Ungüentos", imagen: "/verdep.png", stock: 100, ivaIncluido: true }, 
{ id: 537, nombre: "Ketoconazol 2% 30 Gr (Anglo)", precio: 5700, categoria: "Cremas y Ungüentos", imagen: "/ketocoangl.png", stock: 40 }, // Próximo
{ id: 538, nombre: "Clotrimazol Tópica 1% 40 Gr", precio: 3202, categoria: "CoasPharma", imagen: "/clotpco.png", stock: 190 }, // Próximo
{ id: 539, nombre: "Terravital Ungüento x10 Gr", precio: 14900, categoria: "Cremas y Ungüentos", imagen: "/terravi.png", stock: 0 }, // Próximo
{ id: 540, nombre: "Vitatriol Ungüento x3.5 Gr", precio: 13800, categoria: "Cremas y Ungüentos", imagen: "/vitaung.png", stock: 0 },
{ id: 541, nombre: "Nitrofur (Nitrofurazona) x40 Gr", precio: 15000, categoria: "Cremas y Ungüentos", imagen: "/nitrofur.png", stock: 20 },
{ id: 542, nombre: "Limpiaderm (Triconjugada) 20 Gr", precio: 7200, categoria: "Cremas y Ungüentos", imagen: "/limpiader.png", stock: 0 }, // Próximo
{ id: 626, nombre: "Clindamicina crema vaginal al 2%", precio: 15000, categoria: "Cremas y Ungüentos", imagen: "/clindcv.png", stock: 20 },
{ id: 544, nombre: "Neclobet (Triconjugada) x20 Gr", precio: 7800, categoria: "Cremas y Ungüentos", imagen: "/neclo20.png", stock: 20 },
{ id: 545, nombre: "Neclobet (Triconjugada) x40 Gr", precio: 14600, categoria: "Cremas y Ungüentos", imagen: "/neclo40.png", stock: 40 },
{ id: 546, nombre: "Trinsicon (Triconjugada) x20 Gr", precio: 4200, categoria: "Cremas y Ungüentos", imagen: "/trinsi.png", stock: 90 },
{ id: 616, nombre: "Tersag terbinafina al 1% x15 Gr", precio: 9500, categoria: "Cremas y Ungüentos", imagen: "/tersag.png", stock: 20 },
{ id: 686, nombre: "Pomada Metatitane x40 Gr", precio: 21500, categoria: "Cremas y Ungüentos", imagen: "/metat.png", stock: 90 },

// ===== GOTAS =====

{ id: 548, nombre: "Rhifisol (Suero Fisiológico) 30 ml", precio: 3400, categoria: "Gotas", imagen: "/rhifi.png", stock: 0 },
{ id: 549, nombre: "Thera Tears Lágrimas Artificiales", precio: 12100, categoria: "Memphis", imagen: "/therat.png", stock: 0 },
{ id: 550, nombre: "Prestiblock (Timolol 0.5%) 5 ml", precio: 5800, categoria: "Gotas", imagen: "/timolo.png", stock: 0 },
{ id: 551, nombre: "Tobroptic Compuesto (Dexametasona + Tobramicina) 5 ml", precio: 16900, categoria: "Gotas", imagen: "/tobrop.png", stock: 0 },
{ id: 552, nombre: "Sulfato Ferroso (Laproff) 20 ml", precio: 5500, categoria: "Laproff", imagen: "/sf20.png", stock: 30 },
{ id: 553, nombre: "Syvitears (Lagrimas artificiales) (Acohol Polivinilico) 1.4% x15 ml", precio: 7800, categoria: "Gotas", imagen: "/syvi.png", stock: 120 },
{ id: 554, nombre: "Naf Vision (Nafazolina) 1 mg x7 ml", precio: 5400, categoria: "Gotas", imagen: "/nafvisi.png", stock: 20 },

{ id: 556, nombre: "Rincetir (Cetirizina) 10 mg/5 ml", precio: 8200, categoria: "Gotas", imagen: "/rince.png", stock: 0 },
{ id: 557, nombre: "Valerina (Kemi) 60 ml", precio: 6800, categoria: "Gotas", imagen: "/v60.png", stock: 170 },
{ id: 558, nombre: "Valerina (Kemi) 30 ml", precio: 5300, categoria: "Gotas", imagen: "/v30.png", stock: 110 },
{ id: 559, nombre: "Motibex (Valeriana-Lechuga-Toronjil) 30 ml", precio: 6700, categoria: "Gotas", imagen: "/moti30.png", stock: 30 },
{ id: 560, nombre: "Motibex (Valeriana-Lechuga-Toronjil) 60 ml", precio: 9700, categoria: "Gotas", imagen: "/motibex60.png", stock: 35 },
{ id: 561, nombre: "Vitamina C gotas x30 ml", precio: 4500, categoria: "CoasPharma", imagen: "/vcgt.png", stock: 300 },
{ id: 562, nombre: "Oftalmotrisol (Nafazolina) 15 ml", precio: 12700, categoria: "Gotas", imagen: "/oftalmo.png", stock: 0 },
{ id: 563, nombre: "Tramadol Gotas (Memphis) 10 ml", precio: 3700, categoria: "Memphis", imagen: "/p111.png", stock: 240 },
{ id: 564, nombre: "Tramasindol (Tramadol) 10 ml", precio: 3900, categoria: "Gotas", imagen: "/trama.png", stock: 60 },

{ id: 565, nombre: "Polioftal (Triconjugada) 5 ml", precio: 7900, categoria: "Gotas", imagen: "/polio.png", stock: 240 },
{ id: 567, nombre: "Wassertrol 5 ml", precio: 12500, categoria: "Gotas", imagen: "/waser.png", stock: 160 },
{ id: 568, nombre: "Digesta gotas x20 ml", precio: 12500, categoria: "Gotas", imagen: "/dgts.png", stock: 30 },
{ id: 569, nombre: "Iverblas (Ivermectina 0.6%) 5 ml", precio: 8200, categoria: "Gotas", imagen: "/iverblas.png", stock: 23 },
{ id: 570, nombre: "Cifloblas (Ciprofloxacino 0.3%) 5 ml", precio: 10600, categoria: "Gotas", imagen: "/ciflob.png", stock: 20 },
{ id: 571, nombre: "Triclimbac (Óticas) 10 ml", precio: 8000, categoria: "Gotas", imagen: "/triclimbac.png", stock: 180 },
{ id: 572, nombre: "Prednioftal F (Prednisolona Acetato 10 mg/ml) 5 ml", precio: 30200, categoria: "Gotas", imagen: "/predbk.png", stock: 18 },
{ id: 573, nombre: "Fenacof (Diclofenaco Sódico 0.1%) 5 ml", precio: 10300, categoria: "Gotas", imagen: "/fenacof.png", stock: 25 },

{ id: 574, nombre: "Nazil (Nafazolina Clorhidrato 0.1%) 15 ml", precio: 10500, categoria: "Gotas", imagen: "/nazil.png", stock: 260 },
{ id: 575, nombre: "Vita Triol (Triconjugada) 5 ml", precio: 7900, categoria: "Gotas", imagen: "/vitagt.png", stock: 100 },
{ id: 576, nombre: "Tikoj (Cromoglicato Sódico 4%) 5 ml", precio: 6800, categoria: "Gotas", imagen: "/tikoj.png", stock: 10 },
{ id: 577, nombre: "Sulfaoftal (Sulfacetamida Sódica 100 mg/ml) 15 ml", precio: 10700, categoria: "Gotas", imagen: "/sulfaof.png", stock: 20 },
{ id: 578, nombre: "Fluoftal (Fluorometalona 0.1%) 5 ml", precio: 21000, categoria: "Gotas", imagen: "/fluof.png", stock: 10 },
{ id: 579, nombre: "Eye Zul (Nafazolina Clorhidarto 0.1%) 7 ml", precio: 6800, categoria: "Gotas", imagen: "/zuln.png", stock: 180 },
{ id: 580, nombre: "Cetirizina (Memphis) 15 ml", precio: 8900, categoria: "Memphis", imagen: "/cetigts.png", stock: 30 },
{ id: 581, nombre: "Fire Lips (Ácido Salicílico) 10 ml", precio: 7600, categoria: "Gotas", imagen: "/fire.png", stock: 220 },
{ id: 621, nombre: "Oximetazolina 0,05% (Adulto) x15 ml (pb)", precio: 6900, categoria: "Gotas", imagen: "/oxipb.png", stock: 30 },

{ id: 583, nombre: "Oftalmax (Triconjugada) 5 ml", precio: 7000, categoria: "Gotas", imagen: "/oftalmax.png", stock: 0 },
{ id: 584, nombre: "Lagrikov Lágrimas Artificiales 15 ml", precio: 7900, categoria: "Gotas", imagen: "/lagrikov.png", stock: 0 },
{ id: 585, nombre: "Conjugent (Gentamicina 0.3%) 5 ml", precio: 6100, categoria: "Gotas", imagen: "/conjug.png", stock: 23 },

{ id: 586, nombre: "Activa 21", precio: 5600, categoria: "Anticonceptivos", imagen: "/ac21.png", stock: 660 }, // Próximo a llegar
{ id: 587, nombre: "Cyclofemina 25mg/5mg Solución Inyectable x1", precio: 14000, categoria: "Anticonceptivos", imagen: "/cyclof.png", stock: 70 },
{ id: 588, nombre: "Postday (Levonorgestrel 0.75mg) x2 Tbs", precio: 7000, categoria: "Anticonceptivos", imagen: "/post.png", stock: 280 },
{ id: 590, nombre: "Evinet x2 Tbs", precio: 6400, categoria: "Anticonceptivos", imagen: "/evinet.png", stock: 70 },
{ id: 591, nombre: "Postinor2 (Levonorgestrel 0.75mg) x2 Tbs", precio: 6400, categoria: "Anticonceptivos", imagen: "/posti2.png", stock: 160 },
{ id: 593, nombre: "Microgynon Suave x21 Comprimidos", precio: 6400, categoria: "Anticonceptivos", imagen: "/micros.png", stock: 50 },
{ id: 594, nombre: "Microgynon 30 x21 Comprimidos", precio: 6400, categoria: "Anticonceptivos", imagen: "/micro30.png", stock: 90 },

// —— BIOSANITARIOS ——
{ id: 595, nombre: "Jeringa 3 ml (Aguja 21G x 1 1/2\") x100 (Alfasafe)", precio: 18330, categoria: "Biosanitarios", imagen: "/3ml.png", stock: 120, ivaIncluido: true },
{ id: 596, nombre: "Jeringa 5 ml (Aguja 21G x 1 1/2\") x100 (Alfasafe)", precio: 15315, categoria: "Biosanitarios", imagen: "/5ml.png", stock: 0, ivaIncluido: true },
{ id: 597, nombre: "Jeringa 10 ml (Aguja 21G x 1 1/2\") x100 (Alfasafe)", precio: 21245, categoria: "Biosanitarios", imagen: "/10ml.png", stock: 50, ivaIncluido: true },
{ id: 598, nombre: "Gasa Estéril (No tejida) x50 sobres de 6 (Alfa)", precio: 21500, categoria: "Biosanitarios", imagen: "/gasa.png", stock: 55 },
{ id: 599, nombre: "Apósito Goly (Niño) x20 Und", precio: 6700, categoria: "Biosanitarios", imagen: "/gni.png", stock: 20 },
{ id: 641, nombre: "Apósito Goly (Adulto) x20 Und", precio: 6700, categoria: "Biosanitarios", imagen: "/gad.png", stock: 8 },
{ id: 600, nombre: "Termómetro Digital", precio: 6720, categoria: "Biosanitarios", imagen: "/termo.png", stock: 230, ivaIncluido: true },
{ id: 601, nombre: "Goteros de Vidrio x20 Und (Alfa)", precio: 12848, categoria: "Biosanitarios", imagen: "/gote.png", stock: 10, ivaIncluido: true },
{ id: 602, nombre: "Baxter Cloruro de Sodio 0.9% x500 ml", precio: 2900, categoria: "Biosanitarios", imagen: "/b500.png", stock: 160 },
{ id: 603, nombre: "Baxter Cloruro de Sodio 0.9% x100 ml", precio: 2500, categoria: "Biosanitarios", imagen: "/b100.png", stock: 220 },

{ id: 604, nombre: "Cinta Microporosa Color Piel (12.5 mm x 5 yds) x Und", precio: 2600, categoria: "Biosanitarios", imagen: "/12x5.png", stock: 280 }, // Próximo a llegar
{ id: 605, nombre: "Cinta Microporosa Color Piel (1\" x 5 yds) x Und", precio: 5200, categoria: "Biosanitarios", imagen: "/1x5.png", stock: 250 },
{ id: 606, nombre: "Cinta Microporosa Color Piel (2\" x 5 yds) x Und", precio: 10400, categoria: "Biosanitarios", imagen: "/2x5.png", stock: 25 },
{ id: 608, nombre: "Baxter Cloruro de Sodio 0.9% x1000 ml", precio: 4900, categoria: "Biosanitarios", imagen: "/b1000.png", stock: 70 },
{ id: 609, nombre: "Curas Color Piel x100 (Medicare)", precio: 4800, categoria: "Biosanitarios", imagen: "/curas.png", stock: 15 },
{ id: 610, nombre: "Lactato de Ringer x500 ml (Baxter)", precio: 2900, categoria: "Biosanitarios", imagen: "/lacto.png", stock: 40 },
];

// ================== Persistencia carrito ==================
const STORAGE_KEY = "tayro:cart";

// ================== Componente ==================
export default function Page() {
  const [carrito, setCarrito] = useState<ProductoEnCarrito[]>([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState<string>("Más Vendidos");
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarCondiciones, setMostrarCondiciones] = useState(false);
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [mostrarVolverArriba, setMostrarVolverArriba] = useState(false);


useEffect(() => {
  const manejarScroll = () => {
    const scrollY = window.scrollY;
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    const porcentaje = (scrollY / alturaTotal) * 100;
    setMostrarVolverArriba(porcentaje > 50); // 👈 solo si baja más del 50%
  };

  window.addEventListener("scroll", manejarScroll);
  return () => window.removeEventListener("scroll", manejarScroll);
}, []);




  // ---- Cargar carrito al montar (persistencia) ----
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setCarrito(parsed);
    } catch {}
  }, []);

  // ---- Guardar carrito en cada cambio (persistencia) ----
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    } catch {}
  }, [carrito]);

  // ---- Filtrado + ORDEN ALFABÉTICO ----
  const productosFiltrados = useMemo(() => {
    const q = search.trim();

    let base: Producto[];

    if (q) {
      const nq = normalize(q);
      const exacto = productos.find((p) => normalize(p.nombre) === nq);
      if (exacto) return [exacto];

      const queryTokens = Array.from(toWordSet(q));
      base = productos.filter((p) => {
        const nameTokens = toWordSet(p.nombre);
        return queryTokens.every((t) => nameTokens.has(t));
      });
    } else {
      base =
        categoria === "Más Vendidos"
          ? productos.filter((p) => p.masVendido)
          : productos.filter((p) => p.categoria === categoria && !p.masVendido);
    }

    return [...base].sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es", {
        sensitivity: "base",
        ignorePunctuation: true,
      })
    );
  }, [search, categoria]);

  // ---- Carrito ----
  const agregarAlCarrito = (producto: Producto) => {
    if (producto.stock <= 0) return;
    setCarrito((prev) => {
      // ⚠️ Si tus IDs pueden repetirse entre laboratorios, considera usar `${id}-${categoria}` como clave
      const existe = prev.find((i) => i.id === producto.id);
      if (existe) {
        return prev.map((i) =>
          i.id === producto.id && i.cantidad < producto.stock
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    setMostrarCarrito(true);
  };

  const eliminarDelCarrito = (id: number | string) =>
    setCarrito((prev) => prev.filter((i) => i.id !== id));

  const cambiarCantidad = (id: number | string, nueva: number) =>
    setCarrito((prev) =>
      prev
        .map((i) =>
          i.id === id
            ? { ...i, cantidad: Math.max(0, Math.min(nueva, i.stock ?? Infinity)) }
            : i
        )
        .filter((i) => i.cantidad > 0)
    );

  const total = useMemo(
    () => carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
    [carrito]
  );

  // ---- WhatsApp ----
  const enviarPedidoWhatsApp = () => {
    if (!carrito.length) return;

    // Nombre en mayúsculas + sufijo por laboratorio (en el mensaje)
    const etiquetaPedido = (i: ProductoEnCarrito) => {
      const suf = SUFIJOS[i.categoria] ?? "";
      const base = nombreUI(i.nombre).toUpperCase();
      return suf ? `${base} ${suf}` : base;
    };

    const linea = (i: ProductoEnCarrito) =>
      `• (${String(i.cantidad).padStart(2, "0")}) *${etiquetaPedido(i)}*`;

    const mensaje = carrito.map(linea).join("\n");
    const texto =
      `🛒 HOLA, QUIERO HACER EL SIGUIENTE PEDIDO:\n\n${mensaje}`;

    const numero = "573146171647";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 text-gray-900">

      {/* ===== Meta Pixel (Facebook) ===== */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '825223906636542');
fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=825223906636542&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {/* ===== Fin Meta Pixel ===== */}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-900 to-blue-800 text-white border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* PC: logo + nombre + buscador + condiciones + carrito */}
          <div className="hidden md:flex items-center gap-4">
            <Image
              src="/logo-tayro.png"
              alt="Logo Tayro"
              width={120}
              height={120}
              priority
              className="h-20 w-auto"
            />
            <div className="flex-1 flex flex-col gap-2">
              <h1 className="text-xl font-bold">
                Distribuidora Tayro Pharma SAS
              </h1>
              <div className="relative max-w-xl">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar producto… (ej. acetaminofén, genfar)"
                  className="w-full rounded-full bg-white text-gray-900 placeholder-gray-600 
                             border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                             py-2 pl-10 pr-10 shadow-sm"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 select-none">🔎</span>
                {search && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    onClick={() => setSearch("")}
                    aria-label="Limpiar búsqueda"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Condiciones de compra (entre buscador y carrito) */}
            <button
              onClick={() => setMostrarCondiciones(true)}
              className="px-4 py-2 rounded-lg font-bold text-black bg-white border border-gray-300 hover:text-gray-800"
            >
              Condiciones de compra
            </button>

            {/* Carrito */}
            <button
              onClick={() => setMostrarCarrito((v) => !v)}
              className="relative bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 whitespace-nowrap"
            >
              🛒 Carrito
              {carrito.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-2">
                  {carrito.reduce((a, i) => a + i.cantidad, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Móvil */}
          <div className="md:hidden">
            <div className="absolute left-4 top-2">
              <Image
                src="/logo-tayro.png"
                alt="Logo Tayro"
                width={320}
                height={320}
                priority
                className="h-16 w-auto sm:h-20 md:h-24"
              />
            </div>

            <div className="flex flex-col items-stretch gap-3">
              <h1 className="text-base font-bold text-left ml-[88px]">
                Distribuidora Tayro Pharma SAS
              </h1>
              <div className="w-full">
                <div className="relative w-[72%] max-w-[320px] ml-[88px]">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar producto… (ej. acetaminofén, genfar)"
                    className="w-full rounded-full bg-white text-gray-900 placeholder-gray-600 
                               border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                               py-2 pl-10 pr-10 shadow-sm"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 select-none">🔎</span>
                  {search && (
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                      onClick={() => setSearch("")}
                      aria-label="Limpiar búsqueda"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Condiciones y carrito en la misma línea */}
              <div className="flex items-center justify-between w-full px-4 mt-2">
                {/* Botón de condiciones */}
                <button
                  onClick={() => setMostrarCondiciones(true)}
                  className="px-3 py-1 rounded-lg bg-white text-blue-800 hover:bg-blue-100 text-sm border border-blue-200 font-semibold"
                >
                  Condiciones de compra
                </button>

                {/* Botón del carrito */}
                <button
                  onClick={() => setMostrarCarrito((v) => !v)}
                  className="relative bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-3 py-2 text-sm flex items-center gap-2"
                >
                  <span role="img" aria-label="carrito">🛒</span>
                  <span>Carrito</span>

                  {carrito.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-2">
                      {carrito.reduce((a, i) => a + i.cantidad, 0)}
                    </span>
                  )}
                </button>

              </div>
            </div>
          </div>
        </div>
      </header>

  {/* Categorías */}
<div className="max-w-7xl mx-auto px-4 pb-3">

  {/* MÓVIL: todas visibles en grilla, sin hamburguesa y sin scroll horizontal */}
  <div className="md:hidden">
    <h2 className="text-lg font-semibold text-blue-800 mb-2">Laboratorios</h2>

    <div
      className="
        grid gap-2
        grid-cols-2
        [@media(min-width:380px)]:grid-cols-3
        sm:grid-cols-3
      "
    >
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategoria(cat)}
          className={`w-full px-3 py-2 rounded-xl text-xs font-semibold
            border transition-all duration-200
            ${
              categoria === cat
                ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white border-blue-700 shadow"
                : "bg-white text-blue-800 border-blue-300 hover:bg-blue-50"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>

  {/* ESCRITORIO: diseño clásico (igual que antes) */}
  <div className="hidden md:flex flex-wrap justify-center gap-3 py-3">
    {categorias.map((cat) => (
      <button
        key={cat}
        onClick={() => setCategoria(cat)}
        className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 
          border shadow-sm hover:shadow-lg hover:scale-105 
          ${
            categoria === cat
              ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white border-blue-700"
              : "bg-white text-blue-800 border-blue-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200"
          }`}
      >
        {cat}
      </button>
    ))}
  </div>
</div>


      {/* Contenido */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {productosFiltrados.length ? (
          <div className="grid gap-4 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <AnimatePresence>
              {productosFiltrados.map((p) => {
                const src =
                  p.imagen && p.imagen.trim() !== "" ? p.imagen : "/placeholder.png";
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="relative bg-white shadow-lg rounded-2xl border border-gray-200 
             p-2 sm:p-3 w-full
             aspect-square sm:aspect-auto flex flex-col justify-between"
                  >
                    {/* Imagen con efecto lupa solo en PC */}
                    <div className="w-full flex-1 flex items-center justify-center mb-1 sm:mb-2 overflow-hidden group min-h-[100px]">
                      <Image
                        src={p.imagen?.startsWith("/") ? p.imagen : `/${p.imagen}`}
                        alt={nombreUI(p.nombre)}
                        width={500}
                        height={500}
                        className="object-contain w-full h-auto max-h-56 
               transition-transform duration-300 ease-in-out 
               md:group-hover:scale-125 cursor-pointer"
                        unoptimized
                      />
                    </div>

                    {/* Nombre */}
                    <h2 className="text-xs sm:text-sm md:text-base font-semibold text-blue-700 text-center line-clamp-2 sm:min-h-[3rem]">
                      {nombreUI(p.nombre)}
                    </h2>

                    {/* ⚡ Aviso IVA */}
                    {p.ivaIncluido && (
                      <p className="bg-red-600 text-white text-xs font-semibold text-center mt-1 py-0.5 px-2 rounded inline-block mx-auto">
                        IVA Incluido
                      </p>
                    )}

                    {/* Precio */}
                    <p className="text-gray-800 font-extrabold text-center my-2">
                      ${p.precio.toLocaleString("es-CO")}
                    </p>

                    {/* Botón */}
                    <button
                      onClick={() => agregarAlCarrito(p)}
                      disabled={p.stock === 0}
                      className={`w-full px-3 py-2 rounded-lg font-semibold transition-colors
                text-xs sm:text-sm
                ${
                  p.stock === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
                    >
                      {p.stock === 0 ? "No disponible" : "Agregar al Carrito"}
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-center text-gray-600">❌ No se encontraron productos.</p>
        )}
      </main>

      {/* Carrito (drawer) */}
      <AnimatePresence>
        {mostrarCarrito && (
          <motion.aside
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
            className="
              fixed top-20 right-0 z-50 
              w-full sm:w-[340px] md:w-[400px] 
              max-h-[70vh] md:max-h-[60vh] 
              bg-white border-l border-gray-200 shadow-2xl flex flex-col overflow-hidden
              
              md:right-4 md:rounded-xl
              [@media(max-width:640px)]:right-2 [@media(max-width:640px)]:left-auto
              [@media(max-width:640px)]:w-[85%] [@media(max-width:640px)]:max-h-[50vh] [@media(max-width:640px)]:rounded-xl
            "
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold">Carrito de Compras</h2>
              <button
                onClick={() => setMostrarCarrito(false)}
                className="rounded-md px-2 py-1 hover:bg-gray-100"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4">
              {carrito.length === 0 ? (
                <p className="text-gray-600 py-8 text-center">El carrito está vacío.</p>
              ) : (
                <ul className="divide-y">
                  {carrito.map((item) => (
                    <li key={item.id} className="py-3 flex items-center gap-3">
                      <div className="size-12 rounded-md overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={
                            item.imagen && item.imagen.trim() !== ""
                              ? item.imagen
                              : "/placeholder.png"
                          }
                          alt={nombreUI(item.nombre)}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold line-clamp-2">
                          {nombreUI(item.nombre)}
                        </p>
                        <p className="text-xs text-gray-600">
                          ${item.precio.toLocaleString("es-CO")} x {item.cantidad} =
                          <span className="font-bold">
                            {" "}
                            {(item.precio * item.cantidad).toLocaleString("es-CO")}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                          className="h-8 w-8 grid place-items-center rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                          −
                        </button>
                        <span className="px-2 tabular-nums">{item.cantidad}</span>
                        <button
                          onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                          className="h-8 w-8 grid place-items-center rounded-md bg-green-600 text-white hover:bg-green-700"
                        >
                          +
                        </button>
                        <button
                          onClick={() => eliminarDelCarrito(item.id)}
                          className="ml-2 h-8 px-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
                        >
                          🗑
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
              <span className="font-bold text-lg">
                Total: ${total.toLocaleString("es-CO")}
              </span>
              <button
                onClick={enviarPedidoWhatsApp}
                disabled={!carrito.length}
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm md:text-base"
              >
                📲 Enviar Pedido
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Modal: Condiciones de compra */}
      <AnimatePresence>
        {mostrarCondiciones && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 grid place-items-center p-4"
            onClick={() => setMostrarCondiciones(false)}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-bold">Condiciones de compra</h3>
                <button
                  onClick={() => setMostrarCondiciones(false)}
                  className="rounded-md px-2 py-1 hover:bg-gray-100"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4 text-sm leading-6">
                <p className="text-gray-700">
                  A continuación encontrarás las políticas y condiciones generales para la
                  venta y despacho de productos de <b>Distribuidora Tayro Pharma SAS</b>.
                </p>

                <ul className="list-disc pl-5 space-y-2">
                  <li>📦 Las <b>existencias están sujetas a inventario</b>.</li>
                  <li>💲 <b>Precios sujetos a cambio</b> sin previo aviso.</li>
                  <li>🚚 El <b>despacho se realiza cuando el pago está 100% cancelado y verificado</b>.</li>
                  <li>🗓️ <b>Fechas de despacho</b> y tiempos de entrega estimados dependen de la transportadora.</li>
                  <li>🎯 <b>Empresas de envío:</b> Servientrega, Interrapidísimo o Envia (El costo es segun peso,volumen y destino).</li>
                  <li>💳 <b>Medios de pago:</b> Nequi, Daviplata, Bancolombia.</li>
                  <li>🔎 <b>Revisión al recibir:</b> verifica el estado del paquete con la transportadora. Reporta novedades de inmediato. (si la caja se encuentra en mal estado no recibir)</li>
                </ul>

                <div className="border rounded-lg p-3 bg-gray-50">
                  <p className="text-gray-800 font-semibold mb-1">Datos de contacto</p>
                  <p>
                    WhatsApp:{" "}
                    <a
                      className="text-blue-600 underline"
                      href="https://wa.me/573146171647"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +57 314 617 1647
                    </a>
                  </p>
                  <div className="flex items-center gap-4 text-lg mt-2">
                    <a
                      href="https://www.facebook.com/TAYROPHARMA/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition"
                    >
                      <FaFacebook className="text-blue-500 text-3xl" />
                    </a>

                    <a
                      href="https://www.instagram.com/tayropharmasas/?hl=es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-pink-400 transition"
                    >
                      <FaInstagram className="text-pink-500 text-3xl" />
                    </a>

                    <a
                      href="https://www.tiktok.com/@tayro.pharma.sas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-400 transition"
                    >
                      <FaTiktok className="text-white text-3xl" />
                    </a>
                  </div>

                </div>

                <p className="text-gray-700 font-bold">
                  Nota: Contamos con aprobación y requisitos de la Secretaría de Salud para la comercialización de nuestros productos.
                </p>
              </div>

              <div className="p-4 border-t bg-gray-50 text-right">
                <button
                  onClick={() => setMostrarCondiciones(false)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white pt-4 pb-0 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Dirección */}
          <div>
            <p className="font-bold text-lg">📍 Carrera 18 # 12-89</p>
            <p>Centro Comercial Ferrocarril Plaza Local C145</p>
            <p>Bogotá DC</p>
            <p className="mt-2">
              📞
              <a
                href="https://wa.me/573146171647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-300 font-bold hover:underline ml-1"
              >
                WhatsApp: 3146171647
              </a>
            </p>
          </div>

          {/* Redes sociales */}
          <div className="md:text-center">
            <p className="font-semibold text-lg flex justify-center items-center gap-2">
              🌐 Síguenos en:
            </p>

            <div className="flex justify-center gap-6 mt-3 text-3xl">
              <a
                href="https://www.facebook.com/TAYROPHARMA/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-transform"
              >
                <FaFacebook className="text-blue-500 hover:text-blue-400" />
              </a>

              <a
                href="https://www.instagram.com/tayropharmasas/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-transform"
              >
                <FaInstagram className="text-pink-500 hover:text-pink-400" />
              </a>

              <a
                href="https://www.tiktok.com/@tayro.pharma.sas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-transform"
              >
                <FaTiktok className="text-gray-200 hover:text-gray-100" />
              </a>
            </div>
          </div>

          {/* Botón de información */}
          <div className="md:text-right">
            <p className="font-semibold text-lg">🧾 Información</p>
            <button
              onClick={() => setMostrarCondiciones(true)}
              className="mt-2 inline-block px-4 py-2 rounded-full bg-white text-blue-800 font-semibold hover:bg-blue-100 border border-blue-400"
            >
              Ver condiciones de compra
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs mt-0">
          <p className="text-sm">
            © {new Date().getFullYear()} Distribuidora Tayro Pharma SAS. Todos los derechos reservados.
          </p>
        </footer>

      </footer>

      {/* Botón Volver Arriba */}
<AnimatePresence>
  {mostrarVolverArriba && (
    <motion.button
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 flex items-center gap-2
                 px-3 py-2 rounded-full bg-blue-600 text-white
                 text-sm font-semibold shadow-lg hover:bg-blue-700
                 transition-all duration-300 z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
      Volver arriba
    </motion.button>
  )}
</AnimatePresence>


    </div>
  );
}
