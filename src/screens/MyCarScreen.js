import { View, StyleSheet } from 'react-native';
import CarInfoList from '../components/CarInfoList';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../navigations/routes';
import Button, { ButtonTypes } from '../components/Button';
import { WHITE } from '../colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyCarScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top, paddingBottom: bottom + 70 },
      ]}
    >
      <View>
        <Button
          title="차량추가하기"
          styles={{
            container: { paddingHorizontal: 20 },
            button: { paddingVertical: 15 },
          }}
          onPress={() => navigation.navigate(MainRoutes.CAR_REGISTER)}
          buttonType={ButtonTypes.PRIMARY}
        />
      </View>
      <View style={[styles.listContainer, { paddingBottom: bottom }]}>
        <CarInfoList isMyCarInfo={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  listContainer: {
    flex: 1,
  },
});

export default MyCarScreen;
