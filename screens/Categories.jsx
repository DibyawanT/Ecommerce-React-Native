/* eslint-disable react-native/no-inline-styles */
// ApiComponent.js
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, Pressable} from 'react-native';
import {ProductContext, useProductContext} from '../data/productContext';
import {GlobalStyles} from '../styles/GlobalStyle';
import {CategoryCard} from '../components/CategoryCard';
import {CategoryCardShimmer} from '../components/CategoryCardShimmer';
import Product from '../components/Product';

const Categories = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {setCategory} = useProductContext();
  const datas = {
    id: 123,
    title: 'BABLU SHOES',
    rating: {
      rate: 4.0,
    },
    price: 123,
    image:
      'https://sneakerwiki.net/assets/images/products/196/reebok-furylite-mens-synthetic-mesh-trainers-navy-45-5-eu-blue-2274-main.jpg',
  };
  return <Product data={datas} />;
};
export default Categories;
