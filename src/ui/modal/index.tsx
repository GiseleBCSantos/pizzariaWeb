import { Button } from "../button";
import "./styles.css";

const Modal = ({ message, onCancel, onDelete }: any) => {
  return (
    <div className="modal-bg">
      <div className="modal">
        <p className="modal-text">{message}</p>
        <div className="modal-buttons">
          <Button onClick={onCancel}>Cancelar</Button>
          <Button onClick={onDelete} className="btn-primary">
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Modal };
