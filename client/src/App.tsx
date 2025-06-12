import './App.css';
import './modern-reset.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from './pages/client/Dashboard';
import { StarterLayout } from './layouts/StarterLayout';

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<StarterLayout/>}>
          <Route path='/' element={<Dashboard/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
