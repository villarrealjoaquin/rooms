import { useNavigate } from "react-router-dom";
import { User } from "../../model/user.model"
import api from "../../services/authenticate";

export const UsersConnected = ({ connections }: { connections: User[] }) => {
  const navigate = useNavigate();
  if (!(connections?.length > 0)) return null;

  const logout = async () => {
    await api.logoutRequest();
    navigate('/login');
  }

  return (
    <>
      <div className="users-connected">
        <h3 className="user-count-change" key={connections.length}>Usuarios conectados: <span>{connections?.length}</span></h3>
        <button onClick={logout}>
          <img width={25} height={25} src="https://cdn.icon-icons.com/icons2/2518/PNG/512/logout_icon_151219.png" alt="logout" />
        </button>
      </div>
    </>
  )
}