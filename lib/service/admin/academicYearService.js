import api from "../api";

const academicYearService = {
    // GET /api/academic-year/active
    getActiveAcademicYear: async () => {
        const response = await api.get("/api/academic-year/active");
        return response.data;
    },

    // GET /api/academic-year
    getAllAcademicYears: async () => {
        const response = await api.get("/api/academic-year");
        return response.data;
    },

    // GET /api/academic-year/:id
    getAcademicYearById: async (id) => {
        const response = await api.get(`/api/academic-year/${id}`);
        return response.data;
    },

    // POST /api/academic-year
    createAcademicYear: async (data) => {
        const response = await api.post("/api/academic-year", data);
        return response.data;
    },

    // PATCH /api/academic-year/:id
    updateAcademicYear: async (id, data) => {
        const response = await api.patch(
            `/api/academic-year/${id}`,
            data
        );

        return response.data;
    },

    // PATCH /api/academic-year/:id/activate
    activateAcademicYear: async (id) => {
        const response = await api.patch(
            `/api/academic-year/${id}/activate`
        );

        return response.data;
    },

    // PATCH /api/academic-year/:id/complete
    completeAcademicYear: async (id) => {
        const response = await api.patch(
            `/api/academic-year/${id}/complete`
        );

        return response.data;
    },

    // DELETE /api/academic-year/:id
    deleteAcademicYear: async (id) => {
        const response = await api.delete(
            `/api/academic-year/${id}`
        );

        return response.data;
    },
};

export default academicYearService;
