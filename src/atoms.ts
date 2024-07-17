import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export type Category = {
  categoryName: string;
  categoryId: string;
};

export type Task = {
  task: string;
  taskId: string;
  taskCategory: Category;
};

const initialCategory:Array<Category> = [
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
  ]


export const categoryState = atom<Category[]>({
  key: "category",
  default:[...initialCategory] ,
  effects_UNSTABLE: [persistAtom],
});
 

export const kanbanState = atom<Task[]>({
    key: "kanban",
    default: [
      {
        task: "string",
        taskId: "11111111111",
        taskCategory:initialCategory[0] ,
      },
  
      {
        task: "string",
        taskId: "123afsafasf21",
        taskCategory:initialCategory[1] ,
      },
  
      {
        task: "string",
        taskId: "125asfasfasf2512",
        taskCategory:initialCategory[2],
      },
    ],
    effects_UNSTABLE: [persistAtom],
  });