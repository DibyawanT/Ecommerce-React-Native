import {
  ActivityIndicator,
  Image,
  Pressable,
  Share,
  Text,
  View,
} from 'react-native';
import {
  CART_ITEM_STORE,
  HEART_ITEM_LIST,
  MKKV,
  colorGreen,
  colorOrange,
  primaryColor,
  primaryColorDark,
  secondaryColor,
  secondaryColorDark,
  showToast,
} from '../data/constants';
import PagerView from 'react-native-pager-view';
import {HomeStyles} from '../styles/HomeStyle';
import {ProductStyles} from '../styles/ProductStyle';
import {FlatList} from 'react-native-gesture-handler';
import {TextStyles} from '../styles/TextStyle';
import {database} from '../appwrite/appwriteConfig';
import {useCallback, useEffect, useState} from 'react';
import Dots from 'react-native-dots-pagination';
import BoxSelector from '../components/BoxSelector';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFavouriteContext} from '../data/favouriteContext';
import {useCartContext} from '../data/cartContext';
import ItemTicker from '../components/ItemTicker';

function ProductScreen({navigation, route}) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [selIndex, setIndex] = useState();
  const [colIndex, setColIndex] = useState();
  var sizes = [8, 9, 10, 11, 12];
  var colors = ['#FEFBF6', '#222831', '#496989', '#007F73'];
  const {id} = route.params;
  const {favouriteList, setFavList} = useFavouriteContext();
  const {cartItemList, setCartItemList} = useCartContext();

  useEffect(() => {
    console.log('FavList>>' + favouriteList);
    console.log('CartItemList>>' + JSON.stringify(cartItemList));
    const promise = database.getDocument('shoes', '65edf99b907171bc05ce', id);
    promise.then(function (response) {
      console.log(response);
      setData(response);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <View
      style={{
        backgroundColor: 'white',
      }}>
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
        <Text style={TextStyles.medRegularText}>Mens Shoe</Text>
        <Pressable
          onPress={() => {
            setFavList(prev => {
              const clone = {...prev};
              if (clone[data.id]) {
                delete clone[data.id];
              } else {
                clone[data.id] = data;
              }
              MKKV.setMap(HEART_ITEM_LIST, clone);
              return clone;
            });
          }}>
          <Icon
            name={favouriteList[data.id] ? 'heart-sharp' : 'heart-outline'}
            size={26}
            color={favouriteList[data.id] ? 'red' : 'grey'}
          />
        </Pressable>
      </View>
      <View
        style={{
          height: '35%',
          width: 350,
          alignSelf: 'center',
        }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          data={data.image_urls}
          horizontal
          keyExtractor={item => Math.random()}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              style={{
                width: 350,
                height: 250,
              }}>
              <Image
                width={350}
                height={230}
                source={{uri: item}}
                style={{
                  objectFit: 'contain',
                }}
              />
              <Dots
                activeDotWidth={6}
                activeDotHeight={6}
                passiveDotHeight={5}
                passiveDotWidth={5}
                length={data.image_urls.length}
                activeColor={'#000'}
                active={index}
              />
            </View>
          )}
        />
      </View>
      <View
        style={{
          backgroundColor: primaryColor,
          height: '55%',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingTop: 20,
          paddingBottom: 10,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '70%',
              }}>
              <Text style={{...TextStyles.bigSemiBoldText, color: 'black'}}>
                {data.name}
              </Text>
            </View>
            <View style={ProductStyles.price}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    ...TextStyles.medSemiBoldText,
                    color: secondaryColor,
                    marginEnd: 3,
                  }}>
                  $
                </Text>
                <Text
                  style={{
                    ...TextStyles.medSemiBoldText,
                    color: 'black',
                    textDecorationLine:
                      data.discounted_price == null ? 'none' : 'line-through',
                  }}>
                  {data.price}
                </Text>
              </View>
              {data.discounted_price != null ? (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      ...TextStyles.medSemiBoldText,
                      color: secondaryColor,
                      marginEnd: 3,
                    }}>
                    $
                  </Text>
                  <Text
                    style={{
                      ...TextStyles.medSemiBoldText,
                      color: 'black',
                    }}>
                    {data.discounted_price}
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '70%',
              }}>
              <Text style={{...TextStyles.medRegularText, marginVertical: 5}}>
                {data.description}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 2,
              marginVertical: 5,
              backgroundColor: primaryColorDark,
            }}></View>
        </View>
        <BoxSelector
          data={sizes}
          forColor={false}
          indexSetter={setIndex}
          selIndex={selIndex}
          title={'Select Size (UK)'}
        />
        <BoxSelector
          data={colors}
          forColor={true}
          indexSetter={setColIndex}
          selIndex={colIndex}
          title={'Select Color'}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Pressable
            onPress={() => {
              Share.share({
                message: 'Checkout' + data.name + 'at WIJIO',
              });
            }}
            style={{
              width: '15%',
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: secondaryColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="share-social" size={25} />
          </Pressable>

          <Pressable
            style={{
              width: '15%',
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: secondaryColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('Cart');
            }}>
            <View>
              <Icon name="basket" size={25} />
            </View>
          </Pressable>
          {!cartItemList[data.id] ? (
            <Pressable
              style={{
                width: '60%',
                height: 50,
                backgroundColor: 'black',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: secondaryColor,
                justifyContent: 'center',
              }}
              onPress={async () => {
                if (colIndex == null) {
                  showToast('Please Select a Shoe Color');
                } else if (selIndex == null) {
                  showToast('Please Select a Shoe Size');
                } else {
                  setCartItemList(prev => {
                    console.log(prev);
                    const clone = {...prev};
                    if (!clone[data.id]) {
                      clone[data.id] = {
                        data: data,
                        count: 1,
                        color: colors[colIndex],
                        size: sizes[selIndex],
                      };
                    }
                    MKKV.setMap(CART_ITEM_STORE, clone);
                    return clone;
                  });
                }
              }}>
              <View>
                <Text
                  style={{
                    ...TextStyles.bigRegularText,
                    color: 'white',
                    alignSelf: 'center',
                  }}>
                  Add To Cart
                </Text>
              </View>
            </Pressable>
          ) : (
            <ItemTicker data={data} />
          )}
        </View>
      </View>
    </View>
  );
}
export default ProductScreen;
