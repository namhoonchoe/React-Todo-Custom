import { useRef } from "react";
import styled from "styled-components";
import EditIcon from "./Icons/EditIcon";
import DismissIcon from "./Icons/DismissIcon";
import { useForm } from "react-hook-form";
import DeleteIcon from "./Icons/DeleteIcon";
import { useRecoilState } from "recoil";
import { taskState } from "../atoms";
import {
  ButtonContainer,
  TextButton,
  Form,
  FormInput,
  FormButton,
} from "./UI/StyledFragments";
import Modal from "./UI/Modal";

const EditButtonContainer = styled(ButtonContainer)`
  opacity: 0;
`;

const TaskContainer = styled.section`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: space-between;
  background-color: #1f2937;
  border-radius: 12px;
  width: 100%;
  height: 5rem;
  gap: 0.5rem;
  color: #fff;
  text-transform: capitalize;
  padding: 1rem;
`;

const TaskCardAnimated = styled(TaskContainer)`
  &:hover {
    border: solid;
    border-color: #7ca3f8;
  }

  /**
  styled components group hover
  */
  &:hover ${EditButtonContainer} {
    opacity: 1;
  }
`;

const TaskTitle = styled.p`
  color: #fff;
  text-transform: capitalize;
  font-weight: 600;
`;

const EditButton = styled(TextButton)`
  background-color: #579dff;
  &:hover {
    background-color: #1e22f5;
  }
`;

const DeleteButton = styled(TextButton)`
  background-color: #f74242;
  &:hover {
    background-color: #f51e1e;
  }
`;

type CardProps = {
  task: string;
  taskId: string;
  categoryName: string;
};

export default function Card({ task, taskId, categoryName }: CardProps) {
  const editDialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteDialogRef = useRef<HTMLDialogElement | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const { register, handleSubmit } = useForm<SubmitType>();
  const [taskList, setTaskList] = useRecoilState(taskState);

  const deleteTodo = (id: string) => {
    const newList = taskList.filter((task) => task.taskId !== id);
    setTaskList(newList);
    deleteDialogRef.current?.close();
  };

  type SubmitType = {
    task: string;
  };

  const submitHandler = ({ task }: SubmitType) => {
    let targetTodo = taskList.find((task) => task.taskId === taskId);
    const targetIndex = taskList.findIndex((task) => task.taskId === taskId);
    if (targetTodo) {
      targetTodo = { ...targetTodo, task: task };
      return setTaskList([
        ...taskList.slice(0, targetIndex),
        targetTodo,
        ...taskList.slice(targetIndex + 1),
      ]);
    }
    editDialogRef.current?.close();
  };

  return (
    <>
      <TaskCardAnimated ref={containerRef} id="container">
        <TaskTitle>{task} </TaskTitle>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <EditButtonContainer
            onClick={() => editDialogRef.current?.showModal()}
          >
            <EditIcon />
          </EditButtonContainer>
          <EditButtonContainer
            onClick={() => deleteDialogRef.current?.showModal()}
          >
            <DeleteIcon />
          </EditButtonContainer>
        </div>
      </TaskCardAnimated>
      {/**
       * Edit Dialog
       */}
      <Modal modalMessage={`${task} in ${categoryName}`} ref={editDialogRef}>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <FormInput
            placeholder={task}
            {...register("task", {
              required: "Please write a board name",
            })}
          />
          <FormButton>
            <EditButton
              type="submit"
              onClick={() => editDialogRef.current?.close()}
            >
              Edit task
            </EditButton>

            <form method="dialog">
              <ButtonContainer>
                <DismissIcon />
              </ButtonContainer>
            </form>
          </FormButton>
        </Form>
      </Modal>
      {/**
       * Delete Dialog
       */}
      <Modal modalMessage={"정말로 삭제 하시겠습니까?"} ref={deleteDialogRef} mainStyle={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              padding: "1rem  0.5rem",
              gap: "0.5rem",
            }}>
        <TaskContainer>
          <TaskTitle>{task}</TaskTitle>
        </TaskContainer>

        <FormButton>
          <DeleteButton type="submit" onClick={() => deleteTodo(taskId)}>
            Delete task
          </DeleteButton>

          <form method="dialog">
            <ButtonContainer>
              <DismissIcon />
            </ButtonContainer>
          </form>
        </FormButton>
      </Modal>
    </>
  );
}
