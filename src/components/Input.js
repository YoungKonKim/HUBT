import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { GRAY, PRIMARY } from '../colors';
import { forwardRef, useState } from 'react';

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

export const InputTypes = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  PASSWORD_CONFIRM: 'PASSWORD_CONFIRM',
};

export const InputTypeProps = {
  EMAIL: {
    title: 'EMAIL',
    placeholder: 'your@email.com',
    keyboardType: 'email-address',
    secureTextEntry: false,
    iconName: { active: 'email', inactive: 'email-outline' },
  },
  PASSWORD: {
    title: 'PASSWORD',
    placeholder: 'PASSWORD',
    keyboardType: 'default',
    secureTextEntry: true,
    iconName: { active: 'lock', inactive: 'lock-outline' },
  },
  PASSWORD_CONFIRM: {
    title: 'PASSWORD CONFIRM',
    placeholder: 'PASSWORD CONFIRM',
    keyboardType: 'default',
    secureTextEntry: true,
    iconName: { active: 'lock', inactive: 'lock-outline' },
  },
};

const Input = forwardRef(({ inputType, styles, ...props }, ref) => {
  const {
    title,
    placeholder,
    keyboardType,
    secureTextEntry,
    iconName: { active, inactive },
  } = InputTypeProps[inputType];

  const { value } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[defaultstyles.container, styles?.container]}>
      <Text
        style={[
          defaultstyles.title,
          { color: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK },
        ]}
      >
        {title}
      </Text>
      <View>
        <TextInput
          ref={ref}
          {...props}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          style={[
            defaultstyles.input,
            {
              borderColor: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK,
              color: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK,
            },
            styles?.input,
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          textContentType="none"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={defaultstyles.icon}>
          <MaterialCommunityIcons
            name={isFocused ? active : inactive}
            size={24}
            color={value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK}
          />
        </View>
      </View>
    </View>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  inputType: PropTypes.oneOf(Object.values(InputTypes)).isRequired,
  value: PropTypes.string.isRequired,
  styles: PropTypes.object,
};

const defaultstyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginBottom: 4,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 42,
    paddingHorizontal: 10,
    paddingLeft: 40,
  },
  icon: {
    position: 'absolute',
    left: 8,
    height: '100%',
    justifyContent: 'center',
  },
});
export default Input;
