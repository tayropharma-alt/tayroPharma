"use client";

import { useState } from "react";
import Image from "next/image";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
  stock: number;
  masVendido?: boolean;
};

type ProductoEnCarrito = Producto & {
  cantidad: number;
};

const productos: Producto[] = [
  { id: 1, nombre: "Advil Ultra x40 Caps", precio: 75600, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 2, nombre: "Advil Gripa x20 Caps", precio: 38200, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 3, nombre: "Dolex 500mg x100 Tbs", precio: 76700, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 4, nombre: "Dolex Gripa x48 Tbs", precio: 59000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 5, nombre: "Dolex Forte x50 Tbs", precio: 80600, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 6, nombre: "Advil Max x40 Caps", precio: 75600, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 7, nombre: "Dolex Niños 2+ Jarabe 90ml", precio: 15900, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 8, nombre: "Dolex Niños 7+ Jarabe 120ml", precio: 23900, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 9, nombre: "Dolex 1–24 Jarabe 60ml", precio: 13900, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 10, nombre: "Dolex Niños 100mg x20 Tbs", precio: 4400, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 11, nombre: "Vaselina Pura Kevs x50gr", precio: 5900, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 12, nombre: "Condones Te Amo x48und x3", precio: 33000, categoria: "Más Vendidos", imagen: "/teamo.png", stock: 0, masVendido: true },
  { id: 13, nombre: "Advil Children Jarabe 60ml", precio: 21000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 14, nombre: "Dolex Activgel x20 Caps", precio: 27800, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 15, nombre: "Advil Fem x10 Tbs", precio: 19200, categoria: "Más Vendidos", imagen: "/afen.png", stock: 20, masVendido: true },
  { id: 16, nombre: "Vaselina Pura Kevs x100gr", precio: 4200, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 17, nombre: "Vaselina Blanca en Lata x12und", precio: 4200, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 18, nombre: "Vaselina en Lata Colores/Roja x12und", precio: 0, categoria: "Más Vendidos", imagen: "", stock: 0, masVendido: true },
  { id: 19, nombre: "Manteca de Cacao Kevs x12und", precio: 24600, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 20, nombre: "Ginkgo Biloba 120mg x60 Tbs", precio: 23500, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 21, nombre: "Relaxkov 4mg x20 Tbs", precio: 18100, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 22, nombre: "Vitaril Gel Tópico 60gr", precio: 0, categoria: "Más Vendidos", imagen: "", stock: 0, masVendido: true },
  { id: 23, nombre: "Advil Gripa Max x40 Caps", precio: 76700, categoria: "Más Vendidos", imagen: "/gripmax.png", stock: 12, masVendido: true },
  { id: 24, nombre: "Enalapril 20mg x250 Tbs", precio: 76700, categoria: "Más Vendidos", imagen: "/enaa.png", stock: 20, masVendido: true },
  { id: 25, nombre: "Solhidrex Sales de Rehidratación x30 Sobres", precio: 10300, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 26, nombre: "Dolofen 500mg x60 Caps", precio: 22000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 27, nombre: "Vaselina de Limón en Lata x12und", precio: 3900, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 28, nombre: "Bispeptol (Diosmectita) x9 Sobres", precio: 8200, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 29, nombre: "Sacrusyt Salbutamol Inhalador 100mcg", precio: 18800, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 30, nombre: "Salbumed Salbutamol Inhalador 100mcg", precio: 9300, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 31, nombre: "Procatec Ciprofloxacina 500mg x10 Tbs", precio: 5700, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 32, nombre: "Pedialyte 60meq 500ml", precio: 4000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 33, nombre: "Xray Dol x12 Tbs", precio: 16000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 34, nombre: "Fosfocbrina x100 Caps", precio: 24500, categoria: "Más Vendidos", imagen: "/fosfo.png", stock: 20, masVendido: true },
  { id: 35, nombre: "Tacna Sultamicilina 375mg x10 Tbs", precio: 9600, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 36, nombre: "Tor Proctologica Crema x10gr", precio: 0, categoria: "Más Vendidos", imagen: "", stock: 0, masVendido: true },
  { id: 37, nombre: "Iofi DHA+EPA x30 Caps", precio: 0, categoria: "Más Vendidos", imagen: "", stock: 0, masVendido: true },
  { id: 38, nombre: "Buscapina Fem x24", precio: 0, categoria: "Más Vendidos", imagen: "/bfen.png", stock: 0, masVendido: true },
  { id: 39, nombre: "Gastrofull Doble Acción x24 Sachets", precio: 43000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 40, nombre: "Trimesulf Forte (TMP/SMX) x10 Tbs", precio: 36200, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 41, nombre: "Lomotil x12 Cajas de 4 Tbs", precio: 24700, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 42, nombre: "Erassin 100mg x2 Tbs", precio: 9000, categoria: "Más Vendidos", imagen: "/era.png", stock: 20, masVendido: true },
  { id: 43, nombre: "Zincovit Vitamina C + Zinc x100 Tbs", precio: 20800, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 44, nombre: "Pranexxin (Nitazoxanida 500mg) x6 Tbs", precio: 11300, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 45, nombre: "Vyasil (Sildenafilo) 50mg x2 Tbs", precio: 2900, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 46, nombre: "Cebión x10 Tbs Efervescente", precio: 14300, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 47, nombre: "Lanzor (Lansoprazol 30mg) x28 Caps", precio: 18500, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 48, nombre: "Neubalin 75mg x30 Caps", precio: 55000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 49, nombre: "Bisacodilo 5mg x100 Tbs (Humax)", precio: 14600, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 50, nombre: "Ibunflash Migran x30 Caps", precio: 18500, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 51, nombre: "Domeboro (Acetato de Aluminio) x30 Sobres", precio: 12000, categoria: "Más Vendidos", imagen: "/dome.png", stock: 20, masVendido: true },
  { id: 52, nombre: "Mieltertos Pastillas x12 Sobres de 4 Pastillas", precio: 16300, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 53, nombre: "Levotiroxina 100mcg x50 Tbs (Siegfried)", precio: 21300, categoria: "Más Vendidos", imagen: "/sie100.png", stock: 20, masVendido: true },
  { id: 54, nombre: "Novoxican (Meloxicam 15mg) x10 Tbs", precio: 12800, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 55, nombre: "Impomel (Meloxicam 15mg) x10 Tbs", precio: 12800, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 56, nombre: "Inoxicam (Meloxicam) 15mg x10 Tbs", precio: 2700, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 57, nombre: "Veran D (Piroxicam 20mg) x10 Caps", precio: 24700, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 58, nombre: "Metformina 850mg x30 Tbs (Pisa)", precio: 6000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 59, nombre: "Omeprazol 20mg x250 Cap (Anglo)", precio: 37400, categoria: "Más Vendidos", imagen: "/omeprazola.png", stock: 0, masVendido: true },
  { id: 60, nombre: "Deltmoxi (Amoxicilina) 500mg x100 Caps", precio: 55000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 61, nombre: "Okap Forte (Acetaminofén + Cafeína) x10 Caps", precio: 9000, categoria: "Más Vendidos", imagen: "/ofo.png", stock: 20, masVendido: true },
  { id: 62, nombre: "Multi-Cevita (Multivitamínico) x100 Tbs", precio: 18600, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 63, nombre: "Prazosina 1mg x30 Tbs (Expofarma)", precio: 17500, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 64, nombre: "Losartán 50mg x30 Tbs (Expofarma)", precio: 7900, categoria: "Más Vendidos", imagen: "/le.png", stock: 100, masVendido: true },
  { id: 65, nombre: "Okap (Tramadol + Acetaminofén) x10 Caps", precio: 18000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 66, nombre: "Movidol x8 Tbs", precio: 5300, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 67, nombre: "Vencedor (Mata Callo - Ácido Salicílico)", precio: 3500, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 68, nombre: "Tropxim-F (Metronidazol 500mg + Clotrimazol 100mg) x10 Óvulos", precio: 18200, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 69, nombre: "Gastrimeb (Alginato de Sodio + Simeticona) 360ml", precio: 23200, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 70, nombre: "Migradol (Ergotamina + Cafeína) x30 Tbs", precio: 22000, categoria: "Más Vendidos", imagen: "", stock: 0, masVendido: true },
  { id: 71, nombre: "Nodol Plus (Acetaminofén 325mg + Hidrocodona 5mg) x10 Tbs", precio: 37300, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 72, nombre: "Diosmit (Diosmectita 3%) x6 Sobres", precio: 12800, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 73, nombre: "Sinverty (Dimenhidrinato 50mg) x72 Tbs", precio: 20900, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 74, nombre: "Langenix (Lansoprazol 30mg) x30 Caps", precio: 18000, categoria: "Más Vendidos", imagen: "/lange.png", stock: 20, masVendido: true },
  { id: 75, nombre: "X Ray Dol x48 Tbs", precio: 6400, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 76, nombre: "Dolpack Kids (Ácido Hialurónico + Regaliz) x10ml", precio: 61000, categoria: "Más Vendidos", imagen: "/nenepack.png", stock: 20, masVendido: true },
  { id: 77, nombre: "Solomoxy (Amoxicilina 500mg) x60 Caps", precio: 32200, categoria: "Más Vendidos", imagen: "/solo.png", stock: 20, masVendido: true },
  { id: 78, nombre: "Tamsulosina 0.4mg x30 Caps (Sandoz)", precio: 26500, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 79, nombre: "Cefalexina 500mg x50 Caps (Anglo)", precio: 25000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 80, nombre: "Amdelt (Ampicilina 500mg) x100 Caps", precio: 33500, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 81, nombre: "Gaviscon Doble Acción x12 Sachets", precio: 29000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 82, nombre: "Buscapina Compuesta x30 Comp", precio: 40500, categoria: "Más Vendidos", imagen: "/bc.png", stock: 40, masVendido: true },
  { id: 83, nombre: "Skin-Mantle (Acetato de Aluminio) x120ml", precio: 2600, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 84, nombre: "Clonidina 0.150mg x50 Tbs (Anglo)", precio: 8600, categoria: "Más Vendidos", imagen: "/clon.png", stock: 20, masVendido: true },
  { id: 85, nombre: "Rhinospray (Furoato de Mometasona) 0.05 x18ml", precio: 20400, categoria: "Más Vendidos", imagen: "/rhino.png", stock: 20, masVendido: true },
  { id: 86, nombre: "Alka-Seltzer x60 Tab (Bayer)", precio: 40900, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 87, nombre: "Electrolit x625ml", precio: 35000, categoria: "Más Vendidos", imagen: "/elec.png", stock: 20, masVendido: true },
  { id: 88, nombre: "Muvett S (Trimebutina 200mg + Simeticona 120mg) x21 Tbs", precio: 55500, categoria: "Más Vendidos", imagen: "/muvetts.png", stock: 20, masVendido: true },
  { id: 89, nombre: "Enterogermina 2000 Millones/5ml", precio: 3000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 90, nombre: "Manteca de Cacao Zica x12 Und Tipo Labial", precio: 40900, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 91, nombre: "Trivag Fem (Solución Vaginal) x120ml (Tridex)", precio: 6800, categoria: "Más Vendidos", imagen: "/triv.png", stock: 20, masVendido: true },
  { id: 92, nombre: "Vaselina Pura Kevs x470gr", precio: 12400, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 93, nombre: "Aspirina Efervescente x50 Tbs", precio: 13200, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 94, nombre: "Hydrastick Protector Labial (Totalmax)", precio: 6000, categoria: "Más Vendidos", imagen: "/hydrastick.png", stock: 0, masVendido: true },
  { id: 95, nombre: "K-Llosíl x20ml", precio: 9100, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 96, nombre: "A-Listant Prueba de Embarazo Cassette x1 Und", precio: 2400, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 97, nombre: "Sevedol Extra Fuerte x24 Tbs", precio: 44800, categoria: "Más Vendidos", imagen: "/seve24.png", stock: 20, masVendido: true },
  { id: 98, nombre: "Lumbal Forte x36 Tbs", precio: 6700, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 99, nombre: "Dolorsin Fem x36 Cap", precio: 55000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 100, nombre: "Vitaril Gel Tópico Castaño de Indias x60gr", precio: 22000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
  { id: 101, nombre: "Enalapril 20mg x250 Tbs", precio: 76700, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 102, nombre: "Solhidrex (Sales de Rehidratación Oral) x30 Sobres", precio: 58000, categoria: "Más Vendidos", imagen: "/solhidrex.png", stock: 20, masVendido: true },
{ id: 103, nombre: "Dolofen 500mg (Acetaminofén) x60 Caps", precio: 22000, categoria: "Más Vendidos", imagen: "/dolo.png", stock: 20, masVendido: true },
{ id: 104, nombre: "Vaselina de Limón en Lata x12 Und", precio: 3900, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 105, nombre: "Bispeptol (Diosmectita) x9 Sobres de 3gr", precio: 8200, categoria: "Más Vendidos", imagen: "/bisp.png", stock: 20, masVendido: true },
{ id: 106, nombre: "Sacrusyt (Salbutamol Inhalador) Aerosol 100mcg", precio: 18800, categoria: "Más Vendidos", imagen: "", stock: 0, masVendido: true }, // Próximo a llegar
{ id: 107, nombre: "Salbumed (Salbutamol Inhalador) Aerosol 100mcg", precio: 9300, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 108, nombre: "Procatec (Ciprofloxacina) 500mg x10 Tbs", precio: 5700, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 109, nombre: "Pedialyte 60 MEQ 500ml", precio: 4000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 110, nombre: "Xray Dol x12 Tbs", precio: 16000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 111, nombre: "Fosfocbrina x100 Caps", precio: 24500, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 112, nombre: "Tacna (Sultamicilina) 375mg x10 Tbs", precio: 9600, categoria: "Más Vendidos", imagen: "/tac.png", stock: 20, masVendido: true },
{ id: 113, nombre: "Tor Proctológica x10gr", precio: 0, categoria: "Más Vendidos", imagen: "", stock: 0, masVendido: true }, // Próximo a llegar
{ id: 114, nombre: "Iofi DHA+EPA x30 Caps", precio: 43000, categoria: "Más Vendidos", imagen: "", stock: 0, masVendido: true }, // Próximo a llegar
{ id: 115, nombre: "Buscapina Fem x24", precio: 32400, categoria: "Más Vendidos", imagen: "", stock: 0, masVendido: true }, // Próximo a llegar
{ id: 116, nombre: "Gastro Full Doble Acción x24 Sachets", precio: 36200, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 117, nombre: "Trimesulf-Forte (TMP/SMX) x10 Tbs", precio: 9200, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 118, nombre: "Erassin 100mg x2 Tbs", precio: 9000, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 119, nombre: "Zincovit Vitamina C + Zinc x100 Tbs", precio: 20800, categoria: "Más Vendidos", imagen: "/zincovit.png", stock: 20, masVendido: true },
{ id: 120, nombre: "Pranexxin (Nitazoxanida 500mg) x6 Tbs", precio: 11300, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 121, nombre: "Vyasil (Sildenafilo 50mg) x2 Tbs", precio: 2900, categoria: "Más Vendidos", imagen: "/vyasil.png", stock: 20, masVendido: true },
{ id: 122, nombre: "Cebión x10 Tbs Efervescente", precio: 14300, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 123, nombre: "Lanzor (Lansoprazol 30mg) x28 Caps", precio: 18500, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 124, nombre: "Neubalin 75mg x30 Caps", precio: 55000, categoria: "Más Vendidos", imagen: "/neu.png", stock: 0, masVendido: true }, // Próximo a llegar
{ id: 125, nombre: "Bisacodilo 5mg x100 Tbs (Humax)", precio: 14600, categoria: "Más Vendidos", imagen: "", stock: 20, masVendido: true },
{ id: 126, nombre: "Ibunflash Migran x30 Caps", precio: 55000, categoria: "Más Vendidos", imagen: "/ibuflashx30.png", stock: 20, masVendido: true },
{ id: 127, nombre: "Ibunflash Migran x8 Caps", precio: 18500, categoria: "Más Vendidos", imagen: "/ibuflashx8.png", stock: 20, masVendido: true },
{ id: 128, nombre: "Silimarina 150mg x20 Cap", precio: 15600, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 129, nombre: "Ibuprofeno 800mg x50 Tbs", precio: 9200, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 130, nombre: "Metronidazol 500mg x100 Tbs", precio: 15600, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 131, nombre: "Quetiapina 25mg x30 Comp", precio: 9000, categoria: "Genfar", imagen: "/que.png", stock: 0 }, // Próximo a llegar
{ id: 132, nombre: "Tamsulosina Clorhidrato 0.4mg x30 Cap", precio: 25000, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 133, nombre: "Cefalexina 500mg x10 Cap", precio: 5200, categoria: "Genfar", imagen: "/cefgf.png", stock: 20 },
{ id: 134, nombre: "Dexametasona 8mg/2ml x10 Amp", precio: 16500, categoria: "Genfar", imagen: "/dgf.png", stock: 20 },
{ id: 135, nombre: "Lansoprazol 30mg x14 Cap", precio: 7000, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 136, nombre: "Azitromicina 200mg/5ml x15ml (suspensión)", precio: 9500, categoria: "Genfar", imagen: "/azisgf.png", stock: 0 }, // Próximo a llegar
{ id: 137, nombre: "Amoxicilina 500mg x50 Caps", precio: 17800, categoria: "Genfar", imagen: "/amogf.png", stock: 20 },
{ id: 138, nombre: "Azitromicina 500mg x3 Tbs", precio: 6400, categoria: "Genfar", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 139, nombre: "Tramadol 50mg x10 Caps", precio: 8100, categoria: "Genfar", imagen: "/tgf.png", stock: 20 },
{ id: 140, nombre: "Fluconazol 200mg x4 Caps", precio: 6000, categoria: "Genfar", imagen: "/flgf.png", stock: 20 },
{ id: 141, nombre: "Doxiciclina 100mg x10 Tbs", precio: 5400, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 142, nombre: "Cefalexina Suspensión 250mg x60ml", precio: 6000, categoria: "Genfar", imagen: "/cesgf.png", stock: 20 },
{ id: 143, nombre: "Complejo B x250 Tbs", precio: 24500, categoria: "Genfar", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 144, nombre: "Clotrimazol Tópica 1% x40gr", precio: 5300, categoria: "Genfar", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 145, nombre: "Diclofenaco 75mg/3ml x10 Amp", precio: 11800, categoria: "Genfar", imagen: "/digf.png", stock: 0 }, // Próximo a llegar
{ id: 146, nombre: "Lincomicina 600mg/2ml x10 Amp", precio: 18500, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 147, nombre: "Genfar Kids (Ibuprofeno) Suspensión x120ml", precio: 6000, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 148, nombre: "Trimebutina 200mg x30 Tbs", precio: 13000, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 149, nombre: "Valsartán 160mg x14 Tbs", precio: 12900, categoria: "Genfar", imagen: "/val160.png", stock: 20 },
{ id: 150, nombre: "Ácido Acetilsalicílico 100mg x100 Tbs", precio: 15300, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 151, nombre: "Losartán + Hidroclotiazida 50mg/12.5mg x30 Tbs", precio: 23000, categoria: "Genfar", imagen: "/lhgf.png", stock: 0 }, // Próximo a llegar
{ id: 152, nombre: "Furosemida 40mg x100 Tbs", precio: 10500, categoria: "Genfar", imagen: "/fugf.png", stock: 20 },
{ id: 153, nombre: "Pregabalina 75mg x30 Cap", precio: 17400, categoria: "Genfar", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 154, nombre: "Diosmina Hesperidina 450mg/50mg x30 Tbs", precio: 16000, categoria: "Genfar", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 155, nombre: "Tinidazol 500mg x8 Tbs", precio: 3400, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 156, nombre: "Pamoato Pirantel x15ml", precio: 2400, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 157, nombre: "Triconjugada x40gr", precio: 16000, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 158, nombre: "Aciclovir Suspensión 100mg/5ml x90ml", precio: 17700, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 159, nombre: "Valsartán 80mg x14 Tbs", precio: 6200, categoria: "Genfar", imagen: "/val80.png", stock: 20 },
{ id: 160, nombre: "Ácido Fusídico Crema 2% x15gr", precio: 5900, categoria: "Genfar", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 161, nombre: "Betametasona 0.05% x40gr", precio: 11500, categoria: "Genfar", imagen: "/bgf005.png", stock: 20 },
{ id: 162, nombre: "Metoclopramida 10mg/2ml x5 Amp", precio: 17000, categoria: "Genfar", imagen: "/metogf.png", stock: 0 }, // Próximo a llegar
{ id: 163, nombre: "Aciclovir 200mg x25 Tbs", precio: 7400, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 164, nombre: "Betametasona 0.1 x40gr", precio: 14600, categoria: "Genfar", imagen: "/bgf01.png", stock: 67 }, // Próximo a llegar
{ id: 165, nombre: "Carvedilol 12.5mg x30 Tbs", precio: 9800, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 166, nombre: "Etoricoxib 120mg x7 Tbs", precio: 17000, categoria: "Genfar", imagen: "/eto.png", stock: 20 },
{ id: 167, nombre: "Naproxeno 250mg x10 Caps", precio: 2200, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 168, nombre: "Tinidazol 1g x4 Tbs", precio: 2100, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 169, nombre: "Amitriptilina 25mg x30 Tbs", precio: 5400, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 170, nombre: "Gripnoche x24 Sobres", precio: 25000, categoria: "Genfar", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 171, nombre: "Hidroclorotiazida 25mg x30 Tbs", precio: 2600, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 172, nombre: "Hidroxicina 25mg x20 Tbs", precio: 2600, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 173, nombre: "Ketoprofeno Gel al 2.5% x40gr", precio: 16300, categoria: "Genfar", imagen: "/kegf.png", stock: 20 },
{ id: 174, nombre: "N-Acetilcisteína 600mg x10 Sobres", precio: 12500, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 175, nombre: "Montelukast 10mg x30 Tbs", precio: 30500, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 176, nombre: "Montelukast 5mg x30 Tbs", precio: 21300, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 177, nombre: "Montelukast 4mg x30 Tbs", precio: 16300, categoria: "Genfar", imagen: "/.png", stock: 20 },
{ id: 178, nombre: "Colageno 500mg x30 Caps", precio: 12900, categoria: "Naturales", imagen: "/.png", stock: 20 },
{ id: 179, nombre: "Omega 3 x30 Caps Naturalmente", precio: 13700, categoria: "Naturales", imagen: "/.png", stock: 20 },
{ id: 180, nombre: "Biotina 900mcg x30 Caps", precio: 14100, categoria: "Naturales", imagen: "/.png", stock: 20 },
{ id: 181, nombre: "Vit Max (Complejo B + Zinc) x30 Caps", precio: 13300, categoria: "Naturales", imagen: "/.png", stock: 20 },
{ id: 182, nombre: "Omega 3 x30 Caps Totalmax", precio: 11500, categoria: "Naturales", imagen: "/.png", stock: 20 },
{ id: 183, nombre: "Omega 3,6,9 x30 Caps", precio: 13700, categoria: "Naturales", imagen: "/.png", stock: 20 },
{ id: 184, nombre: "Vitamina E + Selenio (1000 UI + 35mcg) x30 Caps", precio: 16100, categoria: "Naturales", imagen: "/.png", stock: 20 },
{ id: 185, nombre: "Veramiel Pastillas x24 Sobres x4", precio: 25300, categoria: "Naturales", imagen: "/.png", stock: 20 },
{ id: 186, nombre: "Lyptus Miel x24 Sobres x5 Pastillas", precio: 25300, categoria: "Naturales", imagen: "/lyptus.png", stock: 20 },
{ id: 187, nombre: "Citrato de Magnesio x100 Tbs Masticables", precio: 27000, categoria: "Naturales", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 188, nombre: "Cloruro de Magnesio x60 Caps", precio: 16300, categoria: "Naturales", imagen: "/trigo.png", stock: 20 },
{ id: 189, nombre: "Colageno + Biotina x30 Caps (Totalmax)", precio: 14000, categoria: "Naturales", imagen: "/cb.png", stock: 20 },
{ id: 190, nombre: "Complejo B + Zinc x30 Caps (Totalmax)", precio: 14000, categoria: "Naturales", imagen: "/.png", stock: 20 },
{ id: 191, nombre: "Colageno x60 Caps (Alnature)", precio: 14500, categoria: "Naturales", imagen: "/.png", stock: 20 },
{ id: 192, nombre: "Firb-Max x300gr", precio: 18600, categoria: "Naturales", imagen: "/.png", stock: 20 },
{ id: 193, nombre: "Broquisan Tabletas x20 Sobres", precio: 32000, categoria: "Naturales", imagen: "/bpast.png", stock: 20 },
{ id: 194, nombre: "Bronquisan Jalea (Adultos) x240ml", precio: 10000, categoria: "Naturales", imagen: "/badu.png", stock: 20 },
{ id: 195, nombre: "Bronquisan Jalea (Niños) x240ml", precio: 10000, categoria: "Naturales", imagen: "/bkids.png", stock: 20 },
// ===== RECIPE =====
{ id: 196, nombre: "Cefalexina 500 mg x100 Cap", precio: 54000, categoria: "Recipe", imagen: "/.png", stock: 20 },
{ id: 197, nombre: "Trazodona Clorhidrato 50 mg x50 Tbs", precio: 16500, categoria: "Recipe", imagen: "/.png", stock: 20 },
{ id: 198, nombre: "Sildenafil 50 mg x2 Tbs", precio: 1000, categoria: "Recipe", imagen: "/.png", stock: 20 },
{ id: 199, nombre: "Amitriptilina 25 mg x30 Tbs", precio: 3500, categoria: "Recipe", imagen: "/.png", stock: 0 },          // Próximo a llegar
{ id: 200, nombre: "Metoclopramida 10 mg x36 Tbs", precio: 3900, categoria: "Recipe", imagen: "/.png", stock: 0 },       // Próximo a llegar
{ id: 201, nombre: "Bisacodilo 5 mg x100 Tbs", precio: 18000, categoria: "Recipe", imagen: "/.png", stock: 20 },
{ id: 202, nombre: "Cetirizina 10 mg x10 Tbs", precio: 1200, categoria: "Recipe", imagen: "/.png", stock: 0 },           // Próximo a llegar (banner)
{ id: 203, nombre: "Zopiclona 7.5 mg x30 Tbs", precio: 13900, categoria: "Recipe", imagen: "/.png", stock: 20 },
{ id: 204, nombre: "Nitrofurantoina 100 mg x40 Tbs", precio: 14200, categoria: "Recipe", imagen: "/.png", stock: 20 },

// ===== ANTIGRIPALES =====
{ id: 205, nombre: "Pax Noche x24 Sobres", precio: 49500, categoria: "Antigripales", imagen: "/.png", stock: 20 },
{ id: 206, nombre: "Pax Día x24 Sobres", precio: 49500, categoria: "Antigripales", imagen: "/.png", stock: 20 },
{ id: 207, nombre: "Respirin Gripa x100 Caps", precio: 25900, categoria: "Antigripales", imagen: "/.png", stock: 20 },
{ id: 208, nombre: "Congestex x60 Cap", precio: 44000, categoria: "Antigripales", imagen: "/.png", stock: 20 },
{ id: 209, nombre: "Noxpirin Junior x24 Sobres", precio: 35000, categoria: "Antigripales", imagen: "/.png", stock: 0 },    // Próximo a llegar
{ id: 210, nombre: "Mieltertos Día x24 Sobres", precio: 43000, categoria: "Antigripales", imagen: "/.png", stock: 20 },
{ id: 211, nombre: "Resfrigrip x100 Cap", precio: 40500, categoria: "Antigripales", imagen: "/.png", stock: 0 },          // Próximo a llegar
{ id: 212, nombre: "Resfrigrip Plus x24 Sobres", precio: 31500, categoria: "Antigripales", imagen: "/.png", stock: 0 },   // Próximo a llegar
{ id: 213, nombre: "Mieltertos Noche x24 Sobres", precio: 43000, categoria: "Antigripales", imagen: "/.png", stock: 20 },

{ id: 214, nombre: "Ashar Gripa x100 Cap", precio: 54600, categoria: "Antigripales", imagen: "/.png", stock: 20 },
{ id: 215, nombre: "Noxpirin Noche x24 Sobres", precio: 46000, categoria: "Antigripales", imagen: "/.png", stock: 20 },
{ id: 216, nombre: "Noxpirin Día x24 Sobres", precio: 46000, categoria: "Antigripales", imagen: "/.png", stock: 20 },
{ id: 217, nombre: "Zetygrip 4 x100 Caps", precio: 37900, categoria: "Antigripales", imagen: "/.png", stock: 20 },
{ id: 218, nombre: "Noxpirin Plus x100 Caps", precio: 95600, categoria: "Antigripales", imagen: "/.png", stock: 20 },
{ id: 219, nombre: "Noxpirin Noche x50 Sobres", precio: 82500, categoria: "Antigripales", imagen: "/.png", stock: 20 },
{ id: 220, nombre: "Dolicox Grip Noche x24 Sobres", precio: 28800, categoria: "Antigripales", imagen: "/.png", stock: 20 },
// ===== MK =====
{ id: 221, nombre: "Com Bonfiest Plus (x20 Bonfiest x6 Duraflex Muscular x6 Noraver Noche)", precio: 75700, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 222, nombre: "Super Combo Lua x16 Lua x6 Gastrofast x5 Kola Granulada", precio: 53000, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 223, nombre: "Levotiroxina 75mg x30 Tbs", precio: 17900, categoria: "MK", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 224, nombre: "Noraver Garganta x12 (Cereza, Menta y Naranja Miel)", precio: 19300, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 225, nombre: "Noraver Garganta x24 (Cereza, Menta y Naranja Miel)", precio: 38400, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 226, nombre: "Ibuprofeno 800mg x30 Cap Líquidas", precio: 28200, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 227, nombre: "Verapamilo 120mg x30 Tbs", precio: 6500, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 228, nombre: "Noraver Fast Total (Gripa y Tos) x12 Cap", precio: 24600, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 229, nombre: "Levotiroxina 25mg x30 Tbs", precio: 16500, categoria: "MK", imagen: "/.png", stock: 20 },

{ id: 230, nombre: "Fenitoina Sódica 100mg x50 Caps", precio: 19500, categoria: "MK", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 231, nombre: "ASA 100mg (Ácido Acetilsalicílico) x100 Tbs", precio: 24400, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 232, nombre: "Vitamina C x100 Tbs", precio: 44700, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 233, nombre: "Norfloxacina 400mg x14 Tbs", precio: 7800, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 234, nombre: "Enalapril 20mg x30 Tbs", precio: 7800, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 235, nombre: "Levotiroxina 100mcg x30 Tbs", precio: 18800, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 236, nombre: "Crema N°4 Original x20gr", precio: 8500, categoria: "MK", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 237, nombre: "Hidróxido de Magnesio 120ml", precio: 7300, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 238, nombre: "Diclofenaco 100mg x20 Caps", precio: 14800, categoria: "MK", imagen: "/.png", stock: 20 },

{ id: 239, nombre: "Alivrub x12 Latas", precio: 43400, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 240, nombre: "Yodora Clásico x32gr x2", precio: 16400, categoria: "MK", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 241, nombre: "Rifamicina Spray 1% x20ml", precio: 30500, categoria: "MK", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 242, nombre: "Noraver Noche x6 Sobres 15gr", precio: 14700, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 243, nombre: "Noraver Día x6 Sobres 15gr", precio: 14800, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 244, nombre: "Nitrofurantoina 100mg x40 Cap", precio: 26000, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 245, nombre: "Metronidazol x10 Óvulos Mk", precio: 12000, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 246, nombre: "Gastrofast x12 Sachets", precio: 30700, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 247, nombre: "Crema N°4 Medica x30gr", precio: 13800, categoria: "MK", imagen: "/.png", stock: 0 }, // Próximo a llegar

{ id: 248, nombre: "Sildenafil 50mg x2 Tbs", precio: 6500, categoria: "MK", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 249, nombre: "Levotiroxina Sódica 50mcg x30 Tbs", precio: 16700, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 250, nombre: "Albendazol 200mg x2 Tbs", precio: 3000, categoria: "MK", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 251, nombre: "Piroxicam 20mg x10 Caps", precio: 4500, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 252, nombre: "Vick Vaporub x50gr", precio: 15000, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 253, nombre: "Carvedilol 6.25mg x30 Tbs", precio: 9500, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 254, nombre: "Levotiroxina Sódica 125mcg x30 Tbs", precio: 28800, categoria: "MK", imagen: "/.png", stock: 20 },
{ id: 255, nombre: "Levotiroxina Sódica 150mcg x30 Tbs", precio: 32000, categoria: "MK", imagen: "/.png", stock: 20 },

// ===== BIOQUIFAR =====
{ id: 221, nombre: "Fungisterol (Ketoconazol) 200mg x10 Tbs", precio: 22300, categoria: "Bioquifar", imagen: "/.png", stock: 0 },
{ id: 222, nombre: "Fungisterol Shampoo de 100ml", precio: 13400, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 223, nombre: "Fungisterol Shampoo de 200ml", precio: 5300, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 224, nombre: "Cortisolona Hidrocortisona Loción x30g", precio: 3200, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 225, nombre: "Verelis (Tadalafilo) 20mg x4 Tbs", precio: 9000, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 226, nombre: "Zifluvis 600mg x30 Sobres de 3gr", precio: 34700, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 227, nombre: "Lamdotil x16 Tbs", precio: 9500, categoria: "Bioquifar", imagen: "/.png", stock: 0 },
{ id: 228, nombre: "Zifluvis 200mg x30 Sobres de 3gr", precio: 20400, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 229, nombre: "Warfar (Warfarina Sódica) 5mg x30 Tbs", precio: 10300, categoria: "Bioquifar", imagen: "/.png", stock: 0 },
{ id: 230, nombre: "Bupiridol (Acetaminofén 325mg + Codeína 30mg) x30 Tbs", precio: 12000, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 231, nombre: "Pirel (Pamoato de Pirantel) Suspensión x30ml", precio: 3500, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 232, nombre: "Sertranquil (Sertralina 50mg) x10 Tbs", precio: 6600, categoria: "Bioquifar", imagen: "/.png", stock: 0 },
{ id: 233, nombre: "Sertranquil (Sertralina 100mg) x10 Tbs", precio: 10400, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 234, nombre: "Cindimizol (Fluconazol) 200mg x5 Caps", precio: 7700, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 235, nombre: "Nitoxipar (Nitazoxanida) 500mg x6 Tbs", precio: 10600, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 236, nombre: "Aircys (Montelukast 4mg) x10 Tbs", precio: 8500, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 237, nombre: "Aircys (Montelukast 10mg) x10 Tbs", precio: 8000, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 238, nombre: "Seamib (Secnidazol 1g) x2 Tbs", precio: 3300, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 239, nombre: "Seamib (Secnidazol 500mg) x4 Tbs", precio: 2600, categoria: "Bioquifar", imagen: "/.png", stock: 0 },
{ id: 240, nombre: "Zivical (Carbonato de Calcio) 600mg x30 Tbs", precio: 10000, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 241, nombre: "Zivical-D (Vitamina D3 200UI + Calcio 600mg) x20 Tbs", precio: 8300, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 242, nombre: "Salydrat (Sales para Rehidratación Oral) x25 Sobres", precio: 44700, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 243, nombre: "Mio Relax (Tizanidina) 2mg x20 Tbs", precio: 19400, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 244, nombre: "Mio Relax (Tizanidina) 4mg x10 Tbs", precio: 17000, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 245, nombre: "Asmiket (Ketotifeno 1mg) x30 Tbs", precio: 5400, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 246, nombre: "Lozarten (Losartán) 100mg x30 Tbs", precio: 9700, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 247, nombre: "Dosaldin x20 Tbs", precio: 15000, categoria: "Bioquifar", imagen: "/.png", stock: 0 },
{ id: 248, nombre: "Vigradina (Sildenafilo 50mg) x4 Tbs", precio: 4300, categoria: "Bioquifar", imagen: "/.png", stock: 0 },
{ id: 249, nombre: "Vigradina (Sildenafilo 50mg) x2 Tbs", precio: 2500, categoria: "Bioquifar", imagen: "/.png", stock: 0 },
{ id: 250, nombre: "Espamydol (Ibuprofeno 500mg + Metocarbamol 200mg) x20 Tbs", precio: 18800, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 251, nombre: "ActiViral (Aiclovir al 5%) x15gr", precio: 4700, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 252, nombre: "Ainedix (Aceclofenaco) 100mg x10 Tbs", precio: 7300, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 253, nombre: "Finapar (Albendazol Suspensión) x20ml", precio: 3700, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 254, nombre: "Diglufor (Metformina) 850mg x30 Tab", precio: 9800, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 255, nombre: "Metroxazide (Metronidazol + Nifuroxazide) x18 Tbs", precio: 13400, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 256, nombre: "Pirel (Pamoato de Pirantel) 250mg x6 Tbs", precio: 7200, categoria: "Bioquifar", imagen: "/.png", stock: 0 },
{ id: 257, nombre: "Dizmopraz (Lansoprazol) 30mg x28 Caps", precio: 14600, categoria: "Bioquifar", imagen: "/.png", stock: 0 },
{ id: 258, nombre: "Reflexal (Metocarbamol) 750mg x20 Tbs", precio: 7500, categoria: "Bioquifar", imagen: "/.png", stock: 0 },
{ id: 259, nombre: "ActiViral (Aciclovir 800mg) x10 Tbs", precio: 13400, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 260, nombre: "Vaio (Betahistina) 8mg x30 Tbs", precio: 21800, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 261, nombre: "Verelis (Tadalafilo 5mg) x4 Tbs", precio: 6600, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 262, nombre: "Mebicitrof (Metronidazol) Suspensión x120ml", precio: 7400, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 263, nombre: "Fungisterol (Ketoconazol) 2% x30gr", precio: 6000, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 264, nombre: "Nitoxipar Suspensión (Nitazoxanida 100mg/5ml) x30ml", precio: 14700, categoria: "Bioquifar", imagen: "/.png", stock: 20 },
{ id: 265, nombre: "Eucodina (Dihidrocodeina) x120ml", precio: 8900, categoria: "Bioquifar", imagen: "/.png", stock: 0 },


// ===== LAPROFF =====
{ id: 266, nombre: "Loratadina 10mg x400 Tbs", precio: 35200, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 267, nombre: "Losartán Potásico 50mg x300 Tbs", precio: 24400, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 268, nombre: "Amoxicilina 500mg x300 Caps", precio: 83800, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 269, nombre: "Nitrofurantoína 100mg x300 Caps", precio: 103000, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 270, nombre: "Metocarbamol 750mg x300 Tbs", precio: 92200, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 271, nombre: "Ibuprofeno 400mg x300 Tbs", precio: 47900, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 272, nombre: "Ibuprofeno 800mg x300 Tbs", precio: 53100, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 273, nombre: "Trimebutina 200mg x300 Tbs", precio: 91500, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 274, nombre: "Carbamazepina 200mg x300 Tbs", precio: 125000, categoria: "Laproff", imagen: "/.png", stock: 0 }, // Próximo a llegar

{ id: 275, nombre: "Naproxeno 500mg x300 Tbs", precio: 83500, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 276, nombre: "Naproxeno 250mg x300 Tbs", precio: 56300, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 277, nombre: "Acetaminofén 500mg x300 Tbs", precio: 15500, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 278, nombre: "Sulfato Ferroso 300mg x300 Tbs", precio: 26300, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 279, nombre: "Sildenafilo 50mg x50 Tbs", precio: 19300, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 280, nombre: "Ácido Fólico 1mg x400 Tbs", precio: 26500, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 281, nombre: "Amitriptilina 25mg x400 Tbs", precio: 43400, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 282, nombre: "Albendazol 200mg x50 Tbs", precio: 18800, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 283, nombre: "Cetirizina 10mg x400 Tbs", precio: 35600, categoria: "Laproff", imagen: "/.png", stock: 20 },

{ id: 284, nombre: "Diclofenaco 50mg x400 Tbs", precio: 33200, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 285, nombre: "Acetaminofén Gotas x30ml", precio: 4000, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 286, nombre: "Betametasona 0.1% x40gr", precio: 4900, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 287, nombre: "Hidroclorotiazida 25mg x400 Tbs", precio: 25200, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 288, nombre: "Aciclovir 800mg x50 Tbs", precio: 42500, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 289, nombre: "Prednisolona 5mg x100 Tbs", precio: 8400, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 290, nombre: "Loperamida 2mg x240 Tbs", precio: 59500, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 291, nombre: "Atorvastatina 20mg x50 Tbs", precio: 6600, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 292, nombre: "Minoxidil 5% x60ml", precio: 16400, categoria: "Laproff", imagen: "/.png", stock: 20 },

{ id: 293, nombre: "Atorvastatina 40mg x30 Tbs", precio: 17000, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 294, nombre: "Amlodipino 5mg x10 Tbs", precio: 1400, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 295, nombre: "Aciclovir 800mg x10 Tbs", precio: 8200, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 296, nombre: "Levofloxacina 500mg x7 Tbs", precio: 13800, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 297, nombre: "Loperamida 2mg x6 Tbs", precio: 2300, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 298, nombre: "Carbamazepina 200mg x30 Tbs", precio: 12700, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 299, nombre: "Hioscina N-Bromuro 10mg x50 Tbs", precio: 14300, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 300, nombre: "Colchicina 0.5mg x40 Tbs", precio: 4700, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 301, nombre: "Espironolactona 25mg x20 Tbs", precio: 5100, categoria: "Laproff", imagen: "/.png", stock: 20 },

{ id: 302, nombre: "Betahistina Diclorhidrato 8mg x20 Tbs", precio: 20300, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 303, nombre: "Clotrimazol Tópica 1% x40gr", precio: 3700, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 304, nombre: "Clotrimazol 1% Solución Tópica x30ml", precio: 3500, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 305, nombre: "Tadalafilo 20mg x4 Tbs", precio: 7000, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 306, nombre: "Metoprolol 50mg x30 Tbs", precio: 6000, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 307, nombre: "Orocal + D Calcio 600mg + Vit D3 200UI x30 Tbs", precio: 11900, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 308, nombre: "Betametasona 0.05% x40gr", precio: 5000, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 309, nombre: "Clobetasol Propionato 0.05% x40gr", precio: 6900, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 310, nombre: "Aciclovir Ungüento 5% x15gr", precio: 5400, categoria: "Laproff", imagen: "/.png", stock: 20 },

{ id: 311, nombre: "Furosemida 40mg x300 Tbs", precio: 28200, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 312, nombre: "Mometasona Furoato 0.1% x15gr", precio: 14400, categoria: "Laproff", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 313, nombre: "Cefalexina 500mg x100 Caps", precio: 59600, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 314, nombre: "Ácido Fusídico 2% x15gr", precio: 5900, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 315, nombre: "Desloratadina 5mg x10 Tbs", precio: 5100, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 316, nombre: "Acetaminofén 325mg + Fosfato de Codeína 30mg x100 Tbs", precio: 52000, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 317, nombre: "Orocal 600mg x30 Tbs", precio: 12800, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 318, nombre: "Enerzinc x90ml", precio: 6000, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 319, nombre: "Clotrimazol Vaginal 1% x40gr", precio: 5000, categoria: "Laproff", imagen: "/.png", stock: 20 },

{ id: 320, nombre: "Desloratadina 60ml", precio: 5000, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 321, nombre: "Guayaprof 120ml", precio: 3600, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 322, nombre: "Ambroxol Pediátrico x120ml", precio: 5600, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 323, nombre: "Ambroxol Adulto x120ml", precio: 5800, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 324, nombre: "Ketotifeno 100ml", precio: 3400, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 325, nombre: "Salbutamol 120ml", precio: 3400, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 326, nombre: "Loratadina 100ml", precio: 4400, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 327, nombre: "Sulfato Ferroso 120ml", precio: 4100, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 328, nombre: "Difenhidramina 120ml", precio: 3900, categoria: "Laproff", imagen: "/.png", stock: 20 },

{ id: 329, nombre: "Esomeprazol 40mg x100 Tbs", precio: 81800, categoria: "Laproff", imagen: "/.png", stock: 20 },
{ id: 330, nombre: "Esomeprazol 20mg x100 Tbs", precio: 51800, categoria: "Laproff", imagen: "/.png", stock: 0 }, // Próximo a llegar
// ===== ECAR =====
{ id: 331, nombre: "Metronidazol 500mg x100 Tbs", precio: 11500, categoria: "Ecar", imagen: "/.png", stock: 0 },
{ id: 332, nombre: "Diclofenaco 50mg x250 Tbs", precio: 15700, categoria: "Ecar", imagen: "/.png", stock: 20 },
{ id: 333, nombre: "Complejo B x250 Tbs", precio: 18800, categoria: "Ecar", imagen: "/.png", stock: 20 },
{ id: 334, nombre: "Ceterizina 10mg x400 Tbs", precio: 34300, categoria: "Ecar", imagen: "/.png", stock: 20 },
{ id: 335, nombre: "Ácido Fólico 1mg x300 Tbs", precio: 11000, categoria: "Ecar", imagen: "/.png", stock: 0 },
{ id: 336, nombre: "Tiamina 300mg x250 Tbs", precio: 31300, categoria: "Ecar", imagen: "/.png", stock: 20 },
{ id: 337, nombre: "Dipirona 500mg x50 Tbs", precio: 14000, categoria: "Ecar", imagen: "/.png", stock: 20 },
{ id: 338, nombre: "Losartán + Hidroclotiazida 50mg + 12.5mg x30 Tbs", precio: 17000, categoria: "Ecar", imagen: "/.png", stock: 20 },
{ id: 339, nombre: "Losartán 50mg x300 Tbs", precio: 22000, categoria: "Ecar", imagen: "/.png", stock: 20 },
{ id: 340, nombre: "Ácido Fólico 1mg x60 Tbs", precio: 8400, categoria: "Ecar", imagen: "/.png", stock: 0 },
{ id: 341, nombre: "Ceterizina Jarabe x60ml", precio: 5300, categoria: "Ecar", imagen: "/.png", stock: 0 },
{ id: 342, nombre: "Loperamida 2mg x240 Tbs", precio: 60000, categoria: "Ecar", imagen: "/.png", stock: 0 },
{ id: 343, nombre: "Complejo B Jarabe x120ml", precio: 6900, categoria: "Ecar", imagen: "/.png", stock: 0 },
{ id: 344, nombre: "Trimetoprim Sulfa 40mg + 200mg/5ml x120ml", precio: 8200, categoria: "Ecar", imagen: "/.png", stock: 0 },
{ id: 345, nombre: "Trimetoprim Sulfa 40mg + 200mg/5ml x60ml", precio: 4400, categoria: "Ecar", imagen: "/.png", stock: 0 },
{ id: 346, nombre: "Trimetoprim Sulfa 80mg + 400mg/5ml x120ml", precio: 8600, categoria: "Ecar", imagen: "/.png", stock: 0 },
{ id: 347, nombre: "Trimetoprim Sulfa 80mg + 400mg/5ml x60ml", precio: 6800, categoria: "Ecar", imagen: "/.png", stock: 0 },
{ id: 348, nombre: "Farmalax (Bisacodilo 5mg) x100 Grageas", precio: 16800, categoria: "Ecar", imagen: "/.png", stock: 0 },
// ===== COLMED =====
{ id: 349, nombre: "Vitamina D3 2000 U.I x100 Caps", precio: 36300, categoria: "Colmed", imagen: "/.png", stock: 20 },
{ id: 350, nombre: "Clotrimazol 100mg x10 Óvulos", precio: 10500, categoria: "Colmed", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 351, nombre: "Esomeprazol 20mg x30 Tbs", precio: 21700, categoria: "Colmed", imagen: "/.png", stock: 20 },
{ id: 352, nombre: "Esomeprazol 40mg x30 Tbs", precio: 22000, categoria: "Colmed", imagen: "/.png", stock: 20 },
{ id: 353, nombre: "Fem-Duo x10 Óvulos", precio: 24000, categoria: "Colmed", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 354, nombre: "Polivitaminas y Minerales x100 Caps", precio: 32000, categoria: "Colmed", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 355, nombre: "Complejo B 2ml x3 Amp", precio: 9500, categoria: "Colmed", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 356, nombre: "Levotiroxina Sódica 50mcg x150 Tbs", precio: 28000, categoria: "Colmed", imagen: "/.png", stock: 20 },
{ id: 357, nombre: "Diclofenaco 75mg/3ml x10 Amp", precio: 10100, categoria: "Colmed", imagen: "/.png", stock: 20 },
{ id: 358, nombre: "Levotiroxina Sódica 50mcg x30 Tbs", precio: 8700, categoria: "Colmed", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 359, nombre: "Metronidazol 500mg x10 Óvulos", precio: 9000, categoria: "Colmed", imagen: "/.png", stock: 20 },
{ id: 360, nombre: "Metronist x10 Óvulos", precio: 16500, categoria: "Colmed", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 361, nombre: "Gentamicina Gotas 0.3% x6ml", precio: 5700, categoria: "Colmed", imagen: "/.png", stock: 20 },
{ id: 362, nombre: "Betametasona Dipropionato + Betametasona Fosfato Disódico 1ml x1 Amp", precio: 9500, categoria: "Colmed", imagen: "/.png", stock: 20 },
{ id: 363, nombre: "Levotiroxina Sódica 100mcg x150 Tbs", precio: 38400, categoria: "Colmed", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 364, nombre: "Trimebutina + Simeticona 200mg/120mg x30 Tbs", precio: 56200, categoria: "Colmed", imagen: "/.png", stock: 20 },
{ id: 365, nombre: "Ampicilina 500mg x100 Cap", precio: 26700, categoria: "Colmed", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 366, nombre: "Vitamina E 400 U.I x100 Cap", precio: 26700, categoria: "Colmed", imagen: "/.png", stock: 0 }, // Próximo a llegar
// ===== COASPHARMA =====
{ id: 367, nombre: "Glibenclamida 5mg x30 Tbs", precio: 1700, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 368, nombre: "Secnidazol 500mg", precio: 3400, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 369, nombre: "Amlodipino 5mg x10 Tbs", precio: 1500, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 370, nombre: "Metoclopramida 10mg x30 Tbs", precio: 2900, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 371, nombre: "Propanolol 40mg x20 Tbs", precio: 1400, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 372, nombre: "Clorfeniramina Maleato 4mg x20 Tbs", precio: 2300, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 373, nombre: "Prednisolona 5mg x30 Tbs", precio: 2900, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 374, nombre: "Piroxicam 20mg x10 Cap", precio: 3300, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 375, nombre: "Clotrimazol Tópica al 1% x40gr", precio: 3400, categoria: "CoasPharma", imagen: "/.png", stock: 20 },

{ id: 376, nombre: "Amoxicilina 500mg x100 Caps", precio: 28900, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 377, nombre: "Claritromicina 500mg x10 Tbs", precio: 17800, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 378, nombre: "Gemfibrozilo 600mg x20 Tbs", precio: 9200, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 379, nombre: "Fluoxetina 20mg x14 Tbs", precio: 2200, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 380, nombre: "Flunarizina 10mg x20 Tbs", precio: 2800, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 381, nombre: "Clotrimazol Vaginal al 1% x40gr", precio: 6100, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 382, nombre: "Furosemida 40mg x100 Tbs", precio: 9900, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 383, nombre: "Iseptic Garganta Menta y Frutos Rojos x12 Tbs", precio: 9600, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 384, nombre: "Enalapril 5mg x50 Tbs", precio: 5800, categoria: "CoasPharma", imagen: "/.png", stock: 20 },

{ id: 385, nombre: "Desloratadina Niños x60ml", precio: 5200, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 386, nombre: "Naproxeno 250mg x10 Tbs", precio: 1700, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 387, nombre: "Ibuprofeno + Metocarbamol x24 Tbs", precio: 17300, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 388, nombre: "Ácido Fusídico 2% x15gr", precio: 6900, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 389, nombre: "Naproxeno Sódico 125mg/5ml x80ml", precio: 8500, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 390, nombre: "Dermaskin x20gr", precio: 10000, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 391, nombre: "Acetaminofén x300 Tbs", precio: 15300, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 392, nombre: "Albendazol 200mg x2", precio: 1100, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 393, nombre: "Dermaskin x40gr", precio: 17400, categoria: "CoasPharma", imagen: "/.png", stock: 20 },

{ id: 394, nombre: "Ketoconazol 200mg x10 Tbs", precio: 3200, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 395, nombre: "Fluconazol 200mg x5 Caps", precio: 5700, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 396, nombre: "Colchicina 0.5mg x40 Tbs", precio: 3300, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 397, nombre: "Ibuprofeno 800mg x60 Tbs", precio: 11700, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 398, nombre: "Ampicilina 500mg x50 Cap", precio: 18600, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 399, nombre: "Ampicilina 1g x100 Tbs", precio: 81500, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 400, nombre: "Amoxicilina Suspensión x100ml", precio: 5400, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 401, nombre: "Clindamicina 300mg x24 Cap", precio: 25000, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 402, nombre: "Dicloxacilina 500mg x50 Tbs", precio: 24500, categoria: "CoasPharma", imagen: "/.png", stock: 20 },

{ id: 403, nombre: "Amoxicilina Suspensión x60ml", precio: 4000, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 404, nombre: "Dicloxacilina 250mg/5ml x80ml", precio: 7400, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 405, nombre: "Nistatina Suspensión x60ml", precio: 7300, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 406, nombre: "Benzoato de Bencilo x120ml", precio: 6000, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 407, nombre: "Metronidazol Suspensión x120ml", precio: 6600, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 408, nombre: "Hidróxido de Aluminio/Magnesio/Simeticona x150ml", precio: 5700, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 409, nombre: "Hidróxido de Aluminio/Magnesio/Simeticona x360ml", precio: 7600, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 410, nombre: "Nitazoxanida 500mg x6 Tbs", precio: 9500, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 411, nombre: "Aciclovir Ungüento 5% x15gr", precio: 5000, categoria: "CoasPharma", imagen: "/.png", stock: 20 },

{ id: 412, nombre: "Vitamina C 500mg x100 Tbs", precio: 19700, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 413, nombre: "Ibuprofeno Suspensión x120ml", precio: 4400, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 414, nombre: "Lovastatina 20mg x10 Tbs", precio: 1900, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 415, nombre: "Azitromicina Susp 200mg/5ml x15ml", precio: 9200, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 416, nombre: "Hidróxido Magnesia 8.5% x120ml", precio: 4500, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 417, nombre: "Curatos (Bromhexina + Guayacolato) x125ml", precio: 14000, categoria: "CoasPharma", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 418, nombre: "Metoclopramida Gotas 4mg/ml x30ml", precio: 4200, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 419, nombre: "Doxiciclina 100mg x10 Cap", precio: 3900, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 420, nombre: "Aciclovir 200mg x25 Tbs", precio: 8300, categoria: "CoasPharma", imagen: "/.png", stock: 20 },

{ id: 421, nombre: "Hidroxicina Clorhidrato 25mg x20 Tbs", precio: 3200, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 422, nombre: "Prednisolona 5mg x300 Tbs", precio: 24000, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 423, nombre: "Desloratadina 5mg x10 Tbs", precio: 5500, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 424, nombre: "Ibuprofeno 400mg x60 Tbs", precio: 8000, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 425, nombre: "Enalapril 20mg x20 Tbs", precio: 2200, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 426, nombre: "Secnidazol 1g x2 Tbs", precio: 4200, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
{ id: 427, nombre: "Piroxicam Gel 0.5% x30gr", precio: 6600, categoria: "CoasPharma", imagen: "/.png", stock: 20 },
// ===== AG =====
{ id: 428, nombre: "Diclofenaco Retard 100mg x20 Cap", precio: 7000, categoria: "AG", imagen: "/.png", stock: 20 },
{ id: 429, nombre: "Ibuprofeno 800mg x50 Cap", precio: 7600, categoria: "AG", imagen: "/.png", stock: 20 },
{ id: 430, nombre: "Dicloxacilina 500mg x50 Cap", precio: 22500, categoria: "AG", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 431, nombre: "Amoxicilina 500mg x50 Cap", precio: 13800, categoria: "AG", imagen: "/.png", stock: 20 },
{ id: 432, nombre: "Azitromicina 500mg x3 Tbs", precio: 3000, categoria: "AG", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 433, nombre: "Acetaminofén 500mg x100 Tbs", precio: 5300, categoria: "AG", imagen: "/.png", stock: 20 },
{ id: 434, nombre: "Losartán 50mg x30 Tbs", precio: 3600, categoria: "AG", imagen: "/.png", stock: 20 },
{ id: 435, nombre: "Fluconazol 200mg x5 Cap", precio: 5100, categoria: "AG", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 436, nombre: "Naproxeno 250mg x10 Tbs", precio: 2400, categoria: "AG", imagen: "/.png", stock: 20 },
{ id: 437, nombre: "Naproxeno 500mg x10 Tbs", precio: 3300, categoria: "AG", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 438, nombre: "Ciprofloxacino 500mg x10 Tbs", precio: 3700, categoria: "AG", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 439, nombre: "Clotrimazol Tópica al 1% x40gr", precio: 3900, categoria: "AG", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 440, nombre: "Sildenafil 50mg (Masticable) x2", precio: 2600, categoria: "AG", imagen: "/.png", stock: 20 },
{ id: 441, nombre: "Betametasona al 0.1% 20gr", precio: 5600, categoria: "AG", imagen: "/.png", stock: 20 },
{ id: 442, nombre: "Betametasona 0.05% 20gr", precio: 5200, categoria: "AG", imagen: "/.png", stock: 20 },
{ id: 443, nombre: "Cefalexina Suspensión x60ml", precio: 6000, categoria: "AG", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 444, nombre: "Amoxicilina Suspensión x100ml", precio: 6200, categoria: "AG", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 445, nombre: "Hidrocortisona 0.1% x15gr", precio: 3800, categoria: "AG", imagen: "/.png", stock: 20 },
// ===== MEMPHIS =====
{ id: 446, nombre: "Azitromicina 500mg x3 Tbs", precio: 3000, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 447, nombre: "Alopurinol 100mg x30 Tbs", precio: 12000, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 448, nombre: "Alopurinol 300mg x30 Tbs", precio: 10800, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 449, nombre: "Cetirizina 10mg x10 Tbs", precio: 1900, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 450, nombre: "Acetaminofén + Hioscina x20 Tbs", precio: 12600, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 451, nombre: "Sulfadiazina de Plata 1% x30gr", precio: 7900, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 452, nombre: "Naproxeno 250mg x10 Caps", precio: 3400, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 453, nombre: "Flunarizina 10mg x20 Tbs", precio: 4400, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 454, nombre: "Crema Tottys (Óxido de Zinc + Nistatina) x40gr", precio: 11400, categoria: "Memphis", imagen: "/.png", stock: 20 },

{ id: 455, nombre: "Tinidazol 500mg x8 Tbs", precio: 3300, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 456, nombre: "Secnidazol 500mg x4 Tbs", precio: 2800, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 457, nombre: "Losartán 100mg x30 Tbs", precio: 8900, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 458, nombre: "Diclofenaco Gel al 1% x50gr", precio: 7700, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 459, nombre: "Claritromicina 500mg x10 Tbs", precio: 16200, categoria: "Memphis", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 460, nombre: "Desloratadina 5mg x10 Tbs", precio: 5300, categoria: "Memphis", imagen: "/.png", stock: 0 },   // Próximo a llegar
{ id: 461, nombre: "Amitriptilina Clorhidrato 25mg x30 Tbs", precio: 4800, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 462, nombre: "Tinidazol 1g x4 Tbs", precio: 3400, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 463, nombre: "Metocarbamol 750mg x10 Tbs", precio: 5100, categoria: "Memphis", imagen: "/.png", stock: 0 },  // Próximo a llegar

{ id: 464, nombre: "Trimetoprima Sulfa F 160/800mg x20 Tbs", precio: 8000, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 465, nombre: "Trimebutina 200mg x30 Tbs", precio: 14800, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 466, nombre: "Tramadol HCI 50mg x10 Caps", precio: 6400, categoria: "Memphis", imagen: "/.png", stock: 0 },  // Próximo a llegar
{ id: 467, nombre: "Losartán 50mg x30 Tbs", precio: 4500, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 468, nombre: "Pamoato de Pirantel x15ml", precio: 2800, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 469, nombre: "Secnidazol 1g x10 Tbs", precio: 25000, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 470, nombre: "Hidrocortisona 1% x15gr", precio: 4600, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 471, nombre: "Hidroclorotiazida 25mg x30 Tbs", precio: 3400, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 472, nombre: "Clotrimazol 1% Solución Tópica x30ml", precio: 3300, categoria: "Memphis", imagen: "/.png", stock: 0 }, // Próximo a llegar

{ id: 473, nombre: "Carvedilol 12.5mg x30 Tbs", precio: 8700, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 474, nombre: "Amlodipino 10mg x10 Tbs", precio: 2000, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 475, nombre: "Clotrimazol Vaginal al 2% x20gr", precio: 13000, categoria: "Memphis", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 476, nombre: "Carvedilol 6.25mg x30 Tbs", precio: 6000, categoria: "Memphis", imagen: "/.png", stock: 20 },
{ id: 477, nombre: "Clindamicina 300mg x40 Caps", precio: 37900, categoria: "Memphis", imagen: "/.png", stock: 20 },
// LA SANTE //
{ id: 478, nombre: "Amoxicilina 500mg x50 Cap", precio: 15500, categoria: "La Sante", imagen: "/.png", stock: 100 },
{ id: 479, nombre: "Azitromicina 500mg x3 Tbs",  precio: 3700,  categoria: "La Sante", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 480, nombre: "Omeprazol 20mg x30 Cap",     precio: 2800,  categoria: "La Sante", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 481, nombre: "Vitamina C 500mg x100 Tbs (Mandarina)", precio: 19500, categoria: "La Sante", imagen: "/.png", stock: 20 },
{ id: 482, nombre: "Sildenafil 50mg x2 Tbs",     precio: 1000,  categoria: "La Sante", imagen: "/.png", stock: 0 },
{ id: 483, nombre: "Losartán Potásico 50mg x30 Tbs", precio: 4300, categoria: "La Sante", imagen: "/.png", stock: 20 },
{ id: 484, nombre: "Amoxicilina Suspensión 250mg/5ml x100ml", precio: 5500, categoria: "La Sante", imagen: "/.png", stock: 200 },
{ id: 485, nombre: "Oximetazolina 0.025% x15ml (Niño)", precio: 11200, categoria: "La Sante", imagen: "/.png", stock: 0 },
{ id: 486, nombre: "Oximetazolina 0.05% x15ml (Adulto)", precio: 11500, categoria: "La Sante", imagen: "/.png", stock: 0 },
// Ampolletería (continuando la numeración)
{ id: 487, nombre: "Dexametasona Fosfato 8mg/2ml (Bolsa) x10 und", precio: 6500,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 488, nombre: "Dexablas Dexametasona 8mg/2ml x5 amp",            precio: 8500,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 489, nombre: "Dexablas (Dexametasona) 4mg/2ml x5 amp",          precio: 7900,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 490, nombre: "Betazkov (Betametasona) 8mg/2ml x5 amp",          precio: 8600,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 491, nombre: "Meblainex (Meloxicam) 15mg/1.5ml x5 amp",         precio: 11200, categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 492, nombre: "Betaduo 2ml x1 und",                              precio: 34000, categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 493, nombre: "Diclofenaco Sódico 75mg/3ml x10 amp (Farmionni)", precio: 6900,  categoria: "Ampolleteria", imagen: "/.png", stock: 0  }, // Próximo
{ id: 494, nombre: "Neurobión 3+3",                                   precio: 36000, categoria: "Ampolleteria", imagen: "/.png", stock: 0  }, // Próximo
{ id: 495, nombre: "Lincofar (Lincomicina) 600mg/2ml x10 amp",        precio: 18500, categoria: "Ampolleteria", imagen: "/.png", stock: 0  }, // Próximo

{ id: 496, nombre: "K-Delprazol (Omeprazol) x1 vial",                 precio: 3900,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 497, nombre: "Antidol B1+B6+B1 2ml x3 amp",                     precio: 19800, categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 498, nombre: "Gentamicina 160mg/2ml x10 amp (Farmionni)",       precio: 13000, categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 499, nombre: "Diuxoton N-butil bromuro de hioscina x5 amp",     precio: 15000, categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 500, nombre: "Penicilina 1.2 mill x1 vial (Sigma)",             precio: 2500,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 501, nombre: "Penicilina 2.4 mill x1 vial (Sigma)",             precio: 3500,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 502, nombre: "Vitamina C 500mg/5ml x1 amp",                     precio: 7700,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 503, nombre: "Vitamina C 500mg/5ml x1 amp (Ecar)",              precio: 7000,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 504, nombre: "Clindamicina 600mg/4ml bolsa x10 und",            precio: 28000, categoria: "Ampolleteria", imagen: "/.png", stock: 20 },

{ id: 505, nombre: "Ampicilina/Sulbactam 1.5 g IM/IV x1 vial (Delta)",precio: 2600,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 506, nombre: "Ferropurum (Sacarato de hidróxido férrico) x1 amp 100mg/5ml", precio: 15000, categoria: "Ampolleteria", imagen: "/.png", stock: 0 }, // Próximo
{ id: 507, nombre: "Diclofenaco Sódico 75mg/3ml x10 amp (Vitalis)",   precio: 8900,  categoria: "Ampolleteria", imagen: "/.png", stock: 0  }, // Próximo
{ id: 508, nombre: "Hioscina + Dipirona 20mg + 2.5g/5ml x1 amp",      precio: 2900,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 509, nombre: "Betametasona Acetato 3mg + Betametasona Fosfato 3mg x1 vial", precio: 15400, categoria: "Ampolleteria", imagen: "/.png", stock: 0 }, // Próximo
{ id: 510, nombre: "Tramadol 100mg/2ml (IV/IM/SC) x10 amp",           precio: 11500, categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 511, nombre: "Pisacaina 2% 20mg/ml 50ml",                       precio: 9000,  categoria: "Ampolleteria", imagen: "/.png", stock: 20 },
{ id: 512, nombre: "Ondansetrón 8mg/4ml x1 amp",                      precio: 3400,  categoria: "Ampolleteria", imagen: "/.png", stock: 0  },  // Próximo
// ——— Jarabes y soluciones ———
{ id: 513, nombre: "Pepto Gas NF x360 ml", precio: 15000, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 514, nombre: "Dosflem Adultos x120 ml", precio: 6600, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 515, nombre: "Dosflem Niños x120 ml", precio: 6600, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 516, nombre: "Clorfeniramina x120 ml (Ecar)", precio: 3300, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 517, nombre: "Nistatina 100.000 UI x60 ml", precio: 6800, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 518, nombre: "Didayabral (Multivitamínico) x240 ml", precio: 12800, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 519, nombre: "Dolistan (Ibuprofeno) x120 ml", precio: 5500, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 520, nombre: "Tuxcool x360 ml", precio: 15000, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 521, nombre: "Florastor Biotic NF x360 ml", precio: 15000, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },

{ id: 522, nombre: "Broncomiel (Hedera Helix + Propóleo) x120 ml", precio: 7600, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 523, nombre: "Mixagogo x120 ml", precio: 11600, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 524, nombre: "Mucotrop Adulto x120 ml", precio: 6200, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 525, nombre: "Acetaminofén x120 ml", precio: 3500, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 526, nombre: "Acetaminofén x90 ml", precio: 3000, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 527, nombre: "Avalpric x120 ml 250 mg/5 ml", precio: 9500, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 528, nombre: "Privatos (Hedera Helix) x120 ml", precio: 17200, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 529, nombre: "Metroxazide x120 ml (Metronidazol + Nifuroxazide)", precio: 11000, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 530, nombre: "Mucotrop Pediátrico (Bromhexina) x120 ml", precio: 6900, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },

{ id: 531, nombre: "Taxen (Nitazoxanida 2%) x30 ml", precio: 7700, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 532, nombre: "Pranexxin (Nitazoxanida 2%) x60 ml", precio: 13600, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 533, nombre: "Cetirizina 0.1% x60 ml (Memphis)", precio: 6000, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 534, nombre: "Trimicort (Clobetasol) Solución x60 ml", precio: 14200, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 535, nombre: "Agua Oxigenada (OSA) x120 ml", precio: 2200, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 536, nombre: "Congestex Kids x90 ml", precio: 11200, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 537, nombre: "Alginacid x360 ml", precio: 16500, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 538, nombre: "Notusin Niños x120 ml", precio: 9500, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 539, nombre: "Notusin Adulto x120 ml", precio: 9500, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },

{ id: 540, nombre: "Mucofan (Hedera Helix) x120 ml", precio: 8500, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 541, nombre: "Noxpirin Junior x60 ml", precio: 4800, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 542, nombre: "Noxpirin Junior x120 ml", precio: 5700, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 543, nombre: "Aciclovir Susp 200mg/5ml x90 ml", precio: 11600, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 544, nombre: "Noglupec (Dextrometorfano + Guayacolato) sin azúcar x120 ml", precio: 11800, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 545, nombre: "Veramiel Niños x120 ml", precio: 8100, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 546, nombre: "Veramiel Adultos x120 ml", precio: 8100, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 547, nombre: "Paracodina (Dihidrocodeína 2.42 mg/ml) x120 ml", precio: 15500, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 548, nombre: "Flemalis (N-Acetilcisteína + Guayacolato) x120 ml", precio: 16500, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },

{ id: 549, nombre: "Noktos Adultos (Bromhexina + Guayacolato) x120 ml", precio: 7800, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 550, nombre: "Noktos Niños (Bromhexina + Guayacolato) x120 ml", precio: 7800, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 551, nombre: "Bronsinex (Ambroxol HCl + Clenbuterol) x120 ml", precio: 5400, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 552, nombre: "Zetygrip 4 x120 ml", precio: 10400, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 553, nombre: "Zetygrip 4 x60 ml", precio: 7900, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 554, nombre: "Hidroxicina HCl 0.25% x90 ml", precio: 8600, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 555, nombre: "Clorfeniramina Maleato 2mg/5ml x120 ml", precio: 3300, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 556, nombre: "Metroxazol (Metronidazol 5mg/100ml + Nifurazida 4g/100ml) x120 ml", precio: 11000, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 557, nombre: "Desloratadina 0.05% x60 ml (Memphis)", precio: 4900, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },

{ id: 558, nombre: "Multi Soluter x50 ml", precio: 9900, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 559, nombre: "Triatusic (Dextrometorfano + Ambroxol + Teofilina) x120 ml", precio: 12000, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 560, nombre: "Komilon Appetite (Multivitamínico) x360 ml", precio: 12400, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 561, nombre: "Multicebrin (Multivitamínico) x360 ml", precio: 11100, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 562, nombre: "Dihidrocodeína Bitartrato 2.42 mg/ml x120 ml (Humax)", precio: 6500, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 563, nombre: "Albendazol Suspensión (Laproff) x20 ml", precio: 1900, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 564, nombre: "Furotil (Metronidazol 5.0 g + Nifuroxanida) x120 ml", precio: 12700, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 565, nombre: "Mieltertos Jarabe Adulto x240 ml", precio: 24000, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 566, nombre: "Mieltertos Jarabe Niños x180 ml", precio: 20900, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },

{ id: 567, nombre: "Albendazol Suspensión 4% x20 ml (CoasPharma)", precio: 1900, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 568, nombre: "Vitaban Jalea x240 ml", precio: 14800, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 569, nombre: "Caladerm Rosa Suspensión x120 ml", precio: 9300, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 570, nombre: "Caladerm Clear x120 ml", precio: 11000, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 571, nombre: "Bactroderm (Yodo-Povidona) Solución x60 ml", precio: 5300, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },
{ id: 572, nombre: "Bactroderm (Yodo-Povidona) Bucogaringeo x60 ml", precio: 5200, categoria: "Jarabes y soluciones", imagen: "/.png", stock: 20 },

// --- Cremas y Ungüentos ---
{ id: 517, nombre: "Fitobremg x32 Gr", precio: 21300, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 518, nombre: "Neotrisona (Triconjugada) x20 Gr", precio: 6100, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 519, nombre: "Clotrimazol 1% 40 Gr (Farmionni)", precio: 5700, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 0 }, // Próximo
{ id: 520, nombre: "Micigent Gentamicina Crema 40 Gr", precio: 10400, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 521, nombre: "Fenacalm (Diclofenaco) Gel x50 Gr", precio: 6800, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 522, nombre: "Benlic (Triconjugada) 20 Gr", precio: 9700, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 523, nombre: "Benlic (Triconjugada) 40 Gr", precio: 15600, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 524, nombre: "Nelind Crema x40 Gr", precio: 14600, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 525, nombre: "Tisat Nistatina 100.000 U.I Crema 30 Gr", precio: 11000, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },

{ id: 526, nombre: "Diclofenaco Gel 1% 40 Gr (Vitalis)", precio: 6700, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 0 }, // Próximo
{ id: 527, nombre: "Piroxicam Gel 0.5% 40 Gr (Vitalis)", precio: 5800, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 0 }, // Próximo
{ id: 528, nombre: "Betametasona 0.05% x40 Gr (Anglo)", precio: 4700, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 0 }, // Próximo
{ id: 529, nombre: "Vivirsón Aciclovir Ungüento al 5% x15 Gr", precio: 4300, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 530, nombre: "Gyno Confort (Clotrimazol) Vaginal al 2% x20 Gr", precio: 11500, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 531, nombre: "Nitrofurazona 0.2% Pomada x40 Gr", precio: 6400, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 532, nombre: "Lindazol Crema Vaginal (Clotrimazol 2% + Clindamicina 2%) 20 Gr", precio: 13200, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 533, nombre: "Trimicort Ungüento Clobetasol 17-Propionato 0.05% x40 Gr", precio: 21000, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 534, nombre: "Vclocli (Clotrimazol + Clindamicina) al 2% x20 Gr", precio: 13700, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },

{ id: 535, nombre: "Nixoderm Ungüento x20 Gr", precio: 9200, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 536, nombre: "Pomada Verde x23 Gr (Tridex)", precio: 6700, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 0 }, // Próximo
{ id: 537, nombre: "Ketoconazol 2% 30 Gr (Anglo)", precio: 5700, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 0 }, // Próximo
{ id: 538, nombre: "Clotrimazol Tópica 1% 40 Gr", precio: 3400, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 0 }, // Próximo
{ id: 539, nombre: "Terravital Ungüento x10 Gr", precio: 14900, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 0 }, // Próximo
{ id: 540, nombre: "Vitatriol Ungüento x3.5 Gr", precio: 13800, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 541, nombre: "Nitrofur (Nitrofurazona) x40 Gr", precio: 15000, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 542, nombre: "Limpiaderm (Triconjugada) 20 Gr", precio: 7200, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 0 }, // Próximo
{ id: 543, nombre: "Dermakron (Triconjugada) 20 Gr", precio: 8400, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 0 }, // Próximo

{ id: 544, nombre: "Neclobet (Triconjugada) x20 Gr", precio: 7800, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 545, nombre: "Neclobet (Triconjugada) x40 Gr", precio: 14600, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
{ id: 546, nombre: "Trinsicon (Triconjugada) x20 Gr", precio: 4200, categoria: "Cremas y Ungüentos", imagen: "/.png", stock: 20 },
// ===== GOTAS =====
{ id: 547, nombre: "Tramadol (Expofarma) 10 ml", precio: 4600, categoria: "Gotas", imagen: "/.png", stock: 0 },
{ id: 548, nombre: "Rhifisol (Suero Fisiológico) 30 ml", precio: 3400, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 549, nombre: "Thera Tears Lágrimas Artificiales", precio: 12100, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 550, nombre: "Prestiblock (Timolol 0.5%) 5 ml", precio: 5400, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 551, nombre: "Tobroptic Compuesto (Dexametasona + Tobramicina) 5 ml", precio: 16900, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 552, nombre: "Sulfato Ferroso (Laproff) 20 ml", precio: 5500, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 553, nombre: "Opharflex (Triconjugada) 5 ml", precio: 7900, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 554, nombre: "Naf Vision (Nafazolina) 1 mg x7 ml", precio: 5400, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 555, nombre: "Levomepromazina al 4% x20 ml", precio: 15000, categoria: "Gotas", imagen: "/.png", stock: 0 },

{ id: 556, nombre: "Ricentir (Cetirizina) 10 mg/5 ml", precio: 8200, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 557, nombre: "Valerina (Kemi) 60 ml", precio: 7500, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 558, nombre: "Valerina (Kemi) 30 ml", precio: 5300, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 559, nombre: "Motibex (Valeriana-Lechuga-Toronjil) 30 ml", precio: 6700, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 560, nombre: "Motibex (Valeriana-Lechuga-Toronjil) 60 ml", precio: 9700, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 561, nombre: "Vitamina C (Coaspharma) 30 ml", precio: 5300, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 562, nombre: "Oftalmotrisol (Nafazolina) 15 ml", precio: 12700, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 563, nombre: "Tramadol (Memphis) 10 ml", precio: 3700, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 564, nombre: "Tramasindol (Tramadol) 10 ml", precio: 4000, categoria: "Gotas", imagen: "/.png", stock: 20 },

{ id: 565, nombre: "Polioftal (Triconjugada) 5 ml", precio: 7900, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 566, nombre: "Simpiox (Ivermectina 0.6%) 5 ml", precio: 7000, categoria: "Gotas", imagen: "/.png", stock: 0 },
{ id: 567, nombre: "Wassertrol 5 ml", precio: 12800, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 568, nombre: "Digesta x20 ml", precio: 12500, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 569, nombre: "Iverblas (Ivermectina 0.6%) 5 ml", precio: 8200, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 570, nombre: "Cifloblas (Ciprofloxacino 0.3%) 5 ml", precio: 10500, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 571, nombre: "Triclimbac (Óticas) 10 ml", precio: 8000, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 572, nombre: "Prednioftal F (Prednisolona Acetato 10 mg/ml) 5 ml", precio: 30200, categoria: "Gotas", imagen: "/.png", stock: 0 },
{ id: 573, nombre: "Fenacof (Diclofenaco Sódico 0.1%) 5 ml", precio: 8400, categoria: "Gotas", imagen: "/.png", stock: 20 },

{ id: 574, nombre: "Nazil (Nafazolina Clorhidrato 0.1%) 15 ml", precio: 10400, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 575, nombre: "Vita Triol (Triconjugada) 5 ml", precio: 7900, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 576, nombre: "Tikoj (Cromoglicato Sódico 4%) 5 ml", precio: 6800, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 577, nombre: "Sulfaoftal (Sulfacetamida Sódica 100 mg/ml) 15 ml", precio: 10700, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 578, nombre: "Fluoftal (Fluorometalona 0.1%) 5 ml", precio: 21000, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 579, nombre: "Eye Zul (Nafazolina Clorhidarto 0.1%) 7 ml", precio: 6800, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 580, nombre: "Cetirizina (Memphis) 15 ml", precio: 8900, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 581, nombre: "Fire Lips (Ácido Salicílico) 10 ml", precio: 7600, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 582, nombre: "Dolpack (Solución Bucal Tópica)", precio: 5300, categoria: "Gotas", imagen: "/.png", stock: 20 },

{ id: 583, nombre: "Oftalmax (Triconjugada) 5 ml", precio: 7000, categoria: "Gotas", imagen: "/.png", stock: 0 },
{ id: 584, nombre: "Lagrikov Lágrimas Artificiales 15 ml", precio: 7900, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 585, nombre: "Conjugent (Gentamicina 0.3%) 5 ml", precio: 5700, categoria: "Gotas", imagen: "/.png", stock: 20 },
{ id: 586, nombre: "Activa 21", precio: 5300, categoria: "Anticonceptivos", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 587, nombre: "Cyclofemina 25mg/5mg Solución Inyectable x1", precio: 15300, categoria: "Anticonceptivos", imagen: "/.png", stock: 20 },
{ id: 588, nombre: "Postday (Levonorgestrel 0.75mg) x2 Tbs", precio: 7000, categoria: "Anticonceptivos", imagen: "/.png", stock: 20 },
{ id: 589, nombre: "Nofertyl x1 Amp de 1ml (IM)", precio: 5000, categoria: "Anticonceptivos", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 590, nombre: "Evinet x2 Tbs", precio: 6400, categoria: "Anticonceptivos", imagen: "/.png", stock: 20 },
{ id: 591, nombre: "Postinor2 (Levonorgestrel 0.75mg) x2 Tbs", precio: 6400, categoria: "Anticonceptivos", imagen: "/.png", stock: 20 },
{ id: 592, nombre: "Mesigyna x1 Amp x1 ml", precio: 8000, categoria: "Anticonceptivos", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 593, nombre: "Microgynon Suave x21 Comprimidos", precio: 6400, categoria: "Anticonceptivos", imagen: "/.png", stock: 20 },
{ id: 594, nombre: "Microgynon 30 x21 Comprimidos", precio: 6400, categoria: "Anticonceptivos", imagen: "/.png", stock: 20 },

// —— BIOSANITARIOS ——
{ id: 595, nombre: "Jeringa 3 ml (Aguja 21G x 1 1/2\") x100 (Alfasafe)", precio: 18400, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 596, nombre: "Jeringa 5 ml (Aguja 21G x 1 1/2\") x100 (Alfasafe)", precio: 17900, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 597, nombre: "Jeringa 10 ml (Aguja 21G x 1 1/2\") x100 (Alfasafe)", precio: 26900, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 598, nombre: "Gasa Estéril (No tejida) x50 sobres de 6 (Alfa)", precio: 26800, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 599, nombre: "Apósito Goly (Niño y Adulto) x20 Und", precio: 6500, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 600, nombre: "Termómetro Digital", precio: 6700, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 601, nombre: "Goteros de Vidrio x20 Und (Alfa)", precio: 12800, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 602, nombre: "Baxter Cloruro de Sodio 0.9% x500 ml", precio: 2800, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 603, nombre: "Baxter Cloruro de Sodio 0.9% x100 ml", precio: 2400, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },

{ id: 604, nombre: "Cinta Microporosa Color Piel (12.5 mm x 5 yds) x Und", precio: 2400, categoria: "Biosanitarios", imagen: "/.png", stock: 0 }, // Próximo a llegar
{ id: 605, nombre: "Cinta Microporosa Color Piel (1\" x 5 yds) x Und", precio: 5200, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 606, nombre: "Cinta Microporosa Color Piel (2\" x 5 yds) x Und", precio: 10400, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 607, nombre: "Baxter Cloruro de Sodio 0.9% x250 ml", precio: 2900, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 608, nombre: "Baxter Cloruro de Sodio 0.9% x1000 ml", precio: 4900, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 609, nombre: "Curas Color Piel x100 (Medicare)", precio: 4800, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },
{ id: 610, nombre: "Lactato de Ringer x500 ml (Baxter)", precio: 2900, categoria: "Biosanitarios", imagen: "/.png", stock: 20 },





];
const categorias = [
  "Productos más Vendidos",
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

export default function Page() {
  const [carrito, setCarrito] = useState<ProductoEnCarrito[]>([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Productos más Vendidos");
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // Renombrada para claridad (opcional)
const normalizeText = (s: string) =>
  s.normalize?.("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();


  const agregarAlCarrito = (producto: Producto) => {
    if (producto.stock <= 0) return;
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id && item.cantidad < producto.stock
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
    setMostrarCarrito(true);
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const cambiarCantidad = (id: number, nuevaCantidad: number) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad: Math.max(0, Math.min(nuevaCantidad, item.stock ?? Infinity)),
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const isSearching = search.trim().length > 0;

const productosFiltrados: Producto[] = (() => {
  const q = normalizeText(search.trim());

  // Con texto en el buscador: buscar en TODAS las categorías
  if (q) {
    // 1) Coincidencia exacta -> mostrar SOLO ese producto
    const exact = productos.find(
      (p) => normalizeText(p.nombre) === q
    );
    if (exact) return [exact];

    // 2) Sin exacta: coincidencia por tokens (pueden salir varios)
    const tokens = q.split(/\s+/).filter(Boolean);
    return productos.filter((p) => {
      const name = normalizeText(p.nombre);
      return tokens.every((t) => name.includes(t));
    });
  }

  // Sin texto en el buscador: filtra por categoría como antes
  if (categoria === "Productos más Vendidos") return productos.filter((p) => p.masVendido === true);
  if (categoria === "Todos") return productos.filter((p) => !p.masVendido);
  return productos.filter((p) => p.categoria === categoria && !p.masVendido);
})();



  const enviarPedidoWhatsApp = () => {
    if (carrito.length === 0) return;
    const mensaje = carrito
      .map(
        (item) =>
          `• ${item.cantidad} x ${item.nombre} = $${item.precio * item.cantidad}`
      )
      .join("%0A");
    const texto = `🛒 Hola, quiero hacer el siguiente pedido:%0A%0A${mensaje}%0A%0A💰 Total: $${total}`;
    const numero = "573146171647";
    window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 text-gray-900">
      {/* HEADER */}
      <header className="bg-blue-900 text-white p-4 flex items-center justify-between gap-4">
        <h1 className="text-lg font-bold whitespace-nowrap">Distribuidora Tayro Pharma SAS</h1>

        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Buscar producto... (ej. omeprazol, genfar)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md p-2 rounded-lg border border-blue-400 bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => setMostrarCarrito(!mostrarCarrito)}
          className="relative bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 whitespace-nowrap"
        >
          🛒 Carrito
          {carrito.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-2">
              {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
            </span>
          )}
        </button>
      </header>

      {/* MAIN */}
      <main className="flex-grow p-6">
        {/* Categorías */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-4 py-2 rounded-lg font-bold ${
                categoria === cat ? "bg-blue-600 text-white" : "bg-blue-200 hover:bg-blue-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Productos */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="relative bg-white shadow-lg rounded-xl p-3 border border-gray-200 w-full"
              >
                {producto.stock === 0 && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
                    🚫 Agotado
                  </span>
                )}

                {/* Imagen más grande y cuadrada */}
                <div className="w-full flex justify-center items-center mb-2">
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    width={500}   // aumenta tamaño aquí
                    height={500}  // cuadrada
                    className="object-contain"
                  />
                </div>

                <h2 className="text-base font-semibold text-blue-600 text-center h-12 overflow-hidden">
                  {producto.nombre}
                </h2>
                <p className="text-gray-700 font-bold text-center mb-2 text-base">
                  ${producto.precio.toLocaleString("es-CO")}
                </p>

                <button
                  onClick={() => agregarAlCarrito(producto)}
                  disabled={producto.stock === 0}
                  className={`px-3 py-2 w-full rounded-lg text-sm ${
                    producto.stock === 0
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {producto.stock === 0 ? "No disponible" : "Agregar"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-5">
              ❌ No se encontraron productos con ese nombre.
            </p>
          )}
        </div>
      </main>

      {/* PANEL CARRITO */}
      {mostrarCarrito && (
        <div className="fixed top-16 right-4 bg-white shadow-xl rounded-lg w-80 p-4 border border-gray-300 z-50">
          <h2 className="text-lg font-bold mb-3">Carrito de Compras</h2>
          {carrito.length === 0 ? (
            <p className="text-gray-600">El carrito está vacío.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 max-h-[50vh] overflow-y-auto">
                {carrito.map((item) => (
                  <li
                    key={item.id}
                    className="py-2 flex justify-between items-center"
                  >
                    <div>
                      <span className="text-gray-800">{item.nombre}</span>
                      <br />
                      <span className="text-sm text-gray-600">
                        ${item.precio.toLocaleString("es-CO")} x {item.cantidad} ={" "}
                        <span className="font-bold">
                          ${(item.precio * item.cantidad).toLocaleString("es-CO")}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          cambiarCantidad(item.id, item.cantidad - 1)
                        }
                        className="px-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        -
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        onClick={() =>
                          cambiarCantidad(item.id, item.cantidad + 1)
                        }
                        className="px-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        +
                      </button>
                      <button
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="px-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        🗑
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold">
                  Total: ${total.toLocaleString("es-CO")}
                </span>
                <button
                  onClick={enviarPedidoWhatsApp}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  📲 Enviar Pedido
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          {/* Izquierda - Dirección y contacto */}
          <div className="text-left mb-4 md:mb-0">
            <p className="font-bold text-lg">📍 Carrera 18 # 12-89</p>
            <p>Centro Comercial Ferrocarril Plaza Local C145</p>
            <p>Bogotá DC</p>
            <p className="mt-2">
              📞{" "}
              <a
                href="https://wa.me/573146171647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-300 font-bold hover:underline"
              >
                WhatsApp: 3146171647
              </a>
            </p>
          </div>

          {/* Derecha - Redes sociales */}
          <div className="text-right">
            <p className="font-semibold text-lg">🌐 Síguenos en:</p>
            <div className="flex gap-6 mt-2 justify-end">
              <a
                href="https://www.facebook.com/TAYROPHARMA/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/tayropharmasas/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@tayro.pharma.sas?_t=ZS-8zaXdUzOS4G&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
