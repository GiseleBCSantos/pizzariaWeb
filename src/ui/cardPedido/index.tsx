import { MinusCircle } from "lucide-react";
import { Button } from "../button";
import "./styles.css";
import { usePizzaria } from "../../modules/views/hooks/usePizzaria";
import { useState } from "react";
import { Modal } from "../modal";
import { toast } from "react-toastify";

const CardPedido = ({ pedido, setPedidoDetalhado }: any) => {
  const { removePedidos } = usePizzaria();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const verDetalhes = (pedido: any) => {
    setPedidoDetalhado(pedido);
  };

  const deletePedido = async (id: any) => {
    try {
      await removePedidos(id);
      setIsModalOpen(false);
      toast("Pedido excluido com sucesso!", { type: "success" });
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          message="Tem certeza que deseja excluir este pedido?"
          onCancel={closeModal}
          onDelete={() => deletePedido(pedido.id)}
        />
      )}
      <h2>Pedido #{pedido.id}</h2>
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
      <button onClick={() => verDetalhes(pedido)} className="btn-detalhes">
        Ver Detalhes
      </button>
      <Button
        type="button"
        onClick={openModal}
        className="btn-icon btn-destructive card-pedido-remove"
      >
        <MinusCircle />
      </Button>
    </>
  );
};

export { CardPedido };
