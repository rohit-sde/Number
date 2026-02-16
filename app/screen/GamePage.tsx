import { Text, View } from "react-native";

export default function GamePage({ pickNumber }: { pickNumber: number }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>Opponent's Guess</Text>
      {/* Guess */}
      <View>
        <Text>Higher or Lower?</Text>+ -
      </View>
      <View>{/* LOG Rounds */}</View>
    </View>
  );
}
