import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import strings from './Language';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
// import component
import NotificationTab from '../components/NotificationTab';
const Tab = createMaterialTopTabNavigator();

export default function Notifications({navigation}) {
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  useEffect(() => {}, [currentLanguage]);
  return (
    <Tab.Navigator
      initialRouteName="AllNotices"
      screenOptions={{
        tabBarActiveTintColor: '#0065FF',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'none',
        },
        tabBarStyle: {
          backgroundColor: '#F7F9FE',
          paddingVertical: 0,
          textTransform: 'capitalize',
        },
        tabBarPressColor: '#0065FF',
      }}>
      <Tab.Screen
        name="AllNotices"
        component={NotificationTab}
        options={{
          tabBarLabel: strings.all,
          upperCaseLabel: false,
          headerShown: false,
        }}
        initialParams={{pageType: 'all'}}
      />
      <Tab.Screen
        name="WarningNotices"
        component={NotificationTab}
        options={{tabBarLabel: strings.remind, headerShown: false}}
        initialParams={{pageType: 'warning'}}
      />
      <Tab.Screen
        name="UpdateNotices"
        component={NotificationTab}
        options={{tabBarLabel: strings.update, headerShown: false}}
        initialParams={{pageType: 'update'}}
      />
    </Tab.Navigator>
  );
}
