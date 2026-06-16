import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Calendar, LayoutDashboard, PlusCircle, Settings, LogIn, User, LogOut } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Meetings from './pages/Meetings';
import ScheduleMeeting from './pages/ScheduleMeeting';
import MeetingDetails from './pages/MeetingDetails';
import { Button } from './components/Button';

import About from './pages/About';

function Navbar({ isAuthenticated, user, onLogin, onLogout }: { isAuthenticated: boolean; user: any; onLogin: () => void; onLogout: () => void }) {
  const location = useLocation();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-lavender-200 sticky top-0 z-50 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Navigation Links */}
          <div className="flex-1 flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`flex items-center px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/' ? 'text-lavender-600 bg-lavender-100' : 'text-lavender-700 hover:text-lavender-950 hover:bg-lavender-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/schedule"
                className={`flex items-center px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/schedule' ? 'text-lavender-600 bg-lavender-100' : 'text-lavender-700 hover:text-lavender-950 hover:bg-lavender-50'
                }`}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Schedule
              </Link>
              <Link
                to="/meetings"
                className={`flex items-center px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/meetings' ? 'text-lavender-600 bg-lavender-100' : 'text-lavender-700 hover:text-lavender-950 hover:bg-lavender-50'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Meetings
              </Link>
              <Link
                to="/about"
                className={`flex items-center px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/about' ? 'text-lavender-600 bg-lavender-100' : 'text-lavender-700 hover:text-lavender-950 hover:bg-lavender-50'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                About
              </Link>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-lavender-600 p-2 rounded-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-lavender-300">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-lavender-950 tracking-tighter uppercase">Auto-Meet</span>
            </Link>
          </div>

          {/* Right Side: Account/Login */}
          <div className="flex-1 flex items-center justify-end gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 bg-lavender-50 px-4 py-2 rounded-2xl border border-lavender-100 hover:bg-lavender-100 hover:scale-105 transition-all duration-200 group shadow-sm hover:shadow-[0_10px_20px_-8px_rgba(155,89,182,0.15)]">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-lavender-950 leading-none mb-1">{user?.name || 'My Account'}</p>
                    <p className="text-[10px] text-lavender-600 leading-none">{user?.email}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden border border-lavender-100">
                    {user?.picture ? (
                      <img src={user.picture} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <User className="w-5 h-5 text-lavender-400" />
                    )}
                  </div>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-lavender-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all hover:scale-105"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Button onClick={onLogin} size="sm" className="rounded-xl px-6 shadow-lg shadow-lavender-200">
                <LogIn className="w-4 h-4 mr-2" />
                Connect
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-lavender-50 border-t border-lavender-200 py-12 mt-auto print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 group">
            <div className="bg-lavender-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-lavender-950 tracking-tighter uppercase">Auto-Meet</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm font-bold text-lavender-900 mb-1">© {new Date().getFullYear()} Auto-Meet</p>
            <p className="text-xs text-lavender-600">
              All rights reserved by <span className="font-bold text-lavender-800">Simaab Malik</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState<{ error: string; details?: string; redirectUri?: string } | null>(null);

  useEffect(() => {
    checkAuth();
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        checkAuth();
        setAuthError(null);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/status');
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        const data = await res.json();
        setIsAuthenticated(data.isAuthenticated);
        setUser(data.user || null);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleLogin = async () => {
    setAuthError(null);
    try {
      console.log('[Auth] Initiating login...');
      const res = await fetch('/api/auth/url');
      const data = await res.json();
      
      if (!res.ok) {
        console.error('[Auth] Failed to get auth URL:', data);
        setAuthError(data);
        return;
      }

      console.log('[Auth] Opening popup for:', data.url);
      const authWindow = window.open(data.url, 'oauth_popup', 'width=600,height=700');
      
      if (!authWindow) {
        alert('Please allow popups for this site to connect your Google account.');
      }
    } catch (err) {
      console.error('[Auth] Login error:', err);
      setAuthError({ 
        error: 'Connection Error', 
        details: err instanceof Error ? err.message : 'Could not connect to server. Please ensure the backend is running.' 
      });
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-lavender-50 font-sans text-lavender-950">
        <Navbar isAuthenticated={isAuthenticated} user={user} onLogin={handleLogin} onLogout={handleLogout} />
        
        <main className="flex-grow py-6">
          {!isAuthenticated ? (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
              <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-lavender-200 shadow-[0_20px_35px_-12px_rgba(155,89,182,0.15)] hover:-translate-y-2 transition-transform duration-500">
                <div className="bg-lavender-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <Calendar className="w-12 h-12 text-lavender-600" />
                </div>
                <h1 className="text-5xl font-black text-lavender-950 mb-6 tracking-tight">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender-500 to-lavender-600 uppercase">Auto-Meet</span></h1>
                <p className="text-xl text-lavender-700 mb-12 max-w-lg mx-auto leading-relaxed">
                  The smartest way to schedule meetings, generate AI summaries, and keep your team in sync.
                </p>

                {authError && (
                  <div className="mb-12 p-8 bg-red-50 border border-red-100 rounded-[2rem] text-left max-w-2xl mx-auto shadow-sm">
                    <h3 className="text-red-800 font-bold mb-4 flex items-center text-lg">
                      <Settings className="w-5 h-5 mr-3" />
                      Google Login Setup Required
                    </h3>
                    <p className="text-red-700 mb-6">{authError.error} {authError.details}</p>
                    
                    <div className="space-y-4 text-sm text-lavender-800">
                      <div className="p-6 bg-white rounded-2xl border border-red-100 shadow-sm">
                        <p className="font-bold mb-3 text-lavender-950">How to fix:</p>
                        <ol className="list-decimal ml-5 space-y-3">
                          <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer" className="text-lavender-600 font-bold underline decoration-2 underline-offset-4 hover:text-lavender-500">Google Cloud Console</a>.</li>
                          <li>Create an OAuth 2.0 Client ID.</li>
                          <li>Add this <b>Authorized Redirect URI</b>:
                            <code className="block mt-2 p-3 bg-lavender-50 rounded-xl border border-lavender-200 text-xs break-all font-mono text-lavender-600 select-all">
                              {authError.redirectUri || `${window.location.origin}/auth/callback`}
                            </code>
                          </li>
                          <li>Copy your <b>Client ID</b> and <b>Client Secret</b>.</li>
                          <li>Open <b>Settings (⚙️)</b> in AI Studio → <b>Secrets</b>.</li>
                          <li>Add <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> as secrets.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}

                <Button size="lg" onClick={handleLogin} className="rounded-full px-12 py-7 text-lg font-bold shadow-[0_10px_20px_-8px_rgba(155,89,182,0.3)] hover:shadow-[0_25px_40px_-12px_rgba(155,89,182,0.25)] hover:scale-105 transition-transform duration-200">
                  <LogIn className="w-6 h-6 mr-3" />
                  Get Started with Google
                </Button>
                
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                  <div className="p-6 rounded-3xl hover:bg-lavender-50 hover:shadow-[0_20px_35px_-12px_rgba(155,89,182,0.1)] transition-all duration-300 group border border-transparent hover:border-lavender-100 hover:-translate-y-1">
                    <div className="text-lavender-600 font-black text-2xl mb-3 group-hover:translate-x-1 group-hover:text-lavender-500 transition-all duration-200">01. Schedule</div>
                    <p className="text-lavender-700 leading-relaxed">Create Google Meet events and send automated invites instantly.</p>
                  </div>
                  <div className="p-6 rounded-3xl hover:bg-lavender-50 hover:shadow-[0_20px_35px_-12px_rgba(155,89,182,0.1)] transition-all duration-300 group border border-transparent hover:border-lavender-100 hover:-translate-y-1">
                    <div className="text-lavender-600 font-black text-2xl mb-3 group-hover:translate-x-1 group-hover:text-lavender-500 transition-all duration-200">02. Meet</div>
                    <p className="text-lavender-700 leading-relaxed">Join meetings with one click and focus on the conversation.</p>
                  </div>
                  <div className="p-6 rounded-3xl hover:bg-lavender-50 hover:shadow-[0_20px_35px_-12px_rgba(155,89,182,0.1)] transition-all duration-300 group border border-transparent hover:border-lavender-100 hover:-translate-y-1">
                    <div className="text-lavender-600 font-black text-2xl mb-3 group-hover:translate-x-1 group-hover:text-lavender-500 transition-all duration-200">03. Summarize</div>
                    <p className="text-lavender-700 leading-relaxed">Leverage Groq AI to generate key points and action items from notes.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/meetings" element={<Meetings />} />
                <Route path="/schedule" element={<ScheduleMeeting />} />
                <Route path="/meeting/:id" element={<MeetingDetails />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
}
