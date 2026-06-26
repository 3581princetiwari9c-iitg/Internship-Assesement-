import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './AddDishModal.css';

interface AddDishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dishData: { dishName: string; imageUrl: string; isPublished: boolean }) => Promise<void>;
}

const AddDishModal: React.FC<AddDishModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [dishName, setDishName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!dishName.trim() || !imageUrl.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        dishName: dishName.trim(),
        imageUrl: imageUrl.trim(),
        isPublished
      });
      
      setDishName('');
      setImageUrl('');
      setIsPublished(true);
      onClose();
    } catch (err) {
      setError('Failed to create dish. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setDishName('');
      setImageUrl('');
      setIsPublished(true);
      setError('');
      onClose();
    }
  };

  const modalContent = (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Dish</h2>
          <button className="close-button" onClick={handleClose} disabled={isSubmitting}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="dishName">Dish Name *</label>
            <input
              id="dishName"
              type="text"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              placeholder="Enter dish name"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL *</label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
              required
            />
            <small className="form-hint">
              Enter a direct image URL (ends with .jpg, .png, .webp, etc.)
              <br />
              Example: https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400
            </small>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                disabled={isSubmitting}
              />
              <span>Publish immediately</span>
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Dish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AddDishModal;
