import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import strings from './Language';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// import component
import AllNotices from './Notices/screen_AllNotices';
import WarningNotices from './Notices/screen_WarningNotices';
import UpdateNotices from './Notices/screen_UpdateNotices';

const Tab = createMaterialTopTabNavigator();

export default function Notifications({ navigation }) {
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  useEffect(() => {
  }, [currentLanguage])
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
        component={AllNotices}
        options={{
          tabBarLabel: strings.all,
          upperCaseLabel: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="WarningNotices"
        component={WarningNotices}
        options={{ tabBarLabel: strings.remind, headerShown: false }}
      />
      <Tab.Screen
        name="UpdateNotices"
        component={UpdateNotices}
        options={{ tabBarLabel: strings.update, headerShown: false }}
      />
    </Tab.Navigator>
  );
}

