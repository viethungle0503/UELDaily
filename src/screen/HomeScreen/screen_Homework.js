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
  core_user_get_users_by_field
} from '../LMS';
import { useDispatch } from 'react-redux';
import { setModules, setLateModules } from '../../redux_toolkit/userSlice';

const Tab = createMaterialTopTabNavigator();

export default function Homework({ navigation }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  useEffect(() => {
  }, [currentLanguage])

  const [isLoading, setIsLoading] = useState(true);
  const [modulesArray, setModulesArray] = useState([]);
  const [lateModulesArray, setLateModulesArray] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    // var token = "dd5cf5bf97da7bc9ae1ab6a3f53f43af";
    get_web_service_token().then((value) => {
      setToken(value.token);
    });
  }, []);
  useEffect(() => {
    if(token != "") {
      core_user_get_users_by_field(token,"email",currentUser.email).then((value) => {
        console.log(value[0].id)
        setUserId(value[0].id);
      })
    }
  },[token])
  useEffect(() => {
    if(token != "" && userId != 0) {
      core_user_get_course_user_profiles(token,1,userId).then((value) => {
        value[0].enrolledcourses.forEach((course) => {
          core_course_get_contents(token, course.id).then((sections) => {
            sections.forEach((section) => {
              if (section.modules.length > 0) {
                var today = new Date()
                section.modules.forEach((module) => {
                  if (module.modname == "assign" || module.modname == "quiz") {
                    var index = module.dates.findIndex(x => x.label == "Due:");
                    if (index != -1) {
                      if (((new Date().getTime() - new Date(module.dates[index].timestamp * 1000).getTime())) > 0) {
                        setLateModulesArray(oldModules => [...oldModules, { fullname: course.fullname, information: module }]);
                      }
                      else {
                        setModulesArray(oldModules => [...oldModules, { fullname: course.fullname, information: module }]);
  
                      }
                    }
                  }
                })
              }
            })
          });
        });
        setIsLoading(false);
      })
    }

  }, [userId])
  useEffect(() => {
    var modulesHolder = [...modulesArray];
    modulesHolder.sort((a, b) => {
      return a.information.customdata.substr(a.information.customdata.indexOf(":") + 1, 10) - b.information.customdata.substr(b.information.customdata.indexOf(":") + 1, 10)
    });
    dispatch(setModules(modulesHolder));
  }, [modulesArray]);
  useEffect(() => {
    var lateModulesHolder = [...lateModulesArray];
    lateModulesHolder.sort((a, b) => {
      return b.information.customdata.substr(b.information.customdata.indexOf(":") + 1, 10) - a.information.customdata.substr(a.information.customdata.indexOf(":") + 1, 10)
    });
    dispatch(setLateModules(lateModulesHolder));
  }, [lateModulesArray]);
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
