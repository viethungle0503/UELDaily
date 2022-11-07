// React component
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Screen
import Home from './screen/HomeScreen/screen_Home';
import Services from './screen/screen_Services';
import News from './screen/screen_News';
import Information from './screen/screen_Information';
import Login from './screen/screen_Login';
// Font awesome
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// font Materials
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getDatabaseAccount,getStudent } from './redux_toolkit/databaseSlice';
// Firebase
import { firebase } from '@react-native-firebase/database';

// Main
const Tab = createBottomTabNavigator();

const RootStack = createStackNavigator();

function Tabs() {
  return (
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
          tabBarIcon: ({ color, size }) => (
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
          tabBarIcon: ({ color, size }) => (
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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={size}
            />
          ),
          tabBarBadge: 3,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={News}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
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
            options={{ headerShown: false }}
          />
        ) : (
          // Auth screens
          <RootStack.Screen
            name="UEL Daily"
            component={Tabs}
            options={{ headerShown: false }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      firebase
        .app()
        .database('https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('/users')
        .once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            dispatch(getDatabaseAccount({ "key": childKey, "data": childData }));
          })
        }, (error) => {
          console.error(error);
        });

        firebase
        .app()
        .database('https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('/students')
        .once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            dispatch(getStudent({ "key": childKey, "data": childData }));
          })
        }, (error) => {
          console.error(error);
        });
  },[])
  global.database_app = useSelector(state => state.database.db_app);
  global.database_uel = useSelector(state => state.database.db_uel);
  global.user = useSelector((state) => state.user.user);
  global.uid = useSelector((state) => state.user.UID);
  global.loggedIn = useSelector((state) => state.user.loggedIn);
  global.currentUser = useSelector((state) => state.user.currentUser)
  return (
    <App/>
  );
};

const styles = StyleSheet.create({
  navBottom_container: {
    padding: 5,
  },
});
export default AppWrapper;
