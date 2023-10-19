import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoutes, PublicRoutes } from "./model/routes";
import { AuthGuard, RouterWithNotFound } from "./helpers";
import { Loading } from "./components";

const Rooms = lazy(() => import('./pages/Rooms/Rooms'));
const Register = lazy(() => import('./pages/Register/Register'));
const Login = lazy(() => import('./pages/Login/Login'));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <RouterWithNotFound>
            <Route element={<AuthGuard />}>
              <Route path={`${PrivateRoutes.ROOM}`} element={<Rooms />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path={PublicRoutes.LOGIN} element={<Login />} />
          </RouterWithNotFound>
        </AuthProvider>
      </Suspense>
    </>
  )
}

export default App
