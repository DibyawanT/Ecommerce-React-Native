import {Pressable, Text, View} from 'react-native';
import {colorOrange, secondaryColorDark} from '../data/constants';
import {Popable} from 'react-native-popable';
import {FlatList} from 'react-native-gesture-handler';
import {TextStyles} from '../styles/TextStyle';

export default function BoxSelector({
  title,
  data,
  selIndex,
  indexSetter,
  forColor,
}) {
  return (
    <View>
      <Text style={TextStyles.bigRegularText}>{title}</Text>
      <View
        style={{
          height: 50,
          width: '100%',
          alignSelf: 'center',
        }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          data={data}
          horizontal
          keyExtractor={item => Math.random()}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => {
                indexSetter(index);
              }}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  borderColor:
                    index == selIndex ? colorOrange : secondaryColorDark,
                  marginHorizontal: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: forColor ? item : 'white',
                }}>
                {forColor ? (
                  <></>
                ) : (
                  <Text
                    style={{
                      ...TextStyles.bigRegularText,
                    }}>
                    {item}
                  </Text>
                )}
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}
