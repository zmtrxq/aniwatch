import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { AuthProvider, useAuth } from './context/AuthContext';
import AnimeDetailsPage from './pages/AnimeDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      {user ? (
        <>
          <Header />
          <main className="page">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/anime/:id" element={<AnimeDetailsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/signin" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </>
      ) : (
        <main className="auth-page">
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="*" element={<Navigate to="/signup" />} />
          </Routes>
        </main>
      )}
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
