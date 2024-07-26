import { styled } from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { taskState,categoryState } from "../atoms";
import AddCard from "./AddCard";
import Card from "./Card";
import DropDown from "./UI/DropDown";
import { useState, useRef } from "react";
import DismissIcon from "./Icons/DismissIcon";
import {
  ButtonContainer,
  TextButton,
  Form,
  FormInput,
  FormButton,
} from "./UI/StyledFragments";
import Modal from "./UI/Modal";
import { useForm } from "react-hook-form";

const ListLayout = styled.section`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #0d1117;
  border-radius: 12px;
  width: 18rem;
  min-height: 7rem;
  position: relative;
`;

const ListHeader = styled.header`
  width: 100%;
  height: 4rem;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  color: #fff;
  display: flex;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListTitle = styled.p`
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 600;
`;

const ListMain = styled.main`
  display: flex;
  max-height: 50vh;
  overflow-y: auto;
  width: 100%;
  padding: 0 0.5rem;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1rem;
`;

const DropDownHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AnimatedButton = styled(ButtonContainer)`
  &:hover {
    background-color: #3b506d;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
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

type ListProps = {
  categoryName: string;
  categoryId: string;
};

export default function List({ categoryName, categoryId }: ListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const tasks = useRecoilValue(taskState);
  const filteredTasks = tasks
    .filter((task) => task.taskCategory.categoryId === categoryId)
    .reverse();

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const editDialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteDialogRef = useRef<HTMLDialogElement | null>(null);
  const clearDialogRef = useRef<HTMLDialogElement | null>(null);


  const { register, handleSubmit } = useForm<SubmitType>();
  const [categories , setCategories] = useRecoilState(categoryState);

  type SubmitType = {
    categoryName: string;
  };

  const deleteTodo = (id: string) => {
    const newList = categories.filter((category) => category.categoryId !== id);
    setCategories(newList);
    deleteDialogRef.current?.close();
  };



  const submitHandler = ({ categoryName }: SubmitType) => {
    let targetCategory = categories.find((category) => category.categoryId === categoryId);
    const targetIndex = categories.findIndex((category) => category.categoryId === categoryId);
    if (targetCategory) {
      targetCategory = { ...targetCategory, categoryName: categoryName };
      return setCategories([
        ...categories.slice(0, targetIndex),
        targetCategory,
        ...categories.slice(targetIndex + 1),
      ]);
    }
    editDialogRef.current?.close();
  };


  return (
    <>
      <ListLayout>
        <ListHeader>
          <ListTitle>{categoryName}</ListTitle>
          <DropDown isOpen={isOpen} toggleOpen={toggleOpen}>
            <DropDownHeader>
              <ListTitle>List actions</ListTitle>
              <AnimatedButton onClick={toggleOpen}>
                <DismissIcon />
              </AnimatedButton>
            </DropDownHeader>
            <MenuContainer onClick={() => editDialogRef.current?.showModal()}>
              <ListTitle>Change list title</ListTitle>
            </MenuContainer>
            <MenuContainer onClick={() => deleteDialogRef.current?.showModal()}>
              <ListTitle> Delete List</ListTitle>
            </MenuContainer>
            <MenuContainer>
              <ListTitle>clear list items</ListTitle>
            </MenuContainer>
          </DropDown>
        </ListHeader>
        <ListMain>
          {filteredTasks.map((task) => (
            <Card
              key={task.taskId}
              task={task.task}
              taskId={task.taskId}
              categoryName={categoryName}
            />
          ))}
        </ListMain>

        <AddCard categoryName={categoryName} categoryId={categoryId} />
      </ListLayout>
      {/**
       * Edit Dialog
       */}
      <Modal modalMessage={categoryName} ref={editDialogRef}>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <FormInput
            placeholder={categoryName}
            {...register("categoryName", {
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
      <Modal
        modalMessage={"정말로 삭제 하시겠습니까?"}
        ref={deleteDialogRef}
        mainStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          padding: "1rem  0.5rem",
          gap: "0.5rem",
        }}
      >
        <TaskContainer>
          <TaskTitle>{categoryName}</TaskTitle>
        </TaskContainer>

        <FormButton>
          <DeleteButton type="submit" onClick={() => deleteTodo(categoryId)}>
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
