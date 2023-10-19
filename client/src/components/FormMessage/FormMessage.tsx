import { AddIcon } from "@chakra-ui/icons"
import { Button, Input } from "@chakra-ui/react"
import { useState } from "react";
import { io } from 'socket.io-client';
import { useAuth } from "../../context/AuthContext";

const URL = 'http://localhost:3000';
const socket = io(URL);

export const FormMessage = ({ room }: { room: string }) => {
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('sendMessage', { room, message, userId: user?.id })
    setMessage('');
  };

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(value);
  };

  const handleKeyDown = () => {
    socket.emit('typing', { room, user });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="form-room">
          <Input
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='Envia un mensaje'
          />
          <Button><AddIcon /></Button>
        </form>
      </div>
    </>
  )
}