import { useEffect, useState } from "react";
import "./styles.css";
import { usePizzaria } from "../../modules/views/hooks/usePizzaria";
import { CardPedido } from "../../ui/cardPedido";

interface Pizza {
  sabor: string;
  tamanho: string;
  quantidade: number;
}

interface Pedido {
  id: number;
  cliente_nome: string;
  pizzas: Pizza[];
  valor_total: number;
  data_pedido: string;
  status: string;
  itens_pedidos: { [key: string]: string | number }[];
}

const PedidosLista = () => {
  // const [pedidos, setPedidos] = useState<Pedido[]>(pedidosMock);
  const { pedidos, getPedidos } = usePizzaria();

  useEffect(() => {
    getPedidos();
  }, []);

  const [pedidoDetalhado, setPedidoDetalhado] = useState<Pedido | null>(null);

  return (
    <div className="pedidos-lista-container">
      <h1 className="pedidos-lista-titulo">Lista de Pedidos</h1>
      <div className="pedidos-grid">
        {pedidos &&
          pedidos.map((pedido: any) => (
            <div key={pedido.id} className="pedido-card">
              <CardPedido
                pedido={pedido}
                setPedidoDetalhado={setPedidoDetalhado}
              />
              {/* <h2>Pedido #{pedido.id}</h2>
              <p>
                <strong>Cliente:</strong> {pedido.cliente_nome}
              </p>
              <p>
                <strong>Total:</strong> R$ {pedido.valor_total}
              </p>
              <p>
                <strong>Data:</strong> {pedido.data_pedido}
              </p>
              <p>
                <strong>Status:</strong> {pedido.status}
              </p>
              <button
                onClick={() => verDetalhes(pedido)}
                className="btn-detalhes"
              >
                Ver Detalhes
              </button> */}
            </div>
          ))}
      </div>
      {pedidoDetalhado && (
        <div className="pedido-detalhes">
          <h2>Detalhes do Pedido #{pedidoDetalhado.id}</h2>
          <p>
            <strong>Cliente:</strong> {pedidoDetalhado.cliente_nome}
          </p>
          <h3>Pizzas:</h3>
          <ul>
            {pedidoDetalhado.itens_pedidos.map((pizza, index) => (
              <li key={index}>
                {pizza.quantidade}x {pizza.pizza_nome} ({pizza.tamanho_nome})
              </li>
            ))}
          </ul>
          <p>
            <strong>Total:</strong> R$ {pedidoDetalhado.valor_total}
          </p>
          <p>
            <strong>Data:</strong> {pedidoDetalhado.data_pedido}
          </p>
          <p>
            <strong>Status:</strong> {pedidoDetalhado.status}
          </p>
          <button
            onClick={() => setPedidoDetalhado(null)}
            className="btn-fechar"
          >
            Fechar Detalhes
          </button>
        </div>
      )}
    </div>
  );
};

export { PedidosLista };
