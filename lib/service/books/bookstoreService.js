import api from "../api";

const bookstoreService = {
    // GET /api/books
    // supports ?page=&limit=&sort=&status=&genre=&search=&minPrice=&maxPrice=
    getAllBooks: async (params = {}) => {
        const response = await api.get("/api/books", { params });
        return response.data;
    },

    // GET /api/books/available
    getAvailableBooks: async () => {
        const response = await api.get("/api/books/available");
        return response.data;
    },

    // GET /api/books/search?q=...
    searchBooks: async (q) => {
        const response = await api.get("/api/books/search", {
            params: { q },
        });
        return response.data;
    },

    // GET /api/books/genre/:genre
    getBooksByGenre: async (genre) => {
        const response = await api.get(`/api/books/genre/${genre}`);
        return response.data;
    },

    // GET /api/books/isbn/:isbn
    getBookByISBN: async (isbn) => {
        const response = await api.get(`/api/books/isbn/${isbn}`);
        return response.data;
    },

    // GET /api/books/:id
    getBookById: async (id) => {
        const response = await api.get(`/api/books/${id}`);
        return response.data;
    },

    // POST /api/books
    createBook: async (data) => {
        const response = await api.post("/api/books", data);
        return response.data;
    },

    // POST /api/books/bulk
    bulkCreateBooks: async (books) => {
        const response = await api.post("/api/books/bulk", { books });
        return response.data;
    },

    // PUT /api/books/:id
    updateBook: async (id, data) => {
        const response = await api.put(`/api/books/${id}`, data);
        return response.data;
    },

    // DELETE /api/books/:id  (soft delete)
    deleteBook: async (id) => {
        const response = await api.delete(`/api/books/${id}`);
        return response.data;
    },

    // DELETE /api/books/:id/hard
    hardDeleteBook: async (id) => {
        const response = await api.delete(`/api/books/${id}/hard`);
        return response.data;
    },

    // POST /api/books/:id/borrow
    borrowBook: async (id) => {
        const response = await api.post(`/api/books/${id}/borrow`);
        return response.data;
    },

    // POST /api/books/:id/return
    returnBook: async (id) => {
        const response = await api.post(`/api/books/${id}/return`);
        return response.data;
    },

    // POST /api/books/:id/rate
    rateBook: async (id, value) => {
        const response = await api.post(`/api/books/${id}/rate`, { value });
        return response.data;
    },
};

export default bookstoreService;