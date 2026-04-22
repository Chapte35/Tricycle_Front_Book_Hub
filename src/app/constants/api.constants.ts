export const API_BASE_URL = 'http://localhost:8080';

export const API_ROUTES = {
  auth: {
    register: `${API_BASE_URL}/api/auth/register`,
    login: `${API_BASE_URL}/api/auth/login`,
  },
  books: {
    getAll: `${API_BASE_URL}/api/books`,
    getById: (id: number) => `${API_BASE_URL}/api/books/${id}`,
    search: `${API_BASE_URL}/api/books/search`,
    create: `${API_BASE_URL}/api/books`,
    update: (id: number) => `${API_BASE_URL}/api/books/${id}`,
    delete: (id: number) => `${API_BASE_URL}/api/books/${id}`,
  },
  loans: {
    create: `${API_BASE_URL}/api/loans`,
    getMy: `${API_BASE_URL}/api/loans/my`,
    getAll: `${API_BASE_URL}/api/loans`,
    return: (id: number) => `${API_BASE_URL}/api/loans/${id}/return`,
  },
  reservations: {
    create: `${API_BASE_URL}/api/reservations`,
    getMy: `${API_BASE_URL}/api/reservations/my`,
    delete: (id: number) => `${API_BASE_URL}/api/reservations/${id}`,
  },
  ratings: {
    create: (bookId: number) => `${API_BASE_URL}/api/books/${bookId}/ratings`,
    update: (id: number) => `${API_BASE_URL}/api/ratings/${id}`,
    delete: (id: number) => `${API_BASE_URL}/api/ratings/${id}`,
  },
  categories: {
    getAll: `${API_BASE_URL}/api/categories`,
    getById: (id: number) => `${API_BASE_URL}/api/categories/${id}`,
    create: `${API_BASE_URL}/api/categories`,
    update: (id: number) => `${API_BASE_URL}/api/categories/${id}`,
    delete: (id: number) => `${API_BASE_URL}/api/categories/${id}`,
  },
  users: {
    getAll: `${API_BASE_URL}/api/users`,
    getById: (id: number) => `${API_BASE_URL}/api/users/${id}`,
    update: (id: number) => `${API_BASE_URL}/api/users/${id}`,
    delete: (id: number) => `${API_BASE_URL}/api/users/${id}`,
  },
} as const;