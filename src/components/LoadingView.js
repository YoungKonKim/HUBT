import { View } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingView = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        autoPlay
        // ref={animation}
        style={{
          width: 150,
        }}
        source={require('../../assets/loading.json')}
      />
    </View>
  );
};

export default LoadingView;
