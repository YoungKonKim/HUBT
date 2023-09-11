import { Pressable, Alert, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import DangerAlert, { AlertTypes } from './DangerAlert';
import { useState } from 'react';
import { deleteCarInfo } from '../api/carinfo';
import event, { EventTypes } from '../event';
import { useUserState } from '../contexts/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../navigations/routes';
import { DANGER, GRAY } from '../colors';

const CarInfoItem = ({ carinfo }) => {
  const options = ['삭제', '수정', '취소'];
  const cancelButtonIndex = 2;
  const destructiveButtonIndex = 0;
  const destructiveColor = DANGER.DEFAULT;

  const navigation = useNavigation();

  const [user] = useUserState();
  const [visible, setVisible] = useState(false);

  const { showActionSheetWithOptions } = useActionSheet();

  const onPressActionSheet = (idx) => {
    if (idx === 0) {
      setVisible(true);
    } else if (idx === 1) {
      navigation.navigate(MainRoutes.CAR_REGISTER, { carinfo });
    }
  };

  const onClose = () => setVisible(false);
  return (
    <>
      <DangerAlert
        alertType={AlertTypes.DELETE_CARINFO}
        visible={visible}
        onClose={onClose}
        onConfirm={async () => {
          try {
            await deleteCarInfo(carinfo.id);
            event.emit(EventTypes.DELETE, { id: carinfo.id });
          } catch (e) {
            Alert.alert('등록된 차량 삭제에 실패했습니다.', e.message);
            onClose();
          }
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>차량번호: {carinfo.carNumber}</Text>
          {carinfo.user.uid === user.uid && (
            <Pressable
              hitSlop={10}
              style={{ right: 20 }}
              onPress={() =>
                showActionSheetWithOptions(
                  {
                    options,
                    destructiveButtonIndex,
                    cancelButtonIndex,
                    destructiveColor,
                  },
                  onPressActionSheet
                )
              }
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color={GRAY.DARK}
              />
            </Pressable>
          )}
        </View>

        <Text style={styles.text}>차량종류: {carinfo.carType}</Text>
        <Text style={styles.text}>사용유종: {carinfo.carFuel}</Text>
      </View>
    </>
  );
};

CarInfoItem.displayName = 'CarInfoItem';

CarInfoItem.propTypes = {
  carinfo: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 15,
  },
});

export default CarInfoItem;
