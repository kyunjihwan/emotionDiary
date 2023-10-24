import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import New from "./pages/New";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
  return (
    // url 매핑 처리를 위해 BrowserRouter를 사용한다.
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"App"}
          leftChild={
            <MyButton
              text={"왼쪽 버튼"}
              onClick={() => {
                alert("왼쪽 클릭");
              }}
            />
          }
          rightChild={
            <MyButton
              text={"오른쪽 버튼"}
              onClick={() => {
                alert("오른쪽 클릭");
              }}
            />
          }
        />
        <h2>App.js</h2>

        <MyButton
          text={"버튼"}
          type={"positive"}
          onclick={() => {
            alert("버튼 클릭");
          }}
        />
        <MyButton
          text={"버튼"}
          type={"negative"}
          onclick={() => {
            alert("버튼 클릭");
          }}
        />
        <MyButton
          text={"버튼"}
          onclick={() => {
            alert("버튼 클릭");
          }}
        />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
