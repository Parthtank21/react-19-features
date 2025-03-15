import { Route, Routes } from "react-router-dom";
import NewHook1 from "./components/NewHook1";

function App() {
  return (
    <>
      <p>Hello World</p>
      <Routes>
        <Route path="/use-action-state" element={<NewHook1 />} />
      </Routes>
    </>
  );
}

export default App;
