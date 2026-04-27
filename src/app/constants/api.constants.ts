export const API_BASE_URL = 'http://localhost:8080';

export const API_ROUTES = {
  upload: {
    image: `${API_BASE_URL}/api/upload/image`
  },
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
    getActiveByBook: (bookId: number) => `${API_BASE_URL}/api/loans/active/book/${bookId}`,
  },
  reservations: {
    create: (bookId: number) => `${API_BASE_URL}/api/reservations/book/${bookId}`,
    getMy: `${API_BASE_URL}/api/reservations/my`,
    delete: (id: number) => `${API_BASE_URL}/api/reservations/${id}`,
    getActiveByBook: (bookId: number) => `${API_BASE_URL}/api/reservations/active/book/${bookId}`,
  },
  reviews: {
    getByBook:  (bookId: number) => `${API_BASE_URL}/api/books/${bookId}/reviews`,
    getAverage: (bookId: number) => `${API_BASE_URL}/api/books/${bookId}/reviews/average`,
    create:     (bookId: number) => `${API_BASE_URL}/api/books/${bookId}/reviews`,
    update:     (bookId: number, reviewId: number) => `${API_BASE_URL}/api/books/${bookId}/reviews/${reviewId}`,
    delete:     (bookId: number, reviewId: number) => `${API_BASE_URL}/api/books/${bookId}/reviews/${reviewId}`,
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