import React, { useState, useEffect } from "react";
import { actualizarDireccion } from "../api/cerveceria_API";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AgregarProducto from "../components/AgregarProducto";
import RegisterAdmin from "../components/RegisterAdmin";
import ListarProductos from "../components/ListarProductos";
import Ganancias from "../components/GananciasAdmin";
import HistorialPedidos from "../components/HistorialPedidos";
import PedidosPendientes from "../components/PedidosPendientes";
import PedidosEntregados from "../components/PedidosEntregados";
import "../css/PerfilUsuario.css";
import UserCard from "../components/UserCard";

function PerfilUsuarioPage() {
  const [user, setUser] = useState(null);
  const [carro, setCarrito] = useState([]);
  // Estado para mostrar/ocultar diferentes secciones
  const [showSection, setShowSection] = useState({
    agregarProducto: false,
    crearAdmin: false,
    modificarProducto: false,
    nonStaffContent: false,
    ganancias: false,
    historial: false,
    pendientes: false,
    entregados: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userJson = localStorage.getItem("usuario");
    try {
      setUser(JSON.parse(userJson));
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    const userCarrito = localStorage.getItem("carrito");
    if (userCarrito) {
      try {
        const carritoParsed = JSON.parse(userCarrito);
        setCarrito(carritoParsed);
        const detalles = carritoParsed.map((producto) => ({
          cod_producto: producto.cod_producto,
          descuento: 0,
          cantidad: producto.quantity,
          precio_unitario: producto.precio_producto,
        }));
        console.log("Detalles del carrito", detalles);
      } catch (error) {
        console.error("Error al parsear el carrito del localStorage:", error);
      }
    } else {
      console.warn("No existen productos en el carrito.");
    }
  }, []);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="center-container">
          <h2>No se pudo cargar la información del usuario.</h2>
        </div>
      </>
    );
  }

  const toggleSection = (section) => {
    setShowSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <Navbar />
      <div className="user-profile-center-container">
        <h1>Contenedor Principal</h1>
        <div>
          <UserCard user={user} />
        </div>

        {user.is_staff ? (
          <div className="user-profile-staff-actions flex flex-col items-start justify-start">
            <h1>Funciones del administrador</h1>
            <button
              className="user-profile-button user-profile-staff-button py-1 px-2 text-sm rounded-md w-32 h-8"
              style={{ width: "fit-content" }}
              onClick={() => toggleSection("agregarProducto")}
            >
              {showSection.agregarProducto
                ? "Ocultar Agregar Producto"
                : "Agregar Producto"}
            </button>
            {showSection.agregarProducto && (
              <div className="m-auto h-screen w-full flex justify-center items-center">
                <AgregarProducto />
              </div>
            )}

            <button
              className="user-profile-button user-profile-staff-button py-1 px-2 text-sm rounded-md w-32 h-8"
              style={{ width: "fit-content" }}
              onClick={() => toggleSection("crearAdmin")}
            >
              {showSection.crearAdmin
                ? "Ocultar Crear Administrador"
                : "Crear Administrador"}
            </button>
            {showSection.crearAdmin && (
              <div className="m-auto h-screen w-full flex justify-center items-center">
                <RegisterAdmin />
              </div>
            )}

            <button
              className="user-profile-button user-profile-staff-button py-1 px-2 text-sm rounded-md w-32 h-8"
              style={{ width: "fit-content" }}
              onClick={() => toggleSection("modificarProducto")}
            >
              {showSection.modificarProducto
                ? "Ocultar Modificar Producto"
                : "Modificar Productos"}
            </button>
            {showSection.modificarProducto && (
              <div className="m-auto h-screen w-full flex justify-center items-center">
                {" "}
                <ListarProductos />{" "}
              </div>
            )}

            <button
              className="user-profile-button user-profile-staff-button py-1 px-2 text-sm rounded-md w-32 h-8"
              style={{ width: "fit-content" }}
              onClick={() => toggleSection("ganancias")}
            >
              {showSection.ganancias
                ? "Ocultar Ventas por Producto"
                : "Mostrar Ventas por Producto"}
            </button>
            {showSection.ganancias && (
              <div className="m-auto h-screen w-full flex justify-center items-center">
                {" "}
                <Ganancias />{" "}
              </div>
            )}

            <button
              className="user-profile-button user-profile-staff-button py-1 px-2 text-sm rounded-md w-32 h-8"
              style={{ width: "fit-content" }}
              onClick={() => toggleSection("pendientes")}
            >
              {showSection.pendientes
                ? "Ocultar Pedidos Pendientes"
                : "Mostrar Pedidos Pendientes"}
            </button>
            {showSection.pendientes && (
              <div className="m-auto h-screen w-full flex justify-center items-center">
                <PedidosPendientes />{" "}
              </div>
            )}

            <button
              className="user-profile-button user-profile-staff-button py-1 px-2 text-sm rounded-md w-32 h-8"
              style={{ width: "fit-content" }}
              onClick={() => toggleSection("entregados")}
            >
              {showSection.entregados
                ? "Ocultar Pedidos Entregados"
                : "Mostrar Pedidos Entregados"}
            </button>
            {showSection.entregados && (
              <div className="m-auto h-screen w-full flex justify-center items-center">
                <PedidosEntregados />
              </div>
            )}
          </div>
        ) : (
          <div className="non-staff-actions user-profile-card">
            <h1>Funciones del usuario</h1>
            <button
              className="non-staff-button"
              style={{ width: "fit-content" }}
              onClick={() => toggleSection("historial")}
            >
              {showSection.historial
                ? "Ocultar Historial de Pedidos"
                : "Mostrar Historial de Pedidos"}
            </button>
            {showSection.historial && (
              <div className="m-auto h-screen w-full flex justify-center items-center">
                <HistorialPedidos />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default PerfilUsuarioPage;