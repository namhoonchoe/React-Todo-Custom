import { useRef, useState } from "react";
import styled from "styled-components";
import EditIcon from "./Icons/EditIcon";
import DismissIcon from "./Icons/DismissIcon";
import { useForm } from "react-hook-form";
import DeleteIcon from "./Icons/DeleteIcon";
import { useRecoilState } from "recoil";
import { taskState } from "../atoms";

const ButtonContainer = styled.button`
  outline: #fff;
  border-radius: 0.5rem;
  border-color: transparent;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
`;

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
  min-height: 3rem;
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

const ModalWrapper = styled.dialog`
  width: 18rem;
  margin: auto;
  border: 0;
  padding: 0;
  border-radius: 12px;
  aspect-ratio: 1.5;
  position: relative;
  overflow: hidden;
  background-color: #000;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  position: absolute;
  gap: 0.5rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const ModalHeader = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
`;

const EditButton = styled.button`
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background-color: #579dff;
  color: #fff;
  &:hover {
    background-color: #1e22f5;
  }
`;

const DeleteButton = styled(EditButton)`
  background-color: #f74242;
  color: #fff;
  &:hover {
    background-color: #f51e1e;
  }
`;

const ModalMain = styled.main`
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const FormInput = styled.input`
  width: 100%;
  height: 3.5rem;
  background-color: #1f2937;
  border-color: transparent;
  border-radius: 12px;
  padding-left: 8px;
  color: #fff;
  &:focus {
    border: 2px;
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
  border-radius: 12px;
  width: 100%;
  max-width: 18rem;
  min-height: 3rem;
  gap: 0.5rem;
  padding-left: 0;

  color: #fff;
  text-transform: capitalize;
`;

const ModalMessage = styled.p`
  color: #fff;
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 600;
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
      <ModalWrapper ref={editDialogRef}>
        <ModalContent>
          <ModalHeader>
            <ModalMessage>
              {task} in {categoryName}
            </ModalMessage>
          </ModalHeader>
          <ModalMain>
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
          </ModalMain>
        </ModalContent>
      </ModalWrapper>

      {/**
       * Delete Dialog
       */}
      <ModalWrapper ref={deleteDialogRef}>
        <ModalContent>
          <ModalHeader>
            <ModalMessage>정말로 삭제 하시겠습니까?</ModalMessage>
          </ModalHeader>
          <ModalMain
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "0.5rem",
            }}
          >
            <TaskContainer>
              <TaskTitle>{task} </TaskTitle>
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
          </ModalMain>
        </ModalContent>
      </ModalWrapper>
    </>
  );
}
