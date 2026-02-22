/* ============================================
   AXIOS - HTTP client for API calls
   ============================================ */
import axios from 'axios';

/* ============================================
   API CONFIGURATION - Base URL and defaults
   ============================================ */
/* Base URL for API - uses environment variable or localhost fallback */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/* Create axios instance with custom configuration */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ============================================
   RESPONSE INTERCEPTOR - Error handling
   ============================================ */
/* Intercept responses to handle errors globally */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

/* ============================================
   API FUNCTIONS - Data fetching methods
   ============================================ */

/* Get all categories */
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

/* Get all products with optional filters */
export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

/* Get single product by ID */
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

/* Get products by category */
export const getProductsByCategory = async (category, params = {}) => {
  const response = await api.get(`/products/category/${category}`, { params });
  return response.data;
};

/* Search products by query */
export const searchProducts = async (query, params = {}) => {
  const response = await api.get('/products/search', { params: { q: query, ...params } });
  return response.data;
};

/* Get store statistics */
export const getStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};

/* Export axios instance for custom requests */
export default api;
