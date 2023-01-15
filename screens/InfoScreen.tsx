import { SafeAreaView, StyleSheet, Image, View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";

type InfoProps = {
  book: Book;
};

const info = gql`
  query openLibrarySearch($q: String) {
    googleBooksSearch(q: $q, country: "US") {
      items {
        id
        volumeInfo {
          authors
          subtitle
          title
        }
      }
    }
  }
`;

const InfoScreen = ({ route }) => {
  const q = route?.params?.q;
  const { data, error, loading } = useQuery(info, { variables: { q } });
  const book = data?.googleBooksSearch;

  const navigation = useNavigation();
  const press = () => {
    navigation.navigate("Root");
  };


  if(error) {
    return <Text className=" mt-44">{error.message}</Text>
  }
  if(loading) {
    return <ActivityIndicator/>
  }
  
  return (
    <SafeAreaView className=" bg-black h-full">
      <View className=" p-8">
        {/* two icons */}
        <View className=" flex-row items-center justify-between">
          <Ionicons
            onPress={press}
            name="caret-back-circle-outline"
            size={28}
            color="white"
          />
          <MaterialIcons
            onPress={press}
            name="cancel"
            size={28}
            color="white"
          />
        </View>

        {/* image, title, author */}
        <View>
          <Text className=" text-sm text-white font-semibold tracking-widest break-normal">
            hi
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  image: {
    height: 75,
    width: 75,
    aspectRatio: 2 / 3,
    borderRadius: "20%",
  },
});
