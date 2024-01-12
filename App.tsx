import React, {useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {Provider} from 'react-redux';
import {checkTheme, selectTheme} from './src/app/appSlice';
import {useAppDispatch, useAppSelector} from './src/app/hooks';
import store from './src/app/store';
import {determineThemeData} from './src/app/theme';
import {CounterScreen} from './src/screens/counter/CounterScreen';
import {HomeScreen} from './src/screens/home/HomeScreen';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppScreen />
    </Provider>
  );
};
export default App;

// App screen
export type RootTabParamList = {
  Home: {};
  Counter: {
    currentValue: number;
  };
  Notifications: {};
  Profile: {};
};
const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

const AppScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const themeToUse = determineThemeData(theme);

  useEffect(() => {
    // Checking user saving theme.
    console.log('appscreen: checking user saving theme');
    dispatch(checkTheme());
  }, []);

  return (
    <PaperProvider theme={themeToUse.data}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: 'home-outline',
              tabBarAccessibilityLabel: 'Home',
            }}
          />
          <Tab.Screen
            name="Counter"
            component={CounterScreen}
            options={{
              tabBarIcon: 'ab-testing',
              tabBarAccessibilityLabel: 'Counter',
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={CounterScreen}
            options={{
              tabBarIcon: 'bell-outline',
              tabBarAccessibilityLabel: 'Notifications',
            }}
          />
          <Tab.Screen
            name="Profile"
            component={CounterScreen}
            options={{
              tabBarIcon: 'account-outline',
              tabBarAccessibilityLabel: 'Profile',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
