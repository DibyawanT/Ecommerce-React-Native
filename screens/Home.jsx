import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {TopNavBar} from '../components/TopNavBar';
import {ImageBox} from '../components/ImageBox';
import PagerView from 'react-native-pager-view';
import {HomeStyles} from '../styles/HomeStyle';
import {primaryColor, secondaryColor} from '../data/constants';
import {CategoryCardShimmer} from '../components/CategoryCardShimmer';
import {CategoryCard} from '../components/CategoryCard';
import {GlobalStyles} from '../styles/GlobalStyle';
import {useProductContext} from '../data/productContext';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {getAll} from '../appwrite/appwriteService';
import {account, database} from '../appwrite/appwriteConfig';
import {TextStyles} from '../styles/TextStyle';
import {Query} from 'appwrite';
import Product from '../components/Product';

function Home({navigation}) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const {setCategory} = useProductContext();
  const [saleItem, setSaleitem] = useState();
  useEffect(() => {
    const promise = database.listDocuments('shoes', '65ef72f126c4013d5c97');
    const salePromise = database.listDocuments(
      'shoes',
      '65edf99b907171bc05ce',
      [Query.isNotNull('discounted_price')],
    );
    salePromise.then(
      function (response) {
        // console.log(response.documents);
        setSaleitem(response.documents.slice(0, 2));
      },
      function (error) {
        console.log(error);
      },
    );
    promise.then(
      function (response) {
        // console.log(response.documents);
        setData(response.documents);
      },
      function (error) {
        console.log(error);
      },
    );
    console.log(data);
  }, []);
  return (
    <View style={{flex: 1}}>
      <TopNavBar navigation={navigation} />
      <ScrollView
        style={{
          backgroundColor: primaryColor,
        }}>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('ProductScreen', {
                id: '65f74c8251ce99fb1268',
              });
            }}>
            <Image
              source={require('../assets/allstar.png')}
              style={{
                height: 200,
                width: 330,
                objectFit: 'fill',
                borderRadius: 10,
                alignSelf: 'center',
                marginVertical: 20,
              }}
            />
          </Pressable>

          <View style={{flex: 1}}>
            <FlatList
              horizontal
              data={data}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => Math.random()}
              renderItem={({item}) => (
                <View style={{marginBottom: 8}}>
                  <Pressable
                    onPress={() => {
                      setCategory({
                        img: item.image_url,
                        name: item.company_name,
                      });
                      navigation.navigate('CategoryScreen');
                    }}>
                    <CategoryCard itemProps={item} />
                  </Pressable>
                </View>
              )}
            />
          </View>
        </View>
        {/* SEARCH */}
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={TextStyles.bigBoldText}>Today's Sale!</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('SaleScreen');
            }}>
            <Text style={TextStyles.medSemiBoldText}>See More</Text>
          </Pressable>
        </View>

        <View style={{flex: 1}}>
          <FlatList
            horizontal
            data={saleItem}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => Math.random()}
            renderItem={({item}) => (
              <View style={{marginBottom: 8}}>
                <Pressable
                  onPress={() => {
                    console.log('???????>>><<' + item.$id);
                    navigation.navigate('ProductScreen', {
                      id: item.$id,
                    });
                  }}>
                  <Product data={item} />
                </Pressable>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}
export default Home;
