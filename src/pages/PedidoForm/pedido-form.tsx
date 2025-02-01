import { FormEvent, useState } from "react";
import {
  Pizza,
  User,
  ShoppingCart,
  PlusCircle,
  MinusCircle,
  UserPlus,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select } from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import "./styles.css";

interface PizzaItem {
  sabor: string;
  tamanho: string;
  quantidade: number;
}

const PedidoForm = () => {
  const [pizzas, setPizzas] = useState<PizzaItem[]>([
    { sabor: "", tamanho: "", quantidade: 1 },
  ]);
  const [mostrarFormularioCliente, setMostrarFormularioCliente] =
    useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState("");

  const adicionarPizza = (e: FormEvent) => {
    e.preventDefault();
    setPizzas((pizzasAtuais) => [
      ...pizzasAtuais,
      { sabor: "", tamanho: "", quantidade: 1 },
    ]);
  };

  const removerPizza = (e: FormEvent, index: number) => {
    e.preventDefault();
    setPizzas((pizzasAtuais) => pizzasAtuais.filter((_, i) => i !== index));
  };

  const atualizarPizza = (
    index: number,
    campo: keyof PizzaItem,
    valor: string | number
  ) => {
    setPizzas((pizzasAtuais) => {
      const novasPizzas = [...pizzasAtuais];
      novasPizzas[index] = { ...novasPizzas[index], [campo]: valor };
      return novasPizzas;
    });
  };

  return (
    <div className="pedido-form-container">
      {/* <div className="pedido-form-background"></div> */}
      <div className="pedido-form-content">
        <h1 className="pedido-form-title">
          <Pizza className="pedido-form-icon" /> Novo Pedido
        </h1>

        <form className="pedido-form">
          <div className="form-section">
            <h2 className="section-title">
              <User className="section-icon" /> Informações do Cliente
            </h2>
            {!mostrarFormularioCliente ? (
              <div className="cliente-cadastrado">
                <div>
                  <Label htmlFor="cliente-cadastrado">Cliente Cadastrado</Label>
                  <Select
                    id="cliente-cadastrado"
                    options={[
                      { value: "1", label: "João Silva" },
                      { value: "2", label: "Maria Santos" },
                      { value: "3", label: "Carlos Oliveira" },
                    ]}
                    placeholder="Selecione um cliente"
                    value={clienteSelecionado}
                    onChange={(value) => setClienteSelecionado(value)}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => setMostrarFormularioCliente(true)}
                  className="btn-outline full-width"
                >
                  <UserPlus className="button-icon" /> Adicionar Novo Cliente
                </Button>
              </div>
            ) : (
              <div className="novo-cliente">
                <div className="form-row">
                  <div>
                    <Label htmlFor="nome">Nome</Label>
                    <Input id="nome" placeholder="Nome do cliente" />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(00) 00000-0000" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input id="endereco" placeholder="Rua, número, bairro" />
                </div>
                <Button
                  type="button"
                  onClick={() => setMostrarFormularioCliente(false)}
                  className="btn-outline full-width"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>

          <div className="form-section">
            <h2 className="section-title">
              <ShoppingCart className="section-icon" /> Pizzas
            </h2>
            {pizzas.map((pizza, index) => (
              <div key={index} className="pizza-item">
                <div>
                  <Label htmlFor={`sabor-${index}`}>Sabor</Label>
                  <Input
                    id={`sabor-${index}`}
                    placeholder="Ex: Margherita"
                    value={pizza.sabor}
                    onChange={(e) =>
                      atualizarPizza(index, "sabor", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`tamanho-${index}`}>Tamanho</Label>
                  <Select
                    id={`tamanho-${index}`}
                    options={[
                      { value: "p", label: "Pequena" },
                      { value: "m", label: "Média" },
                      { value: "g", label: "Grande" },
                    ]}
                    placeholder="Selecione"
                    value={pizza.tamanho}
                    onChange={(value) =>
                      atualizarPizza(index, "tamanho", value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`quantidade-${index}`}>Qtd</Label>
                  <Input
                    id={`quantidade-${index}`}
                    type="number"
                    min="1"
                    value={pizza.quantidade}
                    onChange={(e) =>
                      atualizarPizza(
                        index,
                        "quantidade",
                        Number(e.target.value)
                      )
                    }
                    className="input-quantidade"
                  />
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={(e) => removerPizza(e, index)}
                    className="btn-icon btn-destructive"
                  >
                    <MinusCircle />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={(e) => adicionarPizza(e)}
              className="btn-outline full-width"
            >
              <PlusCircle className="button-icon" /> Adicionar Pizza
            </Button>
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Alguma observação especial?"
            />
          </div>

          <Button type="submit" className="btn-primary full-width">
            Finalizar Pedido
          </Button>
        </form>
      </div>
    </div>
  );
};

export { PedidoForm };
