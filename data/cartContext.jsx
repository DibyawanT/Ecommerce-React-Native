import {createContext, useContext, useState} from 'react';
import {CART_ITEM_STORE, MKKV} from './constants';

const CartContext = createContext(undefined);

function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within an CartProvider');
  }
  return context;
}

const CartProvider = props => {
  console.log('CONTEXT PAGE[store] +++> ');

  console.log(MKKV.getMap(CART_ITEM_STORE));

  const [cartItemList, setCartItemList] = useState(
    MKKV.getMap(CART_ITEM_STORE) != null ? MKKV.getMap(CART_ITEM_STORE) : {},
  );

  return (
    <CartContext.Provider {...props} value={{cartItemList, setCartItemList}} />
  );
};

export {useCartContext, CartProvider};
