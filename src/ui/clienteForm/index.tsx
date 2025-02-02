import { toast } from "react-toastify";
import { usePizzaria } from "../../modules/views/hooks/usePizzaria";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { useState } from "react";

const ClienteForm = ({ setMostrarFormularioCliente }: any) => {
  const { addCliente } = usePizzaria();

  const [clienteAdicionado, setClienteAdicionado] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    bairro: "",
  });

  const handleChangeTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);

    value = value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");

    e.target.value = value;
  };

  const adicionarCliente = async () => {
    try {
      await addCliente(clienteAdicionado);
      setMostrarFormularioCliente(false);
      setClienteAdicionado({
        nome: "",
        endereco: "",
        telefone: "",
        bairro: "",
      });
      toast("Cliente cadastrado com sucesso!", {
        type: "success",
        position: "top-center",
      });
    } catch (error: any) {
      toast(error.message, {
        type: "error",
        position: "top-center",
      });
    }
  };

  return (
    <div className="novo-cliente">
      <div className="form-row">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            placeholder="Nome do cliente"
            value={clienteAdicionado.nome}
            onChange={(e) =>
              setClienteAdicionado({
                ...clienteAdicionado,
                nome: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            placeholder="(00) 00000-0000"
            value={clienteAdicionado.telefone}
            onChange={(e) => {
              handleChangeTelefone(e);
              setClienteAdicionado({
                ...clienteAdicionado,
                telefone: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="form-row">
        <div>
          <Label htmlFor="endereco">Endereço</Label>
          <Input
            id="endereco"
            placeholder="Rua, número"
            value={clienteAdicionado.endereco}
            onChange={(e) =>
              setClienteAdicionado({
                ...clienteAdicionado,
                endereco: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="bairro">Bairro</Label>
          <Input
            id="bairro"
            placeholder="Bairro"
            value={clienteAdicionado.bairro}
            onChange={(e) =>
              setClienteAdicionado({
                ...clienteAdicionado,
                bairro: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="form-row">
        <Button
          type="button"
          onClick={() => setMostrarFormularioCliente(false)}
          className="full-width btn-outline"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={() => adicionarCliente()}
          className="full-width btn-primary"
        >
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export { ClienteForm };
