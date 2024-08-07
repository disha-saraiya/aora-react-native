import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/form-field';
import CustomButton from '../../components/custom-button';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUpScreen = () => {
  //React useState hook
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setisSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const onSignUp = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'please fill in all the fields!');
    }
    setisSubmitting(true);
    try {
      const res = await createUser(
        form.email,
        form.password,
        form.username,
      );

      setUser(res);
      setIsLoggedIn(true);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-full px-4 my-6 justify-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-white text-semibold font-psemibold font-light">
            Create an account
          </Text>
          <FormField
            title="Username"
            placeholder="Your unique username"
            value={form.username}
            handleChange={(e) => {
              setForm({
                ...form,
                username: e,
              });
            }}
            customStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChange={(e) => {
              setForm({
                ...form,
                email: e,
              });
            }}
            customStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(e) => {
              setForm({
                ...form,
                password: e,
              });
            }}
            customStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={onSignUp}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
        <View className="justify-center flex-row pt-5 gap-1">
          <Text className="text-md text-gray-100 font-pregular">
            Already have an account?
          </Text>
          <Link
            href="/sign-in"
            className="text-md font-psemibold text-secondary-100"
          >
            Log in
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
