import './App.css';
import './modern-reset.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from './pages/client/Dashboard';
import { StarterLayout } from './layouts/StarterLayout';
import { Login } from './pages/client/Login';
import { Register } from './pages/client/Register';
import './configs/i18n.ts';

function App() {

  return (
    <Router>
      <Routes>
        {/** Public routes */}
        <Route element={<StarterLayout/>}>
          <Route path='/' element={<Dashboard/>} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App
