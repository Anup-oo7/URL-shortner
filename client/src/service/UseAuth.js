import { useNavigate } from 'react-router-dom';

export function UseAuth() {
  const navigate = useNavigate();

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

  };

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/');
  };

  const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  };



  return { login, logout, isAuthenticated };
}