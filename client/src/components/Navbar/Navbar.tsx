import { useAuth } from "../../context/AuthContext"

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <>
      <header>
        <nav>
          <h2 className="h2-room">Hola <span>{user?.username}</span></h2>
        </nav>
      </header>
    </>
  )
};