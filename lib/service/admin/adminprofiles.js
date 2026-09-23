import api from "../api";

const adminProfilesService = {
    getAdminProfiles: async () => {
        const response = await api.get('/api/admin');
        return response.data;
    },

    getAdminProfile: async (userId) => {
        const response = await api.get(`/api/admin/${userId}`);
        return response.data;
    },

    createAdminProfile: async (adminProfileData) => {
        const response = await api.post(
            '/api/admin',
            adminProfileData
        );

        return response.data;
    },

    updateAdminProfile: async (userId, adminProfileData) => {
        const response = await api.patch(
            `/api/admin/${userId}`,
            adminProfileData
        );

        return response.data;
    },

    deleteAdminProfile: async (userId) => {
        const response = await api.delete(
            `/api/admin/${userId}`
        );

        return response.data;
    },
};

export default adminProfilesService;
