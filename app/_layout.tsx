import Colors from "@/constants/colors";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameOverPage from "./screen/GameOverPage";
import GamePage from "./screen/GamePage";
import StartGamePage from "./screen/StartGamePage";

export default function RootLayout() {
  const [enteredNumber, setEnteredNumber] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    // return <AppLoading />;
    return <View></View>;
  }

  function pickedNumberHandler(pickedNumber: number) {
    setEnteredNumber(pickedNumber);
  }

  function gameOverHandler(numberOfRounds: number) {
    setIsGameOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setEnteredNumber(null);
    setIsGameOver(false);
  }
  let screen = <StartGamePage onPickNumber={pickedNumberHandler} />;

  if (enteredNumber && !isGameOver) {
    screen = (
      <GamePage pickNumber={enteredNumber} isGameOver={gameOverHandler} />
    );
  } else if (isGameOver) {
    screen = (
      <GameOverPage
        roundsNumber={guessRounds}
        userNumber={enteredNumber ?? 0}
        onStartNewGame={startNewGameHandler}
      />
    );
  }
  return (
    <LinearGradient
      colors={[Colors.primary800, Colors.accent500]}
      style={styles.rootContainer}
    >
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootContainer}
        imageStyle={{ opacity: 0.2 }}
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
