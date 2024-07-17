import React from "react";
import { styled } from "styled-components";
import AddIcon from "./Icons/AddIcon";

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
`;

const ListTitle = styled.p`
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 600;
`;

const TaskMessage = styled(ListTitle)`
  font-size: 12px;
`;

const AddTask = styled.section`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  background-color: #0d1117;
  border-radius: 12px;
  width: 100%;
  min-height: 3rem;
  gap: 0.5rem;
  color: #fff;
  text-transform: capitalize;
  position: absolute;
  bottom: 0;
`;

const ButtonContainer = styled.button`
  outline: #fff;
  border-radius: 0.5rem;
  border-color: transparent;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
`;

type ListProps = {
  categoryName: string;
  categoryId: string;
};

export default function List({ categoryName, categoryId }: ListProps) {
  return (
    <ListLayout>
      <ListHeader>
        <ListTitle>{categoryName}</ListTitle>
      </ListHeader>
      <AddTask>
        <ButtonContainer>
          <AddIcon />
        </ButtonContainer>

        <TaskMessage>add a card</TaskMessage>
      </AddTask>
    </ListLayout>
  );
}
