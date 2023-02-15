// React component
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Screen
import Login from './screen/screen_Login';
import PreLogin1 from './screen/screen_PreLogin1';
import PreLogin2 from './screen/screen_PreLogin2';
import Tabs from './screen/Tabs';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setDB_App, setDB_UEL, setDB_Departments } from './redux_toolkit/databaseSlice';
// Firebase
import { firebase } from '@react-native-firebase/database';
import SplashScreen from 'react-native-splash-screen';
// Main
import post_data from './screen/UEL';
import { loadGraphicCards } from './screen/GlobalFunction';
import { setNews_Departments, setSingleNews_Departments } from './redux_toolkit/newsSlice';
const RootStack = createStackNavigator();

function App() {
  const loggedIn = useSelector(state => state.user.loggedIn);
  const atPreLogin1 = useSelector(state => state.user.atPreLogin1);
  const atPreLogin2 = useSelector(state => state.user.atPreLogin2);
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="PreLogin1">
        {!loggedIn ? (
          <RootStack.Group>
            {(atPreLogin1) ? (
              <RootStack.Screen
                name="PreLogin1"
                component={PreLogin1}
                options={{ headerShown: false }}
              />
            ) : ((atPreLogin2) ? (<RootStack.Screen
              name="PreLogin2"
              component={PreLogin2}
              options={{ headerShown: false }}
            />) : (<RootStack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />))}
          </RootStack.Group>
        ) : (
          // Auth screens
          <RootStack.Screen
            name="UEL Daily"
            component={Tabs}
            options={{ headerShown: false }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const AppWrapper = () => {
  const dispatch = useDispatch();
  const db_departments = useSelector(state => state.database.db_departments);
  const db_app = useSelector(state => state.database.db_app);
  const db_uel = useSelector(state => state.database.db_uel);
  const news_Departments = useSelector(state => state.news.news_Departments);
  useEffect(() => {
    const asyncFn = async () => {
      if (db_departments.length == 0) {
        var RNFS = require('react-native-fs');
        await firebase
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
                  holder = [...holder, { key: childKey, data: childData, logoLocation: logoLocation }];
                })

              });
              setTimeout(() => {
                dispatch(setDB_Departments(holder));
              }, 0)

            },
            error => {
              console.error(error);
            },
          );
      }
      if (db_app.length == 0) {
        await firebase
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
                holder = [...holder, { key: childKey, data: childData }];
              });
              dispatch(setDB_App(holder));
            },
            error => {
              console.error(error);
            },
          );
      }
      if (db_uel.length == 0) {
        post_data("all_students").then((response) => {
          dispatch(setDB_UEL(response));
        });
      };
      SplashScreen.hide();
    };
    asyncFn();
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
  useEffect(() => {
    if (db_departments.length != 0 && news_Departments.length == 0) {
      const asyncFn = async () => {
        await db_departments.forEach(async (value, index) => {
          var promise = await loadGraphicCards(value.data.newsLink);
          dispatch(setSingleNews_Departments({ data: promise, identifier: value.data.newsLink }));
        });
      }
      asyncFn();
    }
  }, [db_departments])
  return <App />;
};
export default AppWrapper;
