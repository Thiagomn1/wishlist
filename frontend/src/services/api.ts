import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productsApi = {
  getProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },
};

export const wishlistApi = {
  getWishlist: async () => {
    const response = await api.get('/wishlist');
    return response.data;
  },
  addToWishlist: async (code: number) => {
    const response = await api.post('/wishlist', { code });
    return response.data;
  },
  removeFromWishlist: async (code: number) => {
    const response = await api.delete(`/wishlist/${code}`);
    return response.data;
  },
};
