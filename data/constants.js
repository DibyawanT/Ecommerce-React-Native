import {ToastAndroid} from 'react-native';
import {MMKVLoader} from 'react-native-mmkv-storage';

export const MKKV = new MMKVLoader().initialize();
export const CART_ITEM_STORE = 'cart_item_store';
export const HEART_ITEM_LIST = 'heart_item_list';
export const primaryColor = '#EEEDEB';
export const secondaryColor = '#E0CCBE';
export const primaryColorDark = '#3C3633';
export const secondaryColorDark = '#747264';
export const colorOrange = '#FF9843';

export const showToast = text => {
  ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
};
