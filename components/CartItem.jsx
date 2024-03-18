import {Image, Pressable, Text, View} from 'react-native';
import {ProductStyles} from '../styles/ProductStyle';
import ItemTicker from './ItemTicker';
import {useCartContext} from '../data/cartContext';
import {TextStyles} from '../styles/TextStyle';
import {
  primaryColor,
  primaryColorDark,
  secondaryColor,
} from '../data/constants';
export function CartItem({data}) {
  const {cartItemList, setCartItemList} = useCartContext();
  return (
    <View style={ProductStyles.cartCard}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{
            uri: data.image_urls[0],
          }}
          style={ProductStyles.cartImage}
        />
        <View style={{flexDirection: 'column', width: '65%'}}>
          <View style={ProductStyles.cartTitle}>
            <Text style={{...TextStyles.medSemiBoldText, color: 'black'}}>
              {data.name}
            </Text>
            <Text style={TextStyles.medRegularText}>Mens Shoe</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 5,
              marginVertical: 5,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: primaryColor,
                height: 30,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <Text
                style={{
                  ...TextStyles.medRegularText,
                }}>
                {cartItemList[data.id].size},{cartItemList[data.id].color}
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
                  {(cartItemList[data.id].count * data.price).toFixed(2)}
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
                    {(
                      cartItemList[data.id].count * data.discounted_price
                    ).toFixed(2)}
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 2,
          marginVertical: 5,
          backgroundColor: primaryColor,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 5,
          marginVertical: 5,
        }}>
        <View
          style={{
            width: '40%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={TextStyles.medSemiBoldText}>Add to wishlist</Text>
        </View>
        <View
          style={{
            width: '60%',
            height: 40,
            alignItems: 'flex-end',
          }}>
          <ItemTicker data={data} />
        </View>
      </View>
    </View>
  );
}
