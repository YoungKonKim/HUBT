import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const locations = [
  {
    latitude: 37.5360412,
    longitude: 127.0061276,
    name: '에너비스 : 대한민국 서울특별시 용산구 한남대로 82',
  },
  {
    latitude: 37.5956086,
    longitude: 127.0360473,
    name: '종암지점 : 대한민국 서울특별시 성북구 종암로 58',
  },
  {
    latitude: 37.4841053,
    longitude: 127.0950401,
    name: '수서지점 : 대한민국 서울특별시 강남구 광평로 202',
  },
  {
    latitude: 37.4615951,
    longitude: 126.898336,
    name: '삼중가스지점 : 대한민국 서울특별시 금천구 시흥대로 314',
  },
];

const MapScreen = () => {
  const [region] = useState({
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
    latitude: locations[0].latitude,
    longitude: locations[0].longitude,
  });
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {locations.map((location, index) => (
          <Marker key={index} coordinate={location} title={location.name} />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
