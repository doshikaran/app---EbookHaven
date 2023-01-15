import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { useMyBooks } from "../context/MyBooks";
import { FontAwesome } from "@expo/vector-icons";

type BookItemProps = {
  book: Book;
};
const BookItem = ({ book }: BookItemProps) => {
  const { isBookSaved, onToggleSave } = useMyBooks();
  const saved = isBookSaved(book);

  return (
    <View className=" flex-row py-4 px-5 bg-black mt-2 space-x-2">
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: book.image }}
      />
      <View>
        <Text className=" text-sm text-white font-semibold tracking-widest break-normal">
          {book.title}
        </Text>
        <Text className=" mt-2 text-xs text-gray-800 font-light text-white ">
          By {book.authors?.join(", ")}
        </Text>

        {/* book mark */}
        <Pressable className=" " onPress={() => onToggleSave(book)}>
          {saved ? (
            <View className="  flex-row items-center mt-10 space-x-2">
              <FontAwesome name="bookmark" size={24} color="grey" />
              <Text className=" text-xs uppercase font-semibold tracking-wider text-gray-500">
                Unsave
              </Text>
            </View>
          ) : (
            <View className="  flex-row items-center mt-10 space-x-2">
              <FontAwesome name="bookmark-o" size={24} color="green" />
              <Text className=" text-xs uppercase font-semibold tracking-wider text-green-400">
                save
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 75,
    width: 75,
    aspectRatio: 2 / 3,
    borderRadius: "20%",
  },
});

export default BookItem;
