import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useCartContext} from '../data/cartContext';
import {CART_ITEM_STORE, MKKV, secondaryColor} from '../data/constants';
import {TextStyles} from '../styles/TextStyle';

export default function ItemTicker({data}) {
  const {cartItemList, setCartItemList} = useCartContext();
  return (
    <View
      style={{
        width: '60%',
        height: '100%',
        backgroundColor: '#FBF9F1',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: secondaryColor,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
      }}>
      <Pressable
        style={{
          width: '20%',
          height: '80%',
          borderRadius: 25,
          alignSelf: 'center',
          backgroundColor: '#E5E1DA',
          alignItems: 'center',
        }}
        onPress={() => {
          setCartItemList(prev => {
            var clone = {...prev};
            if (clone[data.id].count == 1) {
              delete clone[data.id];
            } else {
              clone[data.id] = {
                data: clone[data.id].data,
                count: clone[data.id].count - 1,
                color: clone[data.id].color,
                size: clone[data.id].size,
              };
            }
            console.log('ITEM TICKER>>>>>>>>>');
            console, console.log(clone);
            console.log(MKKV.getMap(CART_ITEM_STORE));
            MKKV.setMap(CART_ITEM_STORE, clone);
            return clone;
          });
        }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              justifyContent: 'center',
            }}>
            -
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          width: '50%',
          alignItems: 'center',
          backgroundColor: '#FBF9F1',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
          }}>
          {cartItemList[data.id].count}
        </Text>
      </View>
      <Pressable
        style={{
          width: '20%',
          height: '80%',
          borderRadius: 25,
          alignSelf: 'center',
          backgroundColor: '#E5E1DA',
          alignItems: 'center',
        }}
        onPress={async () => {
          setCartItemList(prev => {
            var clone = {...prev};
            clone[data.id] = {
              data: clone[data.id].data,
              count: clone[data.id].count + 1,
              color: clone[data.id].color,
              size: clone[data.id].size,
            };
            console.log('ITEM TICKER>>>>>>>>>');
            console.log(MKKV.getMap(CART_ITEM_STORE));
            MKKV.setMap(CART_ITEM_STORE, clone);
            return clone;
          });
        }}>
        <Text
          style={{
            fontSize: 20,
            justifyContent: 'center',
          }}>
          +
        </Text>
      </Pressable>
    </View>
  );
}
