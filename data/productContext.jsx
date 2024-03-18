// react
import React, {createContext, useContext, useState} from 'react';

const ProductContext = createContext(undefined);

function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within an ProductProvider');
  }
  return context;
}

const ProductProvider = props => {
  const [category, setCategory] = useState(null);

  return <ProductContext.Provider {...props} value={{category, setCategory}} />;
};

export {ProductProvider, useProductContext};
