import React from "react";
import styled from "styled-components";

const TaskContainer = styled.section`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: flex-start;
  background-color: #1f2937;
  border-radius: 12px;
  width: 100%;
  min-height: 3rem;
  gap: 0.5rem;
  color: #fff;
  text-transform: capitalize;
  padding: 1rem;
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
    </TaskContainer>
  );
}
