import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { getAllRooms } from "../../services/rooms";
import { Button, Input, Tab, TabList, Tabs } from '@chakra-ui/react'
import { io } from 'socket.io-client';
import { User } from "../../model/user.model";

type Rooms = "deportes" | "anime" | "series";

interface Room {
  _id: string;
  name: Rooms;
}

interface Message {
  message: string;
  user: string;
}

export const URL = 'http://localhost:3000';
const socket = io(URL);

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [showMessages, setShowMessages] = useState(false);
  const [usersConnected, setUsersConnected] = useState<User[]>([]);

  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setMessages((prevMessages) => [...prevMessages, { message }]);
    socket.emit('sendMessage', { room: currentRoom, message, userId: user?.id })
    setMessage('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
  }

  const joinRoom = (room: string) => {
    setShowMessages(true);
    setCurrentRoom(room);
    socket.emit('joinRoom', { room, user });
  }

  const previousMessages = ({ messages, connectedUsers }: { messages: Message[], connectedUsers: [] }) => {
    // setUsersConnected(connectedUsers);
    setMessages(messages);
  }

  // const sendMessage = (message: Message) => {
  //   setMessages((prevState) => [...prevState, message]);
  // }

  useEffect(() => {
    socket.on('previousMessages', previousMessages);
    socket.on('newMessage', (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
    });

    return () => {
      socket.off('previousMessages');
      socket.off('newMessage');
    }
  }, []);

  useEffect(() => {
    const getRooms = async () => {
      const response = await getAllRooms();
      if (!response.data) return;
      setRooms(response.data)
    }
    getRooms();
  }, []);

  return (
    <div className="container-room">
      <h2 style={{ textAlign: 'center' }}>Hello {user?.username}</h2>
      {rooms && (
        <div className="rooms-container">
          <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList>
              {rooms.map(room =>
                <Tab key={room._id} onClick={() => joinRoom(room.name)}>{room.name}</Tab>
              )}
            </TabList>
          </Tabs>
        </div>
      )}
      <div className="container-users">
        <div className="users-connected">
          <ul>
            {usersConnected && usersConnected.map(usersConnected => (
              <li key={usersConnected.id}>{usersConnected.username}</li>
            ))}
          </ul>
        </div>
        <div className="chat">
          <ul>
            {messages && messages.map((message, i) => (
              <li
                key={`${message} ${i}`}
                style={{
                  textAlign: message.user === user?.id ? "right" : "left",
                  backgroundColor: message.user === user?.id ? "#f0f0f0" : "#e0e0e0",
                }}>
                {message.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showMessages ? (
        <div>
          <form onSubmit={handleSubmit} className="form-room">
            <Input
              value={message}
              onChange={handleChange}
              placeholder='Write a message'
            />
            <Button>+</Button>
          </form>
        </div>
      ) : <h2 style={{ textAlign: 'center' }}>Accede al canal que mas te guste</h2>}
    </div>
  )
}