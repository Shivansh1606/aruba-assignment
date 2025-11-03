import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';

// Main Pages
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Dashboard from './components/Dashboard/Dashboard';

// Marketing Pages
import Features from './components/Pages/Features';
import Pricing from './components/Pages/Pricing';
import Security from './components/Pages/Security';
import Enterprise from './components/Pages/Enterprise';
import AboutUs from './components/Pages/AboutUs';
import Careers from './components/Pages/Careers';
import Blog from './components/Pages/Blog';
import Contact from './components/Pages/Contact';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Public Route (redirect if already logged in)
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } />
          
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

          <Route path="/register" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />

          {/* Marketing Pages - Public */}
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/security" element={<Security />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes - Dashboard */}
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Catch all - redirect to landing */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="mt-20"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
