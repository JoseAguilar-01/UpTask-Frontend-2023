import { Manager } from 'socket.io-client';

export const socketManager = new Manager(import.meta.env.VITE_BACKEND_URL);
