import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import {useProductContext} from '../data/productContext';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Product from '../components/Product';
import {TopNavBar} from '../components/TopNavBar';
import {database} from '../appwrite/appwriteConfig';
import {TextStyles} from '../styles/TextStyle';
import Icon from 'react-native-vector-icons/Ionicons';

import {Query} from 'appwrite';
function SaleScreen({navigation}) {
  const {category} = useProductContext();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // fetch('https://fakestoreapi.com/products/category/' + category)
    //   .then(res => res.json())
    //   .then(json => {
    //     setProducts(json);
    //   });
    const promise = database.listDocuments('shoes', '65edf99b907171bc05ce', [
      Query.isNotNull('discounted_price'),
    ]);
    promise.then(function (response) {
      // console.log(response.documents);
      setProducts(response.documents);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <View style={{marginBottom: 60}}>
      <View
        style={{
          height: '10%',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginHorizontal: 10,
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-back" size={25} />
        </Pressable>
        <Text style={TextStyles.medBoldText}>Today's Sale!</Text>
        <Pressable onPress={() => {}}>
          <Icon name="list" size={26} />
        </Pressable>
      </View>

      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={item => Math.random() * products.length}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              console.log('???????>>><<' + item.$id);
              navigation.navigate('ProductScreen', {
                id: item.$id,
              });
            }}>
            <Product data={item} />
          </Pressable>
        )}
      />
    </View>
  );
}

export default SaleScreen;
