import styled from "styled-components/native";
import { tabsAtom, todoAtom, completedAtom } from "../lib/atoms";
import { useAtom } from "jotai";
import SectionHeader from "../components/SectionHeader";
import List from "../components/List";
import { Text, View } from "react-native";
import { Suspense, useEffect } from "react";
import InputComponent from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = styled.ScrollView`
  background-color: black;
  flex: 1;
  padding-top: 30px;
`;
const AppWrapper = styled.SafeAreaView`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function Index() {
  const [tabs, setTabs] = useAtom(tabsAtom);
  const [todo, setTodo] = useAtom(todoAtom);
  const [completed, setCompleted] = useAtom(completedAtom);

  useEffect(() => {
    const getData = async () => {
      const tabsString = await AsyncStorage.getItem("tabs");
      const todoString = await AsyncStorage.getItem("todo");
      const completedString = await AsyncStorage.getItem("completed");

      const tabs =
        tabsString !== null
          ? JSON.parse(tabsString)
          : { todo: true, completed: true };
      const todo = todoString !== null ? JSON.parse(todoString) : [];
      const completed =
        completedString !== null ? JSON.parse(completedString) : [];

      setTabs(tabs);
      setTodo(todo);
      setCompleted(completed);
    };

    getData();
  }, []);

  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("tabs", JSON.stringify(tabs));
        await AsyncStorage.setItem("todo", JSON.stringify(todo));
        await AsyncStorage.setItem("completed", JSON.stringify(completed));
      } catch (e) {
        console.error("Something has gone wrong!");
      }
    };

    storeData();
  }, [tabs, todo, completed]);

  return (
    <Suspense
      fallback={
        <>
          <Text>Hi</Text>
        </>
      }
    >
      <View style={{ flex: 1, backgroundColor: "#171717" }}>
        <App contentInsetAdjustmentBehavior="automatic">
          <AppWrapper>
            <SectionHeader type="todo" />
            {tabs.todo && todo.length > 0 && <List type="todo" arr={todo} />}
            <SectionHeader type="completed" />
            {tabs.completed && completed.length > 0 && (
              <List type="completed" arr={completed} />
            )}
          </AppWrapper>
        </App>
        <InputComponent />
      </View>
    </Suspense>
  );
}
