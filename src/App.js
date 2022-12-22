// React component
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// Screen
import Home from './screen/HomeScreen/screen_Home';
import Services from './screen/screen_Services';
import News from './screen/screen_News';
import Information from './screen/screen_Information';
import Login from './screen/screen_Login';
import PreLogin1 from './screen/screen_PreLogin1';
import PreLogin2 from './screen/screen_PreLogin2';

// Font awesome
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// font Materials
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import {getDatabaseAccount, getStudent} from './redux_toolkit/databaseSlice';
import {
  setLoggedIn,
  setCurrentUser,
  setCurrentUserProfileImage,
  setScoreBoard,
} from './redux_toolkit/userSlice';
import {setNews_UEL,setBigPicture,setSmallPicture} from './redux_toolkit/newsSlice';
// Firebase
import {firebase} from '@react-native-firebase/database';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import SplashScreen from 'react-native-splash-screen';
// Main
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarLabel: ({focused, size, tintColor}) => {
          let labelName;
          if (route.name === 'Home') {
            labelName = 'Trang chủ';
            size = focused ? 11 : 0;
            tintColor = focused ? '#0065FF' : 'gray';
          } else if (route.name === 'Services') {
            labelName = 'Cập nhật';
            size = focused ? 11 : 0;
            tintColor = focused ? '#0065FF' : 'gray';
          } else if (route.name === 'Information') {
            labelName = 'Thông báo';
            size = focused ? 11 : 0;
            tintColor = focused ? '#0065FF' : 'gray';
          } else if (route.name === 'Profile') {
            labelName = 'Profile';
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
          } else if (route.name === 'Services') {
            iconName = 'earth';
            size = focused ? 22 : 25;
          } else if (route.name === 'Information') {
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
      <Tab.Screen name="Services" component={Services} options={{}} />
      <Tab.Screen
        name="Information"
        component={Information}
        options={{
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen name="Profile" component={News} options={{}} />
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
            <RootStack.Screen
              name="PreLogin1"
              component={PreLogin1}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="PreLogin2"
              component={PreLogin2}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
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
  global.smallPicture = useSelector(state => state.news.smallPicture);
  global.bigPicture = useSelector(state => state.news.bigPicture);
  // Database
  global.database_app = useSelector(state => state.database.db_app);
  global.database_uel = useSelector(state => state.database.db_uel);
  // User
  global.loggedIn = useSelector(state => state.user.loggedIn);
  global.currentUser = useSelector(state => state.user.currentUser);
  global.scoreBoard = useSelector(state => state.user.scoreBoard)
  const dispatch = useDispatch();
  const cheerio = require('cheerio');
  async function loadGraphicCards(
    searchUrl = `https://uel.edu.vn/tin-tuc`,
    page = 1,
  ) {
    const baseURL = searchUrl.slice(0,searchUrl.lastIndexOf("/"));
    const response = await fetch(searchUrl); // fetch page
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
      if(searchUrl == 'https://uel.edu.vn/tin-tuc') {
        dispatch(setNews_UEL({title: title, time: time, imageURL: imageURL, link: link}));
      }
      else {
        Image.getSize(imageURL, (imgWidth, imgHeight) => {
          if(imgWidth <= imgHeight) {
            dispatch(setBigPicture({title: title, time: time, imageURL: imageURL, link: link}));
          }
          else {
            dispatch(setSmallPicture({title: title, time: time, imageURL: imageURL, link: link}));
          }
        });
      }
      
    });
  };
  function onAuthStateChanged(account) {
    if (account) {
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
    SplashScreen.hide();
    if (global.news_UEL.length == 0) {
      loadGraphicCards();
    }
    loadGraphicCards("https://ctsv.uel.edu.vn/thong-bao-chung-5",1);
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

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // unsubscribe on unmount
    return subscriber;
  }, []);

  return <App />;
};

const styles = StyleSheet.create({
  navBottom_container: {
    padding: 5,
  },
});
export default AppWrapper;
