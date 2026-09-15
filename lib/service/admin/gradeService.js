import api from "../api";

const gradeService = {
    // GET /api/grade
    getAllGrades: async () => {
        const response = await api.get("/api/grade");
        return response.data;
    },

    // POST /api/grade
    createGrade: async (data) => {
        const response = await api.post("/api/grade", data);
        return response.data;
    },

    // GET /api/grade/:id
    getGradeById: async (id) => {
        const response = await api.get(`/api/grade/${id}`);
        return response.data;
    },

    // PATCH /api/grade/:id
    updateGrade: async (id, data) => {
        const response = await api.patch(
            `/api/grade/${id}`,
            data
        );

        return response.data;
    },

    // PATCH /api/grade/:id/status
    changeGradeStatus: async (id, data) => {
        const response = await api.patch(
            `/api/grade/${id}/status`,
            data
        );

        return response.data;
    },

    // DELETE /api/grade/:id
    deleteGrade: async (id) => {
        const response = await api.delete(
            `/api/grade/${id}`
        );

        return response.data;
    },
};

export default gradeService;