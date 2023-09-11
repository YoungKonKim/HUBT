import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useUserState } from '../contexts/UserContext';
import { signOut } from '../api/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GRAY, WHITE } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FastImage from '../components/FastImage';
import { useState } from 'react';
import DangerAlert, { AlertTypes } from '../components/DangerAlert';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../navigations/routes';

const ProfileScreen = () => {
  const [user, setUser] = useUserState();

  const { top } = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <DangerAlert
        visible={visible}
        onClose={() => setVisible(false)}
        alertType={AlertTypes.LOGOUT}
        onConfirm={async () => {
          await signOut();
          setUser({});
        }}
      />
      <View style={styles.settingButton}>
        <Pressable onPressIn={() => setVisible(true)} hitSlop={10}>
          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color={GRAY.DARK}
          />
        </Pressable>
      </View>

      <View style={styles.profile}>
        <View
          style={[
            styles.photo,
            user.photoURL || { backgroundColor: GRAY.DEFAULT },
          ]}
        >
          <FastImage source={{ uri: user.photoURL }} style={styles.photo} />
          <Pressable
            style={styles.editButton}
            onPress={() => navigation.navigate(MainRoutes.UPDATE_PROFILE)}
          >
            <MaterialCommunityIcons name="pencil" size={20} color={WHITE} />
          </Pressable>
        </View>

        <Text style={styles.nickname}>{user.displayName || 'nickname'}</Text>
      </View>
      <View style={styles.listContainer}>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate(MainRoutes.PAYMENT_METHOD)}
        >
          결재수단관리
        </Text>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate(MainRoutes.MY_CAR)}
        >
          차량등록관리
        </Text>
        <Text style={styles.text}>이용내역</Text>
        <Text style={styles.text}>나의리뷰보기</Text>
        <Text style={styles.text}>쿠폰</Text>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate(MainRoutes.CAR_REGISTER2)}
        >
          회원정보변경
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  settingButton: {
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBlockColor: GRAY.DEFAULT,
    paddingBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY.DARK,
  },
  nickname: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
    marginTop: 30,
  },
  text: {
    marginTop: 20,
    left: 30,
    fontSize: 18,
  },
});

export default ProfileScreen;
