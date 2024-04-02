import {ToastAndroid} from 'react-native';
import {MMKVLoader} from 'react-native-mmkv-storage';
import { database } from '../appwrite/appwriteConfig';

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

export const randomQuote = ()=>{
  const quotes = [
    "Clothes mean nothing until someone lives in them. — Marc Jacobs",
    "In difficult times, fashion is always outrageous. — Elsa Schiaparelli",
    "Style is a way to say who you are without having to speak. — Rachel Zoe",
    "In order to be irreplaceable one must always be different. — Coco Chanel",
    "On Wednesdays, we wear pink. — Karen Smith"
  ]
  const num = Math.floor((Math.random() * quotes.length));
  return quotes[num]
}
