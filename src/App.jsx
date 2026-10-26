import { useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import ClassesPage from './pages/ClassesPage';
import CriteriaPage from './pages/CriteriaPage';
import ScoresPage from './pages/ScoresPage';
import SawPage from './pages/SawPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage';
import { initialDemoCriteria, initialDemoScores, initialDemoStudents } from './lib/demoData';

const DEMO_USER = {
  name: 'Admin SPK',
  email: 'admin@englishclass.id'
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('demoAuth') === 'true');
  const [students, setStudents] = useState(initialDemoStudents);
  const [criteria, setCriteria] = useState(initialDemoCriteria);
  const [scores, setScores] = useState(initialDemoScores);

  const handleLogin = () => {
    localStorage.setItem('demoAuth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('demoAuth');
    setIsAuthenticated(false);
  };

  const routes = useMemo(
    () => {
      if (isAuthenticated) {
        return (
          <Routes>
            <Route path="/" element={<Layout onLogout={handleLogout} />}>
              <Route index element={<DashboardPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="students" element={<StudentsPage students={students} setStudents={setStudents} scores={scores} setScores={setScores} />} />
              <Route path="classes" element={<ClassesPage />} />
              <Route path="criteria" element={<CriteriaPage criteria={criteria} setCriteria={setCriteria} />} />
              <Route path="scores" element={<ScoresPage students={students} criteria={criteria} scores={scores} setScores={setScores} />} />
              <Route path="saw" element={<SawPage students={students} criteria={criteria} scores={scores} />} />
              <Route path="recommendations" element={<RecommendationsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="profile" element={<ProfilePage user={DEMO_USER} />} />
              <Route path="landing" element={<LandingPage />} />
            </Route>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        );
      }

      return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      );
    },
    [isAuthenticated, students, criteria, scores]
  );

  return routes;
}

export default App;
