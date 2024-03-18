import {Image, Text, View} from 'react-native';
import {CategoryStyles} from '../styles/CategoriesStyle';
import {TextStyles} from '../styles/TextStyle';

export function CategoryCard({itemProps}) {
  return (
    <View
      style={{
        marginHorizontal: 5,
      }}>
      <View style={CategoryStyles.card}>
        <Image
          source={{
            uri: itemProps.image_url,
          }}
          height={45}
          width={45}
          style={{
            objectFit: 'contain',
          }}
        />
      </View>
      <Text style={{...TextStyles.smlRegularText, alignSelf: 'center'}}>
        {itemProps.title}
      </Text>
    </View>
  );
}
