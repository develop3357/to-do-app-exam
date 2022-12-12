import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, ToDoListManager, toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  flex: 0 0 auto;
  margin-right: 15px;
  border: 1px solid gray;
  border-radius: 10px;
  width: 260px;
`;

const Title = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: gray;
  display: flex;
  justify-content: space-between;

  span:hover {
    cursor: pointer;
  }
`;

const Contents = styled.ul`
  overflow-y: auto;
  max-height: 60vh;
`;

function Category({ data, category }: { data: IToDo[]; category: string }) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onCategoryNameClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    alert(`[${category}]`);
  };
  const onCategoryDeleteClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    const proceed = window.confirm(
      `Category: ${category} and all the items will be deleted.\nProceed?`
    );
    if (proceed) {
      const manager = new ToDoListManager(toDos);
      manager.removeCategory(category);
      setToDos(manager.getList());
    }
  };
  return (
    <Container>
      <Title>
        <span onClick={onCategoryNameClick}>
          {category.length < 30 ? category : category.slice(0, 28) + "..."}
        </span>
        <span onClick={onCategoryDeleteClick}>🗑️</span>
      </Title>
      <Contents>
        {data.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} category={category} />
        ))}
      </Contents>
      <CreateToDo category={category} />
    </Container>
  );
}

export default Category;
