import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CarRegisterScreen2 = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [carName, setCarName] = useState('');

  // 가상의 제조사 데이터
  const manufacturers = ['현대자동차', '기아자동차', '르노삼성자동차'];

  // 제조사에 따른 차량 이름
  const carNamesByManufacturer = {
    현대자동차: ['쏘나타', '그랜저', '투싼'],
    기아자동차: ['K5', 'K7', '스포티지'],
    르노삼성자동차: ['SM6', 'QM6'],
  };

  const handleSave = () => {
    console.log(`Manufacturer: ${manufacturer}, Car Name: ${carName}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>차량 제조사:</Text>
      <Picker
        selectedValue={manufacturer}
        onValueChange={(itemValue) => {
          setManufacturer(itemValue);
          setCarName(''); // 제조사가 바뀌면 차량 이름도 초기화
        }}
      >
        {manufacturers.map((m, index) => (
          <Picker.Item key={index} label={m} value={m} />
        ))}
      </Picker>

      <Text style={styles.label}>차량 이름:</Text>
      <Picker
        selectedValue={carName}
        onValueChange={(itemValue) => setCarName(itemValue)}
      >
        {(carNamesByManufacturer[manufacturer] || []).map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker>

      <Button title="저장하기" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default CarRegisterScreen2;
