import { createStackNavigator } from '@react-navigation/stack';
import Ctxh from './HomeScreen/screen_Ctxh';
import NewsDetail from './HomeScreen/screen_NewsDetail';
import Exam from './HomeScreen/screen_Exam';
import HomeDisplay from './HomeScreen/screen_HomeDisplay';
import Tuition from './HomeScreen/screen_Tuition';
import Homework from './HomeScreen/screen_Homework';
import ScoreBoard from './HomeScreen/screen_ScoreBoard';
import Schedule from './HomeScreen/screen_Schedule';
import { HeaderBackButton } from '@react-navigation/elements';
import strings from './Language';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { useSelector, useDispatch } from 'react-redux';
import { firebase } from '@react-native-firebase/database';
import { setDB_App } from '../redux_toolkit/databaseSlice';

const HomeStack = createStackNavigator();

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const asyncAppFn = async () => {
    // if (db_app.length == 0) {
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
    // }
  };
  const asyncGetToken = async () => {
    await firebase
      .app()
      .database(
        'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref('/tokens')
      .once(
        'value',
        async (snapshot) => {
          let token = await messaging().getToken()
          if (snapshot.val().includes(token) == false) {
            // console.log("Tạo token");
            let length = (snapshot.val().length)
            await firebase
              .app()
              .database(
                'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
              )
              .ref(`/tokens/${length}`)
              .set(`${token}`)
          }
          else {
            // console.log("Không tạo token");
          }
        },
        error => {
          console.error(error);
        },
      );
  };
  useEffect(() => {
    asyncGetToken();
    // console.log("do i have to run?");
    if(currentUser != null) {
      // console.log("Vừa khởi động lại");
      asyncAppFn();
    }
  },[])
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeDisplay"
        component={HomeDisplay}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Schedule"
        component={Schedule}
        options={({ navigation, route }) => ({
          title: strings.schedule,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (route.params == undefined) {
                  var initBy = ""
                }
                else {
                  var { initBy } = route.params;
                }
                if (initBy != "") {
                  navigation.goBack();
                  navigation.navigate(initBy);
                }
                else {
                  navigation.navigate("HomeDisplay");
                }

              }}
            />
          )
        })}
      />
      <HomeStack.Screen
        name="ScoreBoard"
        component={ScoreBoard}
        options={({ navigation, route }) => ({
          title: strings.scoreboard,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (route.params == undefined) {
                  var initBy = ""
                }
                else {
                  var { initBy } = route.params;
                }
                if (initBy != "") {
                  navigation.goBack();
                  navigation.navigate(initBy);
                }
                else {
                  navigation.navigate("HomeDisplay");
                }

              }}
            />
          )
        })}
      />
      <HomeStack.Screen
        name="Exam"
        component={Exam}
        options={({ navigation, route }) => ({
          title: strings.exam,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (route.params == undefined) {
                  var initBy = ""
                }
                else {
                  var { initBy } = route.params;
                }
                if (initBy != "") {
                  navigation.goBack();
                  navigation.navigate(initBy);
                }
                else {
                  navigation.navigate("HomeDisplay");
                }

              }}
            />
          )
        })}
      />
      <HomeStack.Screen
        name="Ctxh"
        component={Ctxh}
        options={({ navigation, route }) => ({
          title: strings.ctxh,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (route.params == undefined) {
                  var initBy = ""
                }
                else {
                  var { initBy } = route.params;
                }
                if (initBy != "") {
                  navigation.goBack();
                  navigation.navigate(initBy);
                }
                else {
                  navigation.navigate("HomeDisplay");
                }

              }}
            />
          )
        })}
      />
      <HomeStack.Screen
        name="Homework"
        component={Homework}
        options={({ navigation, route }) => ({
          title: strings.homework,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (route.params == undefined) {
                  var initBy = ""
                }
                else {
                  var { initBy } = route.params;
                }
                if (initBy != "") {
                  navigation.goBack();
                  navigation.navigate(initBy);
                }
                else {
                  navigation.navigate("HomeDisplay");
                }

              }}
            />
          )
        })}
      />
      <HomeStack.Screen
        name="Tuition"
        component={Tuition}
        options={({ navigation, route }) => ({
          title: strings.tuition,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (route.params == undefined) {
                  var initBy = ""
                }
                else {
                  var { initBy } = route.params;
                }
                if (initBy != "") {
                  navigation.goBack();
                  navigation.navigate(initBy);
                }
                else {
                  navigation.navigate("HomeDisplay");
                }

              }}
            />
          )
        })}
      />
      <HomeStack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{
          headerShown: true,
          title: "Chi tiết"
        }}
      />
    </HomeStack.Navigator>
  );
}


