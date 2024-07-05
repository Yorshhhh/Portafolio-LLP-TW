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
      <h1 className="text-black font-bold flex justify-center border-1 rounded-md">Todos los productos</h1>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {productos.map((producto) => (
          <CardProducts key={producto.cod_producto} producto={producto} />
        ))}
      </div>
    </>
  );
}

export default ProductosPage;
