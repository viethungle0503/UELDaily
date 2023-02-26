/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Setup from './src/Setup';
import notifee, { EventType } from '@notifee/react-native';
import { firebase } from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
/* polyfills */
/** URL polyfill */
import 'react-native-url-polyfill/auto';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  getFCMToken();
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  await notifee.displayNotification({
    title: remoteMessage?.data?.title,
    body: remoteMessage?.data?.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        launchActivity: "default",
        id: "default"
      }
    },
  });
});
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  console.log("Background service")
  switch (type) {
    case EventType.PRESS:
      // handle the notification and do something
      console.log("EventType.PRESS");
      break;
  }
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    console.log("EventType.ACTION_PRESS");
    // Update external API
    // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
    //   method: 'POST',
    // });

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});
notifee.onForegroundEvent(async ({ type, detail }) => {
  console.log("ForegroundEvent Detected");
  const { notification } = detail;
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      break;
    case EventType.PRESS:
      // handle the notification and do something
      console.log('User pressed notification', detail.notification);
      break;
  }
});
const getFCMToken = () => {
  messaging()
    .getToken()
    .then(token => {
      console.log('token=>>>', token);
    });
};
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <Setup />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
