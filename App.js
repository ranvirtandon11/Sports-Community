import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SplashScreen from './screens/SplashScreen'
import SportsScreen from './screens/SportsScreen';
import CreateEvent from './screens/CreateEvent';
import FootballPitches from './screens/FootballPitches'
import StadiumDetail from './screens/StadiumDetail'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SportsScreen" component={SportsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateEvent" component={CreateEvent} options={{ headerShown: false }} />
      <Stack.Screen name="FootballPitches" component={FootballPitches} options={{ headerShown: false }} />
      <Stack.Screen name="StadiumDetail" component={StadiumDetail} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
