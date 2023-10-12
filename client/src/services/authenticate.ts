import { User } from '../model/user.model';
import instance from './axios.config';

export const loginUserRequest = (user: User) => instance.post('/login', user);

export const registerUserRequest = (user: User) => instance.post('/register', user);

export const verifyTokenRequest = () => instance.get('/verify');
