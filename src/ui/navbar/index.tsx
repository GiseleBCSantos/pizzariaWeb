import { Link } from "react-router";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="app-nav">
      <Link to={"/"}>Novo Pedido</Link>
      <Link to={"/listar-pedidos"}>Lista de Pedidos</Link>
    </nav>
  );
};

export { Navbar };
