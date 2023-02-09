import {
  View,
  ActivityIndicator,
} from 'react-native';

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HWTab1 from './screen_HomeworkTab_1';
import HWTab2 from './screen_HomeworkTab_2';
import styles from './HomeScreenStyles/screen_Homework_style'
import strings from '../Language';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  get_web_service_token,
  core_course_get_contents,
  core_user_get_course_user_profiles,
} from '../LMS';
import { useDispatch } from 'react-redux';
import { setModules, setLateModules } from '../../redux_toolkit/userSlice';

const Tab = createMaterialTopTabNavigator();

export default function Homework({ navigation }) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  useEffect(() => {
  }, [currentLanguage])

  const [isLoading, setLoading] = useState(true);
  const [modulesArray, setModulesArray] = useState([]);
  const [lateModulesArray, setLateModulesArray] = useState([]);
  // const [token, setToken] = useState("")
  useEffect(() => {

      var token = "dd5cf5bf97da7bc9ae1ab6a3f53f43af";
    // get_web_service_token().then((value) => {
    //   setToken(value.token);
    // });
    core_user_get_course_user_profiles(token).then((value) => {
      value[0].enrolledcourses.forEach((course) => {
        core_course_get_contents(course.id, token).then((sections) => {
          sections.forEach((section) => {
            if (section.modules.length > 0) {
              var today = new Date()
              section.modules.forEach((module) => {
                if (module.modname == "assign" || module.modname == "quiz") {
                  var index = module.dates.findIndex(x => x.label == "Due:");
                  if (index != -1) {
                    if (((new Date().getTime() - new Date(module.dates[index].timestamp * 1000).getTime())) > 0) {
                      setModulesArray(oldModules => [...oldModules, { fullname: course.fullname, information: module }]);
                    }
                    else {
                      setLateModulesArray(oldModules => [...oldModules, { fullname: course.fullname, information: module }]);
                      
                    }
                  }
                }
              })
            }
          })
        });
      });
      setLoading(false);
    })
    
  }, []);
  useEffect(() => {
    dispatch(setModules(modulesArray));
  },[modulesArray]);
  useEffect(() => {
    dispatch(setLateModules(lateModulesArray));
  },[lateModulesArray]);
  return (
    <View style={styles.body}>
      {isLoading ? (<></>) : (
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
            options={{ tabBarLabel: strings.late_deadline, headerShown: false }}
          />
        </Tab.Navigator>
      )}

    </View>
  );
}
