import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ContentRoutes } from './routes';
import HomeScreen from '../screens/HomeScreen';
import ServiceScreen from '../screens/ServiceScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, PRIMARY } from '../colors';

const Tap = createBottomTabNavigator();

const getTabBarIcon = ({ focused, color, size, name }) => {
  const iconName = focused ? name : `${name}-outline`;
  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
};

const ContentTap = () => {
  return (
    <Tap.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY.DARK,
        tabBarInactiveTintColor: GRAY.DARK,
      }}
      initialRouteName={ContentRoutes.PROFILE}
    >
      <Tap.Screen
        name={ContentRoutes.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'home' }),
        }}
      />
      <Tap.Screen
        name={ContentRoutes.SERVICE}
        component={ServiceScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'car' }),
        }}
      />
      <Tap.Screen
        name={ContentRoutes.MAP}
        component={MapScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'map' }),
        }}
      />
      <Tap.Screen
        name={ContentRoutes.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'account' }),
          tabBarLabel: '마이페이지',
        }}
      />
    </Tap.Navigator>
  );
};

export default ContentTap;
