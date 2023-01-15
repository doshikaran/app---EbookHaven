import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NhostClient, NhostProvider } from "@nhost/react";
import * as SecureStore from "expo-secure-store";
import MyBooks from "./context/MyBooks";

const API_KEY =
""
// Initialize Apollo Client
const client = new ApolloClient({
  uri: "",
  headers: {
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

//const nhost = new NhostClient({
//subdomain: "bydmqulnmuthnrdtqpug",
//region: "us-east-1",
//clientStorageType: "expo-secure-storage",
//clientStorage: SecureStore,
//});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <MyBooks>
            <Navigation colorScheme={colorScheme} />
          </MyBooks>
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
