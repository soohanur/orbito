import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { ClientAuthProvider } from '@/lib/ClientAuth';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Home from './pages/Home';
import Agents from './pages/Agents';
import AgentDetail from './pages/AgentDetail';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Join from './pages/Join';
import About from './pages/About';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Rent from './pages/Rent';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Agents" element={<Agents />} />
        <Route path="/Agents/:slug" element={<AgentDetail />} />
        <Route path="/Properties" element={<Properties />} />
        <Route path="/Properties/:slug" element={<PropertyDetail />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/About" element={<About />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/Sell" element={<Sell />} />
        <Route path="/Rent" element={<Rent />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Blog/:slug" element={<BlogDetail />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ClientAuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </ClientAuthProvider>
    </AuthProvider>
  )
}

export default App
