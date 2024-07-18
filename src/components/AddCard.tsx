import { useState } from "react";
import { styled } from "styled-components";
import AddIcon from "./Icons/AddIcon";
import DismissIcon from "./Icons/DismissIcon";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { taskState } from "../atoms";

const TaskMessage = styled.p`
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 600;
`;

const AddTask = styled.section`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: flex-start;
  background-color: #0d1117;
  border-radius: 12px;
  width: 100%;
  min-height: 3rem;
  gap: 0.5rem;
  color: #fff;
  text-transform: capitalize;
  padding: 1rem;
`;

const ButtonContainer = styled.button`
  outline: #fff;
  border-radius: 0.5rem;
  border-color: transparent;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
`;

const Form = styled.form`
  width: 100%;
  height: 3.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  background-color: black;
  border-color: transparent;
  height: 100%;
  padding-left: 8px;
  color: #fff;
  padding: 1rem;
  text-transform: capitalize;
  &:focus {
    border: 3px solid;
    border-color: #7ca3f8;
    outline: none;
  }
`;

const FormButton = styled.section`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: flex-start;
  background-color: #0d1117;
  border-radius: 12px;
  width: 18rem;
  min-height: 3rem;
  gap: 0.5rem;
  color: #fff;
  text-transform: capitalize;
  padding: 1rem;
`;

const AddButton = styled.button`
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background-color: #579dff;
  color: #fff;
`;

type Task = {
  task: string;
};

type AddCardProps = {
  categoryName: string;
  categoryId: string;
};

export default function AddCard({ categoryName, categoryId }: AddCardProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const setTasks = useSetRecoilState(taskState);
  const { register, handleSubmit, setValue } = useForm<Task>();

  const handleValid = ({ task }: Task) => {
    setTasks((oldTasks) => [
      {
        task: task,
        taskId: crypto.randomUUID(),
        taskCategory: {
          categoryName,
          categoryId,
        },
      },
      ...oldTasks,
    ]);
    setValue("task", "");
  };
  return (
    <>
      {isAdding ? (
        <Form onSubmit={handleSubmit(handleValid)}>
          <FormInput
            placeholder="add a card ..."
            {...register("task", {
              required: "add a card ...",
            })}
          />
          <FormButton style={{ borderRadius: "0 0 12px 12px" }}>
            <AddButton type="submit">add a card </AddButton>
            <ButtonContainer
              onClick={() => setIsAdding(!isAdding)}
              type="submit"
            >
              <DismissIcon />
            </ButtonContainer>
          </FormButton>
        </Form>
      ) : (
        <AddTask onClick={() => setIsAdding(!isAdding)}>
          <ButtonContainer>
            <AddIcon />
          </ButtonContainer>

          <TaskMessage>add a card...</TaskMessage>
        </AddTask>
      )}
    </>
  );
}
