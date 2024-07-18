import React from "react";
import styled from "styled-components";
import EditIcon from "./Icons/EditIcon";


const ButtonContainer = styled.button`
  outline: #fff;
  border-radius: 0.5rem;
  border-color: transparent;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
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
  
  &:hover {
    border: solid;
    border-color: #7ca3f8;
  }

  /**
  styled components group hover
  */
  &:hover ${ButtonContainer} {
    opacity: 1;
  }
`;

const TaskTitle = styled.p`
  color: #fff;
  text-transform: capitalize;
  font-weight: 600;
`;


type CardProps = {
  task: string;
  taskId: string;
};

export default function Card({ task, taskId }: CardProps) {
  return (
    <TaskContainer>
      <TaskTitle>{task}</TaskTitle>
      <ButtonContainer>
        <EditIcon />
      </ButtonContainer>
    </TaskContainer>
  );
}
