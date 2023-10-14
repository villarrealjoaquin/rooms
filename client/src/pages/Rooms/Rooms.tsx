import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
import { Footer, JoinRooms, Navbar, ShowMessages, Typing } from '../../components';
import { FormMessage } from '../../components/FormMessage/FormMessage';
import { ShowRooms } from "../../components/ShowRooms/ShowRooms";
import { UsersConnected } from '../../components/UsersConnected/UsersConnected';
import { useAuth } from "../../context/AuthContext";
import { User } from "../../model/user.model";

export interface Message {
  userId: string;
  to: string;
  user: User;
  message: string;
}

export const URL = 'http://localhost:3000';
const socket = io(URL);

export const Rooms = () => {
  const [currentRoom, setCurrentRoom] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showRoom, setShowRoom] = useState(false);
  const [usersConnected, setUsersConnected] = useState<User[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState('');

  const { user } = useAuth();

  const joinRoom = (room: string) => {
    setShowRoom(true);
    setCurrentRoom(room);
    socket.emit('joinRoom', { room, user });
    toast.success('Welcome to the room ' + room, {
      position: 'top-right',
    });
  }

  const previousMessages = ({ messages, addConnection }: { messages: Message[], addConnection: [] }) => {
    setUsersConnected(addConnection);
    setMessages(messages);
  };

  const sendMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleTyping = (user: string) => {
    setUserTyping(user);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 5000);
  };

  useEffect(() => {
    socket.on('previousMessages', previousMessages);
    socket.on('newMessage', sendMessage);
    socket.on('typing:user', handleTyping);

    socket.on('disconnect', () => {
      console.log('client disconnected');
    });

    return () => {
      socket.off('previousMessages');
      socket.off('newMessage');
    }
  }, []);

  return (
    <main className="container-room">
      <Navbar />
      <Toaster />
      <JoinRooms joinRoom={joinRoom} />
      <UsersConnected connections={usersConnected} />
      <ShowRooms showRoom={showRoom}>
        <ShowMessages messages={messages} />
        <Typing isTyping={isTyping} userTyping={userTyping} />
        <FormMessage room={currentRoom} />
      </ShowRooms>
      <Footer />
    </main>
  )
}