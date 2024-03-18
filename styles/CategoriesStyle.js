import {StyleSheet} from 'react-native';
import {
  primaryColor,
  primaryColorDark,
  secondaryColor,
} from '../data/constants';

export const CategoryStyles = StyleSheet.create({
  card: {
    height: 60,
    width: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'white',
  },
  shimmerCard: {
    backgroundColor: primaryColor,
    height: 100,
    width: 150,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: secondaryColor,
  },
});
