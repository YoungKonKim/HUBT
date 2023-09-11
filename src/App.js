import { StatusBar } from 'expo-status-bar';
import Navigation from './navigations/Navigation';
import { UserProvider } from './contexts/UserContext';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const App = () => {
  return (
    <ActionSheetProvider>
      <UserProvider>
        <StatusBar style="dark" />
        <Navigation />
      </UserProvider>
    </ActionSheetProvider>
  );
};

export default App;
