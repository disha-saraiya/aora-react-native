import { View, Text } from 'react-native'
import React from 'react'

/* Auth screens and welcome screen doesn't have the navigation tabs on the bottom
 which is why we need to make a separate layout for auth screens */
 
const AuthLayout = () => {
  return (
    <View>
      <Text>_layout</Text>
    </View>
  )
}

export default AuthLayout;