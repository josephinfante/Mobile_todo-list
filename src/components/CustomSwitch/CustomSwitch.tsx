import { Switch, useColorMode, View } from "native-base";
import { StyleSheet } from "react-native";
import { colors } from "../../styles";

export interface CustomSwitchInterface {}

const CustomSwitch: React.FC<CustomSwitchInterface> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <View style={styles.container}>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
        offThumbColor={colors.purpleLight}
        offTrackColor={colors.purpleDark}
        onThumbColor={colors.yellow}
        onTrackColor={colors.purpleDark}
      />
    </View>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    left: 20,
  },
});
