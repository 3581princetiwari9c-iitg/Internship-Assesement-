export interface Dish {
  dishId: string;
  dishName: string;
  imageUrl: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface DishResponse {
  success: boolean;
  data: Dish | Dish[];
  message?: string;
  count?: number;
}
