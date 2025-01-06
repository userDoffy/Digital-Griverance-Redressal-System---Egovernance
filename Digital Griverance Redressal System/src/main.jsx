import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layouts/Header.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import CitizenDashboard from './components/citizen/CitizenDashboard.jsx';
import store from './redux/store'
import { Provider } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Unauthorized from "./components/Unauthorized.jsx"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          {/* Protected routes for citizen */}
          <Route
            path="/citizenDashboard"
            element={
              <ProtectedRoute allowedRoles={["Citizen"]}>
                <CitizenDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} /> 
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
