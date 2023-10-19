import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { User } from "../model/user.model";
import api from "../services/authenticate";

interface Auth {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (user: User) => void;
  signUp: (user: User) => void;
}

export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const signIn = async (user: User) => {
    try {
      const res = await api.loginUserRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      navigate('/room');
      setIsLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  const signUp = async (user: User) => {
    try {
      const res = await api.registerUserRequest(user);
      setUser(res.data);
      console.log(res);
      setIsAuthenticated(true);
      setIsLoading(false);
      navigate('/room');
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  const verifyToken = async () => {
    const cookie = Cookies.get('roomToken');

    try {
      if (!cookie) throw new Error();

      const { data } = await api.verifyTokenRequest();
      if (data) {
        setIsAuthenticated(true);
        setUser(data);
        setIsLoading(false);
        navigate('/room');
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      signIn,
      signUp,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('AuthContext must be used within a AuthProvider');

  return context;
}