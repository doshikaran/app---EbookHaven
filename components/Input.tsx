import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useLazyQuery } from "@apollo/client";

const Input = () => {
  const [search, setSearch] = useState("");

  const [runQuery, { data, loading, error }] = useLazyQuery(query);
  
  return (
    <View className=" flex-row px-5 mt-5 items-center bg-red-600">
      <MaterialCommunityIcons name="bookshelf" size={24} color="black" />
      <TextInput
        value={search}
        onChangeText={setSearch}
        className=" flex-1 border-yellow-800 border-2 rounded-lg px-4 py-2 mx-3 "
        placeholder="SEARCH"
      />
      <Pressable onPress={() => console.warn("pressed")}>
        <AntDesign name="search1" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
