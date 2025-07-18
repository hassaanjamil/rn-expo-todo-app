import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle, type PressableProps } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

type ThemedButtonProps = PressableProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'primary' | 'secondary';
  textStyle?: TextStyle;
  style?: ViewStyle;
};

export function ThemedButton({
  title,
  lightColor,
  darkColor,
  type = 'default',
  textStyle,
  style,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    type === 'primary' ? 'tint' : 'background'
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        type === 'primary' && styles.primary,
        type === 'secondary' && styles.secondary,
        { backgroundColor, opacity: pressed ? 0.7 : 1 },
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.text, type === 'primary' && styles.textPrimary, { color }, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  primary: {
    // backgroundColor handled by useThemeColor
  },
  secondary: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPrimary: {
    color: '#fff',
  },
});