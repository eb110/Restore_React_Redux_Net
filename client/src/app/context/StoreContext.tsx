import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { Basket } from "../models/types";

interface StoreContextValue {
  basket: Basket | null;
  //post automatically provides updated basket so we don't have to
  //instantiate the 'add' function
  setBasket: (basket: Basket) => void;

  //delete from controller doesn't provide the updated basket like
  //post do - this is why we have to handle the state of basket
  //for this function
  removeItem: (productId: number, quantity: number) => void;

  basketCount: () => number;
  basketTotalValue: () => number;
}

type ContextProviderProps = {
    children?: ReactNode
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

//own hook to expand the functionality in case of error
// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext(): StoreContextValue | undefined {
  //react hook
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw Error("store context error - out of provider scope");
  }

  return context;
}

//scope for the app
//property children obtains the type of the location within the scope
export function StoreProvider( { children }: ContextProviderProps): any {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = (productId: number, quantity: number): void => {
    if (!basket) return;
    //deep copy
    const items = [...basket.items];
    const index = items.findIndex((item) => item.productId === productId);
    if (index === -1) return;
    if (items[index].quantity === quantity) items.splice(index, 1);
    else items[index].quantity -= quantity;
    setBasket((prev) => {
      return { ...prev!, items };
    });
  }

  const basketCount = (): number => {
    const count = basket ? basket.items.reduce((sum, item) => sum += item.quantity, 0) : 0;
    return count;
  }

  const basketTotalValue = (): number => {
    const totalValue = basket ? basket.items.reduce((sum, item) => sum += item.quantity * item.price, 0) : 0;
    return totalValue;
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem, basketCount, basketTotalValue }}>
      {children}
    </StoreContext.Provider>
  );
}
