import NumberContainer from "@/components/NumberContainer";
import PrimaryButton from "@/components/PrimaryButton";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

function generateRandomBetween(min: number, max: number, exclude: number) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GamePage({
  pickNumber,
  isGameOver,
}: {
  pickNumber: number | null;
  isGameOver: () => void;
}) {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    pickNumber ?? 0,
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === pickNumber) {
      isGameOver();
    }
  }, [currentGuess, pickNumber]);

  function nextGuessHandler(direction: "lower" | "greater") {
    if (
      (direction === "lower" && currentGuess < (pickNumber ?? 0)) ||
      (direction === "greater" && currentGuess > (pickNumber ?? 0))
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    );
    setCurrentGuess(newRndNumber);
  }
  return (
    <View style={style.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <PrimaryButton onPress={() => nextGuessHandler("greater")}>
            +
          </PrimaryButton>
          <PrimaryButton onPress={() => nextGuessHandler("lower")}>
            -
          </PrimaryButton>
        </View>
      </View>
      <View>{/* LOG Rounds */}</View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
