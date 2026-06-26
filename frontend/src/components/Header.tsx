import React from 'react';
import './Header.css';

interface HeaderProps {
  stats: {
    total: number;
    published: number;
    unpublished: number;
  };
  filter: 'all' | 'published' | 'unpublished';
  onFilterChange: (filter: 'all' | 'published' | 'unpublished') => void;
  onAddDish: () => void;
}

const Header: React.FC<HeaderProps> = ({ stats, filter, onFilterChange, onAddDish }) => {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="header-title-section">
          <div>
            <h1>Dish Management Dashboard</h1>
            <p className="subtitle">Manage and monitor your restaurant menu</p>
          </div>
          <button className="add-dish-button" onClick={onAddDish}>
            <span className="plus-icon">+</span>
            Add Dish
          </button>
        </div>
      </div>
      
      <div className="stats-container">
        <div 
          className={`stat-card ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Dishes</span>
        </div>
        <div 
          className={`stat-card published ${filter === 'published' ? 'active' : ''}`}
          onClick={() => onFilterChange('published')}
        >
          <span className="stat-value">{stats.published}</span>
          <span className="stat-label">Published</span>
        </div>
        <div 
          className={`stat-card unpublished ${filter === 'unpublished' ? 'active' : ''}`}
          onClick={() => onFilterChange('unpublished')}
        >
          <span className="stat-value">{stats.unpublished}</span>
          <span className="stat-label">Unpublished</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
