import {StyleSheet} from 'react-native';
import {primaryColor, primaryColorDark} from '../data/constants';

export const ProfileStyles = StyleSheet.create({
  profileDiv: {
    marginTop: 20,
    marginBottom: 20,
    borderColor: primaryColorDark,
    borderRadius: 50,
    height: 100,
    width: 100,
    alignContent: 'center',
    borderWidth: 1,
    alignSelf: 'center',
  },
  profileIcon: {
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
