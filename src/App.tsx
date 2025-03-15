import { Route, Routes } from "react-router-dom";
import NewHook1 from "./components/NewHook1";
import NewHook2 from "./components/NewHook2";
import NewHook3 from "./components/NewHook3";

function App() {
  return (
    <>
      <Routes>
        <Route path="/use-action-state" element={<NewHook1 />} />
        <Route path="/use-form-status" element={<NewHook2 />} />
        <Route path="/use-hook" element={<NewHook3 />} />
      </Routes>
    </>
  );
}

export default App;
