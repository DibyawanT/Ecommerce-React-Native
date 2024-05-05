import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyTabs from './BottomTabs';
// import HomeRoutes from './HomeRoutes';
import {Favourites} from '../screens/Favourites';
import Products from '../screens/Products';
import ProductScreen from '../screens/ProductScreen';
import {Cart} from '../screens/Cart';
import {CartProvider} from '../data/cartContext';
import {ProductProvider} from '../data/productContext';
import {FavouriteProvider} from '../data/favouriteContext';
import SaleScreen from '../screens/SaleScreen';
import { CameraScreen } from '../screens/Camera';

const Stack = createNativeStackNavigator();
function PrivateRoutes() {
  return (
    <CartProvider>
      <ProductProvider>
        <FavouriteProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="HomeNavigator">
              <Stack.Screen name="HomeNavigator" component={MyTabs} />
              <Stack.Screen name="Favourites" component={Favourites} />
              <Stack.Screen name="CategoryScreen" component={Products} />
              <Stack.Screen name="SaleScreen" component={SaleScreen} />
              <Stack.Screen name="ProductScreen" component={ProductScreen} />
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name = "Camera" component={CameraScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </FavouriteProvider>
      </ProductProvider>
    </CartProvider>
  );
}
export default PrivateRoutes;
