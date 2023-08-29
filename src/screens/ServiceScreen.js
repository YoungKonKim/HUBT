import { View, Text, StyleSheet } from 'react-native';

const ServiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Service</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServiceScreen;
