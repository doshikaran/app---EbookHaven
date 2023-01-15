import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FirstScreen = () => {
  const navigation = useNavigation();
  const change = () => {
    navigation.navigate("Root");
  };

  const [bounceValue, setBounceValue] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          duration: 1000,
          toValue: 1.5,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          duration: 1000,
          toValue: 0.5,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView className=" bg-black h-full">
      <View className=" p-10 h-full items-center">
        {/*<Text  className=" uppercase font-bold text-[20px] tracking-wider">welcome to</Text>*/}
        <View className=" flex-row items-center justify-center space-x-5">
          <MaterialCommunityIcons name="bookshelf" size={28} color="white" />
          <Text className=" uppercase font-bold text-[20px] tracking-wider text-white">
            Ebook Haven
          </Text>
        </View>
        <View className=" items-center mt-10">
          <Image
            style={styles.image}
            source={{
              uri: "https://i.pinimg.com/474x/ca/c7/99/cac799b03696c7244a51aff4149ae317.jpg",
            }}
          />
          <View className=" mt-12 mb-10 items-center">
            <Text className=" text-lg tracking-widest font-bold text-white">Hello</Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
                letterSpacing: 2,
                color: "grey",
              }}
            >
              Enjoy reading everywhere and everytime with our wide range of
              choices
            </Text>
          </View>

          <Pressable
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 75,
              width: 75,
              backgroundColor: "#edede9",
              borderRadius: "100%",
            }}
            onPress={change}
          >
            <Animated.View
              style={[
                styles.animation,
               // {
                //  transform: [{ scale: bounceValue }],
               // },
              ]}
            >
              <AntDesign
                name="right"
                size={24}
                color="black"
                className=" animate-pulse"
              />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "white",
    height: "100%",
  },
  image: {
    height: 400,
    width: 375,
    borderRadius: "50%",
  },
  animation: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    backgroundColor: "white",
    borderRadius: "100%",
  },
});
