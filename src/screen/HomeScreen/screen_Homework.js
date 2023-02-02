import {
  StyleSheet,
  View,
} from 'react-native';

import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HWTab1 from './screen_HomeworkTab_1';
import HWTab2 from './screen_HomeworkTab_2';
import styles from './HomeScreenStyles/screen_Homework_style'
import strings from '../Language';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();

export default function Homework({navigation}) {
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  useEffect(() => {
  },[currentLanguage])
  return (
    <View style={styles.body}>
     
      <Tab.Navigator
        initialRouteName="HWTab1"
        screenOptions={{
          tabBarActiveTintColor: '#0065FF',
          tabBarInactiveTintColor: 'black',
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            textTransform: 'none',
          },
          tabBarStyle: {
          
            paddingVertical: 0,
           
            textTransform: 'capitalize',
          },
          tabBarPressColor: '#0065FF',
        }}>
        <Tab.Screen
          name="HWTab1"
          component={HWTab1}
          options={{
            tabBarLabel: strings.things_to_do,
            upperCaseLabel: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="HWTab2"
          component={HWTab2}
          options={{tabBarLabel: strings.late_deadline, headerShown: false}}
        />
      </Tab.Navigator>
    </View>
  );
}
