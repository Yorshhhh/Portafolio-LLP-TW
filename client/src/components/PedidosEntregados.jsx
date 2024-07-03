import { useState, useEffect } from "react";
import { obtenerPedidosEntregados } from "../api/cerveceria_API";

function PedidosEntregados() {
  const [p_entregados, setEntregados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntregados = async () => {
      try {
        const data = await obtenerPedidosEntregados();
        console.log(data)
        setEntregados(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los pedidos entregados: ", error);
        setError("Error al cargar los pedidos entregados");
        setLoading(false);
      }
    };
    fetchEntregados();
  }, []);
  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const agruparPedidos = (pedidos) => {
    const pedidosAgrupados = {};

    pedidos.forEach((pedido) => {
      if (!pedidosAgrupados[pedido.cod_pedido]) {
        pedidosAgrupados[pedido.cod_pedido] = {
          ...pedido,
          detalles: [],
        };
      }

      pedidosAgrupados[pedido.cod_pedido].detalles.push({
        id_detalle_pedido: pedido.id_detalle_pedido,
        cod_producto: pedido.cod_producto,
        nombre_producto: pedido.nombre_producto,
        cantidad: pedido.cantidad,
        precio_unitario: pedido.precio_unitario.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }),
        total: pedido.total,
      });
    });

    return Object.values(pedidosAgrupados);
  };
  const calcularTotalBoleta = (detalles) => {
    let totalBoleta = 0;
    detalles.forEach((detalle) => {
      totalBoleta += detalle.total;
    });
    return totalBoleta.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
  };

  return (
    <>
      <div>
        <h2>Pedidos Entregados</h2>
        <table className="pedidos-table">
          <thead>
            <tr>
              <th>Cod Pedido</th>
              <th>Nombre Cliente</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Detalles</th>
              <th>Fecha Pedido</th>
              <th>Fecha Entrega</th>
            </tr>
          </thead>
          <tbody>
            {agruparPedidos(p_entregados).map((pedidoAgrupado) => (
              <tr key={pedidoAgrupado.cod_pedido}>
                <td>{pedidoAgrupado.cod_pedido}</td>
                <td>{pedidoAgrupado.nombre_cliente}</td>
                <td>{pedidoAgrupado.correo}</td>
                <td>{pedidoAgrupado.telefono}</td>
                <td>
                  <ul>
                    {pedidoAgrupado.detalles.map((detalle, index) => (
                      <li key={index}>
                        <strong>Producto:</strong> {detalle.nombre_producto}
                        <br />
                        <strong>Codigo Producto:{detalle.cod_producto}</strong>
                        <br />
                        <strong>Cantidad:</strong> {detalle.cantidad} <br />
                        <strong>Precio:</strong>
                        {detalle.precio_unitario} <br />
                      </li>
                    ))}
                    <li>
                      Total:{" "}
                      <strong>
                        {calcularTotalBoleta(pedidoAgrupado.detalles)}
                      </strong>
                    </li>
                  </ul>
                </td>
                <td>{pedidoAgrupado.fecha_pedido}</td>
                <td>{pedidoAgrupado.fecha_entrega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PedidosEntregados;
