import { Route, Routes } from "react-router-dom";
import NewHook1 from "./components/NewHook1";
import NewHook2 from "./components/NewHook2";
import NewHook3 from "./components/NewHook3";
import NewHook4 from "./components/NewHook4";

function App() {
  return (
    <>
      <Routes>
        <Route path="/use-action-state" element={<NewHook1 />} />
        <Route path="/use-form-status" element={<NewHook2 />} />
        <Route path="/use-hook" element={<NewHook3 />} />
        <Route path="/use-optimistic" element={<NewHook4 />} />
      </Routes>
    </>
  );
}

export default App;
