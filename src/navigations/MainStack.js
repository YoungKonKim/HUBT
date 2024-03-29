import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '../colors';
import { MainRoutes } from './routes';
import ContentTap from './ContentTap';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ImagePickerScreen from '../screens/ImagePickerScreen';
import HeaderLeft from '../components/HeaderLeft';
import PaymentScreen from '../screens/PaymentScreen';
import MyCarScreen from '../screens/MyCarScreen';
import CarRegisterScreen2 from '../screens/CarRegisterScreen2';
import CarRegisterScreen from '../screens/CarRegisterScreen';

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
      <Stack.Screen name={MainRoutes.PAYMENT} component={PaymentScreen} />
      <Stack.Screen name={MainRoutes.MY_CAR} component={MyCarScreen} />
      <Stack.Screen
        name={MainRoutes.CAR_REGISTER}
        component={CarRegisterScreen}
      />
      <Stack.Screen
        name={MainRoutes.CAR_REGISTER2}
        component={CarRegisterScreen2}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
