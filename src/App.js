import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './components/navbar';
import { Main } from './pages/main';
import { Login } from './pages/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='login' element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
