import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './screen/HomeScreen/screen_Home';
import Services from './screen/screen_Services';
import News from './screen/screen_News';
import Information from './screen/screen_Information';
import Login from './screen/screen_Login';
// Font awesome
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// font Materials
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider} from 'react-redux';
import {Store} from './redux/store';
import {useSelector, useDispatch} from 'react-redux';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function Tabs() {
  return (
    // <Tab.Navigator
    //   screenOptions={({route}) => ({
    //     activeTintColor: '#0080ff',
    //     inactiveTintColor: '#777777',
    //     labelStyle: {fontSize: 15, fontWeight: 'bold'},
    //     tabBarIcon: ({focused, size, color}) => {
    //       let iconName;
    //       if (route.name === 'Home') {
    //         iconName = 'medal';
    //         size = focused ? 25 : 20;
    //       } else if (route.name === 'Services') {
    //         iconName = 'hand-holding-heart';
    //         size = focused ? 25 : 20;
    //       } else if (route.name === 'News') {
    //         iconName = 'newspaper';
    //         size = focused ? 25 : 20;
    //       } else if (route.name === 'Information') {
    //         iconName = 'info';
    //         size = focused ? 25 : 20;
    //       }
    //       return <FontAwesome5 name={iconName} size={size} color={color} />;
    //     },
    //   })}>
    //   <Tab.Screen
    //     name={'Home'}
    //     component={Home}
    //     options={{headerShown: false}}
    //   />
    //   <Tab.Screen
    //     name={'Services'}
    //     component={Servies}
    //     options={{headerShown: false}}
    //   />
    //   <Tab.Screen
    //     name={'News'}
    //     component={News}
    //     options={{headerShown: false}}
    //   />
    //   <Tab.Screen
    //     name={'Information'}
    //     component={Information}
    //     options={{headerShown: false}}
    //   />
    // </Tab.Navigator>
    <Tab.Navigator
      style={styles.navBottom_container}
      initialRouteName="Home"
      screenOptions={{
        activeTintColor: '#0065FF',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name={'home-variant-outline'}
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Services"
        component={Services}
        options={{
          tabBarLabel: 'Cập nhật',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="earth" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Information"
        component={Information}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={size}
            />
          ),
          tabBarBadge: 4,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={News}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const dispatch = useDispatch();
  const {user, loggedIn} = useSelector(state => state.userReducer);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Login"
        // screenOptions={{
        //   headerTitleAlign: 'center',
        //   headerStyle: {
        //     backgroundColor: '#0080ff'
        //   },
        //   headerTintColor: '#ffffff',
        //   headerTitleStyle: {
        //     fontSize: 25,
        //     fontWeight: 'bold'
        //   }}}
      >
        {!loggedIn ? (
          // Screens for logged in users
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        ) : (
          // Auth screens
          <RootStack.Screen
            name="UEL Daily"
            component={Tabs}
            options={{headerShown: false}}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const AppWrapper = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};
const styles = StyleSheet.create({
  navBottom_container: {
    padding: 5,
  },
});
export default AppWrapper;
