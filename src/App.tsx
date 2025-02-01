import { BrowserRouter, Routes, Route } from "react-router";
import { PedidoForm } from "./pages/PedidoForm/pedido-form";
import { PedidosLista } from "./pages/PedidoList/pedido-list";
import { Layout } from "./pages/layout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PedidoForm />} />
          <Route path="/listar-pedidos" element={<PedidosLista />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { App };
