import Card from "@/components/Card";
import Instructer from "@/components/Instructer";
import PrimaryButton from "@/components/PrimaryButton";
import Title from "@/components/Title";
import Colors from "@/constants/colors";
import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

export default function StartGamePage({
  onPickNumber,
}: {
  onPickNumber: (pickedNumber: number) => void;
}) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredText: string) {
    setEnteredNumber(enteredText);
    console.log(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Please enter a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }],
      );
    }
    onPickNumber(chosenNumber);
  }

  return (
    <View style={styles.rootcontainer}>
      <Title>Guess My Number</Title>
      <Card>
        <Instructer>Enter a Number</Instructer>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="numeric"
          autoFocus={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => setEnteredNumber("")}>
              Reset
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootcontainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  numberInput: {
    height: 55,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
