import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CommunityMembers from './pages/CommunityMembers';
import AddMember from './pages/AddMember';
import MemberProfile from './pages/MemberProfile';
import HealthRecords from './pages/HealthRecords';
import Visits from './pages/Visits';
import Appointments from './pages/Appointments';
import FollowUps from './pages/FollowUps';
import HealthEducation from './pages/HealthEducation';
import Notifications from './pages/Notifications';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import HealthAssistant from './pages/HealthAssistant';

export default function App() {
  const [backendHealth, setBackendHealth] = useState(null);
  const [checkingHealth, setCheckingHealth] = useState(false);
  const [account, setAccount] = useState(() => {
    try {
      const storedAccount = JSON.parse(window.localStorage.getItem('chwAccount') || 'null');
      return storedAccount && typeof storedAccount.name === 'string' ? storedAccount : null;
    } catch {
      return null;
    }
  });

  const checkBackendHealth = useCallback(async () => {
    setCheckingHealth(true);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBase}/api/health`);

      if (response && response.ok) {
        const data = await response.json();
        setBackendHealth(data);
      } else {
        setBackendHealth({ status: 'offline', message: 'Backend reachable but returned non-200' });
      }
    } catch (err) {
      setBackendHealth({ status: 'offline', message: err.message });
    } finally {
      setCheckingHealth(false);
    }
  }, []);

  useEffect(() => {
    const initialCheck = window.setTimeout(() => {
      void checkBackendHealth();
    }, 0);

    // Poll every 10 seconds to keep live status in sync
    const interval = window.setInterval(() => {
      void checkBackendHealth();
    }, 10000);

    return () => {
      window.clearTimeout(initialCheck);
      window.clearInterval(interval);
    };
  }, [checkBackendHealth]);

  const backendOnline = backendHealth && backendHealth.status === 'healthy';

  const handleLogin = (accountDetails) => {
    window.localStorage.setItem('chwLoggedIn', 'true');
    window.localStorage.setItem('chwAccount', JSON.stringify(accountDetails));
    setAccount(accountDetails);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('chwLoggedIn');
    window.localStorage.removeItem('chwAccount');
    setAccount(null);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar backendOnline={backendOnline} loggedIn={Boolean(account)} account={account} />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  backendHealth={backendHealth}
                  checkBackendHealth={checkBackendHealth}
                  checkingHealth={checkingHealth}
                />
              }
            />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} onLogout={handleLogout} />} />
            <Route path="/dashboard" element={<Dashboard backendHealth={backendHealth} checkBackendHealth={checkBackendHealth} checkingHealth={checkingHealth} />} />
            <Route path="/community-members" element={<CommunityMembers />} />
            <Route path="/add-member" element={<AddMember />} />
            <Route path="/member/:id" element={<MemberProfile />} />
            <Route path="/health-records" element={<HealthRecords />} />
            <Route path="/visits" element={<Visits />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/follow-ups" element={<FollowUps />} />
            <Route path="/health-education" element={<HealthEducation />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/health-assistant" element={<HealthAssistant />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
