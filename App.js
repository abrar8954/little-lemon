
import React, { useEffect, useState } from 'react';
import Onboarding from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import Search from './screens/Search';

const Stack = createNativeStackNavigator();
function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [splashScreen, setSplashScreen] = useState(true);

  useEffect(() => {

    getMultiple();

    setTimeout(() => { setSplashScreen(false) }, 3000);
    // console.log('loggedIn: ', loggedIn[0][1]);

  }, [])

  let getMultiple = async () => {

    let values
    try {
      values = await AsyncStorage.multiGet(['firstName', 'email'])
      setLoggedIn(values);
    } catch (e) {
      // read error
    }
    console.log(values)

  }

  if (splashScreen) {
    return (
      <SplashScreen />
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedIn[0][1] ? (
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
          </>

        ) :
          (
            <>
              <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
              <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            </>
          )


        }

      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaView style={{ flex: 1 }}>
    //   <Onboarding />
    // </SafeAreaView>
  );
}

export default App;
