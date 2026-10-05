import api from "../api";

const librarianService = {
    // Create librarian profile
    // POST /api/librarian
    createLibrarian: async (data) => {
        const response = await api.post(
            "/api/librarian",
            data
        );

        return response.data;
    },

    // Get all librarians
    // GET /api/librarian
    getAllLibrarians: async (params = {}) => {
        const response = await api.get(
            "/api/librarian",
            { params }
        );

        return response.data;
    },

    // Get librarian by ID
    // GET /api/librarian/:id
    getLibrarianById: async (id) => {
        const response = await api.get(
            `/api/librarian/${id}`
        );

        return response.data;
    },

    // Update librarian profile
    // PATCH /api/librarian/:id
    updateLibrarian: async (id, data) => {
        const response = await api.patch(
            `/api/librarian/${id}`,
            data
        );

        return response.data;
    },

    // Update librarian status
    // PATCH /api/librarian/:id/status
    updateLibrarianStatus: async (id, status) => {
        const response = await api.patch(
            `/api/librarian/${id}/status`,
            { status }
        );

        return response.data;
    },

    // Delete librarian profile
    // DELETE /api/librarian/:id
    deleteLibrarian: async (id) => {
        const response = await api.delete(
            `/api/librarian/${id}`
        );

        return response.data;
    },
};

export default librarianService;
