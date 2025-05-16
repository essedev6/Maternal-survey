import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    }, 2500); // Animation lasts 2.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
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
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: 1,
                      opacity: 1
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      duration: 1
                    }}
                    className="flex flex-col items-center"
                  >
                    {/* Medical Cross Icon */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                      className="relative w-24 h-24 mb-4"
                    >
                      <div className="absolute w-full h-4 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2"></div>
                      <div className="absolute h-full w-4 bg-blue-600 rounded-full left-1/2 transform -translate-x-1/2"></div>
                    </motion.div>
                    
                    {/* App Title */}
                    <motion.h1 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        delay: 0.5,
                        duration: 0.5 
                      }}
                      className="text-2xl font-bold text-gray-800"
                    >
                      Maternal Health Survey
                    </motion.h1>
                  </motion.div>
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