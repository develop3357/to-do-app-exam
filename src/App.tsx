import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import ToDoList from "./components/ToDoList";

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
`;

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
