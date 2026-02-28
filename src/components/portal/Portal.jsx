import useAuth from '../../hooks/useAuth';
import Login from './Login';
import Dashboard from './Dashboard';

export default function Portal() {
  const { isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return <Dashboard onLogout={logout} />;
}
