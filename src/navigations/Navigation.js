import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import AuthStack from './AuthStack';
import { useEffect, useState } from 'react';
import { Aseet } from 'expo-asset';

const Navigation = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Aseet.fromModule(
          require('../../assets/leaf.png')
        ).downloadAsync();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const onReady = async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onReady}>
      <AuthStack />
    </NavigationContainer>
  );
};

export default Navigation;
