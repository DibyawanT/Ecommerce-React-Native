import {StyleSheet} from 'react-native';
import { secondaryColor } from '../data/constants';

export const UserAuthStyle = StyleSheet.create({
  textField: {
    borderColor: secondaryColor,
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  authBtn: {
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: secondaryColor,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
  },
  medText: {
    fontWeight: '300',
    fontSize: 15,
    color: 'grey',
    marginHorizontal: 3,
  },
});
