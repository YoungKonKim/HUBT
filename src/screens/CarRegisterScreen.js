import { useCallback, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PRIMARY } from '../colors';
import { createCarInfo, updateCarInfo } from '../api/carinfo';
import { useUserState } from '../contexts/UserContext';
import { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import HeaderRight from '../components/HederRight';
import { useEffect } from 'react';
import event, { EventTypes } from '../event';
import SafeInputView from '../components/SafeInputView';

const CarRegisterScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const [carNumber, setCarNumber] = useState('');
  const [carType, setCarType] = useState('');
  const [carFuel, setCarFuel] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [user] = useUserState();

  useEffect(() => {
    if (params) {
      const { carinfo } = params;
      if (carinfo) {
        setCarNumber(carinfo.carNumber);
        setCarType(carinfo.carType);
        setCarFuel(carinfo.carFuel);
      }
    }
  }, [params]);

  useEffect(() => {
    setDisabled(isLoading || !carNumber);
  }, [isLoading, carNumber]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      // 차량정보 수정에서 넘어오면
      if (params) {
        const { carinfo } = params;
        //Database수정
        await updateCarInfo({
          ...carinfo,
          carNumber,
          carType,
          carFuel,
        });
        // useCarInfo로 변경자료를 넘기는 솔루션을 찾아야 updateCarInfo를 쓸수있음
        // event.emit(EventTypes.UPDATE, updateCarInfo);
        event.emit(EventTypes.REFRESH);

        // 차량정보 입력에서 넘어오면
      } else {
        await createCarInfo({
          carNumber,
          carFuel,
          carType,
          user,
        });
        //입력이 완성되면 목록을 새로고침 하기위해 이벤트를 발생시킴
        event.emit(EventTypes.REFRESH);
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('차량정보등록 실패', e.message);
      setIsLoading(false);
    }
  }, [carNumber, carFuel, carType, user, navigation, params]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight disabled={disabled} onPress={onSubmit} />,
    });
  }, [navigation, disabled, onSubmit]);

  // 가상의 제조사 데이터
  const carTypes = ['', '승용차', '지프벤', '승합차', '택시'];
  const carFuels = ['', '고급휘발유', '보통휘발유', '경유'];

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Text style={styles.title}>차량 등록</Text>

        <Text style={styles.label}>차량번호</Text>
        <TextInput
          style={styles.input}
          placeholder="차량 번호를 입력하세요"
          value={carNumber}
          onChangeText={(text) => setCarNumber(text)}
        />

        <Text style={styles.label}>차량종류</Text>
        <Picker
          selectedValue={carType}
          onValueChange={(itemValue) => setCarType(itemValue)}
        >
          {carTypes.map((m, index) => (
            <Picker.Item key={index} label={m} value={m} />
          ))}
        </Picker>

        <Text style={styles.label}>주유유종</Text>
        <Picker
          selectedValue={carFuel}
          onValueChange={(itemValue) => setCarFuel(itemValue)}
        >
          {carFuels.map((fuel, index) => (
            <Picker.Item key={index} label={fuel} value={fuel} />
          ))}
        </Picker>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 5,
    fontWeight: '700',
    fontSize: 20,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: PRIMARY.DEFAULT,
    height: 42,
    paddingHorizontal: 10,
    paddingLeft: 40,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default CarRegisterScreen;
