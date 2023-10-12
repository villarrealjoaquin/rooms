import { Route, Routes } from "react-router-dom";
import { Rooms, Login, Register } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import { AuthGuard } from "./ProtectedRoutes";

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
