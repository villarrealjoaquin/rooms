import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const AuthGuard = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if(isLoading) return <h1>Loading...</h1>
  const hasToken = isAuthenticated && !isLoading ? <Outlet /> : <Navigate replace to='/login' />

  return hasToken;
}