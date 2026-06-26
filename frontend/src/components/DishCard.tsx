import React, { useState } from 'react';
import { Dish } from '../types/dish';
import './DishCard.css';

interface DishCardProps {
  dish: Dish;
  onToggle: (dishId: string) => Promise<void>;
  onDelete: (dishId: string) => Promise<void>;
}

const DishCard: React.FC<DishCardProps> = ({ dish, onToggle, onDelete }) => {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleToggleClick = async () => {
    setIsToggling(true);
    try {
      await onToggle(dish.dishId);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm(`Are you sure you want to delete "${dish.dishName}"?`)) {
      setIsDeleting(true);
      try {
        await onDelete(dish.dishId);
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`dish-card ${dish.isPublished ? 'published' : 'unpublished'}`}>
      <div className="dish-image-container">
        {!imageError ? (
          <img 
            src={dish.imageUrl} 
            alt={dish.dishName}
            loading="lazy"
            onError={handleImageError}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="placeholder-image">
            <span>🍽️</span>
            <p>Image not available</p>
          </div>
        )}
        <div className={`status-badge ${dish.isPublished ? 'published' : 'unpublished'}`}>
          {dish.isPublished ? 'Published' : 'Unpublished'}
        </div>
        <button 
          className="delete-icon-button"
          onClick={handleDeleteClick}
          disabled={isDeleting}
          title="Delete dish"
        >
          {isDeleting ? '...' : '×'}
        </button>
      </div>
      
      <div className="dish-content">
        <h3 className="dish-name">{dish.dishName}</h3>
        <p className="dish-id">ID: {dish.dishId}</p>
        
        <button 
          className={`toggle-button ${isToggling ? 'loading' : ''}`}
          onClick={handleToggleClick}
          disabled={isToggling || isDeleting}
        >
          {isToggling ? 'Updating...' : dish.isPublished ? 'Unpublish' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default DishCard;
