import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');

  const makePayment = () => {
    try {
      console.log('Payment token:');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
      />
      <TextInput
        placeholder="Expiry Month"
        value={expMonth}
        onChangeText={(text) => setExpMonth(text)}
      />
      <TextInput
        placeholder="Expiry Year"
        value={expYear}
        onChangeText={(text) => setExpYear(text)}
      />
      <TextInput placeholder="CVC" value={cvc} onChangeText={setCvc} />
      <Button title="Make Payment" onPress={makePayment()} />
    </View>
  );
};

export default PaymentScreen;
