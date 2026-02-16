import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GamePage from "./screen/GamePage";
import StartGamePage from "./screen/StartGamePage";

export default function RootLayout() {
  const [enteredNumber, setEnteredNumber] = useState<number | null>(null);

  function pickedNumberHandler(pickedNumber: number) {
    setEnteredNumber(pickedNumber);
  }

  let screen = <StartGamePage onPickNumber={pickedNumberHandler} />;

  if (enteredNumber) {
    screen = <GamePage pickNumber={enteredNumber} />;
  }
  return (
    <LinearGradient
      colors={["#4e0329", "#ddb52f"]}
      style={styles.rootContainer}
    >
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootContainer}
        imageStyle={{ opacity: 0.3 }}
      >
        <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
      </ImageBackground>
      <StatusBar barStyle="light-content" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
