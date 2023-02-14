// React component
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { Image } from 'react-native';

// Screen
import Login from './screen/screen_Login';
import PreLogin1 from './screen/screen_PreLogin1';
import PreLogin2 from './screen/screen_PreLogin2';
import Tabs from './screen/Tabs';

// Font awesome
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {setDB_App, setDB_UEL, setDepartments} from './redux_toolkit/databaseSlice';

// Firebase
import {firebase} from '@react-native-firebase/database';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import SplashScreen from 'react-native-splash-screen';
// Language
import strings from './screen/Language';
// Main
import post_data from './screen/UEL';
const RootStack = createStackNavigator();

function App() {
  const loggedIn = useSelector(state => state.user.loggedIn);
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="PreLogin1">
        {!loggedIn ? (
          <RootStack.Group>
            {(atPreLogin1) ? (
              <RootStack.Screen
              name="PreLogin1"
              component={PreLogin1}
              options={{headerShown: false}}
            />
            ) : ((atPreLogin2) ? (<RootStack.Screen
              name="PreLogin2"
              component={PreLogin2}
              options={{headerShown: false}}
            />) : (<RootStack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />))}
          </RootStack.Group>
        ) : (
          // Auth screens
          <RootStack.Screen
            name="UEL Daily"
            component={Tabs}
            options={{headerShown: false}}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const AppWrapper = () => {
  const dispatch = useDispatch();
  const database_uel = post_data("all_students");
  global.atPreLogin1 = useSelector(state => state.user.atPreLogin1);
  global.atPreLogin2 = useSelector(state => state.user.atPreLogin2);
  useEffect(() => {
      var RNFS = require('react-native-fs');
      firebase
        .app()
        .database(
          'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/departments')
        .once(
          'value',
          (snapshot) => {
            var holder = [];
            snapshot.forEach((childSnapshot) => {
              let childKey = childSnapshot.key;
              let childData = childSnapshot.val();
              var logoLocation = "departments/" + childData.logoUrl;
              RNFS.existsAssets(logoLocation).then((status) => {
                if (!status) {
                  logoLocation = "departments/default.png";
                }
                holder = [...holder, {key: childKey, data: childData, logoLocation: logoLocation}];
              })
              
            });
            setTimeout(() => {
              dispatch(setDepartments(holder));
            },0)

          },
          error => {
            console.error(error);
          },
        );
      firebase
        .app()
        .database(
          'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/users')
        .once(
          'value',
          snapshot => {
            var holder = [];
            snapshot.forEach(childSnapshot => {
              let childKey = childSnapshot.key;
              let childData = childSnapshot.val();
              holder = [...holder, {key: childKey, data: childData}];
            });
            dispatch(setDB_App(holder));
          },
          error => {
            console.error(error);
          },
        );
    
    database_uel.then((response) => {
      dispatch(setDB_UEL(response));
    })

    SplashScreen.hide();
  }, []);
  // const useEffectOnlyOnUpdate = (callback, dependencies) => {
  //   const didMount = React.useRef(false);
  //   React.useEffect(() => {
  //     if (didMount.current) {
  //       callback(dependencies);
  //     } else {
  //       didMount.current = true;
  //     }
  //   }, [callback, dependencies]);
  // };
  // useEffectOnlyOnUpdate((dependencies) => {
  // }, []);

  return <App />;
};
export default AppWrapper;
