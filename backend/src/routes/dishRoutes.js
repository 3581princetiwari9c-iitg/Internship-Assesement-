const express = require('express');
const DishController = require('../controllers/dishController');

const router = express.Router();

router.post('/', DishController.createDish);
router.get('/', DishController.getAllDishes);
router.get('/:dishId', DishController.getDishById);
router.patch('/:dishId/toggle', DishController.toggleDishStatus);
router.delete('/:dishId', DishController.deleteDish);

module.exports = router;
