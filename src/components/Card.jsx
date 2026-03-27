import React from "react";

export default function Card({ producto, cantidad, setCantidad, abrirModal }) {
  return (
    <div className="card" data-category={producto.categoria} data-subcategory={producto.subcategoria}>
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="card-content">
        <h4>{producto.nombre}</h4>
        <div className="price">${producto.precio.toLocaleString("es-CO")}</div>

        <button className="btn-info" onClick={() => abrirModal(producto)}>
          Ver características
        </button>

        <div className="qty-selector">
          <button onClick={() => setCantidad(Math.max(cantidad - 1, 0))}>-</button>
          <input value={cantidad} readOnly />
          <button onClick={() => setCantidad(cantidad + 1)}>+</button>
        </div>
      </div>
    </div>
  );
}