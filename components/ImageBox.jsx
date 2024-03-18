// import LottieView from 'lottie-react-native';
import {Image, Pressable} from 'react-native';

export function ImageBox({source, size}) {
  return size == 'rectangle' ? (
    <Pressable>
      <Image
        style={{
          width: 130,
          height: 280,
          objectFit: 'fill',
        }}
        source={{uri: source}}
      />
    </Pressable>
  ) : (
    <Pressable>
      <Image
        style={{
          width: 130,
          height: 130,
          objectFit: 'fill',
        }}
        source={{uri: source}}
      />
    </Pressable>
  );
}
