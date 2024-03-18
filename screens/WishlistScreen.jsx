import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import {useProductContext} from '../data/productContext';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Product from '../components/Product';
import {TopNavBar} from '../components/TopNavBar';
import {database} from '../appwrite/appwriteConfig';
import {TextStyles} from '../styles/TextStyle';
import {Query} from 'appwrite';
import {MKKV} from '../data/constants';
import {useFavouriteContext} from '../data/favouriteContext';
import {ScrollView} from 'react-native-gesture-handler';
import ProductFav from '../components/ProductFav';
import LottieView from 'lottie-react-native';
function Wishlist({navigation}) {
  const {favouriteList} = useFavouriteContext();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setProducts(favouriteList);
    setLoading(false);
  });

  return (
    <View style={{marginBottom: 40}}>
      <TopNavBar navigation={navigation} />
      <ScrollView>
        {Object.keys(favouriteList).length > 0 ? (
          Object.keys(favouriteList).map((e, i) => (
            <Pressable
              onPress={() => {
                navigation.navigate('ProductScreen', {
                  id: favouriteList[e].$id,
                });
              }}>
              <ProductFav key={`prod-${i}`} data={favouriteList[e]} />
            </Pressable>
          ))
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 300,
                width: 200,
              }}>
              <LottieView
                source={require('../assets/nothing.json')}
                style={{
                  height: 200,
                  width: 200,
                  flex: 1,
                }}
                autoPlay
              />
              <Text style={{alignSelf: 'center'}}>Nothing In The Wishlist</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default Wishlist;
