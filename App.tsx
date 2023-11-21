import Routes from './src/routes/index'
import { useFonts } from 'expo-font';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import notifee from '@notifee/react-native';
import { AndroidImportance } from '@notifee/react-native';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export default function App() {

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    await notifee.requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    await messaging().subscribeToTopic("bell")
    console.log("Firebase token:", token);
  }

  useEffect(() => {
    requestUserPermission();
    getToken();

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        vibration: true,
        importance: AndroidImportance.HIGH
      });

      // Display a notification
      await notifee.displayNotification({
        title: 'Echo Gate',
        body: remoteMessage.notification?.body,
        android: {
          channelId,
        },
      });
    });

    return unsubscribe;

  }, [])

  const [fontsLoaded] = useFonts(
    {
      DMBold: require('./assets/fonts/DMSans-Bold.ttf'),
      DMMedium: require('./assets/fonts/DMSans-Medium.ttf'),
      DMRegular: require('./assets/fonts/DMSans-Regular.ttf')
    }
  )

  if (!fontsLoaded) return null;

  return (
    <Routes />
  );
}