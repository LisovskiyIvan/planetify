import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Prices } from "./pages/Prices";
import { About } from "./pages/About";
import { Signup } from "./pages/Signup";
import { User } from "./pages/User";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route element={<Prices />} path="/prices"></Route>
          <Route element={<About />} path="/about"></Route>
          <Route element={<Signup />} path="/signup"></Route>
          <Route path="user/:id" element={<User />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
