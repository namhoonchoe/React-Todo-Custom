import { styled } from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import AddList from "./components/AddList";
import List from "./components/List";
import { useRecoilValue } from "recoil";
import { categoryState } from "./atoms";

const GlobalStyles = createGlobalStyle` 
  ${reset} // styled-reset이라는 패키지를 설치해야한다. 몇가지만 reset해 줄 경우 사용하지 않아도 무방하다.

    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    input:focus {
      outline: none;
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
`;

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #d0e, #91f);
`;

const Header = styled.header`
  width: 100%;
  height: 64px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 32px;
  display: flex;
  justify-content: start;
  padding-left: 24px;
  align-items: center;
`;

const BoardsLayout = styled.section`
  display: flex;
  background-color: transparent;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5rem;
  padding: 0 3rem;
  overflow: auto;
`;

function App() {
  const categories = useRecoilValue(categoryState);

  return (
    <>
      <GlobalStyles />
      <Centered>
        <Header>
          <p>Todos</p>
        </Header>
        <BoardsLayout>
          {categories.map((category) => (
            <List categoryName={category.categoryName} />
          ))}
          <AddList />
        </BoardsLayout>
      </Centered>
    </>
  );
}

export default App;
