const db = require('../config/database');

class DishModel {
  static createTable() {
    return new Promise((resolve, reject) => {
      const query = `
        CREATE TABLE IF NOT EXISTS dishes (
          dishId TEXT PRIMARY KEY,
          dishName TEXT NOT NULL,
          imageUrl TEXT NOT NULL,
          isPublished INTEGER DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      db.run(query, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM dishes ORDER BY CAST(dishId AS INTEGER) ASC';
      
      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        else {
          const dishes = rows.map(row => ({
            ...row,
            isPublished: Boolean(row.isPublished)
          }));
          resolve(dishes);
        }
      });
    });
  }

  static getById(dishId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM dishes WHERE dishId = ?';
      
      db.get(query, [dishId], (err, row) => {
        if (err) reject(err);
        else if (!row) resolve(null);
        else {
          resolve({
            ...row,
            isPublished: Boolean(row.isPublished)
          });
        }
      });
    });
  }

  static create(dish) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO dishes (dishId, dishName, imageUrl, isPublished)
        VALUES (?, ?, ?, ?)
      `;
      
      db.run(
        query,
        [dish.dishId, dish.dishName, dish.imageUrl, dish.isPublished ? 1 : 0],
        function(err) {
          if (err) reject(err);
          else resolve({ dishId: dish.dishId });
        }
      );
    });
  }

  static getMaxDishId() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT dishId FROM dishes 
        ORDER BY CAST(dishId AS INTEGER) DESC 
        LIMIT 1
      `;
      
      db.get(query, [], (err, row) => {
        if (err) reject(err);
        else if (!row) resolve(0);
        else {
          const maxId = parseInt(row.dishId, 10);
          resolve(isNaN(maxId) ? 0 : maxId);
        }
      });
    });
  }

  static togglePublished(dishId) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE dishes 
        SET isPublished = NOT isPublished, 
            updatedAt = CURRENT_TIMESTAMP 
        WHERE dishId = ?
      `;
      
      db.run(query, [dishId], function(err) {
        if (err) reject(err);
        else if (this.changes === 0) resolve(null);
        else resolve({ dishId, changes: this.changes });
      });
    });
  }

  static delete(dishId) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM dishes WHERE dishId = ?';
      
      db.run(query, [dishId], function(err) {
        if (err) reject(err);
        else if (this.changes === 0) resolve(null);
        else resolve({ dishId, changes: this.changes });
      });
    });
  }

  static bulkInsert(dishes) {
    return new Promise((resolve, reject) => {
      const placeholders = dishes.map(() => '(?, ?, ?, ?)').join(',');
      const query = `
        INSERT OR REPLACE INTO dishes (dishId, dishName, imageUrl, isPublished)
        VALUES ${placeholders}
      `;
      
      const values = dishes.flatMap(dish => [
        dish.dishId,
        dish.dishName,
        dish.imageUrl,
        dish.isPublished ? 1 : 0
      ]);
      
      db.run(query, values, function(err) {
        if (err) reject(err);
        else resolve({ inserted: this.changes });
      });
    });
  }
}

module.exports = DishModel;
