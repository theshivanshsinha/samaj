import './App.css';
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditProfile from './components/Profile/EditProfile';
import CreatePost from './components/CreatePost/CreatePost';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/EditProfile' element={<EditProfile />} />
        <Route path='/CreatePost' element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
