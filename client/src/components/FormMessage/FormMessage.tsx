import { AddIcon } from "@chakra-ui/icons"
import { Button, Input } from "@chakra-ui/react"
import { useState } from "react";

import { io } from 'socket.io-client';
import { useAuth } from "../../context/AuthContext";

export const URL = 'http://localhost:3000';
const socket = io(URL);

interface Props {
  room: string;
}

export const FormMessage = ({ room }: Props) => {
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit('sendMessage', { room, message, userId: user?.id })
    setMessage('');
  }

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setMessage(value);

  const handleKeyDown = () => {
    socket.emit('typing', { room, user });
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="form-room">
          <Input
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='Write a message'
          />
          <Button><AddIcon /></Button>
        </form>
      </div>
    </>
  )
}