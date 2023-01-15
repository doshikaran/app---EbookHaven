import { View, Text, FlatList, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useMyBooks } from "../context/MyBooks";
import BookItem from "../components/BookItem";
import { useNavigation } from "@react-navigation/native";

const TabTwoScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const { saved } = useMyBooks();
  console.log("====================================");
  console.log(saved);
  console.log("====================================");
  return (
    <SafeAreaView className=" bg-black">
    <View className=" bg-black h-full ">
      <Text className=" mt-5 font-bold uppercase text-xl tracking-widest ml-7 text-white">my books</Text>
      <FlatList
        data={saved}
        renderItem={({ item }) => <BookItem book={item} />}
      />
    </View>
    </SafeAreaView>
  );
};

export default TabTwoScreen;
