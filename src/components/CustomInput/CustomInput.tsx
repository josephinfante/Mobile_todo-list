import { MotiView } from "moti";
import { Input } from "native-base";
import { StyleSheet } from "react-native";

export interface CustomInputInterface {
  placeholder: string;
  delay: number;
  onChangeText?: (text: string) => void;
  containerStyles?: {};
  inputStyles?: {};
  value?: string;
}

const CustomInput: React.FC<CustomInputInterface> = (
  props: CustomInputInterface
) => {
  return (
    <MotiView
      style={[styles.container, props.containerStyles]}
      from={{ opacity: 0, translateX: -15 }}
      animate={{ opacity: 1, translateX: 0 }}
      delay={props.delay}
      transition={{
        type: "spring",
      }}
      exit={{
        opacity: 0,
      }}
    >
      <Input
        style={props.inputStyles}
        variant="unstyled"
        placeholder={props.placeholder}
        w="100%"
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </MotiView>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
