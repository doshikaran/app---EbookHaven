import { Alert, Image, ScrollView, Text, View, Pressable } from "react-native";
import React from "react";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import SocialMediaButtons from "../components/SocialMediaButtons";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
//import { useSignInEmailPassword } from "@nhost/react";

const Regex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const LogInScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const onForgotPasswordPressed = () => {};

  {
    /* 
  const { signInEmailPassword, isLoading } = useSignInEmailPassword();
  const onSignInPressed = async (data: { email: any; password: any }) => {
    if (isLoading) {
      return;
    }
    const { email, password } = data;
    const {error, needsEmailVerification} = await signInEmailPassword(email, password);
    if(error) {
      Alert.alert(error.message)
    }
    if(needsEmailVerification) {
      Alert.alert("Verify your email", "check your email")
    }
  };
*/
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className=" bg-black h-full"
    >
      <Image
        source={{
          uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fe67f367773215.5b45be0503803.jpg",
        }}
        resizeMode="cover"
        className=" h-full rounded-b-[60px]"
      />

      <View className=" p-8">
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: Regex, message: "Email is invalid" },
          }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum characters should be 8",
            },
          }}
        />

        <CustomButton
          text="LOG IN"
          // text={isLoading ? "Wait" : "Sign In"}
          onPress={() => navigation.navigate("First")}
        />
        </View>

        <View className=" items-center">
        <Pressable
          className=" w-48 p-2 rounded-full items-center bg-slate-200 "
          onPress={onForgotPasswordPressed}
        >
          <Text className=" text-xs tracking-wider uppercase font-bold text-black">
            Forgot Password?
          </Text>
        </Pressable>

        <Pressable
          className=" mt-5 w-48 p-2 rounded-full items-center bg-slate-200 "
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text className=" text-xs tracking-wider uppercase font-bold text-black">
          Create an Account?
          </Text>
        </Pressable>

        
        {/*  <SocialMediaButtons />*/}

       
        </View>
      
    </ScrollView>
  );
};

export default LogInScreen;
