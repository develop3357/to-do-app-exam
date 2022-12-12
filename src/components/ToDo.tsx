import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, ToDoListManager, toDoState } from "./atoms";

const Container = styled.li`
  border: 1px dotted whitesmoke;
  border-radius: 10px;
  margin: 10px 5px;
  padding: 10px;
  background-color: whitesmoke;
  color: ${(props) => props.theme.bgColor};
`;

const Content = styled.div`
  padding-bottom: 10px;
  word-break: break-all;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`;

function ToDo({
  text,
  id,
  category: toDoCategory,
}: IToDo & { category: string }) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const manager = new ToDoListManager(toDos);
  const categories = manager.getCategory();
  const onDeleteClick = (event: React.FormEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const manager = new ToDoListManager(oldToDos);
      manager.remove(id);
      return manager.getList();
    });
  };
  const onCategoryChange = (event: React.MouseEvent<HTMLSelectElement>) => {
    const toDo: IToDo = { id, text };
    setToDos((oldToDos) => {
      const manager = new ToDoListManager(oldToDos);
      manager.move(toDo, event.currentTarget.value);
      return manager.getList();
    });
  };
  return (
    <Container>
      <Content>{text}</Content>
      <Controls>
        <select defaultValue={toDoCategory} onInput={onCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.length < 20 ? category : category.slice(0, 20) + "..."}
            </option>
          ))}
        </select>
        <button onClick={onDeleteClick}>🗑️</button>
      </Controls>
    </Container>
  );
}

export default ToDo;
