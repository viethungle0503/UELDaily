// React component
import React, { useEffect, useState } from 'react';
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
// Main
import post_data from './screen/UEL';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AndroidColor,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import NotificationService from './NotificationService';
import RNBootSplash from "react-native-bootsplash";
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
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
    }
  }
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const db_app = useSelector(state => state.database.db_app);
  const db_uel = useSelector(state => state.database.db_uel);
  const currentUser = useSelector(state => state.user.currentUser);

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log('Notification caused application to open', initialNotification.notification);
      console.log('Press action used to open the app', initialNotification.pressAction);
    }
  }
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
  const asyncUELFn = async () => {
    if (db_uel.length == 0) {
      post_data("all_students").then((response) => {
        dispatch(setDB_UEL(response));
      }).then(() => {
      });
    };
  };
  const sendNotification = async () => {
    let notificationData = {
      title: 'First Notification',
      body: 'Notification Body',
      token:
        'dF4y6UuESueMXtdUsopIKJ:APA91bGHyfMC0D089MHmTRe1KdwODtdBWwB497ZELv_aZU__4x8I4EOLc58KTPxTNvUvUfwkIzocp1FU7wm9cUEWD2Le3-Y1DQRmTTxy6CcArx0k8jO10jw6W5QcCdTK_0UvUBQPCYNv',
    };
    await NotificationService.sendSingleDeviceNotification(notificationData);
  };

  const sendMultiNotification = async () => {
    let notificationData = {
      title: 'First Multi Device Notification',
      body: 'Notification Body',
      token: [
        'dF4y6UuESueMXtdUsopIKJ:APA91bGHyfMC0D089MHmTRe1KdwODtdBWwB497ZELv_aZU__4x8I4EOLc58KTPxTNvUvUfwkIzocp1FU7wm9cUEWD2Le3-Y1DQRmTTxy6CcArx0k8jO10jw6W5QcCdTK_0UvUBQPCYNv',
      ],
    };
    await NotificationService.sendMultiDeviceNotification(notificationData);
  };
  async function DisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage?.data?.title,
      body: `${remoteMessage?.data?.body}`,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        style: { type: AndroidStyle.BIGTEXT, text: `${remoteMessage?.data?.body}` },
      },
    });
    setTimeout(async () => {
      await asyncAppFn();
    }, 2000)

  };
  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
  };
  useEffect(() => {
    // checkToken();
    if (db_app.length == 0 || db_uel.length == 0) {
      asyncAppFn();
      asyncUELFn().finally(async () => {
        await RNBootSplash.hide({ fade: true, duration: 500 });
        // console.log("Bootsplash has been hidden successfully");
      });
    }
    else {
      RNBootSplash.hide({ fade: true });
    }
  }, []);
  useEffect(() => {

  },[currentUser]);
  useEffect(() => {
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('remoteMessage', JSON.stringify(remoteMessage))
      DisplayNotification(remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  // useEffect(() => {
  //   return notifee.onForegroundEvent(({ type, detail }) => {
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         // console.log('User dismissed notification', detail.notification);
  //         break;
  //       case EventType.PRESS:
  //         // console.log('User pressed notification', detail.notification);
  //         break;
  //       case EventType.ACTION_PRESS:
  //         // console.log('User action pressed notification', detail.notification);
  //         break;
  //     }
  //   });
  // }, [])

  // useEffect(() => {
  //   bootstrap()
  //     .then(() => {
  //       setLoading(false)
  //     })
  //     .catch(console.error);
  // }, []);

  // if (loading) {
  //   return null;
  // }
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
