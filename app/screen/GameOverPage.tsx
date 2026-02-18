import PrimaryButton from "@/components/PrimaryButton";
import Title from "@/components/Title";
import Colors from "@/constants/colors";
import { Image, StyleSheet, Text, View } from "react-native";

export default function GameOverPage({
  roundsNumber,
  userNumber,
  onStartNewGame,
}: {
  roundsNumber: number;
  userNumber: number;
  onStartNewGame: () => void;
}) {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over!!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed
        <Text style={styles.highlightedText}>{roundsNumber}</Text> rounds to
        guess the number
        <Text style={styles.highlightedText}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
    margin: 36,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  highlightedText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
