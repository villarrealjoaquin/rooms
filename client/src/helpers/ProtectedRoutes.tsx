import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loading } from "../components";

export const AuthGuard = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <Loading />
  return isAuthenticated && !isLoading ? <Outlet /> : <Navigate replace to='/login' />
}