import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { taskState } from "../atoms";
import AddCard from "./AddCard";
import MoreIcon from "./Icons/MoreIcon";
import Card from "./Card";


const ButtonContainer = styled.button`
  outline: #fff;
  border-radius: 0.5rem;
  border-color: transparent;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0;
`;

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
  &:hover ${ButtonContainer} {
    opacity: 1;
  }
`;

const ListTitle = styled.p`
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 600;
`;

const ListMain = styled.main`
  display: flex;
  width: 100%;
  padding: 0 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1rem;
`;


type ListProps = {
  categoryName: string;
  categoryId: string;
};

export default function List({ categoryName, categoryId }: ListProps) {
  const tasks = useRecoilValue(taskState);
  const filteredTasks = tasks.filter(
    (task) => task.taskCategory.categoryId === categoryId
  );

  return (
    <ListLayout>
      <ListHeader>
        <ListTitle>{categoryName}</ListTitle>
        <ButtonContainer>
          <MoreIcon />
        </ButtonContainer>
      </ListHeader>
      <ListMain>
        {filteredTasks.map((task) => (
          <Card key={task.taskId} task={task.task} taskId={task.taskId} categoryName={categoryName} />
        ))}
      </ListMain>

      <AddCard categoryName={categoryName} categoryId={categoryId} />
    </ListLayout>
  );
}
