import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";
import Modal from "./components/Modal";
import Cart from "./components/Cart";

export default function App() {
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("all");
  const [subcategoriaActiva, setSubcategoriaActiva] = useState("all");
  const [carrito, setCarrito] = useState({});
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const agregarCarrito = (id, cantidad) => {
    setCarrito((prev) => ({ ...prev, [id]: cantidad }));
  };

  const vaciarCarrito = () => setCarrito({});

  const abrirModal = (producto) => setModalData(producto);

  const productosFiltrados = productos.filter((p) => {
    const cat = categoriaActiva === "all" || p.categoria === categoriaActiva;
    const sub = subcategoriaActiva === "all" || p.subcategoria === subcategoriaActiva;
    return cat && sub;
  });

  return (
    <div>
      {/* HEADER */}
      <header>
        <h1>✨ CleanMaster Premium</h1>
        <p>Calidad profesional para tu hogar</p>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="container">
        <aside className="sidebar">
          <Sidebar
            productos={productos}
            categoriaActiva={categoriaActiva}
            setCategoriaActiva={setCategoriaActiva}
            subcategoriaActiva={subcategoriaActiva}
            setSubcategoriaActiva={setSubcategoriaActiva}
          />

          <Cart
            productos={productos}
            carrito={carrito}
            setCarrito={setCarrito}
            vaciarCarrito={vaciarCarrito}
          />
        </aside>

        <main className="products">
          {productosFiltrados.map((p) => (
            <Card
              key={p.id}
              producto={p}
              cantidad={carrito[p.id] || 0}
              setCantidad={(val) => agregarCarrito(p.id, val)}
              abrirModal={abrirModal}
            />
          ))}
        </main>

        {modalData && <Modal producto={modalData} cerrarModal={() => setModalData(null)} />}
      </div>
    </div>
  );
}