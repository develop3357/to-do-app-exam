import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ToDoListManager, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

const Container = styled.div`
  padding: 5px;

  form {
    padding: 10px;

    input {
      width: 95%;
    }
  }
`;

const AddMessage = styled.div`
  border-radius: 10px;
  padding: 10px;

  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;

function CreateToDo({ category }: { category: string }) {
  const [visible, setVisible] = useState(false);
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue, setFocus } = useForm<IForm>();
  register("toDo", {
    onBlur: () => {
      setVisible(false);
    },
  });
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      const manager = new ToDoListManager(oldToDos);
      manager.add({ text: toDo, id: Date.now() }, category);
      return manager.getList();
    });
    setValue("toDo", "");
  };
  const onAddMessageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setVisible(true);
  };
  useEffect(() => {
    setFocus("toDo", { shouldSelect: true });
  }, [visible, setFocus]);
  return (
    <Container>
      {visible ? (
        <form onSubmit={handleSubmit(handleValid)}>
          <input
            {...register("toDo", {
              required: "Please write a To Do",
            })}
            placeholder="Write a to do"
          />
        </form>
      ) : (
        <AddMessage onClick={onAddMessageClick}>+ Add Message</AddMessage>
      )}
    </Container>
  );
}

export default CreateToDo;
