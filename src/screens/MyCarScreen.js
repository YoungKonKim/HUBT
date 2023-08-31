import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PRIMARY } from '../colors';

const MyCarScreen = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [carType, setCarType] = useState('');
  const [carName, setCarName] = useState('');
  const [carNumber, setCarNumber] = useState('');

  const registerCar = () => {
    // 차량 정보를 등록하는 로직
    console.log('제조회사:', manufacturer);
    console.log('차량 종류:', carType);
    console.log('차량 이름:', carName);
    console.log('차량 번호:', carNumber);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={[styles.title, { bottom: 10 }]}>차량 등록 화면</Text>
        <Text style={styles.title}>제조회사</Text>
        <Picker
          style={styles.picker}
          selectedValue={manufacturer}
          onValueChange={(itemValue) => setManufacturer(itemValue)}
        >
          <Picker.Item label="선택하세요" value="" />
          <Picker.Item label="현대" value="Hyundai" />
          <Picker.Item label="기아" value="Kia" />
          {/* 여기에 더 많은 제조회사를 추가할 수 있습니다. */}
        </Picker>

        <Text style={styles.title}>차량종류</Text>
        <Picker
          selectedValue={carType}
          onValueChange={(itemValue) => setCarType(itemValue)}
        >
          <Picker.Item label="선택하세요" value="" />
          <Picker.Item label="세단" value="Sedan" />
          <Picker.Item label="SUV" value="SUV" />
          {/* 여기에 더 많은 차량 종류를 추가할 수 있습니다. */}
        </Picker>

        <Text style={styles.title}>차량이름</Text>
        <Picker
          selectedValue={carType}
          onValueChange={(itemValue) => setCarName(itemValue)}
        >
          <Picker.Item label="선택하세요" value="" />
          <Picker.Item label="K7" value="K7" />
          <Picker.Item label="쏘나타" value="Sonata" />
          {/* 여기에 더 많은 차량 이름을 추가할 수 있습니다. */}
        </Picker>

        <Text style={styles.title}>차량번호</Text>
        {/* 차량 번호 입력 */}
        <TextInput
          style={styles.input}
          placeholder="차량 번호를 입력하세요"
          value={carNumber}
          onChangeText={(text) => setCarNumber(text)}
        />

        {/* 차량 정보 등록 버튼 */}
        <Button
          title="차량 정보 등록"
          onPress={registerCar}
          styles={{ container: { marginTop: 20 } }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: PRIMARY.DEFAULT,
    height: 42,
    paddingHorizontal: 10,
    paddingLeft: 40,
  },
  form: {
    flexGrow: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  picker: {
    borderWidth: 1, // 테두리 선
    borderColor: PRIMARY.DEFAULT, // 테두리 색
    borderRadius: 8, // 둥근 모서리
    height: 50,
    marginBottom: 20, // 다음 요소와의 간격
  },
});

export default MyCarScreen;
