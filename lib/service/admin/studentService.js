import api from "../api";

const studentService = {
    // POST /api/student
    createStudent: async (data) => {
        const response = await api.post("/api/student", data);
        return response.data;
    },

    // GET /api/student
    getAllStudents: async () => {
        const response = await api.get("/api/student");
        return response.data;
    },

    // GET /api/student/:id
    getStudentById: async (id) => {
        const response = await api.get(`/api/student/${id}`);
        return response.data;
    },

    // PATCH /api/student/:id
    updateStudent: async (id, data) => {
        const response = await api.patch(
            `/api/student/${id}`,
            data
        );

        return response.data;
    },

    // PATCH /api/student/:id/status
    changeStudentStatus: async (id, data) => {
        const response = await api.patch(
            `/api/student/${id}/status`,
            data
        );

        return response.data;
    },

    // DELETE /api/student/:id
    deleteStudent: async (id) => {
        const response = await api.delete(
            `/api/student/${id}`
        );

        return response.data;
    },
};

export default studentService;