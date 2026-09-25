import api from "../api";

const userService = {
    // Create user
    createUser: async (data) => {
        const response = await api.post(
            "/api/user",
            data
        );

        return response.data;
    },

    getAllUsers: async (params = {}) => {
    const response = await api.get("/api/user", {
        params,
    });

    return response.data;
    },

    // Get user by ID
    getUserById: async (id) => {
        const response = await api.get(
            `/api/user/${id}`
        );

        return response.data;
    },

    // Update user
    updateUser: async (id, data) => {
        const response = await api.patch(
            `/api/user/${id}`,
            data
        );

        return response.data;
    },

    // Change user role
    changeUserRole: async (id, data) => {
        const response = await api.patch(
            `/api/user/${id}/role`,
            data
        );

        return response.data;
    },

    // Change user status
    changeUserStatus: async (id, data) => {
        const response = await api.patch(
            `/api/user/${id}/status`,
            data
        );

        return response.data;
    },

    // Delete / deactivate user
    deleteUser: async (id) => {
        const response = await api.delete(
            `/api/user/${id}`
        );

        return response.data;
    },
};

export default userService;