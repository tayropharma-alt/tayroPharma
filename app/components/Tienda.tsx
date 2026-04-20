"use client";
export const dynamic = "force-dynamic";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useMemo, useState, useDeferredValue } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  FaFacebook, 
  FaInstagram, 
  FaTiktok, 
  FaWhatsapp, 
  FaShoppingCart, 
  FaSearch, 
  FaTimes, 
  FaPlus, 
  FaMinus, 
  FaTrash,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaInfoCircle,
  FaClock,
  FaShieldAlt,
  FaFileContract,
  FaCheck, 
  FaFlask,
  FaLightbulb
} from "react-icons/fa";

/* ================== CONFIGURACIÓN Y UTILIDADES ================== */

const NOMBRES_VENDEDORES: Record<"miguel" | "juan", string> = {
  miguel: "Miguel Uzcategui",
  juan: "Juan Torres",
};

const TELEFONOS_VENDEDORES: Record<"miguel" | "juan", string> = {
  miguel: "3146171647",
  juan: "3202417939",
};

const CODIGOS: Record<string, { telefono: string; precioMultiplier: number }> = {
  "1010": { telefono: "3202417939", precioMultiplier: 1 },      // Juan P
  "7878": { telefono: "3202417939", precioMultiplier: 1.05 },  // Juan P (+5%)
  "0009": { telefono: "3146171647", precioMultiplier: 1 },      // Miguel
  "4747": { telefono: "3146171647", precioMultiplier: 1.05 },  // Miguel (+5%)
  
};

const SUFIJOS: Record<string, string> = {
  Genfar: "(GF)", MK: "(MK)", Memphis: "(Memphis)", Colmed: "(Colmed)",
  Ecar: "(Ecar)", CoasPharma: "(Coas)", Laproff: "(LP)", "La Sante": "(LS)",
  Recipe: "(Recipe)", AG: "(AG)", Bioquifar: "(Bioqui)", Anglopharma: "(Anglo)",
};

const CATEGORIAS = [
  "Más Vendidos", "Genfar", "Naturales", "Recipe", "Antigripales", "MK",
  "Anglopharma", "Bioquifar", "Laproff", "Ecar", "Colmed", "CoasPharma",
  "AG", "Memphis", "La Sante", "Ampolleteria", "Jarabes y soluciones",
  "Cremas y Ungüentos", "Gotas", "Anticonceptivos", "Biosanitarios",
];

// Tipos
export type Producto = {
  id: number | string;
  nombre: string;
  precio: number;
  precioAntes?: number; 
  categoria: string;
  imagen?: string;
  stock: number;
  masVendido?: boolean;
  ivaIncluido?: boolean;
};

export type ProductoEnCarrito = Producto & {
  cantidad: number;
  sku: string;
};

const skuOf = (p: Producto) => `${p.id}-${p.categoria}`;
const nombreUI = (nombre: string) => nombre.replace(/\s*\([^)]+\)\s*$/u, "").trim();
const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/* ================== DATOS (TU INVENTARIO) ================== */

const productos: Producto[] = [
{ id: 1, nombre: "Advil Ultra x40 Caps", precio: 81000, categoria: "Más Vendidos", imagen: "/adult.png", stock: 20, masVendido: true },
{ id: 1005, nombre: "Advil Espalda y Cuello x20 Caps", precio: 43900, categoria: "Más Vendidos", imagen: "/escu2.png", stock: 10, masVendido: true },
  { id: 2, nombre: "Advil Gripa x20 Caps", precio: 40500, categoria: "Más Vendidos", imagen: "/advilgrip.png", stock: 100, masVendido: true },
  { id: 899, nombre: "Dolpack Calza Electrica", precio: 6000, categoria: "Más Vendidos", imagen: "/dolpack.png", stock: 0, masVendido: true },
  { id: 3, nombre: "Dolex 500mg x100 Tbs", precio: 83000, categoria: "Más Vendidos", imagen: "/dolera.png", stock: 50, masVendido: true },
  { id: 4, nombre: "Dolex Gripa x48 Tbs", precio: 62600, categoria: "Más Vendidos", imagen: "/dolexgrip.png", stock: 20, masVendido: true },
  { id: 5, nombre: "Dolex Forte x50 Tbs", precio: 80200, precioAntes: 86000, categoria: "Más Vendidos", imagen: "/dolexf.png", stock: 50, masVendido: true },
  { id: 6, nombre: "Advil Max x40 Caps", precio: 81000, categoria: "Más Vendidos", imagen: "/admax.png", stock: 50, masVendido: true },
  { id: 7, nombre: "Dolex Niños 2+ Jarabe 90ml", precio: 16900, categoria: "Más Vendidos", imagen: "/2++.png", stock: 20, masVendido: true },
  { id: 8, nombre: "Dolex Niños 7+ Jarabe 120ml", precio: 27900, categoria: "Más Vendidos", imagen: "/ad7.png", stock: 20, masVendido: true },
  { id: 9, nombre: "Dolex 1–24 Jarabe 60ml", precio: 14800, categoria: "Más Vendidos", imagen: "/bebe.png", stock: 30, masVendido: true },
  { id: 10, nombre: "Dolex Niños 2+ 100mg x20 Tbs", precio: 19000, categoria: "Más Vendidos", imagen: "/2tb.png", stock: 20, masVendido: true },
  { id: 877, nombre: "Relaxkov (Tizacnidina) 4mg x20 Tbs", precio: 29400, categoria: "Más Vendidos", imagen: "/kov4.png", stock: 30, masVendido: true },
  { id: 999, nombre: "Mioflex POST(Metocarbamol) 750mg x20 Tbs", precio: 8000, categoria: "Más Vendidos", imagen: "/mioflex.png", stock: 0, masVendido: true },
  { id: 5897, nombre: "Enersal Sabor a Fresa x30 Sobres", precio: 58000, categoria: "Más Vendidos", imagen: "/enefr.png", stock: 50, masVendido: true },
  { id: 9778, nombre: "Enersal Sabor a Uva x30 Sobres", precio: 58000, categoria: "Más Vendidos", imagen: "/eneuv.png", stock: 50, masVendido: true },
  { id: 3599, nombre: "Enersal Sabor a Mandarina x30 Sobres", precio: 58000, categoria: "Más Vendidos", imagen: "/eneman.png", stock: 50, masVendido: true },
  { id: 7899, nombre: "VENOVIT 5% Bolsa x500ml", precio: 18000, categoria: "Más Vendidos", imagen: "/veno.png", stock: 100, masVendido: true },
  { id: 7797, nombre: "Vitamina E 400 U:I x150 Caps Procaps", precio: 45000, categoria: "Más Vendidos", imagen: "/viep.png", stock: 0, masVendido: true },

  
 { id: 2989, nombre: "Metocarbamol 750mg x100 Tbs", precio: 39000, categoria: "Anglopharma", imagen: "/mean.png", stock: 30, },
 { id: 3359, nombre: "Farmalax Bisacodilo 5mg x100 Grageas", precio: 16400, categoria: "Ecar", imagen: "/farmalax.png", stock: 100, },
 { id: 3864, nombre: "Zopiclona 7.5mg x30 Tbs Expofarma", precio: 11900, categoria: "Más Vendidos", imagen: "/zoexp.png", stock: 100, },
 { id: 9862, nombre: "Zopiclona 7.5mg x20 Tbs Humax", precio: 12900, categoria: "Más Vendidos", imagen: "/zohum.png", stock: 100, },

  
  { id: 989, nombre: "Metocarbamol 750mg x20 Tbs", precio: 10200, categoria: "Anglopharma", imagen: "/bamol.png", stock: 0, },
  { id: 786, nombre: "Gastrum Plux x10 Sachets", precio: 17500, categoria: "Más Vendidos", imagen: "/gastrum.png", stock: 60, masVendido: true },
  { id: 776, nombre: "Gazu (Pantoprazol) 40mg x14 Caps", precio: 22500, categoria: "Más Vendidos", imagen: "/gazu.png", stock: 0, masVendido: true },
  { id: 8776, nombre: "Diviaren Nitrofurantoina 100mg x40 Caps", precio: 16200, categoria: "Más Vendidos", imagen: "/divia.png", stock: 120, masVendido: true },
  { id: 2486, nombre: "Tridintex Clobetasol 0,05% Solución x60ml", precio: 10800, categoria: "Más Vendidos", imagen: "/tridi.png", stock: 0, masVendido: true },
  { id: 5776, nombre: "Diclosan Dicloxacilina 500mg x50 Caps", precio: 31700, categoria: "Más Vendidos", imagen: "/diclosan.png", stock: 0, masVendido: true },
  { id: 4866, nombre: "Nikzon Tratamiendo de las Hemorroides x14 Caps", precio: 64000, categoria: "Más Vendidos", imagen: "/nik.png", stock: 16, masVendido: true },
  { id: 8936, nombre: "Pepsamar hidroxido de Aluminio x100 Tbs", precio: 18900, categoria: "Más Vendidos", imagen: "/pepsa.png", stock: 16, masVendido: true },
  { id: 7776, nombre: "Gaviscon Doble Accion x12 Sachets", precio: 32500, categoria: "Más Vendidos", imagen: "/gavis.png", stock: 0, masVendido: true },
  { id: 3356, nombre: "Tramydol Compuesto Acetaminofén + Tramadol x30 Tbs", precio: 26000, categoria: "Más Vendidos", imagen: "/tramydol.png", stock: 50, masVendido: true },
  { id: 6786, nombre: "Losartan 50mg x30 Tbs Novamed", precio: 3300, categoria: "Más Vendidos", imagen: "/lonova.png", stock: 0, masVendido: true },


 { id: 1776, nombre: "Binafar Ibuprofeno + Metocarbamol x24 Tbs", precio: 18000, categoria: "Más Vendidos", imagen: "/bina.png", stock: 100, masVendido: true },
  { id: 11, nombre: "Vaselina Pura Kevs x50gr", precio: 4411, categoria: "Más Vendidos", imagen: "/v50.png", stock: 140, masVendido: true, ivaIncluido: true },
  { id: 13, nombre: "Advil Children Jarabe 60ml", precio: 22200, categoria: "Más Vendidos", imagen: "/advilchil.png", stock: 50, masVendido: true },
  { id: 14, nombre: "Dolex Activgel x20 Caps", precio: 29600, categoria: "Más Vendidos", imagen: "/dolactiv.png", stock: 24, masVendido: true },
  { id: 15, nombre: "Advil Fem x10 Tbs", precio: 20400, categoria: "Más Vendidos", imagen: "/afen.png", stock: 0, masVendido: true },
  { id: 16, nombre: "Vaselina Pura Kevs x100gr", precio: 5940, categoria: "Más Vendidos", imagen: "/v100.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 17, nombre: "Vaselina Blanca en Lata x12und", precio: 4189, categoria: "Más Vendidos", imagen: "/vb.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 18, nombre: "Vaselina en Lata Colores x12und", precio: 4205, categoria: "Más Vendidos", imagen: "/vco.png", stock: 100, masVendido: true, ivaIncluido: true },
  { id: 19, nombre: "Manteca de Cacao Kevs (Sabores) x12und", precio: 18190, categoria: "Más Vendidos", imagen: "/kevss.png", stock: 0, masVendido: true, ivaIncluido: true },
  { id: 673, nombre: "Manteca de Cacao Kevs (Natural) x12und", precio: 18190, categoria: "Más Vendidos", imagen: "/kevsn.png", stock: 50, masVendido: true, ivaIncluido: true },
  { id: 640, nombre: "Vaselina en Lata Roja x12und", precio: 4205, categoria: "Más Vendidos", imagen: "/vr.png", stock: 100, masVendido: true, ivaIncluido: true },
  { id: 1640, nombre: "Chapet Protector Labial x24und", precio: 61000, categoria: "Más Vendidos", imagen: "/chape.png", stock: 0, masVendido: true, },


  { id: 4840, nombre: "Ortoflex L Naproxeno + Cafeina x36 Tbs", precio: 38800, categoria: "Memphis", imagen: "/ortoflex.png", stock: 50, masVendido: true, },
  { id: 5960, nombre: "Tiquepin Quetiapina 25mg x30 Tbs", precio: 9300, categoria: "Más Vendidos", imagen: "/quetin.png", stock: 30, masVendido: true, },
  { id: 2796, nombre: "Ortoflex X Acetaminonfén + Naproxeno + Cafeina x48 Tbs", precio: 46600, categoria: "Memphis", imagen: "/ortox.png", stock: 50, },

  { id: 23, nombre: "Advil Gripa Max x40 Caps", precio: 83000, categoria: "Más Vendidos", imagen: "/gripmax.png", stock: 17, masVendido: true },
  { id: 1123, nombre: "Rifapen (Rifamicina) Spray 1g/100ml x20ml ", precio: 28900, categoria: "Más Vendidos", imagen: "/rifa.png", stock: 0, masVendido: true },
  { id: 24, nombre: "Enalapril 20mg x250 Tbs", precio:23900, categoria: "Anglopharma", imagen: "/enaa.png", stock: 20, },
  { id: 28, nombre: "Pomada Libertador", precio: 11000, categoria: "Más Vendidos", imagen: "/libert.png", stock: 0, masVendido: true },
  { id: 30, nombre: "Salbumed Salbutamol Inhalador 100mcg", precio: 5700, categoria: "Más Vendidos", imagen: "/salbumed.png", stock: 2000, masVendido: true },
  { id:1030, nombre: "Sacrusyt Salbutamol Inhalador 100mcg", precio: 9300, categoria: "Más Vendidos", imagen: "/sacru.png", stock: 0, masVendido: true },
  { id: 31, nombre: "Procatec Ciprofloxacina 500mg x10 Tbs", precio: 4600, categoria: "Más Vendidos", imagen: "/proca.png", stock: 100, masVendido: true },
  { id:8030, nombre: "AIRMAX Salbutamol Inhalador 100mcg chalver", precio: 10000, categoria: "Más Vendidos", imagen: "/chalver.png", stock: 100, masVendido: true },
  { id: 2447, nombre: "Clobetasol 0.05% Crema tópica x40gr", precio:7400, categoria: "Anglopharma", imagen: "/cloa.png", stock: 50, },

  { id: 7681, nombre: "Bilsyl (Silimarina) 240mg x20 Caps", precio: 21000, categoria: "Anglopharma", imagen: "/bil.png", stock: 0, },
  { id: 9930, nombre: "Fibrilok Acido Tranexánico 500mg x10 Tbs", precio: 18600, categoria: "Más Vendidos", imagen: "/fii.png", stock: 50, masVendido: true },


  { id: 32, nombre: "Pedialyte 60meq 500ml Fresa", precio: 8200, categoria: "Más Vendidos", imagen: "/pfr.png", stock: 0, masVendido: true },
  { id: 1232, nombre: "Pedialyte 60meq 500ml Uva", precio: 8200, categoria: "Más Vendidos", imagen: "/puv.png", stock: 0, masVendido: true },
  { id: 1132, nombre: "Pedialyte 60meq 500ml Manzana", precio: 8200, categoria: "Más Vendidos", imagen: "/pman.png", stock: 0, masVendido: true },
  { id: 1332, nombre: "Pedialyte 60meq 500ml Coco", precio: 8200, categoria: "Más Vendidos", imagen: "/pco.png", stock: 0, masVendido: true },
  { id: 777, nombre: "Amoxiclin Duo (Amoxicilina + Ácido Clavulánico) 500 + 125 mg x16 Tbs", precio: 35700, categoria: "Más Vendidos", imagen: "/amoxiclin.png", stock: 0, masVendido: true },


  { id: 34, nombre: "Fosfocbrina x100 Caps", precio: 36414, categoria: "Más Vendidos", imagen: "/fosfo.png", stock: 100, masVendido: true, ivaIncluido: true },
  { id: 36, nombre: "Tor Proctologica Crema x10gr", precio: 10800, categoria: "Más Vendidos", imagen: "/torp.png", stock: 150, masVendido: true },
  { id: 38, nombre: "Buscapina Fem x24", precio: 39200, categoria: "Más Vendidos", imagen: "/bfen.png", stock: 30, masVendido: true },

  { id: 41, nombre: "Lomotil x12 Cajas de 4 Tbs", precio: 74500, categoria: "Más Vendidos", imagen: "/lomotil.png", stock: 20, masVendido: true },
  { id: 45, nombre: "Dexalyl (Dexametasona Fosfato) 0,750mg x20 Tbs", precio: 26800, categoria: "Más Vendidos", imagen: "/dexatb.png", stock: 0, masVendido: true },
  { id: 3542, nombre: "Erassin (Sildenafil) 100mg x2 Tbs", precio: 9200, categoria: "Más Vendidos", imagen: "/era.png", stock: 300, masVendido: true },

  { id: 46, nombre: "Sugastrin (Sulcralfato) 1g x20 Tbs", precio: 13500, categoria: "Más Vendidos", imagen: "/sugas.png", stock: 0, masVendido: true },
  { id: 49, nombre: "Dolpack solución bucal x120ml", precio: 19320, categoria: "Más Vendidos", imagen: "/dolenj.png", stock: 30, masVendido: true, ivaIncluido: true },
  { id: 51, nombre: "Domeboro (Acetato de Aluminio) x30 Sobres", precio: 31700, categoria: "Más Vendidos", imagen: "/dome.png", stock: 0, masVendido: true },
  { id: 52, nombre: "Mieltertos Pastillas x12 Sobres de 4 Pastillas", precio: 21000, categoria: "Más Vendidos", imagen: "/mielpast.png", stock: 90, masVendido: true },
  { id: 7753, nombre: "Levotiroxina 50mcg x50 Tbs Siegfried", precio: 9800, precioAntes: 11600,  categoria: "Más Vendidos", imagen: "/sie50.png", stock: 100, masVendido: true },
  { id: 53, nombre: "Levotiroxina 100mcg x50 Tbs Siegfried", precio: 12200, categoria: "Más Vendidos", imagen: "/sie100.png", stock: 0, masVendido: true },
  { id: 54, nombre: "Novoxican (Meloxicam 15mg) x10 Tbs", precio: 3000, categoria: "Más Vendidos", imagen: "/novcan.png", stock: 100, masVendido: true },

  { id: 55, nombre: "Impomel (Meloxicam 15mg) x10 Tbs", precio: 3200, categoria: "Más Vendidos", imagen: "/impomel.png", stock: 20, masVendido: true },
  { id: 56, nombre: "Inoxicam (Meloxicam) 15mg x10 Tbs", precio: 2400, categoria: "Más Vendidos", imagen: "/inoxi.png", stock: 0, masVendido: true },
  { id: 57, nombre: "Veran D (Piroxicam 20mg) x10 Caps", precio: 6700, categoria: "Más Vendidos", imagen: "/verand.png", stock: 0, masVendido: true },
  { id: 58, nombre: "Metformina 850mg x30 Tbs Pisa", precio: 6000, categoria: "Más Vendidos", imagen: "/pisa6.png", stock: 100, masVendido: true },
  { id: 59, nombre: "Omeprazol 20mg x250 Cap", precio: 32900, categoria: "Anglopharma", imagen: "/omeprazola.png", stock: 0, },
  { id: 627, nombre: "Omeprazol 20mg x300 Cap Farmacol", precio: 39000, categoria: "Más Vendidos", imagen: "/omefar.png", stock: 100, masVendido: true },
  { id: 60, nombre: "Deltmoxi (Amoxicilina) 500mg x100 Caps", precio: 27000, precioAntes: 28200, categoria: "Más Vendidos", imagen: "/delmox.png", stock: 30, masVendido: true },
  { id: 61, nombre: "Okap Forte (Acetaminofén + Cafeína) x10 Caps", precio: 8300, categoria: "Más Vendidos", imagen: "/ofo.png", stock: 0, masVendido: true },
  { id: 1061, nombre: "Okap (Tramadol + Acetaminofén) 37,5/325 mg x10 Caps", precio: 17500, categoria: "Más Vendidos", imagen: "/okap.png", stock: 0, masVendido: true },
  { id: 2061, nombre: "Dor-2 (Tramadol + Acetaminofén) 37,5/325 mg x10 Tbs", precio: 18300, categoria: "Más Vendidos", imagen: "/dor2.png", stock: 0, masVendido: true },
  { id: 2481, nombre: "Dietrex Buclizina 25,0mg x40 Tbs", precio: 31800, categoria: "Más Vendidos", imagen: "/dietrex.png", stock: 20, masVendido: true },


  { id: 64, nombre: "Losartán 50mg x30 Tbs Expofarma", precio: 3400, categoria: "Más Vendidos", imagen: "/le.png", stock: 500, masVendido: true },
  { id: 678, nombre: "Gestavit DHA x30 Caps", precio: 89400, categoria: "Más Vendidos", imagen: "/gtad.png", stock: 0, masVendido: true },

  { id: 66, nombre: "Movidol x8 Tbs", precio: 10000, categoria: "Más Vendidos", imagen: "/movi8.png", stock: 50, masVendido: true },
  { id: 67, nombre: "Vencedor (Matacallo - Ácido Salicílico)", precio: 6700, categoria: "Más Vendidos", imagen: "/vence.png", stock: 100, masVendido: true },
  { id: 68, nombre: "Tropxim-F (Metronidazol 500mg + Clotrimazol 100mg) x10 Óvulos", precio: 21500, categoria: "Más Vendidos", imagen: "/tovul.png", stock: 0, masVendido: true },
  { id: 69, nombre: "Gastrimeb (Alginato de Sodio + Simeticona) 360ml", precio: 24200, categoria: "Más Vendidos", imagen: "/gastri.png", stock: 30, masVendido: true },
  { id: 70, nombre: "Migradol (Ergotamina + Cafeína) x30 Tbs", precio: 39900, categoria: "Más Vendidos", imagen: "/migra.png", stock: 0, masVendido: true },
  { id: 71, nombre: "Nodol Plus (Acetaminofén 325mg + Hidrocodona 5mg) x10 Tbs", precio: 32200, categoria: "Más Vendidos", imagen: "/ndpl.png", stock: 0, masVendido: true },
  { id: 671,nombre: "Nodol Forte (Acetaminofén 325mg + Codeína Fosfato 30mg) x30 Tbs", precio: 25300, categoria: "Más Vendidos", imagen: "/nfort.png", stock: 0, masVendido: true },
  { id: 672,nombre: "Fibrinexam (Ácido Tranexámico) 500mg x10 Tbs", precio: 30000, categoria: "Más Vendidos", imagen: "/fibri.png", stock: 0, masVendido: true },
  { id: 72, nombre: "Diosmit (Diosmectita 3%) x6 Sobres", precio: 14300, categoria: "Más Vendidos", imagen: "/diosmi.png", stock: 140, masVendido: true },
  { id: 73, nombre: "Sinverty (Dimenhidrinato 50mg) x72 Tbs", precio: 21000, categoria: "Más Vendidos", imagen: "/Sinvert.png", stock: 50, masVendido: true },

  { id: 74, nombre: "Langenix (Lansoprazol 30mg) x30 Caps", precio: 7700, categoria: "Más Vendidos", imagen: "/lange.png", stock: 50, masVendido: true },
  { id: 75, nombre: "X Ray Dol x48 Tbs", precio: 63000, categoria: "Más Vendidos", imagen: "/xxxx.png", stock: 30, masVendido: true },
  { id: 611, nombre: "X Ray Dol x12 Tbs", precio: 17500, categoria: "Más Vendidos", imagen: "/xray12.png", stock: 30, masVendido: true },
  { id: 76, nombre: "Dolpack Kids (Ácido Hialurónico + Regaliz) x10ml", precio: 12879, categoria: "Más Vendidos", imagen: "/nenepack.png", stock: 0, masVendido: true, ivaIncluido: true },
  { id: 77, nombre: "Solomoxy (Amoxicilina 500mg) x60 Caps", precio: 18000, categoria: "Más Vendidos", imagen: "/solo.png", stock: 0, masVendido: true },
  { id: 79, nombre: "Cefalexina 500mg x50 Caps", precio: 29300, categoria: "Anglopharma", imagen: "/ceprax.png", stock: 50, },
  { id: 80, nombre: "Amdelt (Ampicilina 500mg) x100 Caps", precio: 27500, categoria: "Más Vendidos", imagen: "/ampidelta.png", stock: 0, masVendido: true },
  { id: 82, nombre: "Buscapina Compuesta x30 Comp", precio: 46500, categoria: "Más Vendidos", imagen: "/bc.png", stock: 30, masVendido: true },
  { id: 83, nombre: "Acetato de Aluminio x120ml Totalmax", precio: 3565, categoria: "Más Vendidos", imagen: "/aceto.png", stock: 100, masVendido: true, ivaIncluido: true },
  { id: 84, nombre: "Clonidina 0.150mg x50 Tbs", precio: 9000, categoria: "Anglopharma", imagen: "/clon.png", stock: 100, },
  { id: 85, nombre: "Rhinospray (Furoato de Mometasona) 0.05 x18ml", precio: 19600, categoria: "Más Vendidos", imagen: "/rhino.png", stock: 0, masVendido: true },
  { id: 86, nombre: "Alka-Seltzer x60 Tab (Bayer)", precio: 43500, categoria: "Más Vendidos", imagen: "/alka.png", stock: 20, masVendido: true },
  { id: 4550, nombre: "Deltazitrom Azitromicina 500mg x3 Tbs", precio: 3000, categoria: "Más Vendidos", imagen: "/delzi.png", stock: 100, masVendido: true },
  { id: 2795, nombre: "Torrox Etoricoxib 120mg x10 Tbs", precio: 13900, categoria: "Más Vendidos", imagen: "/torrox.png", stock: 50, masVendido: true },

  { id: 87, nombre: "Electrolit x625ml Maracuya", precio: 6900, categoria: "Más Vendidos", imagen: "/marac.png", stock: 1000, masVendido: true },
  { id: 1187, nombre: "Electrolit x625ml Uva", precio: 6900, categoria: "Más Vendidos", imagen: "/eleuv.png", stock: 1000, masVendido: true },
  { id: 1287, nombre: "Electrolit x625ml Mora Azul", precio: 6900, categoria: "Más Vendidos", imagen: "/elemo.png", stock: 1000, masVendido: true },
  { id: 1487, nombre: "Electrolit x625ml Fresa-Kiwi", precio: 6900, categoria: "Más Vendidos", imagen: "/elefk.png", stock: 1000, masVendido: true },
  { id: 1587, nombre: "Electrolit x625ml Naranja-Mandarina", precio: 6900, categoria: "Más Vendidos", imagen: "/naman.png", stock: 1000, masVendido: true },
  { id: 1687, nombre: "Electrolit x625ml Coco", precio: 6900, categoria: "Más Vendidos", imagen: "/coco.png", stock: 1000, masVendido: true },
  { id: 1787, nombre: "Electrolit x625ml Manzana", precio: 6900, categoria: "Más Vendidos", imagen: "/eleman.png", stock: 1000, masVendido: true },
  { id: 1887, nombre: "Electrolit x625ml Ponche de Frutas", precio: 6900, categoria: "Más Vendidos", imagen: "/elepo.png", stock: 1000, masVendido: true },
   { id: 5887, nombre: "Amoken Amoxicilina + Acido Clavulánico x14 Tbs", precio: 32400, categoria: "Más Vendidos", imagen: "/aclav.png", stock: 50, masVendido: true },

  { id: 88, nombre: "Muvett S (Trimebutina 200mg + Simeticona 120mg) x21 Tbs", precio: 42500, categoria: "Más Vendidos", imagen: "/muvetts.png", stock: 30, masVendido: true },
  { id: 89, nombre: "Enterogermina 2000 Millones/5ml", precio: 65800, categoria: "Más Vendidos", imagen: "/enterog.png", stock: 0, masVendido: true },
  { id: 90, nombre: "Manteca de Cacao Zica x12 Und Tipo Labial", precio: 3080, categoria: "Más Vendidos", imagen: "/zica.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 91, nombre: "Trivag Fem (Solución Vaginal) x120ml (Tridex)", precio: 9583, categoria: "Más Vendidos", imagen: "/triv.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 92, nombre: "Vaselina Pura Kevs x470gr", precio: 12370, categoria: "Más Vendidos", imagen: "/v470.png", stock: 20, masVendido: true, ivaIncluido: true },
  { id: 93, nombre: "Aspirina Efervescente x50 Tbs", precio: 43500, categoria: "Más Vendidos", imagen: "/aspie.png", stock: 20, masVendido: true },
  { id: 94, nombre: "Hydrastick Protector Labial Medicado (Totalmax)", precio: 6000, categoria: "Más Vendidos", imagen: "/himed.png", stock: 0, masVendido: true },
  { id: 6593, nombre: "Aspirina 100 (Bayer) x140 Tbs", precio: 67500, categoria: "Más Vendidos", imagen: "/asp.png", stock: 30, masVendido: true },
  { id: 4671,nombre: "Demulin Tamsulosina HCI 0,4mg x30 Caps", precio: 34000, categoria: "Más Vendidos", imagen: "/demu.png", stock: 50, masVendido: true },


  { id: 7821,nombre: "Tamsulosina HCI 0,4mg x30 Caps Sandoz", precio: 22000, categoria: "Más Vendidos", imagen: "/sandoz.png", stock: 0, masVendido: true },

  { id: 95, nombre: "K-Llosíl x20ml", precio: 13200, categoria: "Más Vendidos", imagen: "/kllo.png", stock: 20, masVendido: true },
  { id: 96, nombre: "A-Listant Prueba de Embarazo Cassette x1 Und", precio: 1500, categoria: "Más Vendidos", imagen: "/prube.png", stock: 20, masVendido: true },
  { id: 97, nombre: "Sevedol Extra Fuerte x60 Tbs", precio: 66400, categoria: "Más Vendidos", imagen: "/s60d.png", stock: 0, masVendido: true },
  { id: 1297, nombre: "Sevedol Extra Fuerte x24 Tbs", precio: 30500, categoria: "Más Vendidos", imagen: "/seve24.png", stock: 60, masVendido: true },
  { id: 98, nombre: "Lumbal Forte x36 Tbs", precio: 56500, categoria: "Más Vendidos", imagen: "/lumbal.png", stock: 0, masVendido: true },
  { id: 99, nombre: "Dolorsin Fem x36 Cap", precio: 44900, categoria: "Más Vendidos", imagen: "/dolorfem.png", stock: 50, masVendido: true },
  { id: 100, nombre: "Vitaril Gel Tópico Castaño de Indias x60gr", precio: 25109, categoria: "Cremas y Ungüentos", imagen: "/vitatril.png", stock: 20, ivaIncluido: true },
{ id: 102, nombre: "Solhidrex (Sales de Rehidratación Oral) x30 Sobres", precio: 58000, categoria: "Más Vendidos", imagen: "/solhidrex.png", stock: 0, masVendido: true },
{ id: 103, nombre: "Dolofen 500mg (Acetaminofén) x60 Caps", precio: 27500, categoria: "Más Vendidos", imagen: "/dolo.png", stock: 0, masVendido: true },
{ id: 104, nombre: "Vaselina de Limón en Lata x12 Und", precio: 4104, categoria: "Más Vendidos", imagen: "/vl.png", stock: 20, masVendido: true, ivaIncluido: true },
{ id: 105, nombre: "Bispeptol (Diosmectita) x9 Sobres de 3gr", precio: 18800, categoria: "Más Vendidos", imagen: "/bisp.png", stock: 0, masVendido: true },
{ id: 111, nombre: "Mareol (Dimenhidrinato) 50mg x72 Tbs", precio: 46000, categoria: "Más Vendidos", imagen: "/mareol.png", stock: 0, masVendido: true },

{ id: 112, nombre: "Tacna (Sultamicilina) 375mg x10 Tbs", precio: 34800, categoria: "Más Vendidos", imagen: "/tac.png", stock: 0, masVendido: true },
{ id: 114, nombre: "Redoxon Total x20 Tbs", precio: 27582, categoria: "Más Vendidos", imagen: "/redo.png", stock: 0, masVendido: true, ivaIncluido: true },
{ id: 115, nombre: "Beclort Beclometasona 250mcg", precio: 14100, categoria: "Más Vendidos", imagen: "/beclort.png", stock: 0, masVendido: true }, // Próximo a llegar
{ id: 118, nombre: "Acnotin Isotretinoina USP 20 mg x30 Caps", precio: 68000, categoria: "Más Vendidos", imagen: "/acno.png", stock: 0, masVendido: true },
{ id: 119, nombre: "Zincovit Vitamina C + Zinc x100 Tbs", precio: 22500, categoria: "Más Vendidos", imagen: "/zincovit.png", stock: 150, masVendido: true },
{ id: 120, nombre: "Pranexxin (Nitazoxanida 500mg) x6 Tbs", precio: 12700, categoria: "Más Vendidos", imagen: "/pranexx.png", stock: 100, masVendido: true },
{ id: 121, nombre: "Vyasil (Sildenafilo 50mg) x2 Tbs", precio: 2900, categoria: "Más Vendidos", imagen: "/vyasil.png", stock: 0, masVendido: true },

{ id: 122, nombre: "Metformina 850mg x250 Tbs", precio: 60700, categoria: "Anglopharma", imagen: "/met250.png", stock: 0, },
{ id: 123, nombre: "Lindazol x3 Ovulos", precio: 19200, categoria: "Más Vendidos", imagen: "/lindaovu.png", stock: 40, masVendido: true },
{ id: 124, nombre: "Neubalin 75mg x30 Caps", precio: 12500, categoria: "Más Vendidos", imagen: "/n75.png", stock: 0, masVendido: true }, // Próximo a llegar
{ id: 125, nombre: "Bisacodilo 5mg x100 Tbs Humax", precio: 12000, categoria: "Más Vendidos", imagen: "/bhum.png", stock: 20, masVendido: true },
{ id: 126, nombre: "Ibunflash Migran x30 Caps", precio: 55000, categoria: "Más Vendidos", imagen: "/ibuflashx30.png", stock: 50, masVendido: true },
{ id: 127, nombre: "Ibunflash Migran x8 Caps", precio: 14600, categoria: "Más Vendidos", imagen: "/i88.png", stock: 0, masVendido: true },
{ id: 1127, nombre: "Ibunflash Migran x12 Caps", precio: 21400, categoria: "Más Vendidos", imagen: "/i12.png", stock: 60, masVendido: true },
{ id: 4122, nombre: "Metformina 850mg x30 Tbs", precio: 8900, precioAntes: 10200, categoria: "Anglopharma", imagen: "/me8.png", stock: 50, },

//GENFAR//
{ id: 128, nombre: "Silimarina 150mg x20 Cap (GF)", precio: 14500, categoria: "Genfar", imagen: "/silima.png", stock: 0 },
{ id: 8528, nombre: "Acetaminofen 500mg x100 Tbs (GF)", precio: 5200, categoria: "Genfar", imagen: "/a51.png", stock: 0 },
{ id: 3358, nombre: "Clonidina 0,15 mg x20 Tbs (GF)", precio: 12200, categoria: "Genfar", imagen: "/clogf.png", stock: 0 },
{ id: 3348, nombre: "Loratadina 10mg x10 Tbs (GF)", precio: 2100, categoria: "Genfar", imagen: "/l10gf.png", stock: 0 }, // Próximo a llegar
{ id: 8748, nombre: "Piroxicam 20mg x10 Tbs (GF)", precio: 2600, categoria: "Genfar", imagen: "/pgf10.png", stock: 100 },
{ id: 2899, nombre: "Ibuprofeno + Metocarbamol 200/500mg x30 Tbs (GF)", precio: 16900, categoria: "Genfar", imagen: "/ibu200.png", stock: 50 },

{ id: 129, nombre: "Ibuprofeno 800mg x50 Tbs (GF)", precio: 9200, categoria: "Genfar", imagen: "/ibu800gf.png", stock: 50 },
{ id: 130, nombre: "Metronidazol 500mg x100 Tbs (GF)", precio: 16000, categoria: "Genfar", imagen: "/m5100.png", stock: 0 },
{ id: 131, nombre: "Quetiapina 25mg x30 Comp (GF)", precio: 8500, categoria: "Genfar", imagen: "/que25.png", stock: 100 }, // Próximo a llegar
{ id: 132, nombre: "Tamsulosina Clorhidrato 0.4mg x30 Cap (GF)", precio: 23500, categoria: "Genfar", imagen: "/tansgf.png", stock: 0 },
{ id: 133, nombre: "Cefalexina 500mg x10 Cap (GF)", precio: 5400, categoria: "Genfar", imagen: "/cefgf.png", stock: 200 },
{ id: 134, nombre: "Dexametasona 8mg/2ml x10 Amp (GF)", precio: 18800, categoria: "Genfar", imagen: "/dgf.png", stock: 0 },
{ id: 135, nombre: "Lansoprazol 30mg x14 Cap (GF)", precio: 8400, categoria: "Genfar", imagen: "/langf.png", stock: 50 },
{ id: 136, nombre: "Azitromicina 200mg/5ml x15ml (suspensión) (GF)", precio: 10944, categoria: "Genfar", imagen: "/azisgf.png", stock: 100 }, // Próximo a llegar
{ id: 137, nombre: "Amoxicilina 500mg x50 Caps (GF)", precio: 17800, categoria: "Genfar", imagen: "/amogf.png", stock: 100 },
{ id: 1137, nombre: "Amoxicilina Suspensión 250mg x100 ml (GF)", precio: 6900, categoria: "Genfar", imagen: "/agf2.png", stock: 0 },
{ id: 138, nombre: "Carvedilol 6,25 mg x30 Tbs (GF)", precio: 7900, categoria: "Genfar", imagen: "/c6gf.png", stock: 100 }, // Próximo a llegar
{ id: 8829, nombre: "Ampicilina 1G x100 Tbs (GF)", precio: 76800, categoria: "Genfar", imagen: "/genfarampi.png", stock: 0 },
{ id: 7474, nombre: "Ketoprofeno 100mg x30 Tbs (GF)", precio: 17200, categoria: "Genfar", imagen: "/k10030.png", stock: 10 },
{ id: 7574, nombre: "Acetaminofén + Codeina 325/30mg x30 Tbs (GF)", precio: 20500, categoria: "Genfar", imagen: "/ace325.png", stock: 20 },
{ id: 7674, nombre: "Ketoprofeno 100mg/2ml x6 Amp (GF)", precio: 17500, categoria: "Genfar", imagen: "/keamp.png", stock: 30 },

{ id: 139, nombre: "Tramadol 50mg x10 Caps (GF)", precio: 8500, categoria: "Genfar", imagen: "/tgf.png", stock: 0 },
{ id: 140, nombre: "Fluconazol 200mg x4 Caps (GF)", precio: 7200, categoria: "Genfar", imagen: "/flgf.png", stock: 0 },
{ id: 141, nombre: "Doxiciclina 100mg x10 Tbs (GF)", precio: 5700, categoria: "Genfar", imagen: "/doxicigf.png", stock: 0 },
{ id: 142, nombre: "Cefalexina Suspensión 250mg x60ml (GF)", precio: 6400, categoria: "Genfar", imagen: "/cesgf.png", stock: 60 },
{ id: 144, nombre: "Diclofenaco 50mg x30 Tbs (GF)", precio: 3600, categoria: "Genfar", imagen: "/d50fgg.png", stock: 70 }, // Próximo a llegar
{ id: 145, nombre: "Diclofenaco 75mg/3ml x10 Amp (GF)", precio: 11500, categoria: "Genfar", imagen: "/digf.png", stock: 0 }, // Próximo a llegar
{ id: 146, nombre: "Lincomicina 600mg/2ml x10 Amp (GF)", precio: 18000, categoria: "Genfar", imagen: "/l600.png", stock: 0 },
{ id: 147, nombre: "Genfar Kids Ibuprofeno Suspensión x120ml (GF)", precio: 7400, categoria: "Genfar", imagen: "/isusgf.png", stock: 0 },
{ id: 3778, nombre: "Loratadina Jarabe 5mg/5ml x100 ml (GF)", precio: 3700, categoria: "Genfar", imagen: "/lorasusgf.png", stock: 0 },

{ id: 148, nombre: "Trimebutina 200mg x30 Tbs (GF)", precio: 13900, categoria: "Genfar", imagen: "/tgf200.png", stock: 0 },
{ id: 149, nombre: "Valsartán 160mg x14 Tbs (GF)", precio: 13900, categoria: "Genfar", imagen: "/val160.png", stock: 70 },
{ id: 150, nombre: "Ácido Acetilsalicílico 100mg x100 Tbs (GF)", precio: 16400, categoria: "Genfar", imagen: "/aa.png", stock: 90 },
{ id: 151, nombre: "Losartán + Hidroclotiazida 50mg/12.5mg x30 Tbs (GF)", precio: 23000, categoria: "Genfar", imagen: "/lhgf.png", stock: 0 }, // Próximo a llegar
{ id: 152, nombre: "Furosemida 40mg x100 Tbs (GF)", precio: 10500, categoria: "Genfar", imagen: "/fugf.png", stock: 0 },
{ id: 153, nombre: "Pregabalina 75mg x30 Cap (GF)", precio: 20600, categoria: "Genfar", imagen: "/pregaa.png", stock: 40 }, // Próximo a llegar
{ id: 154, nombre: "Diosmina Hesperidina 450mg/50mg x30 Tbs (GF)", precio: 18000, categoria: "Genfar", imagen: "/dhgf4.png", stock: 0 }, // Próximo a llegar
{ id: 155, nombre: "Tinidazol 500mg x8 Tbs (GF)", precio: 3600, categoria: "Genfar", imagen: "/t500gf.png", stock: 140 },
{ id: 156, nombre: "Celecoxib 200mg x10 Caps", precio: 6900, categoria: "Genfar", imagen: "/celogf.png", stock: 50 },
{ id: 157, nombre: "Triconjugada x40gr Genfar (GF)", precio: 17800, categoria: "Genfar", imagen: "/tricogf40.png", stock: 50 },
{ id: 620, nombre: "Triconjugada x20gr Genfar (GF)", precio: 11500, categoria: "Genfar", imagen: "/tricofg20.png", stock: 50 },
{ id: 650, nombre: "Ivermectina Gotas 0.6% x5 ml (GF)", precio: 8200, categoria: "Genfar", imagen: "/ivergf.png", stock: 0 },

{ id: 158, nombre: "Aciclovir Suspensión 100mg/5ml x90ml (GF)", precio: 17700, categoria: "Genfar", imagen: "/asus.png", stock: 0 },
{ id: 159, nombre: "Valsartán 80mg x14 Tbs (GF)", precio: 6900, precioAntes: 7600, categoria: "Genfar", imagen: "/val80.png", stock: 100 },
{ id: 160, nombre: "Dicloxacilina 500mg x50 caps GF (GF)", precio: 28700, categoria: "Genfar", imagen: "/dggg.png", stock: 50 }, // Próximo a llegar
{ id: 161, nombre: "Betametasona 0.05% x40gr (GF)", precio: 11500, categoria: "Genfar", imagen: "/bgf005.png", stock: 20 },
{ id: 162, nombre: "Metoclopramida 10mg/2ml x5 Amp (GF)", precio: 17000, categoria: "Genfar", imagen: "/metogf.png", stock: 0 }, // Próximo a llegar
{ id: 164, nombre: "Betametasona 0.1 x40gr (GF)", precio: 15300, categoria: "Genfar", imagen: "/bgf01.png", stock: 30 }, // Próximo a llegar
{ id: 166, nombre: "Etoricoxib 120mg x7 Tbs (GF)", precio: 22900, categoria: "Genfar", imagen: "/eto10.png", stock: 20 },
{ id: 167, nombre: "Naproxeno 250mg x10 Tbs (GF)", precio: 2400, categoria: "Genfar", imagen: "/n25.png", stock: 0 },

{ id: 168, nombre: "Tinidazol 1g x4 Tbs (GF)", precio: 3600, categoria: "Genfar", imagen: "/t1grgf.png", stock: 70 },
{ id: 169, nombre: "Amitriptilina 25mg x30 Tbs (GF)", precio: 5400, categoria: "Genfar", imagen: "/amitrigf.png", stock: 0 },
{ id: 171, nombre: "Hidroclorotiazida 25mg x30 Tbs (GF)", precio: 2600, categoria: "Genfar", imagen: "/h25mg.png", stock: 0 },
{ id: 173, nombre: "Ketoprofeno Gel al 2.5% x40gr (GF)", precio: 16000, categoria: "Genfar", imagen: "/kegf.png", stock: 0 },
{ id: 174, nombre: "N-Acetilcisteína 600mg x10 Sobres (GF)", precio: 13300, categoria: "Genfar", imagen: "/n-a.png", stock: 100 },
{ id: 175, nombre: "Montelukast 10mg x30 Tbs (GF)", precio: 34500, categoria: "Genfar", imagen: "/mont10.png", stock: 0 },
{ id: 177, nombre: "Montelukast 4mg x30 Tbs (GF)", precio: 16300, categoria: "Genfar", imagen: "/mont4.png", stock: 0 },


//NATURALES//
{ id: 20, nombre: "Ginkgo Biloba 120mg x60 Tbs", precio: 18500, categoria: "Naturales", imagen: "/gink.png", stock: 100 },
{ id: 178, nombre: "Colageno 500mg x30 Caps Naturalmente", precio: 11900, categoria: "Naturales", imagen: "/cola.png", stock: 30, ivaIncluido: true },
{ id: 179, nombre: "Omega 3 x30 Caps Naturalmente", precio: 13720, categoria: "Naturales", imagen: "/ome3.png", stock: 0, ivaIncluido: true },
{ id: 180, nombre: "Biotina 900mcg x30 Caps", precio: 14176, categoria: "Naturales", imagen: "/biot.png", stock: 0, ivaIncluido: true },
{ id: 181, nombre: "Vit Max (Complejo B + Zinc) x30 Caps", precio: 14700, categoria: "Naturales", imagen: "/vitmax.png", stock: 200, ivaIncluido: true },
{ id: 182, nombre: "Omega 3 x30 Caps Totalmax", precio: 12362, categoria: "Naturales", imagen: "/ome3to.png", stock: 50, ivaIncluido: true },
{ id: 1182, nombre: "Omega 3,6,9 x30 Caps Totalmax", precio: 12363, precioAntes: 14300, categoria: "Naturales", imagen: "/ot3.png", stock: 50, ivaIncluido: true },
{ id: 184, nombre: "Vitamina E + Selenio (1000 UI + 35mcg) x30 Caps", precio: 14200, categoria: "Naturales", imagen: "/ves.png", stock: 50, },
{ id: 185, nombre: "Veramiel Pastillas x24 Sobres x4", precio: 25900, categoria: "Naturales", imagen: "/veramielp.png", stock: 20 },
{ id: 586, nombre: "Lyptus Miel x24 Sobres x5 Pastillas Mentol", precio: 27200, categoria: "Naturales", imagen: "/lypsm.png", stock: 80 },
{ id: 4186, nombre: "Lyptus Miel x24 Sobres x5 Pastillas Hierbabuena", precio: 27200, categoria: "Naturales", imagen: "/lypsh.png", stock: 80 },
{ id: 186, nombre: "Lyptus Miel x24 Sobres x5 Pastillas Cherry", precio: 27200, categoria: "Naturales", imagen: "/lypsc.png", stock: 80 },

{ id: 1186, nombre: "Refreslyp Menta-Jengibre x26 Sobres x4 pastillas", precio: 23604, categoria: "Naturales", imagen: "/refrm.png", stock: 0, ivaIncluido: true  },
{ id: 2186, nombre: "Refreslyp Cereza x26 Sobres x4 pastillas", precio: 23604, categoria: "Naturales", imagen: "/refrc.png", stock: 0, ivaIncluido: true  },
{ id: 188, nombre: "Trigosamine Cloruro de Magnesio x60 Caps", precio: 19478, categoria: "Naturales", imagen: "/trigo.png", stock: 30, ivaIncluido: true },
{ id: 1188, nombre: "Multi-Cevita x100 Tbs", precio: 18159, categoria: "Naturales", imagen: "/m-c.png", stock: 50, ivaIncluido: true },
{ id: 7178, nombre: "Ice Cannabis x110gr", precio: 5943, categoria: "Naturales", imagen: "/icecan.png", stock: 0, ivaIncluido: true },
{ id: 5573, nombre: "Citrato de Magnesio x60 Tbs", precio: 23000, categoria: "Naturales", imagen: "/citma.png", stock: 20, ivaIncluido: true },
{ id: 7862, nombre: "Omega 3,6,9 x30 Caps Naturalmente", precio: 13720, categoria: "Naturales", imagen: "/o369.png", stock: 50, ivaIncluido: true },

{ id: 2178, nombre: "Colageno 500mg x60 Caps", precio: 16912, categoria: "Naturales", imagen: "/chi.png", stock: 50, ivaIncluido: true },

{ id: 8189, nombre: "Colageno + Biotina x30 Caps Naturalmente", precio: 18200, categoria: "Naturales", imagen: "/cyb.png", stock: 0, ivaIncluido: true },

{ id: 1192, nombre: "Vitamininas y Minerales x30 caps Servipharma", precio: 14900, categoria: "Naturales", imagen: "/vms.png", stock: 30 },
{ id: 189, nombre: "Colageno + Biotina x30 Caps Totalmax", precio: 13997, categoria: "Naturales", imagen: "/cb.png", stock: 0, ivaIncluido: true },
{ id: 190, nombre: "Complejo B + Zinc x30 Caps Totalmax", precio: 12362, categoria: "Naturales", imagen: "/comtot.png", stock: 50, ivaIncluido: true },
{ id: 192, nombre: "Fibr-Max x300gr", precio: 18600, categoria: "Naturales", imagen: "/fibr.png", stock: 20 },
{ id: 193, nombre: "Bronquisan Tabletas x20 Sobres", precio: 32000, categoria: "Naturales", imagen: "/bpast.png", stock: 50 },
{ id: 194, nombre: "Bronquisan Jalea (Adultos) x240ml", precio: 11000, categoria: "Naturales", imagen: "/badu.png", stock: 50 },
{ id: 195, nombre: "Bronquisan Jalea (Niños) x240ml", precio: 11000, categoria: "Naturales", imagen: "/bkids.png", stock: 50 },
{ id: 1595, nombre: "Parabil Purgante en polvo x20 Gr", precio: 5000, categoria: "Naturales", imagen: "/para.png", stock: 280 },
// ===== RECIPE =====
{ id: 197, nombre: "Trazodona Clorhidrato 50 mg x50 Tbs", precio: 10300, categoria: "Recipe", imagen: "/trazo.png", stock: 50 },
{ id: 198, nombre: "Sildenafil 50mg x2 Tbs", precio: 1200, categoria: "Recipe", imagen: "/silr.png", stock: 1000 },
{ id: 199, nombre: "Desonida al 0,05% x15 Gr", precio: 5800, categoria: "Recipe", imagen: "/desor.png", stock: 0 },          // Próximo a llegar
{ id: 200, nombre: "Ketotifeno 1mg x30 tbs", precio: 6000, categoria: "Recipe", imagen: "/ketotir.png", stock: 0 },       // Próximo a llegar
{ id: 203, nombre: "Zopiclona 7.5mg x30 Tbs", precio: 13900, categoria: "Recipe", imagen: "/zopi.png", stock: 0 },
{ id: 204, nombre: "Nitrofurantoina 100 mg x40 Tbs", precio: 14600, categoria: "Recipe", imagen: "/nsan.png", stock: 100 },
{ id: 978, nombre: "Bisacodilo 5Mg x100 Tbs", precio: 23300, categoria: "Recipe", imagen: "/bire.png", stock: 30 },
{ id: 1978, nombre: "Cetirizina 10mg x10 Tbs", precio: 1400, categoria: "Recipe", imagen: "/cr10.png", stock: 0 },
{ id: 3380, nombre: "Metoclopramida 10mg x36 Tbs", precio: 4700, categoria: "Recipe", imagen: "/mreci.png", stock: 0 },
{ id: 7998, nombre: "Sildenafil 50mg x100 Tbs", precio: 58500, categoria: "Recipe", imagen: "/silx100.png", stock: 200 },
{ id: 7540, nombre: "Cefalexina 500mg x100 Caps", precio: 54000, categoria: "Recipe", imagen: "/sanfer.png", stock: 0 },       // Próximo a llegar
{ id: 3559, nombre: "Amitriptilina 25mg x30 Tbs", precio: 3500, categoria: "Recipe", imagen: "/amire.png", stock: 50 },          // Próximo a llegar

// ===== ANTIGRIPALES =====
{ id: 205, nombre: "Pax Noche x24 Sobres", precio: 54500, categoria: "Antigripales", imagen: "/paxn.png", stock: 0 },
{ id: 206, nombre: "Pax Día x24 Sobres", precio: 54500, categoria: "Antigripales", imagen: "/paxd.png", stock: 0 },
{ id: 207, nombre: "Respirin Gripa x100 Caps", precio: 25900, categoria: "Antigripales", imagen: "/respi.png", stock: 50 },
{ id: 208, nombre: "Congestex x60 Cap", precio: 44000, categoria: "Antigripales", imagen: "/congcap.png", stock: 0 },
{ id: 210, nombre: "Mieltertos Día x24 Sobres", precio: 40500, categoria: "Antigripales", imagen: "/mield.png", stock: 20 },
{ id: 213, nombre: "Mieltertos Noche x24 Sobres", precio: 40500, categoria: "Antigripales", imagen: "/mielnoc.png", stock: 20 },
{ id: 1213, nombre: "Resfrygrip x25 Sobres", precio: 50000, categoria: "Antigripales", imagen: "/resfry.png", stock: 0 },

{ id: 6340, nombre: "Noxpirin Junior x24 Sobres", precio: 36500, categoria: "Antigripales", imagen: "/noxpij24.png", stock: 30 },
{ id: 214, nombre: "Ashar Gripa x100 Cap", precio: 54600, categoria: "Antigripales", imagen: "/ashar.png", stock: 0 },
{ id: 215, nombre: "Noxpirin Noche x24 Sobres", precio: 51500, categoria: "Antigripales", imagen: "/noxno.png", stock: 50 },
{ id: 888, nombre: "Noxpirin Noche x50 Sobres", precio: 82500, categoria: "Antigripales", imagen: "/no50.png", stock: 0 },
{ id: 216, nombre: "Noxpirin Día x24 Sobres", precio: 51000, categoria: "Antigripales", imagen: "/noxdia.png", stock: 20 },
{ id: 217, nombre: "Zetygrip 4 x100 Caps", precio: 37600, categoria: "Antigripales", imagen: "/Zety4.png", stock: 100 },
{ id: 218, nombre: "Noxpirin Plus x100 Caps", precio: 96700, categoria: "Antigripales", imagen: "/nox100.png", stock: 20 },
{ id: 630, nombre: "Noxpirin Plus x48 Caps", precio: 45600, categoria: "Antigripales", imagen: "/noxpi48.png", stock: 0 },
{ id: 219, nombre: "Zetygrip4 Noche x30 Sobres", precio: 35600, categoria: "Antigripales", imagen: "/z4n.png", stock: 0 },
{ id: 220, nombre: "Dolicox Grip Noche x24 Sobres", precio: 28800, categoria: "Antigripales", imagen: "/dolicox.png", stock: 0 },
// ===== MK =====
{ id: 221, nombre: "Combo Bonfiest Plus (x20 Bonfiest x6 Duraflex Muscular x6 Noraver Noche)", precio: 79500, categoria: "MK", imagen: "/bonfi.png", stock: 20 },
{ id: 222, nombre: "Combo Sal de Frutas Lua x16 Lua x6 Gastrofast x5 Kola Granulada", precio: 55700, categoria: "MK", imagen: "/comblua.png", stock: 20 },
{ id: 223, nombre: "Levotiroxina 75mg x30 Tbs", precio: 19500, categoria: "MK", imagen: "/lev75.png", stock: 100 }, // Próximo a llegar
{ id: 224, nombre: "Noraver Garganta x12 (Cereza, Menta y Naranja Miel)", precio: 19300, categoria: "MK", imagen: "/11111.png", stock: 50 },
{ id: 225, nombre: "Noraver Garganta x24 (Cereza, Menta y Naranja Miel)", precio: 38400, categoria: "MK", imagen: "/ng24.png", stock: 0 },
{ id: 226, nombre: "Ibuprofeno 800mg x30 Cap Líquidas", precio: 30500, categoria: "MK", imagen: "/ibucapk.png", stock: 20 },
{ id: 227, nombre: "Diosmina 500 x30 Tbs", precio: 26300, categoria: "MK", imagen: "/diosmk.png", stock: 100 },
{ id: 228, nombre: "Noraver Fast Total (Gripa y Tos) x12 Cap", precio: 25800, categoria: "MK", imagen: "/nf12.png", stock: 50 },
{ id: 229, nombre: "Levotiroxina 25mg x30 Tbs", precio: 16600,precioAntes: 17200, categoria: "MK", imagen: "/lev25.png", stock: 100 },
{ id: 1229, nombre: "Crema N4 Original x20 Gr", precio: 7900, categoria: "MK", imagen: "/n4.png", stock: 100 },
{ id: 2229, nombre: "Crema N4 Medicada x30 Gr", precio: 14500, categoria: "MK", imagen: "/n4m.png", stock: 0 },
{ id: 2546, nombre: "Yodosalil Unguento x30 Gr", precio: 16900, categoria: "MK", imagen: "/yodosa.png", stock: 30 },

{ id: 230, nombre: "Fenitoina Sódica 100mg x50 Caps", precio: 19500, categoria: "MK", imagen: "/fenit.png", stock: 10 }, // Próximo a llegar
{ id: 231, nombre: "ASA 100mg (Ácido Acetilsalicílico) x100 Tbs", precio: 24400, categoria: "MK", imagen: "/asa.png", stock: 0 },
{ id: 232, nombre: "Vitamina C Mandarina x100 Tbs", precio: 44500, categoria: "MK", imagen: "/vitacma.png", stock: 30 },
{ id: 1232, nombre: "Vitamina C Naranja x100 Tbs", precio: 44500, categoria: "MK", imagen: "/vitacna.png", stock: 30 },
{ id: 7588, nombre: "Vitamina C Cereza x100 Tbs", precio: 44500, categoria: "MK", imagen: "/vitacc.png", stock: 30 },

{ id: 233, nombre: "Norfloxacina 400mg x14 Tbs", precio: 7800, categoria: "MK", imagen: "/normk.png", stock: 0 },
{ id: 234, nombre: "Enalapril 20mg x30 Tbs", precio: 7800, categoria: "MK", imagen: "/enalamk.png", stock: 0 },
{ id: 235, nombre: "Levotiroxina 100mcg x30 Tbs", precio: 18800, categoria: "MK", imagen: "/lev100.png", stock: 0 },
{ id: 237, nombre: "Hidróxido de Magnesio 120ml", precio: 7300, categoria: "MK", imagen: "/hmag.png", stock: 0 },
{ id: 238, nombre: "Diclofenaco 100mg x20 Caps", precio: 14800, categoria: "MK", imagen: "/diclomk.png", stock: 0 },
{ id: 619, nombre: "Crema Blankisima x32 Gr", precio: 19100, categoria: "MK", imagen: "/blankisima.png", stock: 100 },
{ id: 680, nombre: "Ungüento #2 tubo x12 Gr", precio: 11000, categoria: "MK", imagen: "/n2.png", stock: 20 },

{ id: 239, nombre: "Alivrub x12 Latas", precio: 44700, categoria: "MK", imagen: "/alivrub.png", stock: 24 },
{ id: 240, nombre: "Yodora Clásico x32 Gr x2", precio: 16474, categoria: "MK", imagen: "/32x2.png", stock: 0, ivaIncluido: true },
{ id: 624, nombre: "Yodora Clásico x60 Gr x2", precio: 27965, categoria: "MK", imagen: "/60x2.png", stock: 0, ivaIncluido: true },
{ id: 625, nombre: "Yodora Clásico 60+32 Gr", precio: 23800, categoria: "MK", imagen: "/6032.png", stock: 0, ivaIncluido: true },
{ id: 242, nombre: "Noraver Noche x6 Sobres 15gr", precio: 15500, categoria: "MK", imagen: "/nora6.png", stock: 50 },
{ id: 243, nombre: "Noraver Día x12 Sobres 15gr", precio: 30900, categoria: "MK", imagen: "/nora12.png", stock: 50 },
{ id: 244, nombre: "Nitrofurantoina 100mg x40 Cap", precio: 26000, categoria: "MK", imagen: "/nitro.png", stock: 0 },
{ id: 245, nombre: "Metronidazol x10 Óvulos Mk", precio: 12000, categoria: "MK", imagen: "/momk.png", stock: 0 },
{ id: 246, nombre: "Gastrofast x12 Sachets", precio: 32300, categoria: "MK", imagen: "/gasmk.png", stock: 50 },


{ id: 249, nombre: "Levotiroxina Sódica 50mcg x30 Tbs", precio: 16800, categoria: "MK", imagen: "/lev50.png", stock: 0 },
{ id: 251, nombre: "Piroxicam 20mg x10 Caps", precio: 4500, categoria: "MK", imagen: "/piromk.png", stock: 0 },
{ id: 252, nombre: "Vick Vaporub x50gr", precio: 15000, categoria: "MK", imagen: "/vickp.png", stock: 0 },
{ id: 253, nombre: "Carvedilol 6.25mg x30 Tbs", precio: 9500, categoria: "MK", imagen: "/carmk6.png", stock: 20 },
{ id: 254, nombre: "Levotiroxina Sódica 125mcg x30 Tbs", precio: 28800, categoria: "MK", imagen: "/lev125.png", stock: 0 },
{ id: 255, nombre: "Levotiroxina Sódica 150mcg x30 Tbs", precio: 32000, categoria: "MK", imagen: "/lev150.png", stock: 0 },

// ===== BIOQUIFAR =====
{ id: 222, nombre: "Fungisterol Shampoo de 100ml", precio: 14000, categoria: "Bioquifar", imagen: "/fun100.png", stock: 50 },
{ id: 223, nombre: "Fungisterol Shampoo de 200ml", precio: 24600, categoria: "Bioquifar", imagen: "/fun200.png", stock: 50 },
{ id: 224, nombre: "Cortisolona Hidrocortisona Loción x30g", precio: 3200, categoria: "Bioquifar", imagen: "/corti.png", stock: 0 },
{ id: 227, nombre: "Lamdotil x16 Tbs", precio: 9800, categoria: "Bioquifar", imagen: "/lando.png", stock: 100 },
{ id: 228, nombre: "Zifluvis 200mg x30 Sobres de 3gr", precio: 22500, categoria: "Bioquifar", imagen: "/ziflu200.png", stock: 20 },
{ id: 229, nombre: "Warfar (Warfarina Sódica) 5mg x30 Tbs", precio: 12100, categoria: "Bioquifar", imagen: "/war.png", stock: 0 },
{ id: 230, nombre: "Bupiridol (Acetaminofén 325mg + Codeína 30mg) x30 Tbs", precio: 9500, categoria: "Bioquifar", imagen: "/bupi.png", stock: 0 },
{ id: 8230, nombre: "Diflenac (Diclofenaco Sódico) 50mg x20 Tbs", precio: 3500, categoria: "Bioquifar", imagen: "/difle.png", stock: 30 },
{ id: 8830, nombre: "Seamib (Secnidazol) 500mg x4 Tbs", precio: 3100, categoria: "Bioquifar", imagen: "/sea5.png", stock: 100 },
{ id: 9880, nombre: "Seamib (Secnidazol) 1g x2 Tbs", precio: 4000, categoria: "Bioquifar", imagen: "/sea1.png", stock: 0 },
{ id: 5847, nombre: "Clinbac Clindamicina 300mg x24 Caps", precio: 22900, categoria: "Bioquifar", imagen: "/c24b.png", stock: 30 },
{ id: 5102, nombre: "Salydrat (Sales de Rehidratación Oral) x25 Sobres", precio: 54600, categoria: "Bioquifar", imagen: "/saly.png", stock: 30 },
{ id: 4252, nombre: "Eucodina Dihidrocodeina x120ml", precio: 6500, categoria: "Bioquifar", imagen: "/eucod.png", stock: 0 },

{ id: 7240, nombre: "Gastritan Suspension x360ml", precio: 16800, categoria: "Bioquifar", imagen: "/tritan.png", stock: 0 },
{ id: 3240, nombre: "Finapar (Albendazol) 200mg x2 Tbs", precio: 1700, categoria: "Bioquifar", imagen: "/fina.png", stock: 0 },
{ id: 4240, nombre: "Hongistina Nistatina Suspensión x60ml", precio: 10800, categoria: "Bioquifar", imagen: "/hong.png", stock: 30 },
{ id: 5780, nombre: "Aircys Montelukast 10mg x10 Tbs", precio: 9900, categoria: "Bioquifar", imagen: "/monte10.png", stock: 0 },
{ id: 4228, nombre: "Zifluvis 600mg x30 Sobres de 3gr", precio: 38200, categoria: "Bioquifar", imagen: "/zi600.png", stock: 20 },
{ id: 4584, nombre: "Hemetil Metoclopramida x30ml", precio: 7600, categoria: "Bioquifar", imagen: "/heme.png", stock: 0 },
{ id: 7635, nombre: "Zifluvis 600mg x10 Sobres de 3gr", precio: 8800, categoria: "Bioquifar", imagen: "/zi610.png", stock: 40 },

{ id: 5240, nombre: "Cloxidin (Dicloxacilina) 500mg x30 Caps", precio: 30300, categoria: "Bioquifar", imagen: "/cloxi.png", stock: 30 },
{ id: 231, nombre: "Pirel (Pamoato de Pirantel) Suspensión x30ml", precio: 3500, categoria: "Bioquifar", imagen: "/pirelsss.png", stock: 0 },
{ id: 651, nombre: "Pirel (Pamoato de Pirantel) 250mg x6 Tbs", precio: 7600, categoria: "Bioquifar", imagen: "/pm6.png", stock: 30 },
{ id: 233, nombre: "Sertranquil (Sertralina 100mg) x10 Tbs", precio: 10900, categoria: "Bioquifar", imagen: "/sertranquil.png", stock: 50 },
{ id: 234, nombre: "Cindimizol (Fluconazol) 200mg x5 Caps", precio: 7900, categoria: "Bioquifar", imagen: "/cindi.png", stock: 0 },
{ id: 1234, nombre: "Aztrobac Suspensión x15ml", precio: 10900, categoria: "Bioquifar", imagen: "/aztro.png", stock: 0 },
{ id: 2234, nombre: "Vigradina 50mf x4 Tbs", precio: 6000, categoria: "Bioquifar", imagen: "/viga.png", stock: 100 },
{ id: 3234, nombre: "Mio Relax 2mg x20 Tbs", precio: 19300, categoria: "Bioquifar", imagen: "/mio2.png", stock: 0 },
{ id: 9234, nombre: "Dizmopraz (Lansoprazol) 30mg x28 Caps", precio: 15400, categoria: "Bioquifar", imagen: "/dizmo.png", stock: 20 },

{ id: 8233, nombre: "Sertranquil Sertralina 50mg x10 Tbs", precio: 7500, categoria: "Bioquifar", imagen: "/ser50.png", stock: 0 },
{ id: 8822, nombre: "Nitoxipar Nitazoxanida Suspensión x30ml", precio: 14900, categoria: "Bioquifar", imagen: "/nito.png", stock: 0 },
{ id: 8254, nombre: "Diexsoprazol (Esomeprazol) 20mg x30 Caps", precio: 9300, categoria: "Bioquifar", imagen: "/di20.png", stock: 0 },
{ id: 9252, nombre: "Diexsoprazol (Esomeprazol) 40mg x30 Caps", precio: 14000, categoria: "Bioquifar", imagen: "/di40.png", stock: 0 },
{ id: 2341, nombre: "Tussionex Duo Jarabe x120ml", precio: 9300, categoria: "Bioquifar", imagen: "/tuduo.png", stock: 100 },
{ id: 2472, nombre: "Antepsin Sucralfato 1g x10 Tbs", precio: 9000, categoria: "Bioquifar", imagen: "/ansu10.png", stock: 50 },


{ id: 240, nombre: "Zivical (Carbonato de Calcio) 600mg x30 Tbs", precio: 11000, categoria: "Bioquifar", imagen: "/zivi.png", stock: 20 },
{ id: 241, nombre: "Zivical-D (Vitamina D3 200UI + Calcio 600mg) x20 Tbs", precio: 8900, categoria: "Bioquifar", imagen: "/zivid.png", stock: 20 },
{ id: 246, nombre: "Lozarten (Losartán) 100mg x30 Tbs", precio: 9700, categoria: "Bioquifar", imagen: "/lten.png", stock: 0 },
{ id: 247, nombre: "Dosaldin x20 Tbs", precio: 15900, categoria: "Bioquifar", imagen: "/dosal.png", stock: 0 },
{ id: 250, nombre: "Espamydol (Ibuprofeno 500mg + Metocarbamol 200mg) x20 Tbs", precio: 20200, categoria: "Bioquifar", imagen: "/espa.png", stock: 30 },
{ id: 252, nombre: "Ainedix (Aceclofenaco) 100mg x10 Tbs", precio: 7300, categoria: "Bioquifar", imagen: "/ained.png", stock: 0 },
{ id: 254, nombre: "Diglufor (Metformina) 850mg x30 Tab", precio: 9800, categoria: "Bioquifar", imagen: "/DIGLU.png", stock: 0 },
{ id: 255, nombre: "Metroxazide (Metronidazol + Nifuroxazide) x18 Tbs", precio: 14100, categoria: "Bioquifar", imagen: "/zide.png", stock: 100 },
{ id: 2265, nombre: "Metroxazide Jarabe x120ml", precio: 16900, categoria: "Bioquifar", imagen: "/zide120.png", stock: 30 },

{ id: 259, nombre: "ActiViral (Aciclovir 800mg) x10 Tbs", precio: 13400, categoria: "Bioquifar", imagen: "/acti.png", stock: 0 },
{ id: 260, nombre: "Vaio (Betahistina) 8mg x30 Tbs", precio: 22900, categoria: "Bioquifar", imagen: "/vaio.png", stock: 50 },
{ id: 261, nombre: "Verelis (Tadalafilo 20mg) x4 Tbs", precio: 9800, categoria: "Bioquifar", imagen: "/vere.png", stock: 100 },
{ id: 262, nombre: "Mebicitrof (Metronidazol) Suspensión x120ml", precio: 7400, categoria: "Bioquifar", imagen: "/mebi.png", stock: 0 },
{ id: 263, nombre: "Fungisterol crema (Ketoconazol) 2% x30gr", precio: 6600, categoria: "Bioquifar", imagen: "/fungkc.png", stock: 100 },
{ id: 3259, nombre: "ActiViral Crema (Aciclovir) al 5% x15gr", precio: 5400, categoria: "Bioquifar", imagen: "/acticr.png", stock: 0 },



// ===== LAPROFF ====
{ id: 266, nombre: "Loratadina 10mg x400 Tbs", precio: 41300, categoria: "Laproff", imagen: "/lora400.png", stock: 30 },
{ id: 267, nombre: "Losartán Potásico 50mg x300 Tbs", precio: 26500, categoria: "Laproff", imagen: "/l50lp.png", stock: 0 },
{ id: 268, nombre: "Amoxicilina 500mg x300 Caps", precio: 88000, categoria: "Laproff", imagen: "/amo300lp.png", stock: 20 },
{ id: 269, nombre: "Nitrofurantoína 100mg x300 Caps", precio: 103000, categoria: "Laproff", imagen: "/nitrolp.png", stock: 0 },
{ id: 270, nombre: "Metocarbamol 750mg x300 Tbs", precio: 101000, categoria: "Laproff", imagen: "/mlp.png", stock: 6 },
{ id: 7547, nombre: "Ácido Folico 1mg x400 Tbs", precio: 31300, categoria: "Laproff", imagen: "/folilp.png", stock: 30 },

{ id: 271, nombre: "Ibuprofeno 400mg x300 Tbs", precio: 47900, categoria: "Laproff", imagen: "/i400.png", stock: 0 },
{ id: 272, nombre: "Ibuprofeno 800mg x300 Tbs", precio: 55500, categoria: "Laproff", imagen: "/i800.png", stock: 20 },
{ id: 273, nombre: "Tiamina 300mg x250 Tbs", precio: 42300, categoria: "Laproff", imagen: "/tiaa.png", stock: 6 },
{ id: 274, nombre: "Carbamazepina 200mg x300 Tbs", precio: 120300, categoria: "Laproff", imagen: "/carb.png", stock: 4 }, // Próximo a llegar
{ id: 811, nombre: "Esomeprazol 20mg x100 Tbs", precio: 58200, categoria: "Laproff", imagen: "/e40pp.png", stock: 0 },
{ id: 1811, nombre: "Fluconazol 200mg x100 Caps", precio: 73600, categoria: "Laproff", imagen: "/flu100.png", stock: 0 },
{ id: 7267, nombre: "Losartán Potásico 50mg x30 Tbs", precio: 3400, categoria: "Laproff", imagen: "/lp30.png", stock: 200 },
{ id: 2272, nombre: "Trimebutina 200mg x300 Tbs", precio: 101000, categoria: "Laproff", imagen: "/trimelp.png", stock: 4 },


{ id: 275, nombre: "Naproxeno 500mg x300 Tbs", precio: 88500, categoria: "Laproff", imagen: "/nap500.png", stock: 20 },
{ id: 276, nombre: "Naproxeno 250mg x300 Tbs", precio: 60600, categoria: "Laproff", imagen: "/n.png", stock: 20 },
{ id: 277, nombre: "Acetaminofén 500mg x300 Tbs", precio: 15900, categoria: "Laproff", imagen: "/acet300lp.png", stock: 160 },
{ id: 278, nombre: "Sulfato Ferroso 300mg x300 Tbs", precio: 26300, categoria: "Laproff", imagen: "/sflp.png", stock: 10 },
{ id: 279, nombre: "Sildenafilo 50mg x50 Tbs", precio: 20300, categoria: "Laproff", imagen: "/slp50.png", stock: 6 },
{ id: 281, nombre: "Amitriptilina 25mg x400 Tbs", precio: 50500, categoria: "Laproff", imagen: "/ami25lp.png", stock: 10 },
{ id: 282, nombre: "Albendazol 200mg x50 Tbs", precio: 20600, categoria: "Laproff", imagen: "/al200.png", stock: 10 },
{ id: 283, nombre: "Cetirizina 10mg x400 Tbs", precio: 40200,precioAntes: 43200, categoria: "Laproff", imagen: "/ceti400.png", stock: 20 },
{ id: 4774, nombre: "Zopiclona 7,5mg x50 Tbs", precio: 18700, categoria: "Laproff", imagen: "/zopi50lp.png", stock: 40 },

{ id: 284, nombre: "Diclofenaco 50mg x400 Tbs", precio: 40200, categoria: "Laproff", imagen: "/di400.png", stock: 20 },
{ id: 285, nombre: "Acetaminofén Gotas x30ml", precio: 5000, categoria: "Laproff", imagen: "/acesus.png", stock: 100 },
{ id: 286, nombre: "Betametasona 0.1% x40gr", precio: 5600, categoria: "Laproff", imagen: "/betame001lp.png", stock: 120 },
{ id: 287, nombre: "Hidroclorotiazida 25mg x400 Tbs", precio: 30000, categoria: "Laproff", imagen: "/hr400.png", stock: 0 },
{ id: 288, nombre: "Aciclovir 800mg x50 Tbs", precio: 46500, categoria: "Laproff", imagen: "/aci800.png", stock: 50 },
{ id: 289, nombre: "Prednisolona 5mg x100 Tbs", precio: 9700, categoria: "Laproff", imagen: "/pred100.png", stock: 100 },
{ id: 290, nombre: "Loperamida 2mg x240 Tbs", precio: 59500, categoria: "Laproff", imagen: "/lope240.png", stock: 20 },
{ id: 291, nombre: "Atorvastatina 20mg x50 Tbs", precio: 7400, categoria: "Laproff", imagen: "/at20.png", stock: 0 },
{ id: 292, nombre: "Minoxidil 5% x60ml", precio: 16600, categoria: "Laproff", imagen: "/minox.png", stock: 50 },

{ id: 293, nombre: "Atorvastatina 40mg x30 Tbs", precio: 19200, categoria: "Laproff", imagen: "/atv40.png", stock: 30 },
{ id: 294, nombre: "Amlodipino 5mg x10 Tbs", precio: 1600, categoria: "Laproff", imagen: "/pino.png", stock: 100 },
{ id: 7544, nombre: "Amlodipino 5mg x300 Tbs", precio: 34000, categoria: "Laproff", imagen: "/pinolp.png", stock: 10 },

{ id: 295, nombre: "Aciclovir 800mg x10 Tbs", precio: 9600, categoria: "Laproff", imagen: "/aci81.png", stock: 100 },
{ id: 296, nombre: "Levofloxacina 500mg x7 Tbs", precio: 14700, categoria: "Laproff", imagen: "/le507.png", stock: 10 },
{ id: 297, nombre: "Loperamida 2mg x6 Tbs", precio: 2700, categoria: "Laproff", imagen: "/lope6.png", stock: 0 },
{ id: 298, nombre: "Carbamazepina 200mg x30 Tbs", precio: 12700, categoria: "Laproff", imagen: "/carba30.png", stock: 30 },
{ id: 299, nombre: "Hioscina N-Bromuro 10mg x50 Tbs", precio: 16800, categoria: "Laproff", imagen: "/hiosc.png", stock: 100 },
{ id: 300, nombre: "Colchicina 0.5mg x40 Tbs", precio: 4900, categoria: "Laproff", imagen: "/colh.png", stock: 0 },
{ id: 301, nombre: "Espironolactona 25mg x20 Tbs", precio: 6200, categoria: "Laproff", imagen: "/espi20.png", stock: 10 },

{ id: 302, nombre: "Betahistina Diclorhidrato 8mg x20 Tbs", precio: 21000, categoria: "Laproff", imagen: "/blp8m.png", stock: 20 },
{ id: 303, nombre: "Clotrimazol Tópica 1% x40gr", precio: 4000, categoria: "Laproff", imagen: "/clotplp.png", stock: 100 },
{ id: 304, nombre: "Clotrimazol 1% Solución Tópica x30ml", precio: 4000, categoria: "Laproff", imagen: "/clo1s.png", stock: 0 },
{ id: 305, nombre: "Tadalafilo 20mg x4 Tbs", precio: 7000, categoria: "Laproff", imagen: "/tadalp.png", stock: 70 },
{ id: 306, nombre: "Metoprolol 50mg x30 Tbs", precio: 6000, categoria: "Laproff", imagen: "/melp.png", stock: 0 },
{ id: 307, nombre: "Orocal + D Calcio 600mg + Vit D3 200UI x30 Tbs", precio: 11900, categoria: "Laproff", imagen: "/orod.png", stock: 0 },
{ id: 308, nombre: "Betametasona 0.05% x40gr", precio: 5400, categoria: "Laproff", imagen: "/betam005lp.png", stock: 100 },
{ id: 309, nombre: "Clobetasol Propionato 0.05% x40gr", precio: 7400, categoria: "Laproff", imagen: "/clobelp.png", stock: 0 },
{ id: 310, nombre: "Aciclovir Ungüento 5% x15gr", precio: 5900, categoria: "Laproff", imagen: "/aci15.png", stock: 100 },
{ id: 1310, nombre: "Ácido Fusidico 2% x15gr", precio: 6400, categoria: "Laproff", imagen: "/af2.png", stock: 0 },

{ id: 311, nombre: "Furosemida 40mg x300 Tbs", precio: 31600, categoria: "Laproff", imagen: "/f40lp.png", stock: 0 },
{ id: 312, nombre: "Mometasona Furoato 0.1% x15gr", precio: 14300, categoria: "Laproff", imagen: "/momelp.png", stock: 30 }, // Próximo a llegar
{ id: 313, nombre: "Cefalexina 500mg x100 Caps", precio: 58800, categoria: "Laproff", imagen: "/cefa500.png", stock: 0 },
{ id: 314, nombre: "Ácido Fusídico 2% x15gr", precio: 5900, categoria: "Laproff", imagen: "/aflp.png", stock: 0 },
{ id: 315, nombre: "Desloratadina 5mg x10 Tbs", precio: 5800, categoria: "Laproff", imagen: "/dlp5.png", stock: 100 },
{ id: 316, nombre: "Acetaminofén 325mg + Fosfato de Codeína 30mg x100 Tbs", precio: 56800, categoria: "Laproff", imagen: "/acode.png", stock: 30 },
{ id: 317, nombre: "Orocal 600mg x30 Tbs", precio: 14000, categoria: "Laproff", imagen: "/oro.png", stock: 0 },
{ id: 318, nombre: "Enerzinc x90ml", precio: 7000, categoria: "Laproff", imagen: "/ener.png", stock: 0 },
{ id: 319, nombre: "Clotrimazol Vaginal 1% x40gr", precio: 5600, categoria: "Laproff", imagen: "/cvlp.png", stock: 120 },
{ id: 631, nombre: "Clopidogrel 75mg x10 Tbs", precio: 7600, categoria: "Laproff", imagen: "/copid.png", stock: 20 },

{ id: 320, nombre: "Desloratadina 60ml", precio: 5000, categoria: "Laproff", imagen: "/deslolp.png", stock: 140 },
{ id: 321, nombre: "Guayaprof 120ml", precio: 4200, categoria: "Laproff", imagen: "/guaya.png", stock: 145 },
{ id: 322, nombre: "Ambroxol Pediátrico x120ml", precio: 7000, categoria: "Laproff", imagen: "/ambn.png", stock: 70 },
{ id: 323, nombre: "Ambroxol Adulto x120ml", precio: 7200, categoria: "Laproff", imagen: "/ambad.png", stock: 110 },
{ id: 324, nombre: "Ketotifeno 100ml", precio: 3800, categoria: "Laproff", imagen: "/feno.png", stock: 150 },
{ id: 325, nombre: "Salbutamol 120ml", precio: 3400, categoria: "Laproff", imagen: "/sallp.png", stock: 0 },
{ id: 326, nombre: "Loratadina 100ml", precio: 5000, categoria: "Laproff", imagen: "/ljr.png", stock: 200 },
{ id: 327, nombre: "o Ferroso 120ml", precio: 4900, categoria: "Laproff", imagen: "/s12.png", stock: 40 },
{ id: 328, nombre: "Difenhidramina 120ml", precio: 4400, categoria: "Laproff", imagen: "/difenlp.png", stock: 30 },
{ id: 329, nombre: "Esomeprazol 40mg x100 Tbs", precio: 94000, categoria: "Laproff", imagen: "/eee40.png", stock: 0 },
{ id: 632, nombre: "Ketoconazol 200mg x300 Tbs", precio: 123600, categoria: "Laproff", imagen: "/keto300.png", stock: 0 },

// ===== ECAR =====
{ id: 333, nombre: "Complejo B x250 Tbs", precio: 18800, categoria: "Ecar", imagen: "/cm250e.png", stock: 100 },
{ id: 334, nombre: "Cetirizina 10mg x400 Tbs", precio: 23000, categoria: "Ecar", imagen: "/cet400.png", stock: 0 },
{ id: 1334, nombre: "Cetirizina Jarabe x60 ml", precio: 4800, categoria: "Ecar", imagen: "/cet60.png", stock: 0 },
{ id: 336, nombre: "Tiamina 300mg x250 Tbs", precio: 31300, categoria: "Ecar", imagen: "/tia.png", stock: 0 },
{ id: 337, nombre: "Dipirona 500mg x50 Tbs", precio: 14000, categoria: "Ecar", imagen: "/dipiro.png", stock: 160 },
{ id: 339, nombre: "Losartán 50mg x300 Tbs", precio: 22000, categoria: "Ecar", imagen: "/losar300.png", stock: 70 },
{ id: 1039, nombre: "Losartán + Hidroclorotiazida 50 + 12.5 mg x30 Tbs", precio: 17700, categoria: "Ecar", imagen: "/lh30e.png", stock: 100 },
{ id: 340, nombre: "Clorferinamina 4mg x20 tbs", precio: 2400, categoria: "Ecar", imagen: "/clorcec.png", stock: 450 },
{ id: 343, nombre: "Complejo B Jarabe x120ml", precio: 6900, categoria: "Ecar", imagen: "/cbjbr.png", stock: 100 },
{ id: 344, nombre: "Trimetoprim Sulfa 40mg + 200mg/5ml x120ml", precio: 5700, categoria: "Ecar", imagen: "/tri40120.png", stock: 100 },
{ id: 345, nombre: "Trimetoprim Sulfa 40mg + 200mg/5ml x60ml", precio: 3300, categoria: "Ecar", imagen: "/t60ml.png", stock: 0 },
{ id: 346, nombre: "Trimetoprim Sulfa 80mg + 400mg/5ml x120ml", precio: 8400, categoria: "Ecar", imagen: "/tri80120.png", stock: 0 },
{ id: 6793, nombre: "Acido Folico 1mg x60 Tbs (Ecar)", precio: 8500, categoria: "Ecar", imagen: "/af60.png", stock: 0 },
{ id: 4793, nombre: "Amoxicilina 500mg x50 Caps (Ecar)", precio: 14400, categoria: "Ecar", imagen: "/amoecar.png", stock: 100 },

{ id: 1345, nombre: "Loperamida 2mg x250 Tbs", precio: 27300, categoria: "Ecar", imagen: "/le240.png", stock: 0 },
{ id: 612, nombre: "Vitamina C Vical x100 tbs", precio: 23300, categoria: "Ecar", imagen: "/vvcal.png", stock: 0 },
{ id: 615, nombre: "Pasedol 50mg x100 tbs", precio: 21500, categoria: "Ecar", imagen: "/pdol.png", stock: 50 },
{ id: 622, nombre: "Complejo B 10 ml x1 vial (Ecar)", precio: 6500, categoria: "Ecar", imagen: "/cb10ml.png", stock: 240 },
{ id: 623, nombre: "Tiamina 10 ml x1 vial (Ecar)", precio: 5400, categoria: "Ecar", imagen: "/tia10ml.png", stock: 0 },
{ id: 693, nombre: "Vitamina B12 x10 x1 vial (Ecar)", precio: 11500, categoria: "Ecar", imagen: "/b1210.png", stock: 0 },
// ===== COLMED =====
{ id: 350, nombre: "Levotiroxina 100mcg x30 Tbs", precio: 10300, categoria: "Colmed", imagen: "/lev1003.png", stock: 50 }, // Próximo a llegar
{ id: 351, nombre: "Esomeprazol 20mg x30 Tbs", precio: 22000, categoria: "Colmed", imagen: "/eso20c.png", stock: 0 },
{ id: 1351, nombre: "Esomeprazol 40mg x30 Tbs", precio: 25400, categoria: "Colmed", imagen: "/40.png", stock: 0 },
{ id: 355, nombre: "Complejo B 2ml x3 Amp", precio: 9700, categoria: "Colmed", imagen: "/cbx3.png", stock: 0 }, 
{ id: 2355, nombre: "Metronist x10 ovulos", precio: 18500, categoria: "Colmed", imagen: "/mov.png", stock: 0 }, 
{ id: 7145, nombre: "Diclofenaco 75mg x10 Amp", precio: 11500, categoria: "Colmed", imagen: "/dcol.png", stock: 0 }, // Próximo a llegar
{ id: 3368, nombre: "Clotrimazol Vaginal al 1% x40gr", precio: 7300, categoria: "Colmed", imagen: "/cvco.png", stock: 0 }, // Próximo a llegar
{ id: 3552, nombre: "Vitamina D3 2000 U.I x100 Caps", precio: 48000, precioAntes: 51500, categoria: "Colmed", imagen: "/d3200.png", stock: 50 }, // Próximo a llegar
{ id: 3750, nombre: "Tramadol 50mg x10 Caps", precio: 7100, categoria: "Colmed", imagen: "/trapco.png", stock: 50 }, // Próximo a llegar

{ id: 358, nombre: "Levotiroxina Sódica 50mcg x30 Tbs", precio: 8700, categoria: "Colmed", imagen: "/l50co3.png", stock: 0 }, // Próximo a llegar
{ id: 958, nombre: "Levotiroxina Sódica 50mcg x150 Tbs", precio: 28000, categoria: "Colmed", imagen: "/le50150.png", stock: 0 }, 
{ id: 359, nombre: "Metronidazol 500mg x10 Óvulos", precio: 9500, categoria: "Colmed", imagen: "/movu.png", stock: 100 },

{ id: 4359, nombre: "Clotrimazol 100mg x10 Óvulos", precio: 14800, categoria: "Colmed", imagen: "/covu.png", stock: 0 },
{ id: 4362, nombre: "Beta + Beta 2ml x1 Amp", precio: 15500, categoria: "Colmed", imagen: "/bet2.png", stock: 0 },
{ id: 9959, nombre: "Polivitaminas y Minerales x100 Caps", precio: 31700, categoria: "Colmed", imagen: "/pomi.png", stock: 50 },
{ id: 3359, nombre: "Cloranfenicol 250mg x50 Caps", precio: 38500, categoria: "Colmed", imagen: "/cloran.png", stock: 0 },

{ id: 361, nombre: "Gentamicina Gotas 0.3% x6ml", precio: 5900, categoria: "Colmed", imagen: "/gentac.png", stock: 50 },
{ id: 362, nombre: "Beta + Beta 1ml x1 Amp", precio: 9900, categoria: "Colmed", imagen: "/beta1ml.png", stock: 0 },
{ id: 364, nombre: "Trimebutina + Simeticona 200mg/120mg x30 Tbs", precio: 56200, categoria: "Colmed", imagen: "/ts56.png", stock: 0 },
{ id: 1364, nombre: "Amoxicilina 500mg x50 Caps", precio: 15000, precioAntes: 16500, categoria: "Colmed", imagen: "/acol.png", stock: 100 },
{ id: 366, nombre: "Vitamina E 400 U.I x100 Cap", precio: 38000, categoria: "Colmed", imagen: "/veco1.png", stock: 50 }, // Próximo a llegar
// ===== COASPHARMA =====
{ id: 367, nombre: "Glibenclamida 5mg x30 Tbs", precio: 2000, categoria: "CoasPharma", imagen: "/glibe.png", stock: 110 },
{ id: 1367, nombre: "Azitromicina Suspensión x15 ml Coas", precio: 10500, categoria: "CoasPharma", imagen: "/azico.png", stock: 50 },
{ id: 368, nombre: "Clotrimazol 500mg", precio: 3400, categoria: "CoasPharma", imagen: "/sec500c.png", stock: 120 },
{ id: 369, nombre: "Amlodipino 5mg x10 Tbs", precio: 1500, categoria: "CoasPharma", imagen: "/am5mg.png", stock: 100 },
{ id: 370, nombre: "Metoclopramida 10mg x30 Tbs", precio: 2900, categoria: "CoasPharma", imagen: "/mtcc.png", stock: 0 },
{ id: 371, nombre: "Propanolol 40mg x20 Tbs", precio: 1700, categoria: "CoasPharma", imagen: "/propa.png", stock: 200 },
{ id: 372, nombre: "Clorfeniramina Maleato 4mg x20 Tbs", precio: 2300, categoria: "CoasPharma", imagen: "/clorco.png", stock: 100 },
{ id: 373, nombre: "Prednisolona 5mg x30 Tbs", precio: 3300, categoria: "CoasPharma", imagen: "/pred30.png", stock: 100 },

{ id: 4689, nombre: "Ampicilina 250mg/5ml Suspensión x60 ml", precio: 10500, categoria: "CoasPharma", imagen: "/amsus.png", stock: 100 },
{ id: 7153, nombre: "Flunarizina 10mg x20 Tbs", precio: 2800, categoria: "CoasPharma", imagen: "/fluco.png", stock: 100 },

{ id: 8367, nombre: "Sales de Rehidratacion Oral x30 sobres", precio: 42000, categoria: "CoasPharma", imagen: "/so30.png", stock: 110 },
{ id: 4372, nombre: "Vitamina C 500mg x100 Tbs", precio: 19700, categoria: "CoasPharma", imagen: "/vitco.png", stock: 0 },
{ id: 3374, nombre: "Sildenafilo 50mg x2 Tbs", precio: 1000, categoria: "CoasPharma", imagen: "/silcoas.png", stock: 100 },
{ id: 3689, nombre: "Hidroclorotiazida 25mg x240 Tbs", precio: 11000, categoria: "CoasPharma", imagen: "/h25co.png", stock: 6 },
{ id: 7458, nombre: "Piroxicam Gel 0.5% x30gr", precio: 6600, categoria: "CoasPharma", imagen: "/pi6.png", stock: 110 },
{ id: 7422, nombre: "Gemfibrozilo 600mg x20 Tbs", precio: 9800, categoria: "CoasPharma", imagen: "/gem600.png", stock: 110 },


{ id: 1373, nombre: "Metronidazol 500mg x100 Tbs", precio: 15600, categoria: "CoasPharma", imagen: "/meco.png", stock: 200 },
{ id: 374, nombre: "Piroxicam 20mg x10 Cap", precio: 2800, categoria: "CoasPharma", imagen: "/piroxx.png", stock: 120 },
{ id: 633, nombre: "Norfloxacino 400mg x20 Tbs", precio: 7500, categoria: "CoasPharma", imagen: "/norco.png", stock: 60 },
{ id: 636, nombre: "Trimebutina 200mg x20 Tbs", precio: 8600, categoria: "CoasPharma", imagen: "/tri20.png", stock: 0 },
{ id: 637, nombre: "Loratadina 10mg x10 Tbs", precio: 1400, categoria: "CoasPharma", imagen: "/lco10m.png", stock: 100 },
{ id: 639, nombre: "Trimetoprima + Sulfametoxazol 160/800 mg x10 Tbs", precio: 4300, categoria: "CoasPharma", imagen: "/tsco.png", stock: 140 },

{ id: 376, nombre: "Amoxicilina 500mg x100 Caps", precio: 28900, categoria: "CoasPharma", imagen: "/amo100.png", stock: 0 },
{ id: 1376, nombre: "Nistatina Suspension x60 ml", precio: 7700, categoria: "CoasPharma", imagen: "/nsco.png", stock: 0 },
{ id: 377, nombre: "Claritromicina 500mg x10 Tbs", precio: 17800, categoria: "CoasPharma", imagen: "/clari.png", stock: 100 }, // Próximo a llegar
{ id: 379, nombre: "Fluoxetina 20mg x14 Tbs", precio: 2000, categoria: "CoasPharma", imagen: "/fc.png", stock: 100 },
{ id: 381, nombre: "Clotrimazol Vaginal al 1% x40gr", precio: 6100, categoria: "CoasPharma", imagen: "/crevaco.png", stock: 80 },
{ id: 382, nombre: "Furosemida 40mg x100 Tbs", precio: 10000, categoria: "CoasPharma", imagen: "/furo100.png", stock: 20 },
{ id: 383, nombre: "Iseptic Garganta Menta y Frutos Rojos x12 Tbs", precio: 9600, categoria: "CoasPharma", imagen: "/isep.png", stock: 100 },
{ id: 384, nombre: "Enalapril 5mg x50 Tbs", precio: 5800, categoria: "CoasPharma", imagen: "/en5mg.png", stock: 100 },
{ id: 3833, nombre: "Iseptic Garganta Menta y Frutos Rojos x96 Tbs", precio: 69600, categoria: "CoasPharma", imagen: "/isep96.png", stock: 100 },

{ id: 638, nombre: "Losartan 50mg x30 Tbs", precio: 3300, categoria: "CoasPharma", imagen: "/l50c.png", stock: 0 },
{ id: 1638, nombre: "Ibuprofeno 800mg x60 Tbs", precio: 12300, categoria: "CoasPharma", imagen: "/ibu60.png", stock: 0 },
{ id: 8481, nombre: "Sulfadiazina de Plata 1% x30gr", precio: 9200, categoria: "CoasPharma", imagen: "/spco.png", stock: 100 },


{ id: 385, nombre: "Desloratadina Niños x60ml", precio: 5200, categoria: "CoasPharma", imagen: "/dscos.png", stock: 30 },
{ id: 386, nombre: "Naproxeno 250mg x10 Tbs", precio: 1700, categoria: "CoasPharma", imagen: "/n250co.png", stock: 0 }, // Próximo a llegar
{ id: 387, nombre: "Ibuprofeno + Metocarbamol x24 Tbs", precio: 17300, categoria: "CoasPharma", imagen: "/im.png", stock: 40 },
{ id: 388, nombre: "Ácido Fusídico 2% x15gr", precio: 7900, categoria: "CoasPharma", imagen: "/acidofc.png", stock: 100 },
{ id: 389, nombre: "Naproxeno Sódico 125mg/5ml x80ml", precio: 8700, categoria: "CoasPharma", imagen: "/napcoas.png", stock: 20 },
{ id: 390, nombre: "Dermaskin x20gr", precio: 10000, categoria: "CoasPharma", imagen: "/derma20.png", stock: 50 },
{ id: 391, nombre: "Acetaminofén 500mg x300 Tbs", precio: 15300, categoria: "CoasPharma", imagen: "/ace500co.png", stock: 0 },
{ id: 392, nombre: "Albendazol 200mg x2", precio: 1100, categoria: "CoasPharma", imagen: "/al200c.png", stock: 0 },
{ id: 393, nombre: "Dermaskin x40gr", precio: 14700, precioAntes: 17000, categoria: "CoasPharma", imagen: "/derma40.png", stock: 100 },
{ id: 634, nombre: "Amlodipino 10mg x10 Tbs", precio: 2200, categoria: "CoasPharma", imagen: "/amlo10.png", stock: 100 },

{ id: 394, nombre: "Ketoconazol 200mg x10 Tbs", precio: 3200, categoria: "CoasPharma", imagen: "/ketotbsc.png", stock: 300 }, // Próximo a llegar
{ id: 398, nombre: "Ampicilina 500mg x50 Cap", precio: 19200, categoria: "CoasPharma", imagen: "/amp500c.png", stock: 50 },
{ id: 399, nombre: "Ampicilina 1g x100 Tbs", precio: 81500, categoria: "CoasPharma", imagen: "/amp1g.png", stock: 0 }, // Próximo a llegar
{ id: 400, nombre: "Amoxicilina Suspensión x100ml", precio: 5400, categoria: "CoasPharma", imagen: "/as251.png", stock: 220 },
{ id: 401, nombre: "Clindamicina 300mg x24 Cap", precio: 25000, categoria: "CoasPharma", imagen: "/clinco24.png", stock: 0 },


{ id: 403, nombre: "Amoxicilina Suspensión x60ml", precio: 4200, categoria: "CoasPharma", imagen: "/as60.png", stock: 120 },
{ id: 404, nombre: "Dicloxacilina 250mg/5ml x80ml", precio: 7500, categoria: "CoasPharma", imagen: "/diclosusco.png", stock: 0 }, // Próximo a llegar
{ id: 406, nombre: "Benzoato de Bencilo x120ml", precio: 7000, categoria: "CoasPharma", imagen: "/benzo.png", stock: 200 },
{ id: 407, nombre: "Metronidazol Suspensión x120ml", precio: 6600, categoria: "CoasPharma", imagen: "/m250c.png", stock: 120 },
{ id: 408, nombre: "Hidróxido de Aluminio x150ml", precio: 5700, categoria: "CoasPharma", imagen: "/hd150.png", stock: 100 },
{ id: 778, nombre: "Hidróxido de Aluminio x360ml", precio: 7600, categoria: "CoasPharma", imagen: "/ha360.png", stock: 100 },
{ id: 411, nombre: "Aciclovir Ungüento 5% x15gr", precio: 5500, categoria: "CoasPharma", imagen: "/aciunc.png", stock: 100 },
{ id: 617, nombre: "Hidrocortisona al 1% x15gr", precio: 4400, categoria: "CoasPharma", imagen: "/hidrocoas.png", stock: 50 },
{ id: 7771, nombre: "Aciclovir 800mg x10 Tbs", precio: 5000, categoria: "CoasPharma", imagen: "/acoas800.png", stock: 100 },

  { id: 39, nombre: "Gastrofull Doble Acción x24 Sachets", precio: 35400, categoria: "CoasPharma", imagen: "/gastrofu.png", stock: 50 },
{ id: 413, nombre: "Ibuprofeno Suspensión x120ml", precio: 4400, categoria: "CoasPharma", imagen: "/ibusc.png", stock: 0 },
{ id: 416, nombre: "Hidróxido Magnesia 8.5% x120ml", precio: 4500, categoria: "CoasPharma", imagen: "/hmc.png", stock: 0 },
{ id: 417, nombre: "Naproxeno 500mg x10 Tbs", precio: 4100, categoria: "CoasPharma", imagen: "/nap500co.png", stock: 0 }, // Próximo a llegar
{ id: 418, nombre: "Metoclopramida Gotas 4mg/ml x30ml", precio: 4700, categoria: "CoasPharma", imagen: "/mgco.png", stock: 0 },
{ id: 419, nombre: "Doxiciclina 100mg x10 Cap", precio: 3900, categoria: "CoasPharma", imagen: "/doxico.png", stock: 200 },
{ id: 420, nombre: "Aciclovir 200mg x25 Tbs", precio: 8300, categoria: "CoasPharma", imagen: "/ac200.png", stock: 50 },

{ id: 635, nombre: "Tinidazol 500mg x8 Tbs", precio: 3300, categoria: "CoasPharma", imagen: "/tini.png", stock: 0 },
{ id: 421, nombre: "Hidroxicina Clorhidrato 25mg x20 Tbs", precio: 3200, categoria: "CoasPharma", imagen: "/hxina.png", stock: 0 },
{ id: 422, nombre: "Prednisolona 5mg x300 Tbs", precio: 24000, categoria: "CoasPharma", imagen: "/pred300.png", stock: 50 },
{ id: 424, nombre: "Ibuprofeno 400mg x60 Tbs", precio: 8000, categoria: "CoasPharma", imagen: "/i400c.png", stock: 24 },
{ id: 425, nombre: "Enalapril 20mg x20 Tbs", precio: 1600, precioAntes: 2200, categoria: "CoasPharma", imagen: "/ec20t.png", stock: 100 },
{ id: 426, nombre: "Secnidazol 1g x2 Tbs", precio: 4700, categoria: "CoasPharma", imagen: "/sec1g.png", stock: 120 },
{ id: 2448, nombre: "Enalapril 20mg x330 Tbs", precio: 20000, categoria: "CoasPharma", imagen: "/ena300.png", stock: 0 },

// ===== AG =====
{ id: 428, nombre: "Diclofenaco Retard 100mg x20 Cap", precio: 7000, categoria: "AG", imagen: "/diret.png", stock: 160 },
{ id: 429, nombre: "Ibuprofeno 800mg x50 Cap", precio: 7800, categoria: "AG", imagen: "/ibuag8.png", stock: 0 },
{ id: 430, nombre: "Dicloxacilina 500mg x50 Cap", precio: 22500, categoria: "AG", imagen: "/dicloxag50.png", stock: 0 }, // Próximo a llegar
{ id: 433, nombre: "Acetaminofén 500mg x100 Tbs", precio: 5800, categoria: "AG", imagen: "/ace500.png", stock: 100 },
{ id: 434, nombre: "Losartán 50mg x30 Tbs", precio: 3600, categoria: "AG", imagen: "/lo50ag.png", stock: 0 },
{ id: 1434, nombre: "Naproxeno 500mg x10 Tbs", precio: 4600, categoria: "AG", imagen: "/n5a.png", stock: 0 },
{ id: 4790, nombre: "Acetaminofén + Codeina 325/30mg x30 Tbs", precio: 21500, categoria: "AG", imagen: "/acecoag.png", stock: 50 }, // Próximo a llegar

{ id: 436, nombre: "Naproxeno 250mg x10 Tbs", precio: 2800, categoria: "AG", imagen: "/nap250.png", stock: 100 },
{ id: 441, nombre: "Betametasona al 0.1% 20gr", precio: 5600, categoria: "AG", imagen: "/beta01ag.png", stock: 150 },
{ id: 442, nombre: "Betametasona 0.05% 20gr", precio: 5200, categoria: "AG", imagen: "/betag005.png", stock: 140 },
{ id: 445, nombre: "Hidrocortisona 0.1% x15gr", precio: 3800, categoria: "AG", imagen: "/hidroag.png", stock: 0 },
{ id: 1445, nombre: "Amoxicilina 500mg x50 Caps", precio: 14300, precioAntes: 16200, categoria: "AG", imagen: "/aa500.png", stock: 100 },
// ===== MEMPHIS =====
{ id: 446, nombre: "azitomicina 500mg x3 Tbs", precio: 3900, categoria: "Memphis", imagen: "/az500.png", stock: 290 },
{ id: 447, nombre: "Alopurinol 100mg x30 Tbs", precio: 13300, categoria: "Memphis", imagen: "/alo100.png", stock: 30 },
{ id: 448, nombre: "Alopurinol 300mg x30 Tbs", precio: 14000, categoria: "Memphis", imagen: "/alo300.png", stock: 30 },
{ id: 449, nombre: "Cetirizina 10mg x10 Tbs", precio: 2000, categoria: "Memphis", imagen: "/ceti10.png", stock: 100 },
{ id: 450, nombre: "Acetaminofén + Hioscina x20 Tbs", precio: 12600, categoria: "Memphis", imagen: "/acethmem.png", stock: 0 },
{ id: 451, nombre: "Sulfadiazina de Plata 1% x30gr", precio: 6600, categoria: "Memphis", imagen: "/sulfamem.png", stock: 0 },
{ id: 452, nombre: "Naproxeno 250mg x10 Caps", precio: 3600, categoria: "Memphis", imagen: "/n250c.png", stock: 50 },
{ id: 453, nombre: "Flunarizina 10mg x20 Tbs", precio: 4500, categoria: "Memphis", imagen: "/flume.png", stock: 100 },
{ id: 454, nombre: "Crema Tottys (Óxido de Zinc + Nistatina) x40gr", precio: 11400, categoria: "Memphis", imagen: "/tottys.png", stock: 0 },
{ id: 1454, nombre: "Ibuprofeno + Metocarbamol x30 tbs", precio: 19500, categoria: "Memphis", imagen: "/imm.png", stock: 0 },
{ id: 2475, nombre: "Clotrimazol Vaginal al 1% x40gr", precio: 7300, categoria: "Memphis", imagen: "/c1m.png", stock: 100 }, // Próximo a llegar
{ id: 5166, nombre: "Etoricoxib 120mg x7 Tbs", precio: 19500, categoria: "Memphis", imagen: "/et.png", stock: 100 },
{ id: 7652, nombre: "Metoprolol 50mg x30 tbs", precio: 6200, categoria: "Memphis", imagen: "/mlol.png", stock: 100 },
{ id: 4252, nombre: "Tinidazol 1gr x4 tbs", precio: 3400, categoria: "Memphis", imagen: "/tini1g.png", stock: 100 },
{ id: 7854, nombre: "Secnidazol 500mg x4 Tbs", precio: 3400, categoria: "Memphis", imagen: "/seni4.png", stock: 100 },
{ id: 5712, nombre: "Clotrimazol 1% Solución x30ml", precio: 3400, categoria: "Memphis", imagen: "/closus.png", stock: 100 },

{ id: 2252, nombre: "Terbinafina 250mg x14 Tbs", precio: 22600, categoria: "Memphis", imagen: "/termem.png", stock: 100 },
{ id: 7852, nombre: "Fexofenadina HCI Suspensión x120ml", precio: 19400, categoria: "Memphis", imagen: "/fexofe.png", stock: 100 },
{ id: 3676, nombre: "Atorvastatina 20mg x10 Tbs", precio: 6300, categoria: "Memphis", imagen: "/atormem.png", stock: 0 },
{ id: 5782, nombre: "Guayacolato 2% Jarabe x120ml", precio: 3800, categoria: "Memphis", imagen: "/guaya1.png", stock: 0 },

{ id: 457, nombre: "Losartán 100mg x30 Tbs", precio: 8400, categoria: "Memphis", imagen: "/l.png", stock: 30 },
{ id: 1457, nombre: "Losartán 50mg x30 Tbs (Memphis)", precio: 3500, categoria: "Memphis", imagen: "/lmem.png", stock: 0 },
{ id: 458, nombre: "Diclofenaco Gel al 1% x50gr", precio: 7000, categoria: "Memphis", imagen: "/diclomemp.png", stock: 230 },
{ id: 460, nombre: "Desloratadina 5mg x10 Tbs", precio: 5300, categoria: "Memphis", imagen: "/desmem.png", stock: 110 },   // Próximo a llegar
{ id: 461, nombre: "Amitriptilina Clorhidrato 25mg x30 Tbs", precio: 4800, categoria: "Memphis", imagen: "/ami25.png", stock: 0 },
{ id: 463, nombre: "Metocarbamol 750mg x10 Tbs", precio: 5000, categoria: "Memphis", imagen: "/meto750.png", stock: 0 },  // Próximo a llegar

{ id: 464, nombre: "Trimetoprima Sulfa F 160/800mg x20 Tbs", precio: 8000, categoria: "Memphis", imagen: "/memtri.png", stock: 200 },
{ id: 465, nombre: "Trimebutina 200mg x30 Tbs", precio: 14000, categoria: "Memphis", imagen: "/trimebu.png", stock: 20 },
{ id: 466, nombre: "Diclofenaco 50mg x30 Tbs", precio: 4000, categoria: "Memphis", imagen: "/dix30.png", stock: 60 },  // Próximo a llegar
{ id: 623, nombre: "Loratadina 10mg x10 tbs Memphis", precio: 2000, categoria: "Memphis", imagen: "/lorata.png", stock: 0 },
{ id: 468, nombre: "Pamoato de Pirantel x15ml", precio: 3200, categoria: "Memphis", imagen: "/ato.png", stock: 0 },
{ id: 614, nombre: "Sertralina 50mg x10 tbs", precio: 5100, categoria: "Memphis", imagen: "/lina.png", stock: 0 },
{ id: 471, nombre: "Hidroclorotiazida 25mg x30 Tbs", precio: 3800, categoria: "Memphis", imagen: "/hi2530.png", stock: 100 },
{ id: 622, nombre: "Hidroxicina HCl 25Mg x20 Tbs", precio: 4200, categoria: "Memphis", imagen: "/hcl.png", stock: 50 },
{ id: 472, nombre: "Clotrimazol 1% Solución Tópica x30ml", precio: 3900, categoria: "Memphis", imagen: "/clo1m.png", stock: 0 }, // Próximo a llegar

{ id: 473, nombre: "Carvedilol 12.5mg x30 Tbs", precio: 8700, categoria: "Memphis", imagen: "/car125.png", stock: 130 },
{ id: 474, nombre: "Amlodipino 10mg x10 Tbs", precio: 2200, categoria: "Memphis", imagen: "/a10mg.png", stock: 50 },
{ id: 475, nombre: "clotrimazol Vaginal al 2% x20gr", precio: 11600, categoria: "Memphis", imagen: "/clotr2.png", stock: 50 }, // Próximo a llegar
{ id: 476, nombre: "Carvedilol 6.25mg x30 Tbs", precio: 6000, categoria: "Memphis", imagen: "/car625.png", stock: 280 },
{ id: 477, nombre: "clindamicina 300mg x40 Caps", precio: 40600, categoria: "Memphis", imagen: "/clin40.png", stock: 20 },
// LA SANTE //
{ id: 480, nombre: "Omeprazol 20mg x100 Cap",     precio: 11500,  categoria: "La Sante", imagen: "/omels.png", stock: 0 }, 
{ id: 484, nombre: "Amoxicilina Suspensión 250mg/5ml x100ml", precio: 5900, categoria: "La Sante", imagen: "/amox10.png", stock: 100 },
{ id: 486, nombre: "Oximetazolina 0.05% x15ml (Adulto)", precio: 14900, categoria: "La Sante", imagen: "/oxils05.png", stock: 50 },
{ id: 629, nombre: "Loratadina Suspension x100ml", precio: 5200, categoria: "La Sante", imagen: "/lorls.png", stock: 0 },
{ id: 5629, nombre: "Loratadina 10mg X10 Tbs", precio: 1800, categoria: "La Sante", imagen: "/lor10.png", stock: 0 },
{ id: 1629, nombre: "Losartan 50mg x30 Tbs", precio: 4300, categoria: "La Sante", imagen: "/lls.png", stock: 0 },
{ id: 1729, nombre: "Azitromicina 500mg x3 Tbs", precio: 3800, categoria: "La Sante", imagen: "/azils.png", stock: 0 },
{ id: 1232, nombre: "Vitamina C 500mg x100 Tbs LS Naranja", precio: 26500, categoria: "La Sante", imagen: "/vlsn.png", stock: 100 },
{ id: 2232, nombre: "Vitamina C 500mg x100 Tbs LS Mandarina", precio: 26500, categoria: "La Sante", imagen: "/vlsm.png", stock: 0 },
{ id: 8886, nombre: "Oximetazolina 0.025% x15ml Niños", precio: 13800, categoria: "La Sante", imagen: "/ox25.png", stock: 0 },



// Ampolletería (continuando la numeración)
{ id: 487, nombre: "Dexametasona Fosfato 8mg/2ml (Bolsa) x10 und Farmionni", precio: 10600,  categoria: "Ampolleteria", imagen: "/dexafar.png", stock: 0 },
{ id: 488, nombre: "Dexablas Dexametasona 8mg/2ml x5 amp",            precio: 9500,  categoria: "Ampolleteria", imagen: "/dexablas8.png", stock: 50 },
{ id: 8964, nombre: "Dexablas Dexametasona 4mg/2ml x5 amp",            precio: 8800,  categoria: "Ampolleteria", imagen: "/dexa4.png", stock: 30 },
{ id: 490, nombre: "Betazkov (Betametasona) 8mg/2ml x5 amp",          precio: 9500,  categoria: "Ampolleteria", imagen: "/betazkov.png", stock: 60 },
{ id: 491, nombre: "Meblainex (Meloxicam) 15mg/1.5ml x5 amp",         precio: 12500, categoria: "Ampolleteria", imagen: "/meblai.png", stock: 50 },
{ id: 492, nombre: "Ondansetrón 8mg/4ml x1 Amp Biosano",                              precio: 3500, categoria: "Ampolleteria", imagen: "/ondabi.png", stock: 0 },
{ id: 1493, nombre: "Diclofenaco Sódico 75mg/3ml x10 amp Vitalis", precio: 10200,  categoria: "Ampolleteria", imagen: "/dvit.png", stock: 0  }, // Próximo
{ id: 2493, nombre: "Dipirona Sódica 1g/2ml Bolsa x10 Amp", precio: 9000,  categoria: "Ampolleteria", imagen: "/dipi.png", stock: 0  }, // Próximo
{ id: 4846, nombre: "Licofar Lincomicina 600mg/2ml x10 Amp", precio: 18500, categoria: "Ampolleteria", imagen: "/lincofar.png", stock: 20 },
{ id: 5787, nombre: "Dexametasona Fosfato 8mg/2ml (Bolsa) x10 und Biosano", precio: 11400,  categoria: "Ampolleteria", imagen: "/dexabio.png", stock: 100 },

{ id: 3490, nombre: "BetaTreinta x1 ml x1 vial",          precio: 17500,  categoria: "Ampolleteria", imagen: "/beta30.png", stock: 50 },
{ id: 6490, nombre: "Hidrocortizona 100mg x1 Vial Vitalis",  precio: 7000,  categoria: "Ampolleteria", imagen: "/hiv.png", stock: 0 },
{ id: 7490, nombre: "Metilprednisolona 500mg x1 Vial Vitalis",  precio: 29500,  categoria: "Ampolleteria", imagen: "/metil.png", stock: 20 },
{ id: 3391, nombre: "Beta + Beta x1 ml Ryan",  precio: 11200, categoria: "Ampolleteria", imagen: "/beryan.png", stock: 280 },
{ id: 3693, nombre: "Penicilina 2.4 Mill x1 Vial Vitalis", precio: 3400,  categoria: "Ampolleteria", imagen: "/vi24.png", stock: 100  }, // Próximo
{ id: 3685, nombre: "Penicilina 1.2 Mill x1 Vial Vitalis", precio: 2800,  categoria: "Ampolleteria", imagen: "/vi12.png", stock: 100  }, // Próximo
{ id: 9564, nombre: "Tiamina 1g x Vial Vitalis", precio: 6000,  categoria: "Ampolleteria", imagen: "/tivi.png", stock: 100  }, // Próximog


{ id: 5478, nombre: "Diclofenaco 75mg x10 amp Farmionni", precio: 10800,  categoria: "Ampolleteria", imagen: "/difar.png", stock: 50 },

{ id: 494, nombre: "Neurobión 3+3",                                   precio: 38700, categoria: "Ampolleteria", imagen: "/nx6.png", stock: 50  }, 
{ id: 495, nombre: "Kenacort-A (Acetonida de Triamcinolona) x1 vial x5ml",        precio: 44500, categoria: "Ampolleteria", imagen: "/kena.png", stock: 50  }, // Próximo
{ id: 1495, nombre: "Furosemida Bolsa X10 Amp Biosano",        precio: 14500, categoria: "Ampolleteria", imagen: "/fubio.png", stock: 0  }, 
{ id: 2495, nombre: "Metoclopramida Bolsa X10 Amp Biosano", precio: 12000, precioAntes: 15000, categoria: "Ampolleteria", imagen: "/mebio.png", stock: 0  }, 
{ id: 5494, nombre: "Neurobión DC x3 Amp",  precio: 79900, categoria: "Ampolleteria", imagen: "/neudc.png", stock: 0  }, 

{ id: 496, nombre: "K-Delprazol (Omeprazol) x1 vial",                 precio: 3200,  categoria: "Ampolleteria", imagen: "/k-del.png", stock: 100 },
{ id: 497, nombre: "Antidol B1+B6+B1 2ml x3 amp",                     precio: 19900, categoria: "Ampolleteria", imagen: "/antidol.png", stock: 100 },
{ id: 498, nombre: "Gentamicina 160mg/2ml x10 amp (Farmionni)",       precio: 16800, categoria: "Ampolleteria", imagen: "/gentafar.png", stock: 50 },
{ id: 499, nombre: "Bedoyecta x3 amp",                                precio: 36500, categoria: "Ampolleteria", imagen: "/bedoy.png", stock: 100 },
{ id: 500, nombre: "Penicilina 1.2 mill x1 vial Sigma",             precio: 2500,  categoria: "Ampolleteria", imagen: "/pen1.2.png", stock: 240 },
{ id: 1500, nombre: "Penicilina 2.4 mill x1 vial Delta",             precio: 3300,  categoria: "Ampolleteria", imagen: "/pen2.4.png", stock: 240 },
{ id: 4469, nombre: "Testoviron Depot x1 amp", precio: 31300, categoria: "Ampolleteria", imagen: "/testo.png", stock: 0 },

{ id: 501, nombre: "N-butil Bromuro de Hioscina x10 amp Farmionni", precio: 17300,  categoria: "Ampolleteria", imagen: "/hios.png", stock: 50 },
{ id: 503, nombre: "Vitamina C 500mg/5ml x1 amp (Ecar)",              precio: 7000,  categoria: "Ecar", imagen: "/vitcec.png", stock: 220 },
{ id: 504, nombre: "Clindamicina 600mg/4ml bolsa x10 und",            precio: 29000, categoria: "Ampolleteria", imagen: "/clinryan.png", stock: 30 },
{ id: 8705, nombre: "Ampicilina+Sulbactam 1.5 g IM/IV x1 vial Sicma",precio: 3200,  categoria: "Ampolleteria", imagen: "/ampsi.png", stock: 100 },
{ id: 3504, nombre: "Clindamicina 600mg/4ml x10 amp Bio Esteril",            precio: 28100, categoria: "Ampolleteria", imagen: "/clinbio.png", stock: 0 },


{ id: 505, nombre: " Ampidelt Ampicilina/Sulbactam 1.5 g IM/IV x1 vial (Delta)",precio: 3300,  categoria: "Ampolleteria", imagen: "/ampidelt.png", stock: 0 },
{ id: 506, nombre: "Ferropurum (Sacarato de hidróxido férrico) x1 amp 100mg/5ml", precio: 15000, categoria: "Ampolleteria", imagen: "/ferro.png", stock: 0 }, // Próximo
{ id: 508, nombre: "Hioscina + Dipirona 20mg + 2.5g/5ml x1 amp (Ryan)",      precio: 2800,  categoria: "Ampolleteria", imagen: "/hsry.png", stock: 100 },
{ id: 510, nombre: "Tramadol 100mg/2ml (IV/IM/SC) x10 amp (Farmionni)",           precio: 11000, categoria: "Ampolleteria", imagen: "/trafar.png", stock: 50 },
{ id: 511, nombre: "Pisacaina 2% 20mg/ml 50ml",                       precio: 9000,  categoria: "Ampolleteria", imagen: "/pisa.png", stock: 120 },
{ id: 512, nombre: "CeftriDelt (Ceftriaxona) 1G x1 vial",           precio: 3200,  categoria: "Ampolleteria", imagen: "/ceftridelt.png", stock: 0  },  
{ id: 1512, nombre: "Ceftriaxona 1G x1 vial",           precio: 3200,  categoria: "Ampolleteria", imagen: "/ce1g.png", stock: 100  },  
// ——— Jarabes y soluciones ———

{ id: 514, nombre: "Dosflem Adultos x120 ml", precio: 7000, categoria: "Jarabes y soluciones", imagen: "/dosad.png", stock: 100 },
{ id: 515, nombre: "Dosflem Niños x120 ml", precio: 7617, categoria: "Jarabes y soluciones", imagen: "/dni.png", stock: 0 },
{ id: 516, nombre: "Clorfeniramina x120 ml (Ecar)", precio: 3300, categoria: "Ecar", imagen: "/clore.png", stock: 890 },
{ id: 517, nombre: "Nistatina 100.000 UI x60 ml (Labinco)", precio: 8600, categoria: "Jarabes y soluciones", imagen: "/nislam.png", stock: 0 },
{ id: 518, nombre: "Didayabral (Multivitamínico) x240 ml", precio: 12800, categoria: "Jarabes y soluciones", imagen: "/dida.png", stock: 0},
{ id: 519, nombre: "Dolistan (Ibuprofeno) x120 ml", precio: 6300, categoria: "Jarabes y soluciones", imagen: "/dolis.png", stock: 180 },
{ id: 1519, nombre: "Galac Hidroxido Aluminio, Magnesio y Simeticona x360 ml", precio: 9700, categoria: "Jarabes y soluciones", imagen: "/galac.png", stock: 0 },
{ id: 4787, nombre: "Mieltertos Jarabe Adultos x240ml", precio: 22500, categoria: "Jarabes y soluciones", imagen: "/Mieladul.png", stock: 0 },
{ id: 9724, nombre: "Propol1s-Cough Jarabe Hierbabuena x120ml", precio: 8500, categoria: "Jarabes y soluciones", imagen: "/propoh.png", stock: 20 },
{ id: 9725, nombre: "Propol1s-Cough Jarabe Jengibre x120ml", precio: 8500, categoria: "Jarabes y soluciones", imagen: "/propoj.png", stock: 20 },
{ id: 9825, nombre: "Noxpirin Junior Jarabe x120ml", precio: 7800, categoria: "Jarabes y soluciones", imagen: "/noj120.png", stock: 50 },

{ id: 522, nombre: "Broncomiel (Hedera Helix + Propóleo) x120 ml", precio: 7600, categoria: "Jarabes y soluciones", imagen: "/bronco.png", stock: 280 },
{ id: 1522, nombre: "Broncodex Niños sin azucar x120 ml", precio: 10000, categoria: "Jarabes y soluciones", imagen: "/bdexn.png", stock: 180 },
{ id: 2522, nombre: "Broncodex Adultos sin azucar x120 ml", precio: 10000, categoria: "Jarabes y soluciones", imagen: "/bdexa.png", stock: 180 },
{ id: 523, nombre: "Mixagogo x120 ml", precio: 12500, categoria: "Jarabes y soluciones", imagen: "/mixa.png", stock: 50 },
{ id: 524, nombre: "Mucotrop Adulto x120 ml", precio: 7600, categoria: "Jarabes y soluciones", imagen: "/mucoad.png", stock: 80 },
{ id: 525, nombre: "Acetaminofén x120 ml", precio: 3500, categoria: "Laproff", imagen: "/120ml.png", stock: 300 },
{ id: 526, nombre: "Acetaminofén x90 ml", precio: 3000, categoria: "Laproff", imagen: "/90ml.png", stock: 850 },
{ id: 527, nombre: "Avalpric x120 ml 250 mg/5 ml", precio: 10200, categoria: "Bioquifar", imagen: "/aval.png", stock: 0 },
{ id: 528, nombre: "Privatos (Hedera Helix) x120 ml", precio: 17200, categoria: "Jarabes y soluciones", imagen: "/priva.png", stock: 0 },
{ id: 530, nombre: "Mucotrop Pediátrico (Bromhexina) x120 ml", precio: 7400, categoria: "Jarabes y soluciones", imagen: "/muconi.png", stock: 100 },

{ id: 532, nombre: "Pranexxin (Nitazoxanida 2%) x60 ml", precio: 17300, categoria: "Jarabes y soluciones", imagen: "/prasus.png", stock: 30 },
{ id: 533, nombre: "Cetirizina 0.1% x60 ml (Memphis)", precio: 6000, categoria: "Memphis", imagen: "/cetimep.png", stock: 0 },
{ id: 534, nombre: "Trimicort (Clobetasol) Solución x60 ml", precio: 20000, categoria: "Jarabes y soluciones", imagen: "/trimisol.png", stock: 50 },
{ id: 535, nombre: "Agua Oxigenada (OSA) x120 ml", precio: 2200, categoria: "Jarabes y soluciones", imagen: "/osa.png", stock: 280 },
{ id: 536, nombre: "Congestex Kids x90 ml", precio: 11200, categoria: "Jarabes y soluciones", imagen: "/congesu.png", stock: 0 },
{ id: 537, nombre: "Alginacid x360 ml", precio: 16500, categoria: "Jarabes y soluciones", imagen: "/algin.png", stock: 0 },
{ id: 540, nombre: "Mucofan (Hedera Helix) x120 ml", precio: 8500, categoria: "Jarabes y soluciones", imagen: "/muco.png", stock: 180 },
{ id: 544, nombre: "Noglupec (Dextrometorfano + Guayacolato) sin azúcar x120 ml", precio: 12500, categoria: "Jarabes y soluciones", imagen: "/noglp.png", stock: 50 },
{ id: 545, nombre: "Veramiel Niños x120 ml", precio: 8100, categoria: "Jarabes y soluciones", imagen: "/verani.png", stock: 0 },
{ id: 546, nombre: "Veramiel Adultos x120 ml", precio: 8100, categoria: "Jarabes y soluciones", imagen: "/veraad.png", stock: 30 },
{ id: 548, nombre: "Flemalis (N-Acetilcisteína + Guayacolato) x120 ml", precio: 16500, categoria: "Jarabes y soluciones", imagen: "/flema.png", stock: 120 },
{ id: 4448, nombre: "AcemuK Acetilcisteína 2g x100 ml", precio: 13900, categoria: "Jarabes y soluciones", imagen: "/acemuk.png", stock: 0 },


{ id: 5422, nombre: "Naprox Naproxeno 125mg/5ml x80 ml", precio: 6000, categoria: "Jarabes y soluciones", imagen: "/naprox.png", stock: 0 },

{ id: 1548, nombre: "Pediazinc Sulfato de Zinc x120 ml", precio: 10400, categoria: "Jarabes y soluciones", imagen: "/pezi.png", stock: 90 },
{ id: 2548, nombre: "Hidroxicina HCI 0.25% x120 ml", precio: 8600, categoria: "Anglopharma", imagen: "/hidran.png", stock: 120 },

{ id: 549, nombre: "Noktos Adultos (Bromhexina + Guayacolato) x120 ml", precio: 7500, categoria: "Jarabes y soluciones", imagen: "/nokad.png", stock: 0 },
{ id: 550, nombre: "Noktos Niños (Bromhexina + Guayacolato) x120 ml", precio: 7500, categoria: "Jarabes y soluciones", imagen: "/nokni.png", stock: 140 },
{ id: 551, nombre: "Bronsinex (Ambroxol HCl + Clenbuterol) x120 ml", precio: 9800, categoria: "Bioquifar", imagen: "/brons.png", stock: 20 },
{ id: 552, nombre: "Zetygrip 4 x120 ml", precio: 10400, categoria: "Jarabes y soluciones", imagen: "/zetysus.png", stock: 0 },
{ id: 553, nombre: "Zetygrip 4 x60 ml", precio: 7900, categoria: "Jarabes y soluciones", imagen: "/z60ml.png", stock: 0 },
{ id: 557, nombre: "Desloratadina 0.05% x60 ml (Memphis)", precio: 6000, categoria: "Memphis", imagen: "/deskids.png", stock: 100 },

{ id: 558, nombre: "Multi Soluter x50 ml", precio: 8400, categoria: "Jarabes y soluciones", imagen: "/multso.png", stock: 50, ivaIncluido: true },
{ id: 559, nombre: "Triatusic (Dextrometorfano + Ambroxol + Teofilina) x120 ml", precio: 12600, categoria: "Bioquifar", imagen: "/tria.png", stock: 30 },
{ id: 560, nombre: "Komilon Appetite (Multivitamínico) x360 ml", precio: 14200, categoria: "Jarabes y soluciones", imagen: "/komi.png", stock: 70 },
{ id: 561, nombre: "Multicebrin (Multivitamínico) x360 ml", precio: 12200, categoria: "Jarabes y soluciones", imagen: "/multic.png", stock: 90 },
{ id: 562, nombre: "Dihidrocodeína Bitartrato 2.42 mg/ml x120 ml (Humax)", precio: 8000, categoria: "Jarabes y soluciones", imagen: "/dihid.png", stock: 90 },
{ id: 563, nombre: "Albendazol Suspensión (Laproff) x20 ml", precio: 2200, categoria: "Laproff", imagen: "/aslp2.png", stock: 100 },
{ id: 564, nombre: "Furotil (Metronidazol 5.0 g + Nifuroxanida) x120 ml", precio: 12700, categoria: "Jarabes y soluciones", imagen: "/furotil.png", stock: 30 },
{ id: 964, nombre: "Taxen (Nitazoxanida) x30 ml", precio: 8200, categoria: "Jarabes y soluciones", imagen: "/ta3.png", stock: 0 },
{ id: 1964, nombre: "Letusin x240 ml", precio: 12100, categoria: "Jarabes y soluciones", imagen: "/letu.png", stock: 10 },



{ id: 567, nombre: "Albendazol Suspensión 4% x20 ml (CoasPharma)", precio: 1900, categoria: "CoasPharma", imagen: "/a4s.png", stock: 100 },
{ id: 568, nombre: "Vitaban Jalea x240 ml", precio: 15600, categoria: "Jarabes y soluciones", imagen: "/vitaban.png", stock: 35 },
{ id: 569, nombre: "Caladerm Rosa Suspensión x120 ml", precio: 9300, categoria: "Jarabes y soluciones", imagen: "/crosa.png", stock: 0 },
{ id: 571, nombre: "Bactroderm (Yodo-Povidona) Solución x60 ml", precio: 5800, categoria: "Ecar", imagen: "/bsol.png", stock: 100 },
{ id: 572, nombre: "Bactroderm (Yodo-Povidona) Bucogaringeo x60 ml", precio: 5600, categoria: "Ecar", imagen: "/bbuc.png", stock: 120 },
{ id: 800, nombre: "Bactroderm (Yodo-Povidona) Espuma x60 ml", precio: 7200, categoria: "Ecar", imagen: "/baces.png", stock: 0 },
{ id: 733, nombre: "Drenolax Pluss x120 ml", precio: 11000, categoria: "Jarabes y soluciones", imagen: "/dreno.png", stock: 0 },
{ id: 8010, nombre: "Impothos (Sin Azucar) x120 ml", precio: 9500, categoria: "Jarabes y soluciones", imagen: "/impot.png", stock: 0 },

// --- Cremas y Ungüentos ---
{ id: 517, nombre: "Fitobremg x32 Gr", precio: 21300, categoria: "Cremas y Ungüentos", imagen: "/fito.png", stock: 0 },
{ id: 518, nombre: "Neotrisona (Triconjugada) x20 Gr", precio: 6700, categoria: "Cremas y Ungüentos", imagen: "/creneo.png", stock: 0 },
{ id: 520, nombre: "Micigent Gentamicina Crema 40 Gr", precio: 10400, categoria: "Cremas y Ungüentos", imagen: "/micigent.png", stock: 0 },
{ id: 521, nombre: "Fenacalm (Diclofenaco) Gel x50 Gr", precio: 6800, categoria: "Cremas y Ungüentos", imagen: "/fenacalm.png", stock: 0 },
{ id: 1521, nombre: "Diclofenaco Gel x50 Gr Vitalis", precio: 6800, categoria: "Cremas y Ungüentos", imagen: "/diclv.png", stock: 400 },
{ id: 3521, nombre: "Crema Forz x24 Sobres", precio: 47900, categoria: "Cremas y Ungüentos", imagen: "/forz.png", stock: 20 },
{ id: 5588, nombre: "Hidropiel Ketoconazol 2% x30 Gr", precio: 5200, categoria: "Cremas y Ungüentos", imagen: "/hpiel.png", stock: 100 },

{ id: 522, nombre: "Benlic (Triconjugada) 20 Gr", precio: 10000, categoria: "Cremas y Ungüentos", imagen: "/benlic20.png", stock: 130 },
{ id: 523, nombre: "Benlic (Triconjugada) 40 Gr", precio: 16000, categoria: "Cremas y Ungüentos", imagen: "/benlic40.png", stock: 100 },
{ id: 1523, nombre: "DKG (Triconjugada) 20 Gr", precio: 6400, categoria: "Cremas y Ungüentos", imagen: "/dkg.png", stock: 100 },
{ id: 524, nombre: "Nelind Crema x40 Gr", precio: 14600, categoria: "Cremas y Ungüentos", imagen: "/nldim.png", stock: 30 },
{ id: 525, nombre: "Tisat Nistatina 100.000 U.I Crema 30 Gr", precio: 11000, categoria: "Cremas y Ungüentos", imagen: "/tisat.png", stock: 10 },
{ id: 618, nombre: "Crema Furm mometasona al 0.1% x15 Gr", precio: 9900, categoria: "Cremas y Ungüentos", imagen: "/furm.png", stock: 0 },
{ id: 779, nombre: "Dermakron (Triconjugada) x20 Gr", precio: 7200, categoria: "Cremas y Ungüentos", imagen: "/dkron.png", stock: 0 },
{ id: 4683, nombre: "Ketoprofeno Gel al 2.5% x40gr Vitalis", precio: 16200, categoria: "Cremas y Ungüentos", imagen: "/ketovi.png", stock: 0 },

{ id: 527, nombre: "Piroxicam Gel 0.5% 40 Gr Vitalis", precio: 6800, categoria: "Cremas y Ungüentos", imagen: "/pirovit.png", stock:0 }, // Próximo
{ id: 529, nombre: "Vivirsón Aciclovir Ungüento al 5% x15 Gr", precio: 4300, categoria: "Cremas y Ungüentos", imagen: "/vivirson.png", stock: 0 },
{ id: 530, nombre: "Gyno Confort (Clotrimazol) Vaginal al 2% x20 Gr", precio: 11500, categoria: "Cremas y Ungüentos", imagen: "/gynoc.png", stock: 0 },
{ id: 531, nombre: "Nitrofurazona 0.2% Pomada x40 Gr", precio: 10200, categoria: "Anglopharma", imagen: "/nitrofuang.png", stock: 50 },
{ id: 532, nombre: "Lindazol Crema Vaginal (Clotrimazol 2% + Clindamicina 2%) 20 Gr", precio: 16000, categoria: "Cremas y Ungüentos", imagen: "/lindacre.png", stock: 0 },
{ id: 534, nombre: "Vclocli (Clotrimazol + Clindamicina) al 2% x20 Gr", precio: 15000, categoria: "Cremas y Ungüentos", imagen: "/vclocli.png", stock: 0 },
{ id: 5534, nombre: "Clindabact (Clotrimazol + Clindamicina) al 2% x20 Gr", precio: 13000, categoria: "Cremas y Ungüentos", imagen: "/cbact.png", stock: 0 },

{ id: 535, nombre: "Nixoderm Ungüento x20 Gr", precio: 9200, categoria: "Cremas y Ungüentos", imagen: "/nixod.png", stock: 0 },
{ id: 935, nombre: "Vaxomizol (Terbinafina) al 1% x20 Gr", precio: 9300, categoria: "Cremas y Ungüentos", imagen: "/vaxo.png", stock: 0 },
{ id: 536, nombre: "Pomada Verde x23 Gr (Tridex)", precio: 7742, categoria: "Cremas y Ungüentos", imagen: "/verdep.png", stock: 100, ivaIncluido: true }, 
{ id: 537, nombre: "Ketoconazol 2% 30 Gr", precio: 5900, categoria: "Anglopharma", imagen: "/ketocoangl.png", stock: 100 }, // Próximo
{ id: 538, nombre: "Clotrimazol Tópica 1% 40 Gr", precio: 3300, categoria: "CoasPharma", imagen: "/clfar.png", stock: 0 }, // Próximo
{ id: 9935, nombre: "Terbi Feet (Terbinafina) al 1% x20 Gr", precio: 12000, categoria: "Cremas y Ungüentos", imagen: "/terbi.png", stock: 0 },
{ id: 7737, nombre: "Betametasona 0.05% x40 Gr", precio: 6300, categoria: "Anglopharma", imagen: "/ban.png", stock: 40 }, // Próximo



{ id: 8932, nombre: "Clotrimazol Tópica 1% 40 Gr Farmionni", precio: 3700, categoria: "Cremas y Ungüentos", imagen: "/tofarmi.png", stock: 90 }, // Próximo
{ id: 5538, nombre: "Clotrimazol Vaginal 1% 40 Gr Farmionni", precio: 6600, categoria: "Cremas y Ungüentos", imagen: "/clovo.png", stock: 90 }, // Próximo
{ id: 539, nombre: "Terravital Ungüento x10 Gr", precio: 17500, categoria: "Cremas y Ungüentos", imagen: "/terravi.png", stock: 50 }, // Próximo
{ id: 540, nombre: "Vitatriol Ungüento x3.5 Gr", precio: 13800, categoria: "Cremas y Ungüentos", imagen: "/vitaung.png", stock: 0 },
{ id: 541, nombre: "Nitrofur (Nitrofurazona) x40 Gr", precio: 15600, categoria: "Cremas y Ungüentos", imagen: "/nitrofur.png", stock: 50 },
{ id: 542, nombre: "Difazin Max (Triconjugada) 20 Gr", precio: 7100, categoria: "Cremas y Ungüentos", imagen: "/difazin.png", stock: 50 }, // Próximo
{ id: 626, nombre: "Clindamicina crema vaginal al 2%", precio: 15800, categoria: "Cremas y Ungüentos", imagen: "/clindcv.png", stock: 200 },
{ id: 544, nombre: "Neclobet (Triconjugada) x20 Gr", precio: 7800, categoria: "Cremas y Ungüentos", imagen: "/neclo20.png", stock: 0 },
{ id: 545, nombre: "Neclobet (Triconjugada) x40 Gr", precio: 14600, categoria: "Cremas y Ungüentos", imagen: "/neclo40.png", stock: 0 },
{ id: 546, nombre: "Trinsicon (Triconjugada) x20 Gr", precio: 4200, categoria: "Cremas y Ungüentos", imagen: "/trinsi.png", stock: 0 },
{ id: 616, nombre: "Tersag terbinafina al 1% x15 Gr", precio: 9500, categoria: "Cremas y Ungüentos", imagen: "/tersag.png", stock: 0 },
{ id: 686, nombre: "Pomada Metatitane x40 Gr", precio: 22400, categoria: "Cremas y Ungüentos", imagen: "/metat.png", stock: 50 },
{ id: 1686, nombre: "Limpiaderm Triconjugada x20 Gr", precio: 6400, categoria: "Cremas y Ungüentos", imagen: "/limpiader.png", stock: 100 },
{ id: 7246, nombre: "Triclobén-D (Triconjugada) x20 Gr", precio: 7700, categoria: "Cremas y Ungüentos", imagen: "/triclo.png", stock: 0 },

// ===== GOTAS =====

{ id: 548, nombre: "Rhifisol (Suero Fisiológico) 30 ml", precio: 4100, categoria: "Gotas", imagen: "/rhifi.png", stock: 0 },
{ id: 549, nombre: "Thera Tears Lágrimas Artificiales", precio: 9200, categoria: "Memphis", imagen: "/therat.png", stock: 0 },
{ id: 550, nombre: "Prestiblock (Timolol 0.5%) 5 ml", precio: 6500, categoria: "Gotas", imagen: "/timolo.png", stock: 25 },
{ id: 551, nombre: "Tobroptic Compuesto (Dexametasona + Tobramicina) 5 ml", precio: 20400, categoria: "Gotas", imagen: "/tobrop.png", stock: 50 },
{ id: 552, nombre: "Sulfato Ferroso gotas x20 ml", precio: 7100, categoria: "Laproff", imagen: "/sf20.png", stock: 20 },
{ id: 553, nombre: "Syvitears (Lagrimas artificiales) (Acohol Polivinilico) 1.4% x15 ml", precio: 7800, categoria: "Gotas", imagen: "/syvi.png", stock: 120 },
{ id: 554, nombre: "Naf Vision (Nafazolina) 1 mg x7 ml", precio: 5400, categoria: "Gotas", imagen: "/nafvisi.png", stock: 20 },
{ id: 9554, nombre: "Levomepromazina 4% x20ml", precio: 15000, categoria: "Gotas", imagen: "/zina.png", stock: 0 },

{ id: 1553, nombre: "lagri Tears (Lagrimas artificiales) 1.4% x15 ml", precio: 7000, categoria: "Gotas", imagen: "/tears.png", stock: 0 },


{ id: 556, nombre: "Rincetir (Cetirizina) 10 mg/5 ml", precio: 8200, categoria: "Gotas", imagen: "/rince.png", stock: 0 },
{ id: 557, nombre: "Valerina (Kemi) 60 ml", precio: 6800, categoria: "Gotas", imagen: "/v60.png", stock: 170 },
{ id: 558, nombre: "Valerina (Kemi) 30 ml", precio: 5200, categoria: "Gotas", imagen: "/v30.png", stock: 110 },
{ id: 559, nombre: "Motibex (Valeriana-Lechuga-Toronjil) 30 ml", precio: 6900, categoria: "Gotas", imagen: "/moti30.png", stock: 30 },
{ id: 560, nombre: "Motibex (Valeriana-Lechuga-Toronjil) 60 ml", precio: 9700, categoria: "Gotas", imagen: "/motibex60.png", stock: 35 },
{ id: 561, nombre: "Vitamina C gotas x30 ml", precio: 5500, categoria: "CoasPharma", imagen: "/vcgt.png", stock: 300 },
{ id: 562, nombre: "Oftalmotrisol (Nafazolina) 15 ml", precio: 13900, categoria: "Gotas", imagen: "/oftalmo.png", stock: 0 },
{ id: 563, nombre: "Tramadol Gotas 10 ml", precio: 4400, categoria: "Memphis", imagen: "/p111.png", stock: 300 },
{ id: 564, nombre: "Tramasindol (Tramadol) 10 ml", precio: 4200, categoria: "Gotas", imagen: "/trama.png", stock: 100 },


{ id: 5588, nombre: "Eyes Flex (Triconjugada) 5 ml", precio: 7100, categoria: "Gotas", imagen: "/eyesf.png", stock: 100 },

{ id: 565, nombre: "Polioftal (Triconjugada) 5 ml", precio: 8700, categoria: "Gotas", imagen: "/polio.png", stock: 100 },
{ id: 567, nombre: "Wassertrol 5 ml", precio: 12500, categoria: "Gotas", imagen: "/waser.png", stock: 0 },
{ id: 568, nombre: "Digesta gotas x20 ml", precio: 12500, categoria: "Gotas", imagen: "/dgts.png", stock: 0 },
{ id: 569, nombre: "Iverblas (Ivermectina 0.6%) 5 ml", precio: 9200, categoria: "Gotas", imagen: "/iverblas.png", stock: 0 },
{ id: 570, nombre: "Cifloblas (Ciprofloxacino 0.3%) 5 ml", precio: 10600, categoria: "Gotas", imagen: "/ciflob.png", stock: 50 },
{ id: 571, nombre: "Triclimbac (Óticas) 10 ml", precio: 8500, categoria: "Gotas", imagen: "/triclimbac.png", stock: 180 },
{ id: 572, nombre: "Prednioftal F (Prednisolona Acetato 10 mg/ml) 5 ml", precio: 33800, categoria: "Gotas", imagen: "/predbk.png", stock: 0 },
{ id: 573, nombre: "Fenacof (Diclofenaco Sódico 0.1%) 5 ml", precio: 10300, categoria: "Gotas", imagen: "/fenacof.png", stock: 25 },


{ id: 4269, nombre: "Simpiox (Ivermectina 0.6%) 5 ml", precio: 8500, categoria: "Gotas", imagen: "/simpi.png", stock: 0 },

{ id: 574, nombre: "Nazil (Nafazolina Clorhidrato 0.1%) 15 ml", precio: 10500, categoria: "Gotas", imagen: "/nazil.png", stock: 0 },
{ id: 575, nombre: "VitaTriol (Triconjugada) 5 ml", precio: 7400, categoria: "Gotas", imagen: "/vitagt.png", stock: 300 },
{ id: 576, nombre: "Tikoj (Cromoglicato Sódico 4%) 5 ml", precio: 8000, categoria: "Gotas", imagen: "/tikoj.png", stock: 40 },
{ id: 577, nombre: "Sulfaoftal (Sulfacetamida Sódica 100 mg/ml) 15 ml", precio: 10700, categoria: "Gotas", imagen: "/sulfaof.png", stock: 20 },
{ id: 578, nombre: "Fluoftal (Fluorometalona 0.1%) 5 ml", precio: 23500, categoria: "Gotas", imagen: "/fluof.png", stock: 10 },
{ id: 579, nombre: "Eye Zul (Nafazolina Clorhidarto 0.1%) 7 ml", precio: 6700, categoria: "Gotas", imagen: "/zuln.png", stock: 100 },
{ id: 580, nombre: "Cetirizina gotas 15 ml", precio: 6700, categoria: "Memphis", imagen: "/cetigts.png", stock: 120 },
{ id: 581, nombre: "Fire Lips (Ácido Salicílico) 10 ml", precio: 7600, categoria: "Gotas", imagen: "/fire.png", stock: 220 },
{ id: 621, nombre: "Oximetazolina 0,05% (Adulto) x15 ml pb", precio: 6900, categoria: "Gotas", imagen: "/oxipb.png", stock: 100 },
{ id: 9148, nombre: "Oxifree Oximetazolina 0.05 Adulto x15 ml", precio: 7200, categoria: "Gotas", imagen: "/oxifree.png", stock: 0 },

{ id: 583, nombre: "Oftalmax (Triconjugada) 5 ml", precio: 7000, categoria: "Gotas", imagen: "/oftalmax.png", stock: 0 },
{ id: 584, nombre: "Lagrikov Lágrimas Artificiales 15 ml", precio: 8900, categoria: "Gotas", imagen: "/lagrikov.png", stock: 50 },
{ id: 585, nombre: "Conjugent (Gentamicina 0.3%) 5 ml", precio: 6800, categoria: "Gotas", imagen: "/conjug.png", stock: 23 },

{ id: 586, nombre: "Activa 21", precio: 5600, categoria: "Anticonceptivos", imagen: "/ac21.png", stock: 660 }, // Próximo a llegar
{ id: 587, nombre: "Cyclofemina 25mg/5mg Solución Inyectable x1", precio: 14000, categoria: "Anticonceptivos", imagen: "/cyclof.png", stock: 0 },
{ id: 1587, nombre: "Cyclofem Solución Inyectable x1", precio: 17400, categoria: "Anticonceptivos", imagen: "/cym.png", stock: 100 },
{ id: 588, nombre: "PostDay (Levonorgestrel 0.75mg) x2 Tbs", precio: 10600, categoria: "Anticonceptivos", imagen: "/post.png", stock: 100 },
{ id: 590, nombre: "Evinet x2 Tbs", precio: 5900, categoria: "Anticonceptivos", imagen: "/evinet.png", stock: 70 },
{ id: 8593, nombre: "Sinovul x21 Tbs", precio: 5300, categoria: "Anticonceptivos", imagen: "/sinov.png", stock: 0 },
{ id: 2785, nombre: "PostDay (Levonorgestrel 0.75mg) x8 Tbs", precio: 29900, categoria: "Anticonceptivos", imagen: "/post8.png", stock: 100 },



{ id: 591, nombre: "Postinor2 (Levonorgestrel 0.75mg) x2 Tbs", precio: 6400, categoria: "Anticonceptivos", imagen: "/posti2.png", stock: 0 },
{ id: 593, nombre: "Microgynon Suave x21 Comprimidos", precio: 6400, categoria: "Anticonceptivos", imagen: "/micros.png", stock: 100 },
{ id: 594, nombre: "Microgynon 30 x21 Comprimidos", precio: 6400, categoria: "Anticonceptivos", imagen: "/micro30.png", stock: 100 },
{ id: 1594, nombre: "Mesigyna x1 Amp", precio: 7900, categoria: "Anticonceptivos", imagen: "/messi.png", stock: 0 },
{ id: 2594, nombre: "Nofertyl x1 Amp", precio: 7500, categoria: "Anticonceptivos", imagen: "/nofe.png", stock: 0 },
{ id: 7598, nombre: "Preservativos Contigo x150 Und", precio: 62500, categoria: "Anticonceptivos", imagen: "/condon.png", stock: 0 },
{ id: 3794, nombre: "Ileine 1ml x1 Amp Trimestral", precio: 16500, categoria: "Anticonceptivos", imagen: "/ile.png", stock: 0 },
{ id: 5555, nombre: "Preservativos Te Amo x24 Pcs x3", precio: 15000, precioAntes: 22000, categoria: "Anticonceptivos", imagen: "/teamo1.png", stock: 20 },
{ id: 9356, nombre: "Preservativos Xtrem nornal x3", precio: 5000,  categoria: "Anticonceptivos", imagen: "/xtrem.png", stock: 100 },


// —— BIOSANITARIOS ——
{ id: 595, nombre: "Jeringa 3 ml (Aguja 21G x 1 1/2\") x100 (Alfasafe)", precio: 18330, categoria: "Biosanitarios", imagen: "/3ml.png", stock: 120, ivaIncluido: true },
{ id: 596, nombre: "Jeringa 5 ml (Aguja 21G x 1 1/2\") x100 (Alfasafe)", precio: 18225, categoria: "Biosanitarios", imagen: "/5ml.png", stock: 50, ivaIncluido: true },
{ id: 597, nombre: "Jeringa 10 ml (Aguja 21G x 1 1/2\") x100 (Alfasafe)", precio: 25282, categoria: "Biosanitarios", imagen: "/10ml.png", stock: 50, ivaIncluido: true },
{ id: 598, nombre: "Gasa Estéril (No tejida) x50 sobres de 6 (Alfa)", precio: 21500, categoria: "Biosanitarios", imagen: "/gasa.png", stock: 55 },
{ id: 599, nombre: "Apósito Goly (Niño) x20 Und", precio: 6700, categoria: "Biosanitarios", imagen: "/gni.png", stock: 60 },
{ id: 641, nombre: "Apósito Goly (Adulto) x20 Und", precio: 6700, categoria: "Biosanitarios", imagen: "/gad.png", stock: 60 },
{ id: 600, nombre: "Termómetro Digital", precio: 6720, categoria: "Biosanitarios", imagen: "/termo.png", stock: 230, ivaIncluido: true },
{ id: 601, nombre: "Goteros de Vidrio x20 Und (Alfa)", precio: 13363, categoria: "Biosanitarios", imagen: "/gote.png", stock: 100, ivaIncluido: true },
{ id: 602, nombre: "Baxter Cloruro de Sodio 0.9% x500 ml", precio: 2900, categoria: "Biosanitarios", imagen: "/b500.png", stock: 160 },
{ id: 603, nombre: "Baxter Cloruro de Sodio 0.9% x100 ml", precio: 2400, categoria: "Biosanitarios", imagen: "/b100.png", stock: 100 },
{ id: 1603, nombre: "Baxter Cloruro de Sodio 0.9% x250 ml", precio: 2900, categoria: "Biosanitarios", imagen: "/b250.png", stock: 100 },
{ id: 8795, nombre: "Set de infusión Macrogoteo x1 und", precio: 1500, categoria: "Biosanitarios", imagen: "/macrogo.png", stock: 100 },

{ id: 604, nombre: "Cinta Microporosa Color Piel (12.5 mm x 5 yds) x Und Supreme", precio: 1400, categoria: "Biosanitarios", imagen: "/s12x5.png", stock: 100 }, // Próximo a llegar
{ id: 605, nombre: "Cinta Microporosa Color Piel (1\" x 5 yds) x Und Supreme", precio: 2000, categoria: "Biosanitarios", imagen: "/s1x5.png", stock: 0 },
{ id: 606, nombre: "Cinta Microporosa Color Piel (2\" x 5 yds) x Und Supreme", precio: 3600, categoria: "Biosanitarios", imagen: "/s2x5.png", stock: 0 },
{ id: 608, nombre: "Baxter Cloruro de Sodio 0.9% x1000 ml", precio: 4900, categoria: "Biosanitarios", imagen: "/b1000.png", stock: 100 },
{ id: 609, nombre: "Curas Color Piel x100 (Medicare)", precio: 4800, categoria: "Biosanitarios", imagen: "/curas.png", stock: 100 },
{ id: 610, nombre: "Lactato de Ringer x500 ml (Baxter)", precio: 2900, categoria: "Biosanitarios", imagen: "/lacto.png", stock: 100 },
];



/* ================== COMPONENTES UI ================== */

const IVABadge = () => (
  <span className="absolute top-1 right-1 md:top-2 md:right-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-[7px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-md shadow-sm z-10 tracking-tight md:tracking-wide">
    IVA INCLUIDO
  </span>
);

// Badge de No Disponible (Actualizado de Agotado a No Disponible)
const AgotadoOverlay = () => (
  <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-20 flex items-center justify-center p-1">
    <span className="bg-indigo-600/90 text-white px-1.5 py-0.5 md:px-4 md:py-1.5 rounded md:rounded-full text-[7px] md:text-xs font-black shadow-md tracking-tighter md:tracking-wider uppercase border border-white/30 text-center leading-none">
      Próximo a llegar
    </span>
  </div>
);

/* ================== PÁGINA PRINCIPAL ================== */

export default function TiendaModerna({ vendedor }: { vendedor: "miguel" | "juan" }) {
  const [carrito, setCarrito] = useState<ProductoEnCarrito[]>([]);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const [categoriaActiva, setCategoriaActiva] = useState("Más Vendidos");
  const [verCarrito, setVerCarrito] = useState(false);
  const [verCondiciones, setVerCondiciones] = useState(false);
  const [verPrivacidad, setVerPrivacidad] = useState(false); 
  const [verPrecios, setVerPrecios] = useState(false);
  const [precioMultiplier, setPrecioMultiplier] = useState(1);
  const [modalCodigo, setModalCodigo] = useState(false);
  const [codigoInput, setCodigoInput] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [codigoActivo, setCodigoActivo] = useState<string | null>(null);
  const [showScroll, setShowScroll] = useState(false);
 


  useEffect(() => {
    const savedCart = localStorage.getItem("tayro:cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        const validCart = parsed.filter((item: ProductoEnCarrito) => {
           const p = productos.find(prod => `${prod.id}-${prod.categoria}` === item.sku);
           return p && p.stock > 0;
        });
        setCarrito(validCart);
      } catch (e) { console.error(e); }
    }





    const savedCode = localStorage.getItem("tayro:precio:code");
    if (savedCode && CODIGOS[savedCode]) {
      setCodigoActivo(savedCode);
      setVerPrecios(true);
      setPrecioMultiplier(CODIGOS[savedCode].precioMultiplier);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tayro:cart", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const checkHorario = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Bogota" }));
      const dia = now.getDay(); 
      const mins = now.getHours() * 60 + now.getMinutes();
      setAbierto(dia >= 1 && dia <= 6 && mins >= 420 && mins < 960); 
    };
    checkHorario();
    const interval = setInterval(checkHorario, 60000);
    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  const checkScroll = () => {
    // Calcula si bajó más del 50% de la página
    const halfPage = document.documentElement.scrollHeight / 2;
    setShowScroll(window.scrollY > halfPage);
  };

  window.addEventListener('scroll', checkScroll);
  return () => window.removeEventListener('scroll', checkScroll);
}, []);


  const productosProcesados = useMemo(() => {
    return productos.map(p => ({
      ...p,
      nombreBusqueda: normalize(p.nombre), 
      sku: skuOf(p)
    }));
  }, []);

  const productosFiltrados = useMemo(() => {
    const q = normalize(deferredSearch.trim());
    let list;
    if (q) {
      list = productosProcesados.filter(p => p.nombreBusqueda.includes(q));
    } else {
      list = productosProcesados.filter(p => 
        categoriaActiva === "Más Vendidos" ? p.masVendido : p.categoria === categoriaActiva
      );
    }
    list.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return list.slice(0, 1000);
  }, [deferredSearch, categoriaActiva, productosProcesados]);


  const agregar = (p: Producto) => {
    if (p.stock <= 0) return;
    const sku = skuOf(p);
    setCarrito(prev => {
      const exists = prev.find(i => i.sku === sku);
      if (exists) {
        return prev.map(i => i.sku === sku ? { ...i, cantidad: Math.min(i.cantidad + 1, p.stock) } : i);
      }
      setVerCarrito(true); 
      return [...prev, { ...p, cantidad: 1, sku }];
    });
  };

  const modificarCantidad = (sku: string, delta: number) => {
    setCarrito(prev => prev.map(i => {
      if (i.sku === sku) {
        return { ...i, cantidad: Math.max(0, Math.min(i.cantidad + delta, i.stock)) };
      }
      return i;
    }).filter(i => i.cantidad > 0));
  };

  const total = useMemo(() => 
    Math.round(carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0) * precioMultiplier), 
  [carrito, precioMultiplier]);

  const validarCodigo = (e: React.FormEvent) => {
    e.preventDefault();
    if (CODIGOS[codigoInput]) {
      localStorage.setItem("tayro:precio:code", codigoInput);
      setCodigoActivo(codigoInput);
      setPrecioMultiplier(CODIGOS[codigoInput].precioMultiplier);
      setVerPrecios(true);
      setModalCodigo(false);
      setCodigoInput("");
    } else {
      alert("Código inválido");
    }
  };

  const toggleLock = () => {
    if (verPrecios) {
      setVerPrecios(false);
      setPrecioMultiplier(1);
      localStorage.removeItem("tayro:precio:code");
      setCodigoActivo(null);
    } else {
      setModalCodigo(true);
    }
  };

  const enviarPedido = () => {
    if (!carrito.length) return;

    // 1. Identificar qué productos del carrito ya no tienen stock
    const productosAgotados = carrito.filter(item => {
      const p = productos.find(prod => skuOf(prod) === item.sku);
      return !p || p.stock <= 0;
    });

    // 2. Filtrar el carrito para dejar solo lo que SÍ tiene stock
    const carritoValido = carrito.filter(item => {
      const p = productos.find(prod => skuOf(prod) === item.sku);
      return p && p.stock > 0;
    });

    // 3. Si hubo productos agotados, avisar cuáles son
    if (productosAgotados.length > 0) {
      const nombresAgotados = productosAgotados.map(i => i.nombre).join(", ");
      alert(`Los siguientes productos se agotaron y fueron eliminados: \n\n${nombresAgotados}`);
      
      setCarrito(carritoValido); // Actualizamos el carrito visualmente

      if (carritoValido.length === 0) {
        alert("Lo sentimos, ya no quedan productos disponibles en tu pedido.");
        return;
      }
    }

    // 4. Armar el texto para WhatsApp con lo que sí hay
    const items = carritoValido.map(i => {
      const suf = SUFIJOS[i.categoria] ?? "";
      return `* (${i.cantidad}) ${nombreUI(i.nombre).toUpperCase()} ${suf}`;
    }).join("\n");

    const texto = `Hola ${NOMBRES_VENDEDORES[vendedor]}, deseo cotizar y realizar el siguiente pedido:\n\n${items}\n\nQuedo a la espera de su respuesta.`;
    const telefono = codigoActivo ? CODIGOS[codigoActivo].telefono : TELEFONOS_VENDEDORES[vendedor];

    // 5. Enviar y limpiar
    window.open(`https://wa.me/57${telefono}?text=${encodeURIComponent(texto)}`, "_blank");
    setCarrito([]);
    localStorage.removeItem("tayro:cart");
    setVerCarrito(false);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans text-slate-800">
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '825223906636542');fbq('track', 'PageView');`
        }}
      />

      {/* --- Barra Superior --- */}
      <div className={`w-full py-2 text-center text-[10px] md:text-xs font-bold transition-colors duration-300 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 ${abierto ? "bg-green-400 shadow-md" : "bg-red-500 shadow-md"} relative z-50`}>
        <span className="flex items-center gap-1 text-sm sm:text-xs text-white font-black tracking-wide drop-shadow-md">
          {abierto ? "🟢 ABIERTO AHORA" : "🔴 CERRADO AHORA"}
        </span>
        <span className="opacity-90 flex items-center gap-1 text-black font-bold">
          <FaClock className="text-black/80" /> Lunes a Sábado: 7:00 AM - 4:00 PM
        </span>
      </div>

     {/* --- Header Flotante --- */}
      <header className="sticky top-0 z-40 bg-blue-900 shadow-xl transition-all border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-3 gap-x-2">
          
   {/* 1. LOGO Y ASESOR */}
<div className="flex items-center shrink-0 order-1">
    <div className="relative h-9 w-24 md:h-16 md:w-48 drop-shadow-sm">
      <Image src="/logo-tayro.png" alt="Tayro Pharma" fill className="object-contain" priority />
    </div>
    
    {/* USAMOS: 
        - relative: para activar el movimiento manual.
        - -left-6: mueve el bloque 24px a la izquierda en móvil.
        - md:left-0: lo devuelve a su sitio original en PC.
    */}
    <div className="relative -left-6 md:left-0 border-l border-blue-700 pl-1.5 md:pl-4 text-[8px] md:text-xs text-blue-200">
      <p className="uppercase tracking-tighter font-semibold text-[6px] md:text-[10px] opacity-80 leading-none">
        Asesor Asignado:
      </p>
      <p className="font-bold text-white text-[9px] md:text-sm tracking-wide leading-tight">
        {NOMBRES_VENDEDORES[vendedor]}
      </p>
    </div>
</div>

          {/* 2. BUSCADOR (Orden 3 en móvil [ABAJO], Orden 2 en PC [CENTRO]) */}
          <div className="order-3 md:order-2 w-full md:w-auto md:flex-1 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400"> 
              <FaSearch size={18} />
            </div>
            <input 
              type="text"
              placeholder="Buscar medicamento..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-2 border-transparent focus:border-blue-400 rounded-full py-2.5 md:py-3 pl-12 pr-10 text-sm md:text-base outline-none transition-all shadow-md text-slate-600 placeholder:text-slate-400 font-medium"
            />
            {search !== deferredSearch && (
                  <div className="absolute right-12 top-3 animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            )}

            {search && (
              <button onClick={() => setSearch("")} className="absolute inset-y-0 right-4 text-slate-400 hover:text-red-500 transition">
                <FaTimes size={16} />
              </button>
            )}
          </div>

          {/* 3. BOTONES (Orden 2 en móvil [ARRIBA DERECHA], Orden 3 en PC [DERECHA]) */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0 order-2 md:order-3 ml-auto md:ml-0">
             <button onClick={() => setVerCondiciones(true)} className="hidden md:flex px-4 py-2 bg-white text-slate-800 rounded-md text-sm font-bold shadow-sm hover:bg-slate-50 transition items-center gap-1">
               Condiciones
             </button>
            
           

            {/* Botón CARRITO con texto visible */}
            <button 
              onClick={() => setVerCarrito(true)}
              className="relative px-3 py-1.5 md:py-2 bg-[#00a650] hover:bg-green-600 rounded-md transition-all shadow-lg hover:shadow-xl group flex items-center gap-2"
            >
               <FaShoppingCart className="text-white text-lg drop-shadow-sm transform group-hover:scale-110 transition-transform" />
               <span className="font-bold text-sm text-white">Carrito</span>
               
              <AnimatePresence>
                {carrito.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-md border-2 border-white"
                  >
                    {carrito.reduce((a, b) => a + b.cantidad, 0)}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

{/* --- SECCIÓN 1: BANNER PRINCIPAL --- */}
{!search && categoriaActiva === "Más Vendidos" && (
  <div className="bg-[#F1F5F9] pt-6 pb-2 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 md:px-4 relative h-auto min-h-[350px] md:h-[500px] lg:h-[450px]">
      
      <motion.div
        key="banner-azul"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative md:absolute inset-x-0 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 h-auto md:h-full"
      >
        
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <FaShoppingCart size={200} />
        </div>

        <div className="text-left md:text-left space-y-3 relative z-30 w-full lg:w-2/3">
          <h2 className="text-lg md:text-4xl font-extrabold tracking-tight drop-shadow-md">
            Distribuidora Tayro Pharma SAS
          </h2>
          <h2 className="text-2xl md:text-5xl font-black uppercase leading-none mb-2">
            <span className="text-white">Precios Especiales</span><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCF6BA] via-[#BF953F] to-[#FCF6BA]">
              Para Droguerías
            </span>
          </h2>

          <div className="space-y-1 border-l-4 border-[#BF953F] pl-4 mb-4 text-left">
            <p className="text-white text-[11px] md:text-xl font-bold">
              Maximice su rentabilidad con <span className="text-[#FCF6BA]">Legalidad Total</span>.
            </p>
            <p className="text-blue-100 text-[9px] md:text-base uppercase font-semibold">
              Respaldo: Secretaría de Salud & DIAN
            </p>
          </div>

          {/* Contenedor principal de botones y avisos */}
          <div className="flex flex-col gap-3 relative z-30 w-full">
            
            {/* Botones de condiciones (mantiene el margen para no chocar con los sellos en móvil) */}
            <div className="flex gap-2 justify-start md:justify-start flex-wrap pr-14 md:pr-0">
              <button onClick={() => setVerCondiciones(true)} className="px-3 py-1 bg-white text-black rounded-full text-[10px] md:text-sm font-bold shadow-md flex items-center gap-2">
                <FaInfoCircle/> Condiciones
              </button>
              <div className="bg-[#cc0000] border-2 border-[#FFFF00] rounded-lg py-1 px-2 flex items-center gap-2">
                <FaCheck className="text-white text-[8px] md:text-xs"/>
                <span className="text-white font-black text-[8px] md:text-sm uppercase leading-none">NO HAY MONTO MÍNIMO DE COMPRA</span>
              </div>
            </div>

            {/* Aviso contra entrega - CENTRADO en móvil */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-red-600 border-2 border-red-700 rounded-xl py-3 px-6 flex items-center justify-center md:justify-start gap-3 shadow-lg w-[95%] md:w-auto mx-auto md:mx-0 self-center md:self-start relative z-30"
            >
              <span className="hidden md:inline-block text-3xl text-white">🚫</span>
              <span className="text-white font-black text-[12px] md:text-2xl uppercase tracking-tighter leading-none drop-shadow-md text-center md:text-left">
                No trabajamos con pagos contra entrega
              </span>
            </motion.div>

          </div>
        </div>

        {/* SELLOS PC */}
        <div className="hidden md:flex absolute right-40 top-1/2 -translate-y-1/2 flex-row -space-x-32 z-20">
          <img src="/salud.png" alt="Salud" className="w-80 h-96 object-contain filter drop-shadow-2xl" />
          <img src="/dian.png" alt="DIAN" className="w-80 h-96 object-contain filter drop-shadow-2xl" />
        </div>

        {/* SELLOS MÓVIL */}
        <div className="md:hidden absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center -space-y-8 z-20 pointer-events-none">
          <img src="/salud.png" alt="Salud" className="w-24 h-28 object-contain filter drop-shadow-xl" />
          <img src="/dian.png" alt="DIAN" className="w-24 h-28 object-contain filter drop-shadow-xl" />
        </div>

      </motion.div>
    </div>
  </div>
)}
      {/* --- SECCIÓN 2: LABORATORIOS / CATEGORÍAS (ABAJO DEL BANNER) --- */}
      <div className="bg-white border-b border-slate-200 py-6 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4">
           {/* Vista Móvil: Botones tipo píldora */}
           <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 gap-3 md:hidden">
             {CATEGORIAS.map(cat => (
               <button
                 key={cat}
                 onClick={() => { setCategoriaActiva(cat); setSearch(""); }}
                 className={`w-full px-2 py-2 rounded-full text-xs font-bold transition-all duration-200 border
                   ${categoriaActiva === cat 
                     ? "bg-blue-700 text-white border-blue-800 shadow-md scale-95" 
                     : "bg-slate-50 text-blue-700 border-slate-200 hover:border-blue-300"
                   }`}
               >
                 <span className="line-clamp-1">{cat}</span>
               </button>
             ))}
           </div>
           
           {/* Vista PC: Botones alineados */}
           <div className="hidden md:flex flex-wrap justify-center gap-3">
             {CATEGORIAS.map(cat => (
               <button
                 key={cat}
                 onClick={() => { setCategoriaActiva(cat); setSearch(""); }}
                 className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 border
                   ${categoriaActiva === cat 
                     ? "bg-blue-800 text-white border-blue-900 shadow-md"
                     : "bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:text-blue-900" 
                   }`}
               >
                 {cat}
               </button>
             ))}
           </div>
        </div>
      </div>

{/* --- TOTAL GENERAL: LETRA PEQUEÑA EN MÓVIL / GRANDE EN PC --- */}
      <div className="max-w-7xl mx-auto px-4 pt-4 -mb-6">
        <div className="flex items-center gap-1.5 bg-blue-50/40 p-1.5 rounded-lg border-l-2 border-blue-900 w-fit">
          <FaFlask className="text-blue-900 animate-pulse shrink-0" size={12} />
          <p className="text-[10px] md:text-sm font-extrabold text-slate-700 leading-none uppercase tracking-tight">
            CONTAMOS CON <span className="text-blue-900 text-xs md:text-base">{productos.length}</span> PRODUCTOS DISPONIBLES
          </p>
        </div>
      </div>


      {/* --- Contenido Principal --- */}
      <main className="max-w-7xl mx-auto px-4 py-10 min-h-[60vh]">
        

        {/* Grid de Productos */}
        {productosFiltrados.length > 0 ? (
          /* CAMBIO: 3 columnas en móvil (grid-cols-3) y espacio reducido (gap-2) */
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-8">
            <AnimatePresence mode='popLayout'>
              {productosFiltrados.map((p) => {
                const enCarrito = carrito.find(i => i.sku === skuOf(p))?.cantidad || 0;
                const precioFinal = Math.round(p.precio * precioMultiplier);
                const tieneDescuento = p.precioAntes && p.precioAntes > p.precio;
                const precioAnterior = tieneDescuento ? Math.round(p.precioAntes! * precioMultiplier) : null;
                const porcentajeAhorro = precioAnterior ? Math.round(((precioAnterior - precioFinal) / precioAnterior) * 100) : 0;

                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={skuOf(p)}
                    className="group bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col overflow-hidden relative"
                  >
                    {p.ivaIncluido && <IVABadge />}
                    {p.stock <= 0 && <AgotadoOverlay />}

                    {/* IMAGEN: Padding reducido en móvil (p-2) */}
                    <div className="aspect-square relative p-2 md:p-5 bg-white flex items-center justify-center overflow-hidden">
                      <Image 
                        src={p.imagen || "/placeholder.png"} 
                        alt={p.nombre}
                        width={300} height={300}
                        className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
                      />
                    </div>

                    {/* INFO: Padding reducido en móvil (p-2) */}
                    <div className="p-2 md:p-4 flex-1 flex flex-col border-t border-slate-100 bg-white">
                      <h3 className="text-[10px] md:text-sm font-bold text-slate-800 line-clamp-2 min-h-[2.5em] mb-2 md:mb-3 leading-tight group-hover:text-blue-700 transition-colors" title={p.nombre}>
                        {nombreUI(p.nombre)}
                      </h3>

                     {/* Solo se muestra si el stock es mayor a 0 (disponible) Y menor a 20 */}
{/* La condición < 20 asegura que si hay 20 o más, el aviso NO sale */}
{p.stock > 0 && p.stock < 20 && (
  <div className="mb-2 flex items-center gap-1.5 bg-orange-50 px-2 py-1 rounded-md border border-orange-100 shadow-sm">
    {/* Punto de aviso animado */}
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
    </span>
    
    <p className="text-[8px] md:text-[10px] font-black text-orange-700 uppercase tracking-tighter leading-none">
      {/* 'p.stock' es el número real que viene de tu base de datos/lista */}
      ¡ÚLTIMAS {p.stock} UNIDADES!
    </p>
  </div>
)}
                      
                      <div className="mt-auto space-y-2 md:space-y-3">
                        {verPrecios ? (
          <div className="mt-auto flex flex-col gap-0.5">
            {/* LINEA DE PRECIOS: Todo en una sola fila para el celular */}
            <div className="flex items-baseline flex-wrap gap-x-1 whitespace-nowrap">
              
              {/* Precio Actual (Azul) */}
              <span className="text-[11px] md:text-lg font-black text-blue-900 leading-none">
                ${precioFinal.toLocaleString()}
              </span>

              {/* Precio Antes (Gris y Tachado) - Solo si existe y es mayor */}
              {p.precioAntes && p.precioAntes > p.precio && (
                <span className="text-[8px] md:text-xs text-slate-400 line-through opacity-80 decoration-slate-400">
                  ${Math.round(p.precioAntes * precioMultiplier).toLocaleString()}
                </span>
              )}
            </div>

            {/* Etiqueta de Ahorro: Debajo de los precios en letra muy pequeña */}
            {p.precioAntes && p.precioAntes > p.precio && (
              <div className="leading-none">
                <span className="text-[7px] md:text-[9px] text-green-600 font-bold uppercase tracking-tighter">
                  AHORRAS {Math.round(((p.precioAntes - p.precio) / p.precioAntes) * 100)}%
                </span>
              </div>
            )}
          </div>
        ) : (
  <button 
    onClick={toggleLock} 
    className="w-full py-1 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-center gap-1 text-[8px] md:text-xs text-slate-500 font-medium transition-colors mb-1"
  >
    <span className="text-[9px] md:text-xs">🔒</span> 
    <span className="leading-tight text-center">Precios solo con código</span>
  </button>
)}

                        <div>
                          {enCarrito > 0 ? (
                            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-1 border border-blue-100">
                               <button 
                                 onClick={() => modificarCantidad(skuOf(p), -1)} 
                                 className={`w-6 h-6 md:w-9 md:h-9 flex items-center justify-center rounded-md shadow-sm transition border 
                                   ${enCarrito === 1 
                                     ? "bg-red-500 text-white border-red-600 hover:bg-red-600" 
                                     : "bg-white text-blue-600 border-blue-100 hover:text-red-500" 
                                   }`}
                               >
                                 {enCarrito === 1 ? <FaTrash size={10}/> : <FaMinus size={10}/>}
                               </button>
                               <span className="font-bold text-blue-900 text-xs md:text-base">{enCarrito}</span>
                               <button onClick={() => modificarCantidad(skuOf(p), 1)} disabled={enCarrito >= p.stock} className="w-6 h-6 md:w-9 md:h-9 flex items-center justify-center bg-blue-600 rounded-md shadow-sm text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-600">
                                 <FaPlus size={10}/>
                               </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => agregar(p)}
                              disabled={p.stock <= 0}
                              /* CAMBIOS APLICADOS:
                                 1. whitespace-normal: Permite salto de línea en celular.
                                 2. md:whitespace-nowrap: Obliga a una sola línea en PC.
                                 3. leading-[10px]: Pega las líneas en celular para que quepan.
                                 4. min-h-[30px]: Asegura altura para las 2 líneas en celular.
                              */
                              className="w-full py-1.5 md:py-3 px-0.5 bg-[#00E676] text-slate-900 text-[9px] md:text-sm font-extrabold rounded-lg md:rounded-xl hover:bg-[#00c853] hover:shadow-lg disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-md active:scale-95 border border-[#00c853] uppercase tracking-wide whitespace-normal md:whitespace-nowrap leading-[10px] md:leading-normal flex items-center justify-center min-h-[30px] md:min-h-0"
                            >
                              {p.stock > 0 ? "Agregar al Carrito" : "No Disponible"}
                            </button>
                          )}
                          
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="bg-white p-6 rounded-full shadow-lg mb-4">
               <FaSearch size={40} className="text-blue-200" />
            </div>
            <p className="text-xl font-bold text-slate-600">No encontramos productos.</p>
            <p className="text-sm">Intenta con otra búsqueda o selecciona un laboratorio.</p>
            <button onClick={() => {setSearch(""); setCategoriaActiva("Más Vendidos")}} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg">
              Ver todo el inventario
            </button>
          </div>
        )}
      </main>

      {/* --- Footer Moderno --- */}
      <footer className="bg-blue-900 text-slate-300 pt-16 pb-8 border-t-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
           <div>
             <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2 border-b border-blue-700 pb-2 w-max"><FaMapMarkerAlt className="text-red-500"/> Ubicación</h4>
             <p className="text-sm leading-relaxed text-slate-300 font-medium">
               Carrera 18 # 12-89<br/>
               C.C. Ferrocarril Plaza, Local C145<br/>
               Bogotá DC, Colombia
             </p>
           </div>
           <div className="text-center">
             <h4 className="text-white font-bold text-lg mb-6 border-b border-blue-700 pb-2 inline-block">Síguenos</h4>
             <div className="flex justify-center gap-4">
               <a href="https://www.facebook.com/TAYROPHARMA/" target="_blank" className="p-3 bg-blue-800 rounded-full hover:bg-blue-600 transition text-white hover:-translate-y-1"><FaFacebook size={24}/></a>
               <a href="https://www.instagram.com/tayropharmasas/?hl=es" target="_blank" className="p-3 bg-blue-800 rounded-full hover:bg-pink-600 transition text-white hover:-translate-y-1"><FaInstagram size={24}/></a>
               <a href="https://www.tiktok.com/@tayro.pharma.sas" target="_blank" className="p-3 bg-blue-800 rounded-full hover:bg-black transition text-white hover:-translate-y-1"><FaTiktok size={24}/></a>
             </div>
           </div>
           <div className="md:text-right">
             <h4 className="text-white font-bold text-lg mb-6 flex items-center justify-end gap-2 border-b border-blue-700 pb-2 w-max ml-auto"><FaPhoneAlt className="text-green-400"/> Contacto</h4>
             <p className="text-sm text-slate-300">Asesor: <span className="text-white font-semibold">{NOMBRES_VENDEDORES[vendedor]}</span></p>
             <a href={`https://wa.me/57${TELEFONOS_VENDEDORES[vendedor]}`} target="_blank" className="text-green-400 font-bold hover:text-green-300 block mt-2 text-lg">
               +57 {TELEFONOS_VENDEDORES[vendedor]}
             </a>
             <button onClick={()=>setVerPrivacidad(true)} className="text-xs text-slate-400 hover:text-slate-200 mt-4 underline flex items-center justify-end gap-1 ml-auto">
               <FaShieldAlt /> Políticas de Privacidad
             </button>
           </div>
        </div>
        <div className="border-t border-blue-800 pt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Distribuidora Tayro Pharma SAS. Todos los derechos reservados.
        </div>
      </footer>

      {/* --- MODAL: Carrito --- */}
      <AnimatePresence>
        {verCarrito && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setVerCarrito(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <motion.aside 
            /* ANIMACIÓN HÍBRIDA:
               - En celular se ve como que sube (porque está pegado abajo).
               - En PC se verá como que sube toda la barra (efecto persiana), que es aceptable y no rompe el código.
            */
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            
            /* CLASES MÁGICAS (Aquí ocurre la separación Móvil vs PC):
               1. MÓVIL (Clases normales): fixed bottom-0 (abajo), h-[35vh] (35% altura), w-full, rounded-t-2xl.
               2. PC (Clases md:): md:top-0 (arriba), md:right-0 (derecha), md:h-full (altura completa), md:w-[400px], md:rounded-none (cuadrado).
            */
            className="fixed bottom-0 left-0 z-50 w-full h-[35vh] bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] flex flex-col rounded-t-2xl 
                       md:top-0 md:left-auto md:right-0 md:h-full md:w-[400px] md:rounded-none"
          >
            {/* --- HEADER DEL CARRITO --- */}
            <div className="p-3 md:p-4 border-b flex items-center justify-between bg-slate-50 rounded-t-2xl md:rounded-none">
              {/* Texto pequeño en móvil, grande en PC */}
              <h2 className="font-bold text-sm md:text-lg flex items-center gap-2 text-blue-900"><FaShoppingCart /> Tu Pedido</h2>
              <button onClick={()=>setVerCarrito(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition"><FaTimes/></button>
            </div>

            {/* --- LISTA DE PRODUCTOS --- */}
            <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-4 scrollbar-thin scrollbar-thumb-slate-200 bg-slate-50/50">
              {carrito.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                   <FaShoppingCart size={32} className="opacity-20 md:w-12 md:h-12" /> {/* Icono más grande en PC */}
                   <p className="font-medium text-xs md:text-base">Carrito vacío.</p>
                 </div>
              ) : (
                carrito.map(item => (
                  <div key={item.sku} className="flex gap-3 bg-white border border-slate-200 p-2 md:p-3 rounded-lg shadow-sm relative group">
                    {/* Imagen pequeña en móvil (w-10), normal en PC (md:w-16) */}
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 p-1 border border-slate-100">
                      <Image src={item.imagen || "/placeholder.png"} width={60} height={60} alt={item.nombre} className="max-h-full object-contain"/>
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      {/* Nombre pequeño en móvil */}
                      <p className="text-xs md:text-sm font-bold text-slate-800 truncate leading-tight">{nombreUI(item.nombre)}</p>
                      
                      <div className="flex items-end justify-between mt-1">
                        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 md:p-1">
                          {/* Botones compactos en móvil */}
                          <button onClick={()=>modificarCantidad(item.sku, -1)} className="w-5 h-5 md:w-8 md:h-8 flex items-center justify-center bg-white shadow-sm rounded text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition">
                              <FaMinus size={8} className="md:w-3 md:h-3"/>
                          </button>
                          <span className="text-xs md:text-sm font-bold w-4 md:w-6 text-center tabular-nums">{item.cantidad}</span>
                          <button onClick={()=>modificarCantidad(item.sku, 1)} disabled={item.cantidad>=item.stock} className="w-5 h-5 md:w-8 md:h-8 flex items-center justify-center bg-white shadow-sm rounded text-slate-500 hover:text-blue-600 disabled:opacity-50 transition">
                              <FaPlus size={8} className="md:w-3 md:h-3"/>
                          </button>
                        </div>
                        
                        <div className="text-right">
                           {verPrecios ? (
                             <p className="font-bold text-blue-900 text-xs md:text-base">${Math.round(item.precio * item.cantidad * precioMultiplier).toLocaleString()}</p>
                           ) : <span className="text-[10px] md:text-xs text-slate-400">🔒</span>}
                        </div>
                      </div>
                    </div>
                    <button onClick={()=>modificarCantidad(item.sku, -item.cantidad)} className="absolute top-1 right-1 text-red-300 hover:text-red-600 p-1">
                        <FaTrash size={10} className="md:w-3.5 md:h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

           {/* --- FOOTER DEL CARRITO --- */}
            <div className="p-2 md:p-4 border-t bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
               {verPrecios && carrito.length > 0 && (
                 <div className="flex justify-between items-end text-slate-900 mb-2 md:mb-3">
                   <span className="text-xs md:text-sm font-medium text-slate-500">Total:</span>
                   <span className="text-lg md:text-2xl font-extrabold">${total.toLocaleString()}</span>
                 </div>
               )}
               <button 
                 onClick={enviarPedido} 
                 disabled={carrito.length === 0}
                 /* CAMBIO: Ajusté el py-2.5 para que el botón no sea muy alto en celular */
                 className="w-full py-2.5 md:py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-xs md:text-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
               >
                 <FaWhatsapp size={18} className="md:w-6 md:h-6" /> 
                 {/* CAMBIO: Texto completo siempre */}
                 <span>Enviar Pedido por WhatsApp</span>
               </button>
            </div>
          </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* --- MODAL: Código Precios --- */}
      <AnimatePresence>
        {modalCodigo && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={()=>setModalCodigo(false)}>
            <motion.div initial={{scale:0.95, opacity: 0}} animate={{scale:1, opacity: 1}} exit={{scale:0.95, opacity: 0}} className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden" onClick={e=>e.stopPropagation()}>
               <button onClick={()=>setModalCodigo(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><FaTimes/></button>
               <div className="text-center space-y-5 py-2">
                 <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
                   <span className="text-4xl">🔒</span>
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-800">Precios Mayoristas</h3>
                   <p className="text-sm text-slate-500 mt-1">Ingresa tu código de cliente para ver los precios.</p>
                 </div>
                 <form onSubmit={validarCodigo} className="space-y-4">
                   <input 
                     type="text" 
                     placeholder="Ej: 1234"
                     className="w-full text-center text-3xl tracking-[0.2em] font-bold font-mono border-2 border-slate-200 rounded-xl py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none uppercase transition-all"
                     maxLength={4}
                     value={codigoInput}
                     onChange={e=>setCodigoInput(e.target.value)}
                     autoFocus
                   />
                   <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md active:scale-[0.98]">
                     Desbloquear Ahora
                   </button>
                 </form>
                 <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-2">¿Aún no tienes tu código?</p>
                    <a href={`https://wa.me/57${TELEFONOS_VENDEDORES[vendedor]}?text=Hola, necesito código de acceso para ver precios.`} target="_blank" className="text-sm font-bold text-green-500 hover:text-green-600 flex items-center justify-center gap-1 hover:underline">
                      <FaWhatsapp/> Solicítalo a tu asesor aquí
                    </a>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL: Condiciones --- */}
      <AnimatePresence>
      {verCondiciones && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setVerCondiciones(false)}>
          <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: 20, opacity: 0}} className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b flex items-center justify-between sticky top-0 bg-white z-10">
               <h3 className="text-lg font-bold flex items-center gap-2 text-blue-900"><FaInfoCircle/> Condiciones de Compra</h3>
               <button onClick={()=>setVerCondiciones(false)} className="text-slate-400 hover:text-slate-600"><FaTimes/></button>
            </div>
            <div className="p-6 prose prose-sm text-slate-600 leading-relaxed">
              <ul className="space-y-3 list-none pl-0">
  <li className="flex gap-2"><span className="text-blue-500">📦</span><span><b>Sujeto a inventario:</b> Las existencias pueden variar.</span></li>
  
  {/* 👇 NUEVA CONDICIÓN DE PRECIOS 👇 */}
  <li className="flex gap-2"><span className="text-blue-500">🏷️</span><span><b>Precios:</b> Pueden estar sujetos a cambios sin previo aviso.</span></li>

  <li className="flex gap-2"><span className="text-blue-500">💰</span><span><b>Pagos:</b> Nequi, Daviplata o Bancolombia. (Previa verificación).</span></li>
  <li className="flex gap-2 items-start"><span className="text-red-500 text-xl leading-none pt-0.5">🚫</span><span><b>Importante:</b> No manejamos créditos ni pagos contra entrega.</span></li>
  <li className="flex gap-2"><span className="text-blue-500">🚚</span><span><b>Envíos:</b> Interrapidísimo, Servientrega o Envia. El costo depende del peso/destino.</span></li>
  <li className="flex gap-2"><span className="text-blue-500">⚠️</span><span><b>Revisión:</b> Verifica el estado del paquete al recibirlo con la transportadora.</span></li>
</ul>
            </div>
            <div className="p-4 border-t sticky bottom-0 bg-white">
               <button onClick={() => setVerCondiciones(false)} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition">Entendido</button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* --- MODAL: Políticas de Privacidad --- */}
      <AnimatePresence>
      {verPrivacidad && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setVerPrivacidad(false)}>
          <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: 20, opacity: 0}} className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b flex items-center justify-between sticky top-0 bg-white z-10">
               <h3 className="text-lg font-bold flex items-center gap-2 text-blue-900"><FaShieldAlt/> Políticas de Privacidad</h3>
               <button onClick={()=>setVerPrivacidad(false)} className="text-slate-400 hover:text-slate-600"><FaTimes/></button>
            </div>
            <div className="p-6 text-sm text-slate-600 space-y-4">
              <p>En <b>Distribuidora Tayro Pharma SAS</b>, respetamos su privacidad y estamos comprometidos con la protección de sus datos personales. De acuerdo con la Ley 1581 de 2012 (Habeas Data) de Colombia:</p>
              <h4 className="font-bold text-slate-800 flex items-center gap-1"><FaFileContract className="text-blue-500"/> Recolección de Datos</h4>
              <p>Los datos solicitados (nombre, teléfono, dirección) son utilizados exclusivamente para:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Procesar sus pedidos y facturación.</li>
                <li>Coordinar el despacho con las transportadoras.</li>
                <li>Contactarlo para novedades del pedido.</li>
              </ul>
              <h4 className="font-bold text-slate-800">Seguridad</h4>
              <p>Implementamos medidas de seguridad para evitar el acceso no autorizado a sus datos. No compartimos su información con terceros salvo lo necesario para la entrega del pedido (transportadoras).</p>
              <h4 className="font-bold text-slate-800">Derechos</h4>
              <p>Usted tiene derecho a conocer, actualizar y rectificar sus datos personales. Para ejercer estos derechos, puede contactar a su asesor asignado.</p>
            </div>
            <div className="p-4 border-t sticky bottom-0 bg-white">
               <button onClick={() => setVerPrivacidad(false)} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition">Aceptar</button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {showScroll && (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="fixed bottom-4 right-5 z-50 flex flex-col items-center justify-center gap-0.5 bg-blue-900 text-white w-14 h-14 rounded-full shadow-2xl transition-all active:scale-90 md:right-10 md:w-16 md:h-16"
  >
    {/* Icono de flecha */}
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={3} 
      stroke="currentColor" 
      className="w-5 h-5 md:w-6 md:h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
    
    {/* Texto pequeño debajo del icono */}
    <span className="text-[7px] md:text-[9px] font-bold uppercase leading-none">
      Subir
    </span>
  </button>
)}



     {/* --- Botón Flotante IZQUIERDA (ANIMADO) --- */}
      <motion.a 
        href={`https://wa.me/57${TELEFONOS_VENDEDORES[vendedor]}?text=Hola, quiero ser cliente nuevo y quiero informacion`}
        target="_blank"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        // CAMBIO 1: Usamos 'p-4' en móvil para que sea redondo, y 'md:py-3 md:px-5' en PC para que sea alargado. 
        // CAMBIO NUEVO: Se cambió 'right-6' por 'left-6' para ubicarlo a la izquierda.
        className="fixed bottom-6 left-6 z-40 bg-[#39FF14] text-black p-4 md:py-3 md:px-5 rounded-full shadow-lg border border-black/10 hover:scale-105 hover:shadow-2xl flex items-center gap-3 group"
        aria-label="Contacto Comercial"
      >
        <FaWhatsapp size={28} className="drop-shadow-sm text-black" />
        
        {/* CAMBIO 2: 'hidden' oculta el texto en móvil. 'md:block' lo muestra en pantallas medianas/grandes */}
        <span className="hidden md:block text-sm font-extrabold text-black tracking-wide uppercase">
          CLIENTES NUEVOS
        </span>
      </motion.a>

{/* --- BOTÓN FLOTANTE: SUGERENCIAS DE PRODUCTOS (IZQUIERDA) --- */}
      <motion.a 
        href={`https://wa.me/57${TELEFONOS_VENDEDORES[vendedor]}?text=Hola, ¿por favor pueden empezar a manejar este producto?: `}
        target="_blank"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        // Se cambió el padding en móvil (py-2 px-3) para que sea ovalado y no un círculo gigante
        className="fixed bottom-28 left-6 z-40 bg-purple-600 text-white py-2 px-3 md:py-2.5 md:px-4 rounded-full shadow-lg border border-purple-400 hover:bg-purple-700 hover:shadow-2xl flex items-center gap-1.5 md:gap-2 transition-colors"
        aria-label="Sugerencia de productos"
      >
        <FaLightbulb size={20} className="drop-shadow-sm text-yellow-300 shrink-0" />
        
        {/* Se quitó el 'hidden', ahora usa text-[9px] en móvil y text-xs en PC */}
        <span className="text-[9px] md:text-xs font-extrabold tracking-tight md:tracking-wide uppercase leading-none">
          Sugerencia <br className="block md:hidden" /> de productos
        </span>
      </motion.a>


      {/* --- BOTÓN FLOTANTE: VER PRECIOS (DERECHA) --- */}
<motion.button
  onClick={toggleLock}
  initial={{ x: 100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  /* Se ubica a la derecha, arriba del botón de "Subir" */
  className={`fixed bottom-24 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl border-2 border-white transition-all
    ${verPrecios 
      ? "bg-[#00a650] text-white" 
      : "bg-yellow-400 text-black animate-bounce hover:animate-none"
    }`}
>
  <span className="text-xl">{verPrecios ? "🔓" : "🔒"}</span>
  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">
    {verPrecios ? "Precios Activos" : "Ver Precios"}
  </span>
</motion.button>







    </div>
  );
}