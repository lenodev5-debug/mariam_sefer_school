import api from "../api";

const subjectService = {
    // GET /api/subject
    getAllSubjects: async () => {
        const response = await api.get("/api/subject");
        return response.data;
    },

    // POST /api/subject
    createSubject: async (data) => {
        const response = await api.post("/api/subject", data);
        return response.data;
    },

    // GET /api/subject/:id
    getSubjectById: async (id) => {
        const response = await api.get(`/api/subject/${id}`);
        return response.data;
    },

    // PATCH /api/subject/:id
    updateSubject: async (id, data) => {
        const response = await api.patch(
            `/api/subject/${id}`,
            data
        );

        return response.data;
    },

    // PATCH /api/subject/:id/status
    changeSubjectStatus: async (id, data) => {
        const response = await api.patch(
            `/api/subject/${id}/status`,
            data
        );

        return response.data;
    },

    // DELETE /api/subject/:id
    deleteSubject: async (id) => {
        const response = await api.delete(
            `/api/subject/${id}`
        );

        return response.data;
    },
};

export default subjectService;