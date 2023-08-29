import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, PRIMARY } from '../colors';
import PropTypes from 'prop-types';

const HeaderRight = ({ disabled, onPress }) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} hitSlop={10}>
      <MaterialCommunityIcons
        name="check"
        size={24}
        color={disabled ? GRAY.DEFAULT : PRIMARY.DEFAULT}
      />
    </Pressable>
  );
};
HeaderRight.defaultProps = {
  disabled: false,
};

HeaderRight.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default HeaderRight;
