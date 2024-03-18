import {Button, FlatList, Pressable, Text, View} from 'react-native';
import {useCartContext} from '../data/cartContext';
import Product from '../components/Product';
import {GlobalStyles} from '../styles/GlobalStyle';
import {CartItem} from '../components/CartItem';
import {ProductStyles} from '../styles/ProductStyle';
import {ScrollView} from 'react-native-gesture-handler';
import {TextStyles} from '../styles/TextStyle';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  CART_ITEM_STORE,
  MKKV,
  secondaryColor,
  showToast,
} from '../data/constants';
import LottieView from 'lottie-react-native';
import {useEffect, useState} from 'react';

export function Cart({navigation}) {
  const {cartItemList} = useCartContext();
  console.log('CART  PAGE +++> ');
  console.log(MKKV.getMap(CART_ITEM_STORE));
  var sum = 0;
  const [tap, setTap] = useState(0);
  Object.keys(cartItemList).forEach(e => {
    sum +=
      cartItemList[e].count *
      (cartItemList[e].data.discounted_price != null
        ? cartItemList[e].data.discounted_price
        : cartItemList[e].data.price);
  });
  useEffect(() => {
    setTap(0);
  }, []);
  return (
    <View style={{marginBottom: 40}}>
      <View
        style={{
          height: '15%',
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
        <Text style={TextStyles.medBoldText}>Cart</Text>
        <Pressable onPress={() => {}}>
          <Icon name="list" size={26} />
        </Pressable>
      </View>
      <ScrollView>
        {Object.keys(cartItemList).length > 0 ? (
          <>
            {Object.keys(cartItemList).map((e, i) => (
              <CartItem key={`cart-${i}`} data={cartItemList[e].data} />
            ))}
            <View
              style={{
                marginVertical: 5,
                marginHorizontal: 5,
              }}>
              <Pressable
                style={{
                  width: '60%',
                  height: 50,
                  backgroundColor: 'black',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: secondaryColor,
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                }}
                onPress={async () => {
                  if (tap == 1) {
                    setTap(2);
                    showToast('Think Again!, It is your money');
                  } else if (tap == 2) {
                    setTap(0);
                    showToast('This is definetly Saptarshi');
                  } else {
                    setTap(1);
                    showToast(
                      'Are you sure, you want to spend so much on shoes!',
                    );
                  }
                }}>
                <View>
                  <Text
                    style={{
                      ...TextStyles.medRegularText,
                      color: 'white',
                      alignSelf: 'center',
                    }}>
                    Checkout ( ${sum.toFixed(2)} )
                  </Text>
                </View>
              </Pressable>
            </View>
          </>
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
              <Text style={{alignSelf: 'center'}}>Nothing In The Cart</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
