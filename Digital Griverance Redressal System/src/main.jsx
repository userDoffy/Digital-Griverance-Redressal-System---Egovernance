import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';
import Header from './components/layouts/Header.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import CitizenDashboard from './components/citizen/CitizenDashboard.jsx';
import store from './redux/store'
import { Provider } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Unauthorized from "./components/Unauthorized.jsx";
import CitizenLayout from './components/citizen/CitizenLayout.jsx';
import GrieveranceForm from './components/citizen/GrieveranceForm.jsx'
import GirevanceDetails from './components/citizen/GirevanceDetails.jsx'

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

          <Route
            path="/citizen/*"
            element={
              <ProtectedRoute allowedRoles={["Citizen"]}>
                <CitizenLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<CitizenDashboard />} />
            <Route path="grievance/:grievanceId" element={<GirevanceDetails />} />
            <Route path="newForm" element={<GrieveranceForm />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
