import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';

import { icons } from '../constants';

const FormField = ({
  title,
  value,
  placeholder,
  handleChange,
  customStyles,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${customStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">
        {title}
      </Text>
      <View className="w-full h-16 px-4 bg-black-100 border-black-200 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChange}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
