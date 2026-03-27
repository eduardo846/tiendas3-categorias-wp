import React from "react";

export default function Sidebar({
  productos,
  categoriaActiva,
  setCategoriaActiva,
  subcategoriaActiva,
  setSubcategoriaActiva
}) {
  const categorias = Array.from(new Set(productos.map((p) => p.categoria)));
  const subcategorias = Array.from(
    new Set(productos.filter((p) => p.categoria === categoriaActiva).map((p) => p.subcategoria))
  );

  return (
    <div>
      <div className="filter-section">
        <h3>Categorías</h3>
        <ul>
          <li
            className={categoriaActiva === "all" ? "category-item active" : "category-item"}
            onClick={() => {
              setCategoriaActiva("all");
              setSubcategoriaActiva("all");
            }}
          >
            Todos
          </li>
          {categorias.map((cat) => (
            <li
              key={cat}
              className={categoriaActiva === cat ? "category-item active" : "category-item"}
              onClick={() => {
                setCategoriaActiva(cat);
                setSubcategoriaActiva("all");
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3>Subcategoría</h3>
        <ul>
          <li
            className={subcategoriaActiva === "all" ? "category-item active" : "category-item"}
            onClick={() => setSubcategoriaActiva("all")}
          >
            Todos
          </li>
          {subcategorias.map((sub) => (
            <li
              key={sub}
              className={subcategoriaActiva === sub ? "category-item active" : "category-item"}
              onClick={() => setSubcategoriaActiva(sub)}
            >
              {sub.charAt(0).toUpperCase() + sub.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}