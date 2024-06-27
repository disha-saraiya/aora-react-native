import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import {icons} from '../../constants';

const TabIcon = ({icon, colour, name, focused}) => {
  return(
  <View className="items-center justify-center gap-2">
    <Image source={icon} resizeMode='contain' tintColor={colour} className="w-6 h-6" />
    <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: colour}}> {name} </Text>
  </View>
  )
} 

 const TabsLayout = () => {
  return (
    <>
    <Tabs screenOptions={{tabBarShowLabel: false, 
      tabBarActiveTintColor: '#FFA001', 
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarStyle: {
        backgroundColor: '#161622',
        borderTopWidth: 1,
        borderTopColor: '#232533',
        height: 84
      } }}>

      <Tabs.Screen
      name="home" 
      options={{
        title: 'Home', 
        headerShown: false, 
        tabBarIcon: ({color, focused}) => (
        <TabIcon icon={icons.home} colour={color} focused={focused} name="Home" />
   ) }} />
   <Tabs.Screen 
      name="create" 
      options={{
        title: 'Create', 
        headerShown: false, 
        tabBarIcon: ({color, focused}) => (
        <TabIcon icon={icons.plus} colour={color} focused={focused} name="Create" />
   ) }} />
   <Tabs.Screen 
      name="profile" 
      options={{
        title: 'Profile', 
        headerShown: false, 
        tabBarIcon: ({color, focused}) => (
        <TabIcon icon={icons.profile} colour={color} focused={focused} name="Profile" />
   ) }} />
   <Tabs.Screen 
   name="bookmark" 
   options={{
     title: 'Bookmarks', 
     headerShown: false, 
     tabBarIcon: ({color, focused}) => (
     <TabIcon icon={icons.bookmark} colour={color} focused={focused} name="Bookmarks" />
) }} />
    </Tabs>
    </>
  )
}

export default TabsLayout;