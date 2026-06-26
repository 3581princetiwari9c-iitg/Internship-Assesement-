const DishModel = require('../models/dishModel');

class DishController {
  static async createDish(req, res) {
    try {
      const { dishName, imageUrl, isPublished } = req.body;
      
      if (!dishName || !imageUrl) {
        return res.status(400).json({
          success: false,
          message: 'dishName and imageUrl are required'
        });
      }
      
      const maxId = await DishModel.getMaxDishId();
      const newDishId = String(maxId + 1);
      
      const newDish = {
        dishId: newDishId,
        dishName,
        imageUrl,
        isPublished: isPublished || false
      };
      
      await DishModel.create(newDish);
      const createdDish = await DishModel.getById(newDishId);
      
      const io = req.app.get('io');
      if (io) {
        io.emit('dishCreated', createdDish);
      }
      
      res.status(201).json({
        success: true,
        message: 'Dish created successfully',
        data: createdDish
      });
    } catch (error) {
      console.error('Error creating dish:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create dish',
        error: error.message
      });
    }
  }

  static async getAllDishes(req, res) {
    try {
      const dishes = await DishModel.getAll();
      res.json({
        success: true,
        data: dishes,
        count: dishes.length
      });
    } catch (error) {
      console.error('Error fetching dishes:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dishes',
        error: error.message
      });
    }
  }

  static async getDishById(req, res) {
    try {
      const { dishId } = req.params;
      const dish = await DishModel.getById(dishId);
      
      if (!dish) {
        return res.status(404).json({
          success: false,
          message: 'Dish not found'
        });
      }
      
      res.json({
        success: true,
        data: dish
      });
    } catch (error) {
      console.error('Error fetching dish:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dish',
        error: error.message
      });
    }
  }

  static async toggleDishStatus(req, res) {
    try {
      const { dishId } = req.params;
      
      const result = await DishModel.togglePublished(dishId);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Dish not found'
        });
      }
      
      const updatedDish = await DishModel.getById(dishId);
      
      const io = req.app.get('io');
      if (io) {
        io.emit('dishUpdated', updatedDish);
      }
      
      res.json({
        success: true,
        message: 'Dish status updated successfully',
        data: updatedDish
      });
    } catch (error) {
      console.error('Error toggling dish status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to toggle dish status',
        error: error.message
      });
    }
  }

  static async deleteDish(req, res) {
    try {
      const { dishId } = req.params;
      
      const result = await DishModel.delete(dishId);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Dish not found'
        });
      }
      
      const io = req.app.get('io');
      if (io) {
        io.emit('dishDeleted', { dishId });
      }
      
      res.json({
        success: true,
        message: 'Dish deleted successfully',
        data: { dishId }
      });
    } catch (error) {
      console.error('Error deleting dish:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete dish',
        error: error.message
      });
    }
  }
}

module.exports = DishController;
