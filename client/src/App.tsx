import './App.css';
import './modern-reset.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from './pages/client/Dashboard';
import { StarterLayout } from './layouts/StarterLayout';
import { Login } from './pages/client/Login';
import { Register } from './pages/client/Register';
import './configs/i18n.ts';
import { AuthProvider } from './context/AuthContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { ManagementDashboard } from './pages/client/ManagementDashboard.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import { MainLayout } from './layouts/MainLayout.tsx';

function App() {

  return (
    <UserProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/** Public routes */}
            <Route element={<StarterLayout />}>
              <Route path='/' element={<Dashboard />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/** Protected routes */}
            <Route element={<AuthLayout />}>
              <Route element={<MainLayout />}>
                <Route path='/manage-dashboard' element={<ManagementDashboard/>} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </UserProvider>
  )
}

export default App
