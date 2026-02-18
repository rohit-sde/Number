import Card from "@/components/Card";
import Instructer from "@/components/Instructer";
import NumberContainer from "@/components/NumberContainer";
import PrimaryButton from "@/components/PrimaryButton";
import Title from "@/components/Title";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import GuessLogItem from "../../components/GuessLogItem";

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
  isGameOver: (numberOfRounds: number) => void;
}) {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    pickNumber ?? 0,
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === pickNumber) {
      isGameOver(guessRounds.length);
    }
  }, [currentGuess, pickNumber]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }
  const guessRoundsLength = guessRounds.length;
  return (
    <View style={style.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Instructer style={style.instructionText}>Higher or Lower?</Instructer>
        <View style={style.buttonsContainer}>
          <View style={style.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("greater")}>
              <AntDesign name="plus" size={18} color="White" />
            </PrimaryButton>
          </View>
          <View style={style.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <AntDesign name="minus" size={18} color="White" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      {/* <View>{guessRounds.map((round, index) => <Text key={index}>{round}</Text>)}</View> */}
      <View style={style.listConainer}>
        <FlatList
          data={guessRounds}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => (
            <GuessLogItem
              roundNumber={guessRoundsLength - index}
              guess={item}
            />
          )}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listConainer: {
    flex: 1,
    padding: 16,
  },
});
