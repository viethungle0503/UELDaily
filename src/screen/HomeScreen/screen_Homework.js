import {
  StyleSheet,
  View,
} from 'react-native';

import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';


import HWTab1 from './HomeworkLMS/screen_HWTab1';
import HWTab2 from './HomeworkLMS/screen_HWTab2';

const Tab = createMaterialTopTabNavigator();

export default function Homework({navigation}) {
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
          style={styles.notiHeader_Sort_btnActive}
          name="HWTab1"
          component={HWTab1}
          options={{
            tabBarLabel: 'Việc cần làm',
            upperCaseLabel: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="HWTab2"
          component={HWTab2}
          options={{tabBarLabel: 'Trễ deadline', headerShown: false}}
        />
      </Tab.Navigator>

      
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  
});
