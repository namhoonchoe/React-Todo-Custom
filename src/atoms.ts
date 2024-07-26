import { atom,AtomEffect } from "recoil";
 
export type Category = {
  categoryName: string;
  categoryId: string;
};

export type Task = {
  task: string;
  taskId: string;
  taskCategory: Category;
};

const initialCategory: Array<Category> = [
  {
    categoryName: "TODO",
    categoryId: "TODO",
  },
  {
    categoryName: "DOING",
    categoryId: "DOING",
  },
  {
    categoryName: "DONE",
    categoryId: "DONE",
  },
];

 
const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
 
    onSet((newValue, _, isReset) => {
      if (isReset) return localStorage.removeItem(key);

      return localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const categoryState = atom<Category[]>({
  key: "category",
  default: [...initialCategory],
  effects_UNSTABLE: [localStorageEffect<Category[]>("category")],
});

export const taskState = atom<Task[]>({
  key: "task",
  default: [
    {
      task: "string",
      taskId: "11111111111",
      taskCategory: initialCategory[0],
    },

    {
      task: "string",
      taskId: "123afsafasf21",
      taskCategory: initialCategory[1],
    },

    {
      task: "string",
      taskId: "125asfasfasf2512",
      taskCategory: initialCategory[2],
    },
  ],
  effects_UNSTABLE: [localStorageEffect<Task[]>("task")],
});
