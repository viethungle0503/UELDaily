import {
  View,
  ActivityIndicator,
  SafeAreaView
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
import notifee,
{
  TimestampTrigger,
  TriggerType,
  AndroidStyle,
} from '@notifee/react-native';

const Tab = createMaterialTopTabNavigator();

export default function Homework({ navigation }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const modules = useSelector(state => state.user.modules);
  const lateModules = useSelector(state => state.user.lateModules);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  useEffect(() => {
    // onCreateTriggerNotification(1679058870000, "week5 objcet")
  }, [currentLanguage])
  const [isLoading, setIsLoading] = useState(true);
  const [modulesArray, setModulesArray] = useState([]);
  const [lateModulesArray, setLateModulesArray] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(0);
  const _MINUTE_IN_TIMESTAMP = 60 * 1000;
  const _HOUR_IN_TIMESTAMP = 60 * _MINUTE_IN_TIMESTAMP;
  const _DAY_IN_TIMESTAMP = 24 * _HOUR_IN_TIMESTAMP;
  const _WEEK_IN_TIMESTAMP = 7 * _DAY_IN_TIMESTAMP;
  async function onCreateTriggerNotification(alertTimeStamp, title) {
    let alertTime = new Date(alertTimeStamp);
    alertTimeStamp -= _MINUTE_IN_TIMESTAMP * 10;
    // Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: alertTimeStamp,
      alarmManager: {
        allowWhileIdle: true,
      },
    };
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'You have a homework',
        body: `<p>Its name is ${title} <br> Its deadline is today at ${alertTime.getHours()}:${alertTime.getMinutes()}<br></p>`,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          style: { type: AndroidStyle.BIGTEXT, text: `<p>Its name is ${title} <br> Its deadline is today at ${alertTime.getHours()}:${alertTime.getMinutes()}</p>` },
          pressAction: {
            launchActivity: "default",
            id: "default"
          }
        },
      },
      trigger,
    );
  }
  useEffect(() => {
    // if (modules.length == 0 || lateModules.length == 0) {
    //   // get_web_service_token().then((value) => {
    //   //   setToken(value.token);
    //   // });
    //   setToken("cae18480750e39a2cf52c7577ffef1e5");
    // }
    // else {
    //   setIsLoading(false);
    // };
    setToken("cae18480750e39a2cf52c7577ffef1e5");
  }, []);
  useEffect(() => {
    if (token != undefined) {
      core_user_get_users_by_field(token, "email", currentUser.email).then((value) => {
        setUserId(value[0].id);
      })
    };
  }, [token])
  useEffect(() => {
    if (token != "" && userId != 0) {
      core_user_get_course_user_profiles(token, 1, userId).then((value) => {
        value[0].enrolledcourses.forEach((course) => {
          core_course_get_contents(token, course.id).then((sections) => {
            sections.forEach((section) => {
              if (section.modules.length > 0) {
                section.modules.forEach((module) => {
                  if (module.modname == "assign" || module.modname == "quiz") {
                    var index = module.dates.findIndex(x => x.label == "Due:");
                    if (index != -1) {
                      let present = new Date().getTime();
                      let destination = new Date(module.dates[index].timestamp * 1000).getTime();
                      if ((present - destination) > 0) {
                        setLateModulesArray(oldModules => [...oldModules, { fullname: course.fullname, information: module }]);
                      }
                      else {
                        setModulesArray(oldModules => [...oldModules, { fullname: course.fullname, information: module }]);
                        onCreateTriggerNotification(destination, module.name);
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
    };
  }, [userId])
  useEffect(() => {
    if (modulesArray.length != 0) {
      var modulesHolder = [...modulesArray];
      modulesHolder.sort((a, b) => {
        return a.information.customdata.substr(a.information.customdata.indexOf(":") + 1, 10) - b.information.customdata.substr(b.information.customdata.indexOf(":") + 1, 10)
      });
      dispatch(setModules(modulesHolder));
    }
  }, [modulesArray]);
  useEffect(() => {
    if (lateModulesArray.length != 0) {
      var lateModulesHolder = [...lateModulesArray];
      lateModulesHolder.sort((a, b) => {
        return b.information.customdata.substr(b.information.customdata.indexOf(":") + 1, 10) - a.information.customdata.substr(a.information.customdata.indexOf(":") + 1, 10)
      });
      dispatch(setLateModules(lateModulesHolder));
    }
  }, [lateModulesArray]);
  return (
    <SafeAreaView style={styles.body}>
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
    </SafeAreaView>
  );
}
