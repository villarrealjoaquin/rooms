import { User } from "../../model/user.model"

export const UsersConnected = ({ connections }: { connections: User[] }) => {
  if (!(connections?.length > 0)) return null;

  return (
    <>
      <div className="users-connected">
        <h3>Usuarios conectados: <span>{connections?.length}</span></h3>
      </div>
    </>
  )
}