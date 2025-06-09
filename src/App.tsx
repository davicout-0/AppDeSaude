import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { HealthProvider } from './contexts/HealthContext';
import { GamificationProvider } from './contexts/GamificationContext';
import PrivateRoute from './components/PrivateRoute';
import LoadingSpinner from './components/LoadingSpinner';
import Navbar from './components/Navbar';
import { EmergencyButton } from './components/EmergencyButton';
import { FindNearestButton } from './components/FindNearestButton';
import { EmergencyChat } from './components/EmergencyChat';
import '@fontsource/inter';

const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const History = lazy(() => import('./pages/History'));
const Profile = lazy(() => import('./pages/Profile'));
const NearbyPlaces = lazy(() => import('./pages/NearbyPlaces'));
const Settings = lazy(() => import('./pages/Settings'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Features = lazy(() => import('./pages/Features'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Emergency = lazy(() => import('./pages/Emergency'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Medications = lazy(() => import('./pages/Medications'));

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <HealthProvider>
            <GamificationProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route
                      path="/app/*"
                      element={
                        <PrivateRoute>
                          <>
                            <Navbar />
                            <Routes>
                              <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/history" element={<History />} />
                              <Route path="/appointments" element={<Appointments />} />
                              <Route path="/medications" element={<Medications />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="/nearby" element={<NearbyPlaces />} />
                              <Route path="/emergency" element={<Emergency />} />
                              <Route path="/settings" element={<Settings />} />
                              <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
                            </Routes>
                            <EmergencyButton />
                            <FindNearestButton />
                            <EmergencyChat />
                          </>
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </Suspense>
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'var(--toast-bg)',
                      color: 'var(--toast-color)',
                    },
                  }}
                />
              </div>
            </GamificationProvider>
          </HealthProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;