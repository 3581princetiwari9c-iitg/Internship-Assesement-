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

  return (
    <div className={`dish-card ${dish.isPublished ? 'published' : 'unpublished'}`}>
      <div className="dish-image-container">
        <img 
          src={dish.imageUrl} 
          alt={dish.dishName}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
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
