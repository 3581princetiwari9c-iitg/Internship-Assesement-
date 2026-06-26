import { Dish } from '../types/dish';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface CreateDishData {
  dishName: string;
  imageUrl: string;
  isPublished: boolean;
}

class DishService {
  async createDish(dishData: CreateDishData): Promise<Dish> {
    const response = await fetch(`${API_BASE_URL}/dishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dishData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create dish');
    }
    
    const result = await response.json();
    return result.data;
  }

  async getAllDishes(): Promise<Dish[]> {
    const response = await fetch(`${API_BASE_URL}/dishes`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch dishes');
    }
    
    const result = await response.json();
    return result.data;
  }

  async getDishById(dishId: string): Promise<Dish> {
    const response = await fetch(`${API_BASE_URL}/dishes/${dishId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch dish');
    }
    
    const result = await response.json();
    return result.data;
  }

  async toggleDishStatus(dishId: string): Promise<Dish> {
    const response = await fetch(`${API_BASE_URL}/dishes/${dishId}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to toggle dish status');
    }
    
    const result = await response.json();
    return result.data;
  }

  async deleteDish(dishId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/dishes/${dishId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete dish');
    }
  }
}

export const dishService = new DishService();
