// React component
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// Screen
import Home from './screen/screen_Home';
import News from './screen/screen_News';
import Notifications from './screen/screen_Notifications';
import Profile from './screen/screen_Profile';
import Login from './screen/screen_Login';
import PreLogin1 from './screen/screen_PreLogin1';
import PreLogin2 from './screen/screen_PreLogin2';

// Font awesome
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// font Materials
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import {getDatabaseAccount, getStudent, getDepartments} from './redux_toolkit/databaseSlice';
import {
  setLoggedIn,
  setCurrentUser,
  setCurrentUserProfileImage,
  setScoreBoard,
  setIsDataReady,
} from './redux_toolkit/userSlice';
import {setNews_UEL, setNews_Departments} from './redux_toolkit/newsSlice';
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
import { strings } from './screen/Language';
// Main
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function Tabs() {
  var tabBarBadge = 3;
  var trueUser = database_app.find(
    x => x.data.email == currentUser.data.email,
  );
  trueUser.data.notices.forEach(value => {
    if(value.seen == false) {
      tabBarBadge += 1;
    }
  });
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarLabel: ({focused, size, tintColor}) => {
          let labelName;
          if (route.name === 'Home') {
            labelName = strings.home;
            size = focused ? 11 : 0;
            tintColor = focused ? '#0065FF' : 'gray';
          } else if (route.name === 'News') {
            labelName = strings.news;
            size = focused ? 11 : 0;
            tintColor = focused ? '#0065FF' : 'gray';
          } else if (route.name === 'Notifications') {
            labelName = strings.notifications;
            size = focused ? 11 : 0;
            tintColor = focused ? '#0065FF' : 'gray';
          } else if (route.name === 'Profile') {
            labelName = strings.profile;
            size = focused ? 11 : 0;
            tintColor = focused ? '#0065FF' : 'gray';
          }
          return (
            <Text
              style={{
                color: tintColor,
                fontSize: size,
                marginBottom: 5,
                marginTop: -5,
              }}>
              {labelName}
            </Text>
          );
        },
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            size = focused ? 22 : 25;
          } else if (route.name === 'News') {
            iconName = 'earth';
            size = focused ? 22 : 25;
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'bell' : 'bell-outline';
            size = focused ? 22 : 25;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
            size = focused ? 22 : 25;
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          height: 50,
          color: 'red'
        }
      })}>
      <Tab.Screen name="Home" component={Home} options={{}} />
      <Tab.Screen name="News" component={News} options={{}} />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarBadge: tabBarBadge,
        }}
      />
      <Tab.Screen name="Profile" component={Profile} options={{}} />
    </Tab.Navigator>
  );
}

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
  // News
  global.news_UEL = useSelector(state => state.news.news_UEL);
  global.news_Departments = useSelector(state => state.news.news_Departments);
  // Database
  global.database_app = useSelector(state => state.database.db_app);
  global.database_uel = useSelector(state => state.database.db_uel);
  global.database_departments = useSelector(state =>state.database.db_departments)
  // User
  global.loggedIn = useSelector(state => state.user.loggedIn);
  global.currentUser = useSelector(state => state.user.currentUser);
  global.scoreBoard = useSelector(state => state.user.scoreBoard);
  global.isDataReady = useSelector(state => state.user.isDataReady);
  global.atPreLogin1 = useSelector(state => state.user.atPreLogin1);
  global.atPreLogin2 = useSelector(state => state.user.atPreLogin2);
  // Temporary Parameter
  global.tempArray = [];
  
  const dispatch = useDispatch();
  const cheerio = require('cheerio');
  async function loadGraphicCards(searchUrl) {
    const baseURL = searchUrl.slice(0,searchUrl.lastIndexOf("/"));
    const response = await fetch(searchUrl).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });; // fetch page
    const htmlString = await response.text(); // get response text
    const $ = cheerio.load(htmlString); // parse HTML string
    $('.PageColumns').remove();
    $('#ctl08_ctl01_RadListView1_ClientState').remove();
    $('#ctl08_ctl01_RadListView1').remove();
    $('.nd_news > div').each(function (i, div) {
      let title = $('h4 > a', div).text();
      let time = $('h4 > span', div).text();
      let imageURL = baseURL + $('img', div).attr('src');
      let link = baseURL + $('h4 > a', div).attr('href');
        dispatch(setNews_UEL({title: title, time: time, imageURL: imageURL, link: link}));
    });
    
  };
  function onAuthStateChanged(account) {
    if (account !== null) {
      if (account.email.search(/@st.uel.edu.vn/i) == -1) {
        alert('Vui lòng sử mail email trường cấp');
        signOut();
      } else {
        let i = 0;
        for (let element of database_uel) {
          if (element.data.email == account.email) {
            i = 1;
            dispatch(setCurrentUser(element));
            dispatch(setScoreBoard(element.data.scoreboard));
            dispatch(setCurrentUserProfileImage(account.photoURL));
            dispatch(setLoggedIn(true));
            break;
          }
        }
        if (i == 0) {
          alert('Tài khoản không tồn tại');
          signOut();
        }
      }
    }
  }
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => {
          dispatch(setLoggedIn(false));
          dispatch(setCurrentUser({}));
          dispatch(setScoreBoard({}));
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (global.database_departments.length == 0) {
      var RNFS = require('react-native-fs');
      firebase
        .app()
        .database(
          'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/departments')
        .once(
          'value',
          snapshot => {
            snapshot.forEach(childSnapshot => {
              let childKey = childSnapshot.key;
              let childData = childSnapshot.val();
              var logoLocation = "departments/" + childData.logoUrl
              RNFS.existsAssets(logoLocation).then((status) => {
                if (!status) {
                  logoLocation = "departments/default.png";
                }
                dispatch(getDepartments({key: childKey, data: childData, logoLocation: logoLocation}));
              })
              
            });
            
          },
          error => {
            console.error(error);
          },
        );
        dispatch(setIsDataReady(true));
    };

    if (global.database_app.length == 0) {
      firebase
        .app()
        .database(
          'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/users')
        .once(
          'value',
          snapshot => {
            snapshot.forEach(childSnapshot => {
              let childKey = childSnapshot.key;
              let childData = childSnapshot.val();
              dispatch(getDatabaseAccount({key: childKey, data: childData}));
            });
          },
          error => {
            console.error(error);
          },
        );
    }

    if (global.database_uel.length == 0) {
      firebase
        .app()
        .database(
          'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/students')
        .once(
          'value',
          snapshot => {
            snapshot.forEach(childSnapshot => {
              let childKey = childSnapshot.key;
              let childData = childSnapshot.val();
              dispatch(getStudent({key: childKey, data: childData}));
            });
          },
          error => {
            console.error(error);
          },
        );
    }


    if (global.news_UEL.length == 0) {
      loadGraphicCards("https://uel.edu.vn/tin-tuc");
    }
    SplashScreen.hide();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // unsubscribe on unmount
    return subscriber;
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

const styles = StyleSheet.create({
  navBottom_container: {
    padding: 5,
  },
});
export default AppWrapper;
