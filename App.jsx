/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import auth from '@react-native-firebase/auth';
import {ProductStyles} from './styles/ProductStyle';
import {TextStyles} from './styles/TextStyle';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PrivateRoutes from './navigation/PrivateRoutes';
import UserAuthentication from './screens/UserAuthentication';
import {UserAuthProvider} from './data/userAuthContext';
import SplashScreen from 'react-native-splash-screen';
// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('HERE HERE ' + subscriber);
    setTimeout(() => {
      SplashScreen.hide();
    }, 2500);
    return subscriber;
  }, []);
  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView>
        <UserAuthProvider>
          <UserAuthentication userData={user} />
        </UserAuthProvider>
      </SafeAreaView>
    );
  } else {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <UserAuthProvider>
          <PrivateRoutes></PrivateRoutes>
        </UserAuthProvider>
      </GestureHandlerRootView>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default App;
