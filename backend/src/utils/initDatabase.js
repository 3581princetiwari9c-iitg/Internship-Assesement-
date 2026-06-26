require('dotenv').config();
const DishModel = require('../models/dishModel');

const sampleDishes = [
  {
    dishName: "Jeera Rice",
    dishId: "1",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg",
    isPublished: true
  },
  {
    dishName: "Paneer Tikka",
    dishId: "2",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg",
    isPublished: true
  },
  {
    dishName: "Rabdi",
    dishId: "3",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg",
    isPublished: true
  },
  {
    dishName: "Chicken Biryani",
    dishId: "4",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg",
    isPublished: true
  },
  {
    dishName: "Alfredo Pasta",
    dishId: "5",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg",
    isPublished: true
  }
];

async function initializeDatabase() {
  try {
    console.log('Dropping existing dishes table...');
    await dropTable();
    console.log('Table dropped successfully');
    
    console.log('Creating dishes table...');
    await DishModel.createTable();
    console.log('Table created successfully');
    
    console.log('Inserting sample data...');
    await DishModel.bulkInsert(sampleDishes);
    console.log('Sample data inserted successfully');
    
    console.log('Database initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

function dropTable() {
  const db = require('../config/database');
  return new Promise((resolve, reject) => {
    db.run('DROP TABLE IF EXISTS dishes', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

initializeDatabase();
