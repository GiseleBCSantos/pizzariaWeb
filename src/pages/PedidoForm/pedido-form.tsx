import { FormEvent, useEffect, useState } from "react";
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
import { usePizzaria } from "../../modules/views/hooks/usePizzaria";
import { toast } from "react-toastify";

interface PizzaItem {
  id_pizza: string;
  id_tamanho: string;
  quantidade: number;
}

const PedidoForm = () => {
  const {
    clientes,
    getClientes,
    addCliente,
    tamanhos,
    getTamanhos,
    pizzas,
    getPizzas,
    addPedidos,
    addItemPizza,
  } = usePizzaria();

  const [itensPedido, setItensPedido] = useState<PizzaItem[]>([
    { id_pizza: "", id_tamanho: "", quantidade: 1 },
  ]);

  const [clienteAdicionado, setClienteAdicionado] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    bairro: "",
  });

  const clientesSelect = clientes.map((cliente: any) => ({
    label: cliente.nome,
    value: cliente.id,
  }));
  const tamanhosSelect = tamanhos.map((tamanho: any) => ({
    label: tamanho.nome,
    value: tamanho.id,
  }));
  const pizzasSelect = pizzas.map((pizza: any) => ({
    label: pizza.sabor,
    value: pizza.id,
  }));

  useEffect(() => {
    getClientes();
    getTamanhos();
    getPizzas();
  }, []);

  const [mostrarFormularioCliente, setMostrarFormularioCliente] =
    useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState("");

  const adicionarPizza = (e: FormEvent) => {
    e.preventDefault();
    setItensPedido((pizzasAtuais) => [
      ...pizzasAtuais,
      { id_pizza: "", id_tamanho: "", quantidade: 1 },
    ]);
  };

  const removerPizza = (e: FormEvent, index: number) => {
    e.preventDefault();
    setItensPedido((pizzasAtuais) =>
      pizzasAtuais.filter((_, i) => i !== index)
    );
  };

  const atualizarPizza = (
    index: number,
    campo: keyof PizzaItem,
    valor: string | number
  ) => {
    setItensPedido((pizzasAtuais) => {
      const novasPizzas = [...pizzasAtuais];
      novasPizzas[index] = { ...novasPizzas[index], [campo]: valor };
      return novasPizzas;
    });
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
    } catch (error: any) {
      toast(error.message, {
        type: "error",
        position: "top-center",
      });
    }
  };

  const adicionarPedido = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      // 1° criar o pedido
      if (itensPedido[0].id_pizza && itensPedido[0].id_tamanho) {
        const pedidoCriado = await addPedidos({
          cliente: clienteSelecionado,
        });

        // 2° iterar sobre a lista itensPedido, criando um item pedido pra cada e vinculando ao cliente
        await Promise.all(
          itensPedido.map(async (itemPedido: any) => {
            await addItemPizza({
              ...itemPedido,
              pedido: pedidoCriado.id,
              id_pizza: Number(itemPedido.id_pizza),
              id_tamanho: Number(itemPedido.id_tamanho),
            });
          })
        );
        toast("Pedido criado com sucesso!", { type: "success" });
      } else {
        throw new Error("Um pedido deve ter ao menos um item.");
      }
    } catch (error: any) {
      toast(error.message, {
        type: "error",
      });
    }
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
                    options={clientesSelect}
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
                      onChange={(e) =>
                        setClienteAdicionado({
                          ...clienteAdicionado,
                          telefone: e.target.value,
                        })
                      }
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
            )}
          </div>

          <div className="form-section">
            <h2 className="section-title">
              <ShoppingCart className="section-icon" /> Pizzas
            </h2>
            {itensPedido.map((pizza, index) => (
              <div key={index} className="pizza-item">
                <div>
                  <Label htmlFor={`sabor-${index}`}>Sabor</Label>
                  <Select
                    id={`sabor-${index}`}
                    options={pizzasSelect}
                    placeholder="Selecione o sabor"
                    value={pizza.id_pizza}
                    onChange={(value) =>
                      atualizarPizza(index, "id_pizza", value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`tamanho-${index}`}>Tamanho</Label>
                  <Select
                    id={`tamanho-${index}`}
                    options={tamanhosSelect}
                    placeholder="Selecione"
                    value={pizza.id_tamanho}
                    onChange={(value) =>
                      atualizarPizza(index, "id_tamanho", value)
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

          <Button
            type="submit"
            className="btn-primary full-width"
            onClick={(e: any) => adicionarPedido(e)}
          >
            Finalizar Pedido
          </Button>
        </form>
      </div>
    </div>
  );
};

export { PedidoForm };
