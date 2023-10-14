interface Props {
  isTyping: boolean;
  userTyping: string;
}

export const Typing = ({ isTyping, userTyping }: Props) => {
  if (!isTyping) return null;
  
  return <p className="typing"> <span>{userTyping}</span> esta escribiendo...</p>
}