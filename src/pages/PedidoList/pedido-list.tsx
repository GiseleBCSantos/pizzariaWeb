import { useState } from "react";
import "./styles.css";

interface Pizza {
  sabor: string;
  tamanho: string;
  quantidade: number;
}

interface Pedido {
  id: number;
  cliente: string;
  pizzas: Pizza[];
  total: number;
  data: string;
  status: string;
}

const pedidosMock: Pedido[] = [
  {
    id: 1,
    cliente: "João Silva",
    pizzas: [
      { sabor: "Margherita", tamanho: "M", quantidade: 2 },
      { sabor: "Pepperoni", tamanho: "G", quantidade: 1 },
    ],
    total: 85.0,
    data: "2023-05-15",
    status: "Entregue",
  },
  {
    id: 2,
    cliente: "Maria Santos",
    pizzas: [
      { sabor: "Quatro Queijos", tamanho: "G", quantidade: 1 },
      { sabor: "Frango com Catupiry", tamanho: "M", quantidade: 1 },
    ],
    total: 75.0,
    data: "2023-05-16",
    status: "Em preparo",
  },
];

const PedidosLista = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosMock);
  const [pedidoDetalhado, setPedidoDetalhado] = useState<Pedido | null>(null);

  const verDetalhes = (pedido: Pedido) => {
    setPedidoDetalhado(pedido);
  };

  return (
    <div className="pedidos-lista-container">
      {/* <div className="pedido-form-background"></div> */}
      <h1 className="pedidos-lista-titulo">Lista de Pedidos</h1>
      <div className="pedidos-grid">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="pedido-card">
            <h2>Pedido #{pedido.id}</h2>
            <p>
              <strong>Cliente:</strong> {pedido.cliente}
            </p>
            <p>
              <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
            </p>
            <p>
              <strong>Data:</strong> {pedido.data}
            </p>
            <p>
              <strong>Status:</strong> {pedido.status}
            </p>
            <button
              onClick={() => verDetalhes(pedido)}
              className="btn-detalhes"
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
      {pedidoDetalhado && (
        <div className="pedido-detalhes">
          <h2>Detalhes do Pedido #{pedidoDetalhado.id}</h2>
          <p>
            <strong>Cliente:</strong> {pedidoDetalhado.cliente}
          </p>
          <h3>Pizzas:</h3>
          <ul>
            {pedidoDetalhado.pizzas.map((pizza, index) => (
              <li key={index}>
                {pizza.quantidade}x {pizza.sabor} ({pizza.tamanho})
              </li>
            ))}
          </ul>
          <p>
            <strong>Total:</strong> R$ {pedidoDetalhado.total.toFixed(2)}
          </p>
          <p>
            <strong>Data:</strong> {pedidoDetalhado.data}
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
