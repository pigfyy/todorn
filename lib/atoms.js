import { atom } from "jotai";

const tabsAtom = atom({ todo: true, completed: true });

const inputAtom = atom("");

const todoAtom = atom([]);
const completedAtom = atom([]);

export { tabsAtom, inputAtom, todoAtom, completedAtom };
