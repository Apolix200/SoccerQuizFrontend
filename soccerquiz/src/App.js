import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Result from './pages/Result';
import Quiz from './pages/Quiz';
import Admin from "./pages/Admin";
import QuizEdit from "./pages/QuizEdit";
import ResultEdit from "./pages/ResultEdit";

export default function App() {

  var user = JSON.parse(sessionStorage.getItem("user") || "[]");

  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={user.length === 0 ? <Navigate to="/login"/> : <Navigate to="/home"/>} />
          <Route path="/*" element={user.length === 0 ? <Navigate to="/login"/> : <Navigate to="/home"/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quizedit" element={<QuizEdit />} />
          <Route path="/resultedit" element={<ResultEdit />} />
      </Routes>
    </>
  );
}
