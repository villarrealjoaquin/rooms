import instance from './axios.config';

export const getAllRooms = () => instance.get('/rooms');