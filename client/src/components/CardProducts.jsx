import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function CardProducts({ producto }) {
  CardProducts.propTypes = {
    producto: PropTypes.object,
  };

  return (

    <div style={{width: "400px"}}>
      <Link to={`/producto/${producto.cod_producto}`}>
        <div className="className-thumb">
          <div className="imagen">
            <img
              src={producto.imagen} // Usar la URL real de la imagen del producto
              className="object-fit-contain border"
              alt={`Imagen de ${producto.nombre_producto}`}
            />
          </div>

          <div className="className-info">
            <h3 className="mb-1">{producto.nombre_producto}</h3>
            <h2>Cod Producto: {producto.cod_producto}</h2>
            <p className="mt-3">Descripcion: {producto.descripcion_producto}</p>
            <p>Grado alcoholico: {producto.grado_alcoholico}</p>
            <p>Cantidad: {producto.litros} CC.</p>
            <p>Precio: ${producto.precio_producto}</p>
            <p>Stock: {producto.stock_producto}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardProducts;
