import { useContext } from "react";
import { PizzariaContext } from "../pizzaria-provider";

export const usePizzaria = () => {
  const value = useContext(PizzariaContext);

  if (!value) {
    throw new Error("You must wrap your component with PizzariaProvider");
  }

  return value;
};
