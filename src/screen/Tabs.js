import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import strings from './Language';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
// Font Materials
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Screen
import Home from './screen_Home';
import News from './screen_News';
import Notifications from './screen_Notifications';
import Profile from './screen_Profile';
import {setUnreadNotice} from '../redux_toolkit/userSlice';

const Tab = createBottomTabNavigator();
export default function Tabs() {
  const dispatch = useDispatch();
  const db_app = useSelector(state => state.database.db_app);
  const currentUser = useSelector(state => state.user.currentUser);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const unreadNotice = useSelector(state => state.user.unreadNotice);
  useEffect(() => {}, [currentLanguage, unreadNotice]);

  useEffect(() => {
    if (db_app !== null) {
      let tabBarBadge = 0;
      db_app.data.notices.forEach(value => {
        if (value !== null) {
          if (value.seen == false) {
            tabBarBadge += 1;
          }
        }
      });
      dispatch(setUnreadNotice(tabBarBadge));
    }
  }, [db_app]);

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
          color: 'red',
        },
      })}>
      <Tab.Screen name="Home" component={Home} options={{}} />
      <Tab.Screen name="News" component={News} options={{}} />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarBadge: unreadNotice != 0 ? unreadNotice : null,
        }}
      />
      <Tab.Screen name="Profile" component={Profile} options={{}} />
    </Tab.Navigator>
  );
}
