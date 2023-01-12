import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';

import React from 'react';
import {useState} from 'react';

import {FlatList} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HWTab1 from './HomeworkLMS/screen_HWTab1';
import HWTab2 from './HomeworkLMS/screen_HWTab2';

const Tab = createMaterialTopTabNavigator();

export default function Homework({navigation}) {
  const [open, setOpen] = React.useState(false);

  async function onDisplayNotification() {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
      },
    });
  }
  return (
    // <View style={{marginTop :250}}>
    //   <Button title="Display Notification" onPress={() => onDisplayNotification()} />
    // </View>

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
