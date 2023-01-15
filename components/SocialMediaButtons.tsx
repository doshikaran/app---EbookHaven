import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

const SocialMediaButtons = () => {
  const onSignInApple = () => {
    console.warn("apple sign in");
  };

  const onSignInGoogle = () => {
    console.warn("google sign in");
  };

  const onSignInMeta = () => {
    console.warn("meta sign in");
  };
  return (
    <>
      <CustomButton
        text="Sign In with Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Sign In with Meta"
        onPress={onSignInMeta}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
    </>
  );
};

export default SocialMediaButtons;

const styles = StyleSheet.create({});
