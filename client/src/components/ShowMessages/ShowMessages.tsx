import { useAuth } from "../../context/AuthContext"
import { Message } from "../../pages"

export const ShowMessages = ({ messages }: { messages: Message[] }) => {
  const { user } = useAuth();

  return (
    <>
      <div className="chat">
        <ul>
          {messages.length === 0 ? (
            <li className="centered-message">
              Sé el primero en iniciar la conversación
            </li>
          )
            : messages.map((message, i) => (
              <li
                key={`${message} ${i}`}
                style={{
                  textAlign: message.user?.username === user?.username ? "right" : "left",
                }}
              >
                <div className="data-message">
                  <strong>{message?.user?.username}</strong>
                  <p>{message.message}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}