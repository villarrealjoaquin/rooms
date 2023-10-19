import { useAuth } from "../../context/AuthContext";

interface Props {
  isTyping: boolean;
  userTyping: string;
}

export const Typing = ({ isTyping, userTyping }: Props) => {
  const { user } = useAuth();
  if (!isTyping || user?.username === userTyping) return null;

  return <p className="typing"><span>{userTyping}</span> esta escribiendo...</p>
}