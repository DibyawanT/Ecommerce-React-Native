import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import {HEART_ITEM_LIST, MKKV} from './constants';

const FavouriteContext = createContext(undefined);

function useFavouriteContext() {
  const context = useContext(FavouriteContext);
  if (!context) {
    throw new Error(
      'useFavouriteContext must be used within an ProductProvider',
    );
  }
  return context;
}

const FavouriteProvider = props => {
  const [favouriteList, setFavList] = useState(
    MKKV.getMap(HEART_ITEM_LIST) != null ? MKKV.getMap(HEART_ITEM_LIST) : {},
  );
  return (
    <FavouriteContext.Provider {...props} value={{favouriteList, setFavList}} />
  );
};

export {FavouriteProvider, useFavouriteContext};
