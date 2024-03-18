import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Categories from '../screens/Categories';
import Products from '../screens/Products';
import {ProductProvider} from '../data/productContext';
import {FavouriteProvider} from '../data/favouriteContext';
import {CartProvider} from '../data/cartContext';
import {Favourites} from '../screens/Favourites';
import {Cart} from '../screens/Cart';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();
function CategoryRoutes() {
  return (
    <ProductProvider>
      <FavouriteProvider>
        <CartProvider>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="MenuCategory">
            <Stack.Screen name="MenuCategory" component={ProductScreen} />
            <Stack.Screen name="Favourites" component={Favourites} />
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </CartProvider>
      </FavouriteProvider>
    </ProductProvider>
  );
}
export default CategoryRoutes;
