import { useContext } from 'react';
import authContext from '../context/AuthContext';
import socketContext from '../context/SocketContext';

const useAuth = () => useContext(authContext);

const useSocket = () => {
  const socketApi = useContext(socketContext);
  return socketApi;
};

export { useAuth, useSocket };
