import {StyleSheet} from 'react-native';
import {secondaryColor} from '../data/constants';

export const ProductStyles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    position: 'relative',
    padding: 5,
    width: 160,
    borderColor: secondaryColor,
    borderWidth: 1,
    height: 150,
    borderRadius: 10,
  },
  outerCard: {
    marginRight: 10,
    marginLeft: 10,
    marginVertical: 8,
    alignContent: 'center',
  },
  cartCard: {
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  cartImage: {
    backgroundColor: 'white',
    width: '30%',
    margin: 5,
    objectFit: 'contain',
  },
  cartTitle: {
    marginHorizontal: 5,
    marginVertical: 5,
    alignContent: 'center',
    height: 40,
  },
  image: {
    width: 150,
    height: 140,
    objectFit: 'contain',
  },
  title: {
    flexDirection: 'row',
    marginVertical: 5,
    alignContent: 'center',
    width: 130,
    maxWidth: 150,
  },
  price: {
    marginVertical: 5,
    marginEnd: 10,
    alignContent: 'center',
    flexDirection: 'column',
  },
  cardCheckout: {
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E1DA',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 5,
  },
  viewPagerTextStyle: {
    width: 320,
    textAlign: 'center',
  },
});
