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
function Products({navigation}) {
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
      Query.equal('company', [category.name]),
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
    <View style={{marginBottom: 90}}>
      <TopNavBar navigation={navigation} />
      <View
        style={{
          height: 70,
          backgroundColor: '#D8D9DA',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-back" size={25} />
        </Pressable>
        <View
          style={{
            height: 60,
            width: 60,
            backgroundColor: 'white',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: category.img}}
            height={40}
            width={40}
            style={{
              objectFit: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            ...TextStyles.bigRegularText,
            marginHorizontal: 10,
            alignContent: 'center',
            alignSelf: 'center',
          }}>
          {category.name.toUpperCase() + ' STORE'}
        </Text>
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

export default Products;
