import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '../colors';
import { MainRoutes } from './routes';
import ContentTap from './ContentTap';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ImagePickerScreen from '../screens/ImagePickerScreen';
import HeaderLeft from '../components/HeaderLeft';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import MyCarScreen from '../screens/MyCarScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        title: '',
        headerLeft: HeaderLeft,
      }}
    >
      <Stack.Screen
        name={MainRoutes.CONTENT_TAB}
        component={ContentTap}
        options={{ headerShadow: false }}
      />
      <Stack.Screen
        name={MainRoutes.UPDATE_PROFILE}
        component={UpdateProfileScreen}
      />
      <Stack.Screen
        name={MainRoutes.IMAGE_PICKER}
        component={ImagePickerScreen}
      />
      <Stack.Screen
        name={MainRoutes.PAYMENT_METHOD}
        component={PaymentMethodScreen}
      />
      <Stack.Screen name={MainRoutes.MY_CAR} component={MyCarScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
