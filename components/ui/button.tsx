
import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';

type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const Button: React.FC<ButtonProps> = ({ onPress, children, style = {}, textStyle = {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: '#3B82F6',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 16,
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Text style={[{ color: '#fff', fontSize: 16, fontWeight: '600' }, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

