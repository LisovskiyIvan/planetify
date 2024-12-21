import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Prices } from "./pages/Prices";
import { About } from "./pages/About";
import { Signup } from "./pages/Signup";
import { User } from "./pages/User";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Dashboard } from "./pages/Dashboard";
import { Kanban } from "./pages/Kanban";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/prices" element={<Prices />} ></Route>
          <Route path="/about" element={<About />} ></Route>
          <Route path="/signup" element={<Signup />} ></Route>
          <Route path="user/:id" element={<User />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/kanban" element={<Kanban />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
