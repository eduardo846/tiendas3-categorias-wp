import React from "react";

export default function Modal({ producto, cerrarModal }) {
  if (!producto) return null; // evita errores si producto es null

  return (
    <div className="modal" onClick={cerrarModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="cerrar" onClick={cerrarModal}>×</span>
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <p><strong>Precio:</strong> ${producto.precio.toLocaleString("es-CO")}</p>
      </div>
    </div>
  );
}