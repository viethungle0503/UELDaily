import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Text,
} from 'react-native';
import Home from './screen/screen_Home';
import Servies from './screen/screen_Services'
import News from './screen/screen_News';
import Information from './screen/screen_Information';
import Login from './screen/screen_Login';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { useSelector, useDispatch } from 'react-redux';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'clipboard-list';
              size = focused ? 25 : 20;
            } else if (route.name === 'Services') {
              iconName = 'hand-holding-heart';
              size = focused ? 25 : 20;
            }
            else if (route.name === 'News') {
              iconName = 'newspaper';
              size = focused ? 25 : 20;
            }
            else if (route.name === 'Information') {
              iconName = 'info';
              size = focused ? 25 : 20;
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        })
      }
      tabBarOptions={{
        activeTintColor: '#0080ff',
        inactiveTintColor: '#777777',
        labelStyle: { fontSize: 15, fontWeight: 'bold' }
      }}
    >
      <Tab.Screen name={'Home'} component={Home} />
      <Tab.Screen name={'Services'} component={Servies} />
      <Tab.Screen name={'News'} component={News} />
      <Tab.Screen name={'Information'} component={Information} />
    </Tab.Navigator>
  );
}

function App() {
  const dispatch = useDispatch();
  const { user, loggedIn } = useSelector(state => state.userReducer);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff'
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold'
          }
        }}
      >
        {
          !loggedIn ?
            <RootStack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            :
            <RootStack.Screen
              name="Tabs"
              component={Tabs}
            />
        }
      </RootStack.Navigator>
    </NavigationContainer>

  )
};

const AppWrapper = () => {
  const store = Store;
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
};

export default AppWrapper;