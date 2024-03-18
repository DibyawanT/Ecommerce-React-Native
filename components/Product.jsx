import {Image, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFavouriteContext} from '../data/favouriteContext';
import {useEffect, useState} from 'react';
import {useCartContext} from '../data/cartContext';
import ItemTicker from './ItemTicker';
import {ProductStyles} from '../styles/ProductStyle';
import {
  CART_ITEM_STORE,
  HEART_ITEM_LIST,
  MKKV,
  primaryColor,
  primaryColorDark,
  secondaryColor,
  secondaryColorDark,
} from '../data/constants';
import {TextStyles} from '../styles/TextStyle';

// const getFavStatus = useMemo(id => getProductStatus(id), [favouriteList]);
export default function Product({data}) {
  const {favouriteList, setFavList} = useFavouriteContext();
  const {cartItemList, setCartItemList} = useCartContext();
  console.log('PRODUCT PAGE +++> ');
  console.log(favouriteList);
  console.log('PRODUCT PAGE +++> ');
  console.log(cartItemList);
  console.log('PRODUCT PAGE [Store] +++> ');
  console.log(MKKV.getMap(CART_ITEM_STORE));
  console.log(data);
  return (
    <View style={ProductStyles.outerCard}>
      <View style={ProductStyles.card}>
        <Image
          source={{
            uri: data.image_urls[0],
          }}
          style={ProductStyles.image}
        />
        <Pressable
          style={{zIndex: 9, top: 0, right: -15, position: 'absolute'}}
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
            style={{marginLeft: 20, marginRight: 15}}
          />
        </Pressable>
      </View>
      <View style={ProductStyles.title}>
        <Text style={{...TextStyles.medSemiBoldText, color: 'black'}}>
          {data.name.slice(0, 35)}
        </Text>
      </View>
      <View style={ProductStyles.title}>
        <Text
          style={{
            ...TextStyles.smlRegularText,
            color: secondaryColorDark,
            maxWidth: 130,
          }}>
          {data.description.slice(0, 35)}
        </Text>
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
        }}> */}
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
      {/* <View style={{alignContent: 'center'}}>
          {!cartItemList[data.id] ? (
            <Pressable
              onPress={async () => {
                setCartItemList(prev => {
                  console.log(prev);
                  const clone = {...prev};
                  if (!clone[data.id]) {
                    clone[data.id] = {
                      data: data,
                      count: 1,
                    };
                  }
                  MKKV.setMap(CART_ITEM_STORE, clone);
                  return clone;
                });
              }}>
              <Icon
                name="cart-outline"
                size={26}
                color={'grey'}
                style={{marginHorizontal: 5}}
              />
            </Pressable>
          ) : (
            <ItemTicker data={data} />
          )}
        </View> */}
      {/* </View> */}
    </View>
  );
}
