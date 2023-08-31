import { View, Text, StyleSheet } from 'react-native';

const PaymentMethodScreen = () => {
  return (
    <View style={styles.container}>
      <Text>결제수단 관리 화면</Text>
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

export default PaymentMethodScreen;
