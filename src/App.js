import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import Navigation from './navigations/Navigation';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  LogBox.ignoreLogs([
    'You are initializing Firebase Auth for React Native without providing AsyncStorage',
  ]);

  return (
    <UserProvider>
      <StatusBar style="dark" />
      <Navigation />
    </UserProvider>
  );
};

export default App;
