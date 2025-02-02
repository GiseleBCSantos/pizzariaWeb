import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchData } from "../infrastructure/fetch-data";

export const PizzariaContext = createContext<any>(undefined);

export const PizzariaProvider = ({ children }: any) => {
  const [clientes, setClientes] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [tamanhos, setTamanhos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [itemPedido, setItemPedido] = useState([]);

  const getClientes = useCallback(async () => {
    try {
      const request = {
        endpoint: "/cliente",
      };
      const _clientes = await fetchData(request);
      setClientes(_clientes);
    } catch (error) {
      console.error((error as Error).message);
      throw new Error("Erro ao obter clientes.");
    }
  }, []);

  const addCliente = useCallback(async (clienteData: any) => {
    try {
      const request = {
        endpoint: "/cliente/",
        config: {
          method: "POST",
          data: JSON.stringify(clienteData),
        },
      };
      const clienteAdicionado = await fetchData(request);
      getClientes();
      return clienteAdicionado;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error("Erro ao cadastrar cliente.");
    }
  }, []);

  const getPizzas = useCallback(async () => {
    try {
      const request = {
        endpoint: "/pizza",
      };
      const _pizzas = await fetchData(request);
      setPizzas(_pizzas);
    } catch (error) {
      console.error((error as Error).message);
      throw new Error("Erro ao obter pizzas.");
    }
  }, []);

  const getTamanhos = useCallback(async () => {
    try {
      const request = {
        endpoint: "/tamanho",
      };
      const _tamanhos = await fetchData(request);
      setTamanhos(_tamanhos);
    } catch (error) {
      console.error((error as Error).message);
      throw new Error("Erro ao obter tamanhos.");
    }
  }, []);

  const getPedidos = useCallback(async () => {
    try {
      const request = {
        endpoint: "/pedido",
      };
      const _pedidos = await fetchData(request);
      setPedidos(_pedidos);
    } catch (error) {
      console.error((error as Error).message);
      throw new Error("Erro ao obter pedidos.");
    }
  }, []);

  const addPedidos = useCallback(async (pedidoData: any) => {
    try {
      const request = {
        endpoint: "pedido/",
        config: {
          method: "POST",
          data: JSON.stringify(pedidoData),
        },
      };
      const pedidoAdicionado = await fetchData(request);
      getPedidos();
      return pedidoAdicionado;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error("Erro ao criar pedido.");
    }
  }, []);

  const removePedidos = useCallback(async (id: any) => {
    try {
      const request = {
        endpoint: `pedido/${id}`,
        config: {
          method: "DELETE",
        },
      };
      const pedidoRemovido = await fetchData(request);
      getPedidos();
    } catch (error) {
      console.error((error as Error).message);
      throw new Error("Erro ao remover pedido.");
    }
  }, []);

  const addItemPizza = useCallback(async (itemPedidoData: any) => {
    try {
      const request = {
        endpoint: "itempedido/",
        config: {
          method: "POST",
          data: JSON.stringify(itemPedidoData),
        },
      };
      const itemPedidoAdicionado = await fetchData(request);
      return itemPedidoAdicionado;
    } catch (error) {
      console.error((error as Error).message);
      throw new Error("Erro ao adicionar item de pedido.");
    }
  }, []);

  const value = useMemo(
    () => ({
      pizzas,
      getPizzas,
      tamanhos,
      getTamanhos,
      clientes,
      getClientes,
      addCliente,
      pedidos,
      getPedidos,
      addPedidos,
      removePedidos,
      addItemPizza,
    }),
    [
      pizzas,
      getPizzas,
      tamanhos,
      getTamanhos,
      clientes,
      getClientes,
      addCliente,
      pedidos,
      getPedidos,
      addPedidos,
      removePedidos,
      addItemPizza,
    ]
  );

  return (
    <PizzariaContext.Provider value={value}>
      {children}
    </PizzariaContext.Provider>
  );
};
