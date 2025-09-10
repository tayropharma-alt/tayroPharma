"use client";

import { useState } from "react";

const productos = [
  { id: 1, nombre: "Ibuprofeno Suspensión Genfar Kids 120 ml", precio: 6000, categoria: "Genfar", imagen: "/ibuprofeno.jpg", stock: 5, masVendido: true },
  { id: 2, nombre: "Acetaminofén 500mg", precio: 5000, categoria: "La Santé", imagen: "/acetaminofen.jpg", stock: 30, masVendido: true }, // 🔴 Agotado
  { id: 3, nombre: "Omeprazol 20mg", precio: 12000, categoria: "Genfar", imagen: "/omeprazol.jpg", stock: 10 },
  { id: 4, nombre: "Loratadina 10mg Caja x10", precio: 9000, categoria: "La Santé", imagen: "/loratadina.jpg", stock: 20 },
];

const categorias = [
  "Productos más Vendidos",
  "Genfar",
  "La Santé",
  "Coaspharma",
  "AG",
  "Colmed",
  "MK",
  "Bioquifar",
  "Memphis",
  "Ampolleteria",
  "Cremas y Ungüentos",
  "Jarabes",
  "Biosanitarios",
  "Recipe",
  "Todos",
];

export default function Page() {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Productos más Vendidos");
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const normalize = (s: string) =>
    s.normalize?.("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const agregarAlCarrito = (producto: any) => {
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

  // FILTRO DE PRODUCTOS
  const productosFiltrados = productos.filter((p) => {
    const q = search.trim();

    // 🔎 búsqueda global en todos los productos
    if (q !== "") {
      const nq = normalize(q);
      return normalize(p.nombre).includes(nq) || normalize(p.categoria).includes(nq);
    }

    // 📦 cuando no hay búsqueda
    if (categoria === "Todos") {
      // excluye los más vendidos
      return !p.masVendido;
    }
    if (categoria === "Productos más Vendidos") {
      return p.masVendido;
    }
    // otras categorías → productos de esa categoría que no sean "más vendidos"
    return p.categoria === categoria && !p.masVendido;
  });

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
              className={`px-4 py-2 rounded-lg ${
                categoria === cat ? "bg-blue-600 text-white" : "bg-blue-200 hover:bg-blue-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="relative bg-white shadow-lg rounded-xl p-4 border border-gray-200"
              >
                {producto.stock === 0 && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
                    🚫 Agotado
                  </span>
                )}

                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h2 className="text-lg font-semibold text-blue-600">
                  {producto.nombre}
                </h2>
                <p className="text-gray-700 font-bold mb-3">
                  ${producto.precio.toLocaleString("es-CO")}
                </p>

                <button
                  onClick={() => agregarAlCarrito(producto)}
                  disabled={producto.stock === 0}
                  className={`px-4 py-2 w-full rounded-lg ${
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
            <p className="text-center text-gray-600 col-span-3">
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
