import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoSelector, Categories } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  CreateToDo {
    background-color: aqua;
  }

  ul {
    margin-top: 15px;
  }

  li {
    list-style-type: none;
    border: 1px dotted;
    border-radius: 5px;
    padding: 5px 10px;
    margin-bottom: 10px;
    min-height: 50px;
    max-width: 240px;

    span {
      display: flex;
      flex-direction: row;
      margin-bottom: 5px;
    }

    button {
    }
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Container>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
