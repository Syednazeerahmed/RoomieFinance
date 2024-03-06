import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './components/navbar';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Entry } from './pages/Entry/entry';
import { AllEntries } from './pages/All-Entries/allEntries';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='login' element={<Login />}/>
          <Route path='entry' element={<Entry />}/>
          <Route path='allEntries' element={<AllEntries />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
