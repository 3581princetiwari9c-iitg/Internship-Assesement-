import React, { useEffect, useState, useCallback } from 'react';
import { Dish } from '../types/dish';
import { dishService } from '../services/dishService';
import { useWebSocket } from '../hooks/useWebSocket';
import DishCard from './DishCard';
import Header from './Header';
import AddDishModal from './AddDishModal';
import './DashboardContainer.css';

const DashboardContainer: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'unpublished'>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadDishes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dishService.getAllDishes();
      setDishes(data);
    } catch (err) {
      setError('Failed to load dishes. Please try again.');
      console.error('Error loading dishes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDishes();
  }, []);

  const handleDishCreated = useCallback((newDish: Dish) => {
    setDishes(prevDishes => {
      // Check if dish already exists to prevent duplicates
      if (prevDishes.some(dish => dish.dishId === newDish.dishId)) {
        return prevDishes;
      }
      const updatedDishes = [...prevDishes, newDish];
      return updatedDishes.sort((a, b) => parseInt(a.dishId) - parseInt(b.dishId));
    });
  }, []);

  useWebSocket((updatedDish: Dish) => {
    setDishes(prevDishes =>
      prevDishes.map(dish =>
        dish.dishId === updatedDish.dishId ? updatedDish : dish
      )
    );
  });

  const socket = useWebSocket(() => {});
  
  useEffect(() => {
    if (socket) {
      socket.on('dishCreated', handleDishCreated);
      
      socket.on('dishDeleted', (data: { dishId: string }) => {
        setDishes(prevDishes => prevDishes.filter(dish => dish.dishId !== data.dishId));
      });
      
      return () => {
        socket.off('dishCreated', handleDishCreated);
        socket.off('dishDeleted');
      };
    }
  }, [socket, handleDishCreated]);

  const handleToggle = async (dishId: string) => {
    try {
      const updatedDish = await dishService.toggleDishStatus(dishId);
      setDishes(prevDishes =>
        prevDishes.map(dish =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
    } catch (err) {
      console.error('Error toggling dish status:', err);
      setError('Failed to update dish status. Please try again.');
    }
  };

  const handleAddDish = async (dishData: { dishName: string; imageUrl: string; isPublished: boolean }) => {
    try {
      await dishService.createDish(dishData);
      // Don't add locally - WebSocket will handle it
    } catch (err) {
      console.error('Error creating dish:', err);
      throw err;
    }
  };

  const handleDelete = async (dishId: string) => {
    try {
      await dishService.deleteDish(dishId);
      setDishes(prevDishes => prevDishes.filter(dish => dish.dishId !== dishId));
    } catch (err) {
      console.error('Error deleting dish:', err);
      setError('Failed to delete dish. Please try again.');
      throw err;
    }
  };

  const filteredDishes = dishes.filter(dish => {
    if (filter === 'published') return dish.isPublished;
    if (filter === 'unpublished') return !dish.isPublished;
    return true;
  });

  const stats = {
    total: dishes.length,
    published: dishes.filter(d => d.isPublished).length,
    unpublished: dishes.filter(d => !d.isPublished).length
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dishes...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header 
        stats={stats}
        filter={filter}
        onFilterChange={setFilter}
        onAddDish={() => setIsModalOpen(true)}
      />
      
      <AddDishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddDish}
      />
      
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="dishes-grid">
        {filteredDishes.length === 0 ? (
          <div className="empty-state">
            <p>No dishes found</p>
          </div>
        ) : (
          filteredDishes.map(dish => (
            <DishCard
              key={dish.dishId}
              dish={dish}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardContainer;
