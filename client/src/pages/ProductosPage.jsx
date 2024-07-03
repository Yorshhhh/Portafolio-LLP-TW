import React, { useEffect, useState } from "react";
import { getAllProductos } from "../api/cerveceria_API";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CarritoContext";
import "../css/styleproducto.css";
import CardProducts from "../components/CardProducts";

function ProductosPage() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    toggleCart,
    showCart,
    setShowCart,
  } = useCart();

  const [productos, setProductos] = useState([]);

  const clearCartHandler = () => {
    clearCart(setCartItems, setShowCart);
  };

  useEffect(() => {
    async function loadProductos() {
      const res = await getAllProductos();
      console.log(res.data);
      setProductos(res.data);
    }
    loadProductos();
  }, []);

  // Función para manejar clics en el botón de agregar al carrito
  const handleAgregarCarritoClick = (producto) => {
    addToCart(producto); // Llama a addToCart con el producto
  };

  return (
    <>
      <Navbar
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        toggleCart={toggleCart}
        showCart={showCart}
        setShowCart={setShowCart}
        clearCartHandler={clearCartHandler}
      />

      <div className="cont">
        <div className="row">
          {productos.map((producto) => (
            <div
              key={producto.cod_producto}
              className="col-lg-4 col-md-6 col-12"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <CardProducts producto={producto} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductosPage;
