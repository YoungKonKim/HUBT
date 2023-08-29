import {
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY } from '../colors';
import { memo } from 'react';
import { BlurView } from 'expo-blur';

import PropTypes from 'prop-types';

const PhotoItem = memo(({ item, togglePhoto, isSelected }) => {
  const width = useWindowDimensions().width / 3;

  return (
    <Pressable
      style={{ width, height: width }}
      onPress={() => togglePhoto(item)}
    >
      <Image source={{ uri: item.uri }} style={styles.photo} />
      {isSelected && (
        <BlurView
          style={[StyleSheet.absoluteFill, styles.checkIcon]}
          intensity={Platform.select({ ios: 10, android: 50 })}
        >
          <MaterialCommunityIcons
            name="check-circle"
            size={40}
            color={PRIMARY.DEFAULT}
          />
        </BlurView>
      )}
    </Pressable>
  );
});

PhotoItem.displayName = 'PhotoItem';

PhotoItem.propTypes = {
  item: PropTypes.object.isRequired,
  togglePhoto: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  photo: {
    width: '100%',
    height: '100%',
  },
  checkIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhotoItem;
