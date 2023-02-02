import {Text, 
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import strings from './Language';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// Font Materials
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Screen
import Home from './screen_Home';
import News from './screen_News';
import Notifications from './screen_Notifications';
import Profile from './screen_Profile';

const Tab = createBottomTabNavigator();
export default function Tabs() {
    const currentLanguage = useSelector(state => state.user.currentLanguage);
    useEffect(()=> {
    },[currentLanguage]);
    var tabBarBadge = 3;
    var trueUser = database_app.find(
      x => x.data.email == currentUser.data.email,
    );
    trueUser.data.notices.forEach(value => {
      if(value.seen == false) {
        tabBarBadge += 1;
      }
    });
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarLabel: ({focused, size, tintColor}) => {
            let labelName;
            if (route.name === 'Home') {
              labelName = strings.home;
              size = focused ? 11 : 0;
              tintColor = focused ? '#0065FF' : 'gray';
            } else if (route.name === 'News') {
              labelName = strings.news;
              size = focused ? 11 : 0;
              tintColor = focused ? '#0065FF' : 'gray';
            } else if (route.name === 'Notifications') {
              labelName = strings.notifications;
              size = focused ? 11 : 0;
              tintColor = focused ? '#0065FF' : 'gray';
            } else if (route.name === 'Profile') {
              labelName = strings.profile;
              size = focused ? 11 : 0;
              tintColor = focused ? '#0065FF' : 'gray';
            }
            return (
              <Text
                style={{
                  color: tintColor,
                  fontSize: size,
                  marginBottom: 5,
                  marginTop: -5,
                }}>
                {labelName}
              </Text>
            );
          },
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              size = focused ? 22 : 25;
            } else if (route.name === 'News') {
              iconName = 'earth';
              size = focused ? 22 : 25;
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'bell' : 'bell-outline';
              size = focused ? 22 : 25;
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account' : 'account-outline';
              size = focused ? 22 : 25;
            }
            return (
              <MaterialCommunityIcons name={iconName} size={size} color={color} />
            );
          },
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            alignItems: 'center',
            height: 50,
            color: 'red'
          }
        })}>
        <Tab.Screen name="Home" component={Home} options={{}} />
        <Tab.Screen name="News" component={News} options={{}} />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarBadge: tabBarBadge,
          }}
        />
        <Tab.Screen name="Profile" component={Profile} options={{}} />
      </Tab.Navigator>
    );
  }