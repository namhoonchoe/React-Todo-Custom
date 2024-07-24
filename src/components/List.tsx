import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { taskState } from "../atoms";
import AddCard from "./AddCard";
import Card from "./Card";
import DropDown from "./DropDown";
import { useState } from "react";
import DismissIcon from "./Icons/DismissIcon";
 

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

const ButtonContainer = styled.button`
  outline: #fff;
  border-radius: 20%;
  border-color: transparent;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
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

  return (
    <ListLayout>
      <ListHeader>
        <ListTitle>{categoryName}</ListTitle>
        <DropDown isOpen={isOpen} toggleOpen={toggleOpen}>
          <DropDownHeader>
            <ListTitle>List actions</ListTitle>
            <ButtonContainer onClick={toggleOpen}>
              <DismissIcon />
            </ButtonContainer>
          </DropDownHeader>
          <MenuContainer>
            <ListTitle>Change list title</ListTitle>
          </MenuContainer>
          <MenuContainer>
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
  );
}
