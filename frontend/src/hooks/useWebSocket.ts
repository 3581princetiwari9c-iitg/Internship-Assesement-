import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Dish } from '../types/dish';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const useWebSocket = (onDishUpdated: (dish: Dish) => void): Socket | null => {
  useEffect(() => {
    if (!socket) {
      socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      });

      socket.on('connect', () => {
        console.log('WebSocket connected');
      });

      socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
      });

      socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
      });
    }

    const handleDishUpdate = (dish: Dish) => {
      console.log('Dish updated via WebSocket:', dish);
      onDishUpdated(dish);
    };

    socket.on('dishUpdated', handleDishUpdate);

    return () => {
      socket?.off('dishUpdated', handleDishUpdate);
    };
  }, [onDishUpdated]);

  return socket;
};
