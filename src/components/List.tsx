import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { taskState } from "../atoms";
import AddCard from "./AddCard";
import Card from "./Card";

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
  justify-content: start;
  align-items: center;
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
