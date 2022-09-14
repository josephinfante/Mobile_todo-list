import { Text } from "native-base";
import { useState } from "react";
import { CustomButton, CustomContainer } from "../../components";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../styles";

export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const navigation: any = useNavigation();
  const [press, setPressed] = useState(false);
  return (
    <CustomContainer>
      <Text style={{ marginBottom: 50, fontSize: 20 }}>Todo List</Text>
      <CustomButton
        placeholder="Add a task"
        onPress={() => navigation.navigate("Task")}
        containerStyles={styles.containerStyles}
        placeholderStyles={styles.placeholderStyles}
        buttonStyles={styles.buttonStyles}
      />
    </CustomContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerStyles: {
    position: "absolute",
    bottom: 50,
    right: 20,
  },
  buttonStyles: {
    backgroundColor: colors.purpleLight,
    borderRadius: 10,
  },
  placeholderStyles: {
    fontSize: 15,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
