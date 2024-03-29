import {
  Pressable,
  View,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import SafeInputView from '../components/SafeInputView';
import FastImage from '../components/FastImage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUserState } from '../contexts/UserContext';
import { GRAY, WHITE } from '../colors';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import HeaderRight from '../components/HederRight';
import { updateUserInfo } from '../api/auth';
import { MainRoutes } from '../navigations/routes';
import { getLocalUri } from '../components/ImagePicker';
import { uploadPhoto } from '../api/storage';

const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const [user, setUser] = useUserState();

  const [photo, setPhoto] = useState({ uri: user.photoURL });
  const [displayName, setDisplayName] = useState(user.displayName);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //사진변경유무를 체크함.
  const [isPhotoPcik, setIsPhotoPick] = useState(false);

  useEffect(() => {
    if (params) {
      const { selectedPhotos } = params;
      if (selectedPhotos?.length) {
        setPhoto(selectedPhotos[0]);
        setIsPhotoPick(true);
      }
    }
  }, [params]);

  useEffect(() => {
    setDisabled(!displayName || isLoading);
  }, [displayName, isLoading]);

  const onSubmit = useCallback(async () => {
    Keyboard.dismiss();

    if (!disabled) {
      setIsLoading(true);

      try {
        if (isPhotoPcik) {
          const localUri = Platform.select({
            ios: await getLocalUri(photo.id),
            android: photo.uri,
          });

          //Firebase/storage에 사진파일을 업로드한다
          const photoURL = await uploadPhoto({
            uri: localUri,
            uid: user.uid,
          });

          const userInfo = { displayName, photoURL };

          //Firebase/Auth에 닉네임과 사진주소를 변경한다.
          await updateUserInfo(userInfo);

          setUser((prev) => ({ ...prev, ...userInfo }));
        } else {
          //닉네임만 변경한경우
          const userInfo = { displayName };

          await updateUserInfo(userInfo);

          setUser((prev) => ({ ...prev, ...userInfo }));
        }

        navigation.goBack();
      } catch (e) {
        Alert.alert('사용자 수정 실패', e.message);
        setIsLoading(false);
      }
    }
  }, [
    disabled,
    displayName,
    navigation,
    setUser,
    photo.id,
    photo.uri,
    user.uid,
    isPhotoPcik,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight disabled={disabled} onPress={onSubmit} />,
    });
  }, [navigation, disabled, onSubmit]);

  return (
    <SafeInputView>
      <View style={styles.container}>
        <View
          style={[
            styles.photo,
            user.photoURL || { backgroundColor: GRAY.DEFAULT },
          ]}
        >
          <FastImage source={{ uri: photo.uri }} style={styles.photo} />
          <Pressable
            style={styles.imageButton}
            onPress={() => navigation.navigate(MainRoutes.IMAGE_PICKER)}
          >
            <MaterialCommunityIcons name="image" size={20} color={WHITE} />
          </Pressable>
        </View>

        <View>
          <TextInput
            value={displayName}
            onChangeText={(text) => setDisplayName(text.trim())}
            style={styles.input}
            placeholder="NickName"
            textAlign="center"
            maxLength={10}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="none"
          />
        </View>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imageButton: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY.DARK,
  },
  input: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 200,
    fontSize: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY.DEFAULT,
  },
});

export default UpdateProfileScreen;
