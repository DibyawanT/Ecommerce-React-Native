import {Image, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useCartContext} from '../data/cartContext';
import {primaryColorDark} from '../data/constants';
export function TopNavBar({navigation}) {
  const {cartItemList} = useCartContext();
  var sum = 0;
  Object.keys(cartItemList).forEach(e => {
    sum += cartItemList[e].count;
  });
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: primaryColorDark,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 10,
      }}>
      <Image
        source={require('../assets/W.png')}
        resizeMode="cover"
        style={{height: 40, width: 100}}
      />

      <Pressable
        style={{
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="basket"
            size={30}
            color={'white'}
            style={{marginHorizontal: 20}}
          />
          {Object.keys(cartItemList).length > 0 ? (
            <Text
              style={{
                fontSize: 10,
                height: 16,
                width: 16,
                backgroundColor: '#ff0000',
                color: '#fff',
                paddingVertical: 2,
                paddingHorizontal: 2,
                textAlign: 'center',
                borderRadius: 10,
                marginLeft: -20,
              }}>
              {sum}
            </Text>
          ) : (
            <View></View>
          )}
        </View>
      </Pressable>
    </View>
  );
}
