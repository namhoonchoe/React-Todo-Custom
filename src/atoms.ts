import { atom   } from "recoil";
 
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
 

export const categoryState = atom<Category[]>({
  key: "category",
  default: [...initialCategory],
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
   
});
