import {Text, View} from 'react-native';
import {CategoryStyles} from '../styles/CategoriesStyle';
import {primaryColorDark} from '../data/constants';
import LottieView from 'lottie-react-native';

export function CategoryCardShimmer() {
  return (
    <View style={CategoryStyles.shimmerCard}>
      <LottieView
        source={require('../assets/shimmer.json')}
        style={{
          height: 100,
          width: 150,
          flex: 1,
        }}
        resizeMode="contain"
        autoPlay
      />
    </View>
  );
}
