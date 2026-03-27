import React from "react";

export default function Cart({ productos, carrito, setCarrito, vaciarCarrito }) {
  const total = Object.entries(carrito).reduce((acc, [id, cant]) => {
    const prod = productos.find((p) => p.id === id);
    return prod ? acc + prod.precio * cant : acc;
  }, 0);

  const eliminarDelCarrito = (id) => setCarrito((prev) => ({ ...prev, [id]: 0 }));

  return (
    <div className="cart-summary">
      <h4>🛒 Tu Pedido</h4>
      <div id="lista-resumen">
        {Object.entries(carrito).map(([id, cant]) => {
          if (cant > 0) {
            const prod = productos.find((p) => p.id === id);
            return (
              <div key={id} className="item-resumen">
                <span>{prod.nombre} x{cant}</span>
                <button onClick={() => eliminarDelCarrito(id)}>❌</button>
              </div>
            );
          }
          return null;
        }) || "Vacío"}
      </div>
      <hr />
      <div className="total-compra">Total: ${total.toLocaleString("es-CO")}</div>
      <button
        className="btn-whatsapp"
        onClick={() => {
          let mensaje = "¡Hola CleanMaster! 👋 Pedido:%0A%0A";
          Object.entries(carrito).forEach(([id, cant]) => {
            if (cant > 0) {
              const prod = productos.find((p) => p.id === id);
              mensaje += `✅ ${prod.nombre} x${cant} - $${(prod.precio * cant).toLocaleString("es-CO")}%0A`;
            }
          });
          mensaje += `%0A💰 TOTAL: $${total.toLocaleString("es-CO")}`;
          window.open(`https://wa.me/573505894956?text=${mensaje}`);
        }}
      >
        Enviar pedido
      </button>
      <button className="btn-vaciar" onClick={vaciarCarrito}>
        Vaciar carrito
      </button>
    </div>
  );
}