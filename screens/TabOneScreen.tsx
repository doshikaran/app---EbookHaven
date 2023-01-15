import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { Text, View } from "../components/Themed";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import BookItem from "../components/BookItem";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState, useEffect } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const query = gql`
  query SearchBooks($q: String) {
    googleBooksSearch(q: $q, country: "US") {
      items {
        id
        volumeInfo {
          authors
          averageRating
          description
          imageLinks {
            thumbnail
          }
          title
          subtitle
          industryIdentifiers {
            identifier
            type
          }
        }
      }
    }
    openLibrarySearch(q: $q) {
      docs {
        author_name
        title
        cover_edition_key
        isbn
      }
    }
  }
`;

export default function TabOneScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [search, setSearch] = useState("");
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const date = new Date();
    const currentHour = date.getHours();
    if (currentHour >= 6 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 16) {
      setGreeting("Good afternoon");
    } else if (currentHour >= 16 && currentHour < 24) {
      setGreeting("Good evening");
    } else {
      setGreeting("Hello");
    }
  }, []);

  const [provider, setProvider] = useState<
    "googleBooksSearch" | "openLibrarySearch"
  >("googleBooksSearch");

  const bookSource = (item: any) => {
    if (provider === "googleBooksSearch") {
      return {
        title: item.volumeInfo.title,
        image: item.volumeInfo.imageLinks?.thumbnail,
        authors: item.volumeInfo.authors,
        isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier,
      };
    } else {
      return {
        title: item.title,
        authors: item.author_name,
        image: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
        isbn: item.isbn?.[0],
      };
    }
  };

  const [runQuery, { data, loading, error }] = useLazyQuery(query);
  console.log(JSON.stringify(data, null, 2));

  return (
    <SafeAreaView className=" bg-black h-full">
      <View className=" bg-black">
        {/* logo */}
        <View className=" flex-row px-8 mt-5 items-center space-x-5 bg-black">
          <MaterialCommunityIcons 
          onPress={() => navigation.navigate("First")}
          name="bookshelf" size={24} color="white" />
          <Text className=" text-lg uppercase font-bold text-white">{greeting}</Text>
        </View>

        {/*  search text input */}
        <View className=" flex-row px-5 mt-5 items-center  shadow-2xl rounded-full mx-4 border-neutral-500 border-[1px] h-12">
          <Pressable
            className=" bg-slate-100 p-1 rounded-xl"
            onPress={() => runQuery({ variables: { q: search } })}
          >
            <Ionicons name="search" size={24} color="black" />
          </Pressable>
          <TextInput
            value={search}
            onChangeText={setSearch}
            className=" flex-1 rounded-lg px-4 py-2 mx-3 "
            placeholder="SEARCH"
          />
        </View>

        {/* options */}
        <View className=" mt-2 flex-row justify-around h-16 items-center bg-black">
          <View className=" flex-row items-center space-x-2 bg-black">
            {provider === "googleBooksSearch" ? (
              <Image
                className=" h-8 w-8"
                source={{
                  uri: "data:image/png;base64,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",
                }}
              />
            ) : null}
            <Text
              className={`${
                provider === "googleBooksSearch"
                  ? " font-bold tracking-widest text-cyan-600 uppercase"
                  : " text-xs tracking-widest text-white"
              }`}
              onPress={() => setProvider("googleBooksSearch")}
            >
              Google Books
            </Text>
          </View>
          <View className=" flex-row items-center space-x-2 bg-black">
            {provider === "openLibrarySearch" ? (
              <Image
                className=" h-8 w-8 "
                source={{
                  uri: "data:image/png;base64,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",
                }}
              />
            ) : null}
            <Text
              className={`${
                provider === "openLibrarySearch"
                  ? " font-bold tracking-widest text-cyan-600 uppercase"
                  : " text-xs tracking-widest text-white"
              }`}
              onPress={() => setProvider("openLibrarySearch")}
            >
              Open Library
            </Text>
          </View>
        </View>

        {loading && <ActivityIndicator />}
        {error && (
          <View>
            <Text>Error fetching books</Text>
            <Text>{error.message}</Text>
          </View>
        )}

        <Pressable
        onPress={() => navigation.navigate("Info")}
        >
        <FlatList
          className=" mt-1"
          showsVerticalScrollIndicator={false}
          data={
            (provider === "googleBooksSearch"
              ? data?.googleBooksSearch?.items
              : data?.openLibrarySearch?.docs) || []
          }
          renderItem={({ item }) => <BookItem book={bookSource(item)} />}
        />
        </Pressable>
        </View>
        
      
    </SafeAreaView>
  );
}

