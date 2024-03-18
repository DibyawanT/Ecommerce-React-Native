import {Pressable, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TextStyles} from '../styles/TextStyle';
import {MKKV} from '../data/constants';
import {ProfileStyles} from '../styles/ProfileStyles';
import {useUserAuthContext} from '../data/userAuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
function Profile() {
  const {userAuth} = useUserAuthContext();
  console.log('>>>' + userAuth);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={ProfileStyles.profileDiv}>
        <Icon name="person-sharp" style={ProfileStyles.profileIcon} size={50} />
      </View>
      <Pressable
        onPress={() =>
          auth()
            .signOut()
            .then(() => {
              MKKV.clearStore();
              console.log('User signed out !');
            })
        }>
        <View
          style={{
            width: 150,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#E5E1DA',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            padding: 5,
          }}>
          <Text style={TextStyles.medSemiBoldText}>LOGOUT</Text>
        </View>
      </Pressable>
    </View>
  );
}
export default Profile;
