import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ToDoListManager, toDoState } from "./atoms";
import Category from "./Category";

const Container = styled.div`
  height: 100vh;
`;

const Title = styled.div`
  background-color: black;
  font-size: 36px;
  padding: 15px 0;

  h1 {
    padding: 0 15px;
  }
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  padding: 15px;
  overflow-x: auto;
  height: 90%;
`;

const AddCategory = styled(Categories)`
  flex: 0 0 auto;
  background-color: gray;
  border: 1px solid gray;
  border-radius: 10px;
  width: 260px;
  height: 18px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.bgColor};
  }
`;

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onAddCategoryClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const newCategory = prompt("Enter new category name");
    if (newCategory && newCategory !== "") {
      const manager = new ToDoListManager(toDos);
      manager.addCategory(newCategory);
      setToDos(manager.getList());
    }
  };
  return (
    <Container>
      <Title>
        <h1>To Dos</h1>
        <hr />
      </Title>
      <Categories>
        {Object.keys(toDos).map((category) => (
          <Category key={category} category={category} data={toDos[category]} />
        ))}
        <AddCategory onClick={onAddCategoryClick}>+ Add Category</AddCategory>
      </Categories>
    </Container>
  );
}

export default ToDoList;
