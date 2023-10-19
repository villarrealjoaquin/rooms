import { User } from '../model/user.model';
import instance from './axios.config';

const api = {
  loginUserRequest: (user: User) => instance.post('/login', user),
  registerUserRequest: (user: User) => instance.post('/register', user),
  verifyTokenRequest: () => instance.get('/verify'),
  logoutRequest: () => instance.get('/logout')
}

export default api;
