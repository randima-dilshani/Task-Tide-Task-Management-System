import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreateTasks from "./components/Tasks/CreateTasks";
import TaskDetails from "./components/Tasks/TaskDetails";
import CompletedTasks from "./components/Tasks/CompletedTasks";
import EditTasks from "./components/Tasks/EditTasks";
import InProgressTasks from "./components/Tasks/InProgressTasks";
import ToDoTasks from "./components/Tasks/ToDoTasks";
import TeamMembers from "./components/User/TeamMembers";
import SpecificTask from "./components/Tasks/SpecificTask";
import About from "./pages/About";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/createtasks" element={<CreateTasks />} />
      <Route path="/taskdetails" element={<TaskDetails />} />
      <Route path="/completedtasks" element={<CompletedTasks />} />
      <Route path="/updateTask/:taskId" element={<EditTasks />} />
      <Route path="/inprogresstasks" element={<InProgressTasks />} />
      <Route path="/pendingtasks" element={<ToDoTasks />} />
      <Route path="/team" element={<TeamMembers />} />
      <Route path="/getTask/:taskId" element={<SpecificTask />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
