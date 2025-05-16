import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Only this line changes
import { AuthProvider } from './context/AuthContext';
import { SurveyProvider } from './context/SurveyContext';
import Home from './pages/Home';
import Survey from './pages/Survey';
import ThankYou from './components/ThankYou';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Analytics from './pages/Analytics';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResearchInsights from './components/ResearchInsights';
import ResearchDetails from './components/ResearchDetails';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './styles/App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router basename="/"> {/* Added basename for consistency */}
      <AuthProvider>
        <SurveyProvider>
          <div className="app-container">
            <AnimatePresence>
              {showIntro && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="fixed inset-0 bg-white z-50 flex items-center justify-center"
                >
                  {/* Your animation remains unchanged */}
                </motion.div>
              )}
            </AnimatePresence>

            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/login" element={<Login />} />
                <Route path="/research-details" element={<ResearchInsights />} />
                <Route path="/research-about" element={<ResearchDetails />} />

                {/* Protected Admin Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <SurveyProvider>
                        <Dashboard />
                      </SurveyProvider>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  } 
                />

                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </SurveyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;