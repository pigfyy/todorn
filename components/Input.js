import { Feather } from "@expo/vector-icons";
import { styled } from "styled-components/native";
import { useAtom } from "jotai";
import { inputAtom, todoAtom } from "../lib/atoms";

const InputWrapper = styled.KeyboardAvoidingView`
  background-color: #171717;
  margin-bottom: 20px;
`;
const InputContainer = styled.View`
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: #171717;
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;
const InputBox = styled.View`
  background-color: #303030;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  margin-right: auto;
  color: white;
  font-size: 16px;
  flex-direction: row;
`;
const Input = styled.TextInput`
  width: 90%;
  margin-right: auto;
  color: white;
  font-size: 16px;
`;
const FeatherBox = styled.TouchableOpacity`
  width: 7%;
`;

export default function InputComponent() {
  const [input, setInput] = useAtom(inputAtom);
  const [, setTodo] = useAtom(todoAtom);

  const addTask = () => {
    if (input === "") return;
    setTodo((prevState) => [input, ...prevState]);
    setInput("");
  };

  return (
    <InputWrapper behavior="padding">
      <InputContainer>
        <InputBox>
          <Input
            placeholder="Add a new task..."
            keyboardType="twitter"
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          <FeatherBox onPress={addTask}>
            <Feather name="send" size={24} color="#439abf" />
          </FeatherBox>
        </InputBox>
      </InputContainer>
    </InputWrapper>
  );
}
