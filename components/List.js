import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styled } from "styled-components";
import { useAtom } from "jotai";
import { todoAtom, completedAtom } from "../lib/atoms";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const FlatList = styled.FlatList`
  margin-bottom: 16px;
`;
const ListItem = styled.TouchableOpacity`
  background-color: #303030;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
const ListItemText = styled.Text`
  color: white;
  font-size: 16px;
  margin-right: auto;
`;

export default function List({ type, arr }) {
  const [, setTodo] = useAtom(todoAtom);
  const [, setCompleted] = useAtom(completedAtom);

  const removeItem = (arr, index) => {
    const newArr = [...arr];
    newArr.splice(index, 1);
    return newArr;
  };

  const handleItemPress = (item, index) => {
    setTodo((prevState) => {
      if (type === "todo") return removeItem(prevState, index);
      return [item, ...prevState];
    });
    setCompleted((prevState) => {
      if (type === "todo") return [item, ...prevState];
      return removeItem(prevState, index);
    });
  };

  const handleTrashPress = (item, index) => {
    if (type === "todo")
      setTodo((prevState) => {
        return removeItem(prevState, index);
      });
    else setCompleted((prevState) => removeItem(prevState, index));
  };

  return (
    <FlatList
      data={arr}
      renderItem={({ item, index }) => (
        <ListItem
          onPress={() => handleItemPress(item, index)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={
              type === "todo"
                ? "radio-button-unchecked"
                : "radio-button-checked"
            }
            size={18}
            color="white"
          />
          <ScrollView>
            <ListItemText>{item}</ListItemText>
          </ScrollView>
          <TouchableOpacity onPress={() => handleTrashPress(item, index)}>
            <FontAwesome5 name="trash-alt" size={20} color="red" />
          </TouchableOpacity>
        </ListItem>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      scrollEnabled={false}
    />
  );
}
