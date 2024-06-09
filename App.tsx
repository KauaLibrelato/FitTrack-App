import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/context/Theme/ThemeProvider";
import Routes from "./src/routes";
import { Dimensions, StatusBar } from "react-native";
import ToastManager from "toastify-react-native";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ThemeProvider>
            <ToastManager
              width={Dimensions.get("window").width - 64}
              duration={3000}
              theme={"dark"}
            />
            <StatusBar barStyle="light-content" backgroundColor="#141516" />
            <Routes />
          </ThemeProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
