import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../env';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from 'react-native';

//정상적인 작동을 위해 아래의 install이 필요합니다.
//npx expo install @react-native-async-storage/async-storage
export const initFirebase = () => {
  try {
    const app = initializeApp(firebaseConfig);
    initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    return app;
  } catch (e) {
    //console.log(e);
  }
};
