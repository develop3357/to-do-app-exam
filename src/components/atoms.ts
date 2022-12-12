import { atom } from "recoil";

export interface Categories {
  [key: string]: string;
}

export interface IToDo {
  text: string;
  id: number;
}

export interface IToDoList {
  [category: string]: IToDo[];
}

export class ToDoListManager {
  private data: IToDoList;
  constructor(data: IToDoList) {
    this.data = this.copy(data);
  }
  private copy(data: IToDoList): IToDoList {
    const newData: IToDoList = {};
    Object.keys(data).forEach((category) => {
      newData[category] = [...data[category]];
    });
    return newData;
  }
  add(toDo: IToDo, toDoCategory: string) {
    this.data[toDoCategory] = this.data[toDoCategory]
      ? [toDo, ...this.data[toDoCategory]]
      : [toDo];
  }
  remove(id: number) {
    Object.keys(this.data).forEach((category) => {
      const list = this.data[category];
      const targetIndex = list.findIndex((each) => each.id === id);
      if (targetIndex >= 0) {
        this.data[category] = [
          ...list.slice(0, targetIndex),
          ...list.slice(targetIndex + 1),
        ];
      }
    });
  }
  move(toDo: IToDo, newCategory: string) {
    this.remove(toDo.id);
    this.add(toDo, newCategory);
  }
  addCategory(category: string) {
    if (!this.data[category]) {
      this.data[category] = [];
    }
  }
  removeCategory(category: string) {
    if (this.data[category]) {
      delete this.data[category];
    }
  }
  getList() {
    return this.data;
  }
  getCategory() {
    return Object.keys(this.data);
  }
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const toDoDefault = {
  "TO DO": [{ id: 1, text: "UberEats Clone" }],
  DOING: [
    { id: 2, text: "React Masterclss" },
    { id: 3, text: "TypeScript" },
    { id: 4, text: "CSS Layout Masterclass" },
  ],
  DONE: [
    { id: 5, text: "This cards are set by default." },
    { id: 6, text: "Zoom Clone" },
  ],
};

export const toDoState = atom<IToDoList>({
  key: "toDo",
  default: toDoDefault,
  effects: [localStorageEffect("toDo")],
});
