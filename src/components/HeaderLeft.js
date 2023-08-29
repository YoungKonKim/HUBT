import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BLACK } from '../colors';

const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      hitSlop={10}
      onPress={() => navigation.canGoBack() && navigation.goBack()}
    >
      <MaterialCommunityIcons name="chevron-left" size={20} color={BLACK} />
    </Pressable>
  );
};

export default HeaderLeft;
