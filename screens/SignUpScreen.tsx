import { ScrollView, StyleSheet, Text, View, Alert, Pressable, SafeAreaView } from "react-native";
import React from "react";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import SocialMediaButtons from "../components/SocialMediaButtons";
import CustomButton from "../components/CustomButton";
//import { useSignUpEmailPassword } from "@nhost/react";

const Regex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  //const { signUpEmailPassword, isLoading } = useSignUpEmailPassword();

  {
    /* 
  const onRegisterPressed = async (data: {
    name: any;
    email: any;
    password: any;
  }) => {
    if (isLoading) {
      return;
    }
    const { name, email, password } = data;
    const { error, isSuccess, needsEmailVerification } =
      await signUpEmailPassword(email, password, {
        displayName: name.trim(),
        metadata: { name },
      });
    if (error) {
      Alert.alert(error.message);
    }

    // isnt navigating to sign in screen, instead navigates to homescreem
    if (isSuccess) {
      navigation.navigate("SignIn");
    }
    if (needsEmailVerification) {
      Alert.alert("Verify your email", "check your email");
    }
  };
*/
  }

  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };

  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  };

  return (
    <SafeAreaView className="  bg-black h-full">
      <View className=" px-8 py-5 items-center">
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 15,
            color: "white",
          }}
        >
          CREATE AN ACCOUNT
        </Text>

        <CustomInput
          name="name"
          control={control}
          placeholder="Full Name"
          rules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Name should be max 24 characters long",
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: "Email is required",
            pattern: { value: Regex, message: "Email is invalid" },
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: (value: any) => value === pwd || "Password do not match",
          }}
        />

        <CustomButton
          text="SIGN UP"
          // text={isLoading ? "Registering" : "Register"}
          onPress={() => console.warn("signed up")}
        />

        <Text className=" mt-8 text-white">
          By registering, you confirm that you accept our{" "}
          <Text className=" text-orange-500" onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text className=" text-orange-500" onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        {/*  <SocialMediaButtons />*/}

        <Pressable 
        className=" mt-10 bg-black p-4 rounded-full border-orange-700 border-2"
        onPress={() => navigation.navigate("LogIn")} >
          <Text className=" text-xs tracking-wider uppercase font-bold text-white">Have an account? Please Log in</Text>
        </Pressable>
        
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
