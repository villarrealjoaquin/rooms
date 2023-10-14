import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "./ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { Login, Register, Rooms } from "./pages";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path="/room" element={<Rooms />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
