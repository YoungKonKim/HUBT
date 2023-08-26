import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainRoutes } from './routes';
import ProfileScreen from '../screens/ProfileScreen';
import { WHITE } from '../colors';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
      }}
    >
      <Stack.Screen name={MainRoutes.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
