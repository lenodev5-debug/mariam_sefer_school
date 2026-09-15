import api from "../api";

const parentProfileService = {
    // GET /api/parent
    getAllParents: async () => {
        const response = await api.get("/api/parent");
        return response.data;
    },

    // POST /api/parent
    createParent: async (data) => {
        const response = await api.post("/api/parent", data);
        return response.data;
    },

    // GET /api/parent/:id
    getParentById: async (id) => {
        const response = await api.get(`/api/parent/${id}`);
        return response.data;
    },

    // PATCH /api/parent/:id
    updateParent: async (id, data) => {
        const response = await api.patch(
            `/api/parent/${id}`,
            data
        );

        return response.data;
    },

    // PATCH /api/parent/:id/status
    changeParentStatus: async (id, data) => {
        const response = await api.patch(
            `/api/parent/${id}/status`,
            data
        );

        return response.data;
    },

    // DELETE /api/parent/:id
    deleteParent: async (id) => {
        const response = await api.delete(
            `/api/parent/${id}`
        );

        return response.data;
    },
};

export default parentProfileService;