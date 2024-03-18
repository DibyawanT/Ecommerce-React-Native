import {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import {TextStyles} from '../styles/TextStyle';
import auth from '@react-native-firebase/auth';
import {useUserAuthContext} from '../data/userAuthContext';
import {ID} from 'appwrite';
import {UserAuthStyle} from '../styles/UserAuthStyle';
import {primaryColor, primaryColorDark, showToast} from '../data/constants';
import {account} from '../appwrite/appwriteConfig';

function UserAuthentication({userData}) {
  const {userAuth, setUserAuth} = useUserAuthContext();
  const [isLogin, setIsLogin] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <View
      style={{backgroundColor: primaryColorDark, height: '100%', width: '100'}}>
      <View style={{paddingTop: 20, height: '35%'}}>
        <Image
          source={require('../assets/W.png')}
          resizeMode="contain"
          style={{height: 250, width: 300, alignSelf: 'center'}}
        />
      </View>
      <View
        style={{
          backgroundColor: primaryColor,
          height: '65%',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingTop: 40,
          paddingBottom: 20,
        }}>
        {isLogin ? (
          <View>
            <View style={UserAuthStyle.textField}>
              <TextInput
                placeholder="Enter email id"
                autoComplete="email"
                value={userEmail}
                onChangeText={e => {
                  console.log(e);
                  setUserEmail(e);
                  console.log(userEmail);
                }}
                selectTextOnFocus
              />
            </View>
            <View style={UserAuthStyle.textField}>
              <TextInput
                placeholder="Enter password"
                secureTextEntry
                value={userPassword}
                onChangeText={e => setUserPassword(e)}
              />
            </View>
            <View style={{height: 20}} />
            <Pressable
              onPress={() => {
                setUserAuth(userEmail);
                loginUserWithEmailPass(userEmail, userPassword);
              }}>
              <View style={UserAuthStyle.authBtn}>
                <Text
                  style={{
                    ...TextStyles.medSemiBoldText,
                    color: primaryColorDark,
                  }}>
                  LOGIN
                </Text>
              </View>
            </Pressable>
          </View>
        ) : (
          <View>
            <View style={{marginHorizontal: 10, marginBottom: 10}}>
              <Text style={{fontSize: 15, color: 'grey', fontWeight: '500'}}>
                Create an Account
              </Text>
            </View>
            <View style={UserAuthStyle.textField}>
              <TextInput
                placeholder="Enter email id"
                autoComplete="email"
                value={userEmail}
                onChangeText={e => {
                  console.log(e);
                  setUserEmail(e);
                  console.log(userEmail);
                }}
                selectTextOnFocus
              />
            </View>
            <View style={UserAuthStyle.textField}>
              <TextInput
                placeholder="Create a password"
                secureTextEntry
                value={userPassword}
                onChangeText={e => setUserPassword(e)}
              />
            </View>
            <View style={{height: 20}} />
            <Pressable
              onPress={() => {
                setUserAuth(userEmail);
                createUserWithEmailPass(userEmail, userPassword);
              }}>
              <View style={UserAuthStyle.authBtn}>
                <Text
                  style={{
                    ...TextStyles.medSemiBoldText,
                    color: primaryColorDark,
                  }}>
                  SIGNUP
                </Text>
              </View>
            </Pressable>
          </View>
        )}
        {isLogin ? (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 15,
              alignSelf: 'center',
            }}>
            <Text style={UserAuthStyle.medText}>
              If you don't have an account.
            </Text>
            <Pressable
              onPress={() => {
                setIsLogin(false);
              }}>
              <Text style={{...TextStyles.medBoldText, color: 'black'}}>
                Sign Up
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 15,
              alignSelf: 'center',
            }}>
            <Text style={UserAuthStyle.medText}>Already have an account ?</Text>
            <Pressable
              onPress={() => {
                setIsLogin(true);
              }}>
              <Text
                style={{
                  ...TextStyles.medBoldText,
                  color: 'black',
                  paddingHorizontal: 3,
                }}>
                Log In
              </Text>
            </Pressable>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 15,
            alignSelf: 'center',
          }}>
          <Pressable
            onPress={() => {
              anonymousLogin();
            }}>
            <Text style={{...TextStyles.medSemiBoldText, color: 'grey'}}>
              Want to browse anonymously
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
function loginUserWithEmailPass(email, password) {
  console.log(email);
  console.log(password);
  if (!email || !password) {
    showToast('Please enter the required fields!');
  } else {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        showToast('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          showToast('The Password is incorrect!');
        }

        if (error.code === 'auth/invalid-email') {
          showToast('That email address is invalid!');
        }

        console.error(error);
      });
  }
}
function createUserWithEmailPass(email, password) {
  console.log(email);
  console.log(password);
  if (!email || !password) {
    showToast('Please enter the required fields!');
  } else {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        showToast('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          showToast('The Password is incorrect!');
        }

        if (error.code === 'auth/invalid-email') {
          showToast('That email address is invalid!');
        }

        console.error(error);
      });
  }
}
function anonymousLogin() {
  auth()
    .signInAnonymously()
    .then(() => {
      showToast('Anonymously logged in !');
    })
    .catch(error => {
      if (error.code === 'auth/apoeration-not-allowed') {
        showToast('Enable anonymous in your firebase console.');
      }

      console.error(error);
    });
}

export default UserAuthentication;
