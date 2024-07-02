import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/form-field';
import CustomButton from '../../components/custom-button';
import { Link } from 'expo-router';
import { signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignInScreen = () => {
  //React useState hook
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const onSignIn = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'please fill in all the fields!');
    }
    setisSubmitting(true);
    try {
      const res = await signIn(form.email, form.password);
      setUser(res);
      setIsLoggedIn(true);
      Alert.alert('Success', 'Signed in successfully!');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  const [isSubmitting, setisSubmitting] = useState(false);

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
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChange={(e) =>
              setForm({
                ...form,
                email: e,
              })
            }
            customStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(e) =>
              setForm({
                ...form,
                password: e,
              })
            }
            customStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={onSignIn}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
        <View className="justify-center flex-row pt-5 gap-1">
          <Text className="text-md text-gray-100 font-pregular">
            Don't have an account?
          </Text>
          <Link
            href="/sign-up"
            className="text-md font-psemibold text-secondary-100"
          >
            Sign up
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
