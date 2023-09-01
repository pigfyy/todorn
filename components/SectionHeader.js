import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { tabsAtom } from "../lib/atoms";
import { useAtom } from "jotai";

const SectionHeaderWrapper = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SectionHeader = styled.Text`
  color: white;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 2px;
`;

export default function HeaderComponent({ type }) {
  const [tabs, setTabs] = useAtom(tabsAtom);
  const isShown = type === "todo" ? tabs.todo : tabs.completed;

  const handlePress = () => {
    setTabs((prevState) => {
      if (type === "todo") return { ...prevState, todo: !prevState.todo };
      else return { ...prevState, completed: !prevState.completed };
    });
  };

  return (
    <>
      <SectionHeaderWrapper>
        <SectionHeader>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </SectionHeader>
        <TouchableOpacity onPress={handlePress}>
          <AntDesign
            name={isShown ? "caretup" : "caretdown"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </SectionHeaderWrapper>
    </>
  );
}
