import api from "../api";

const departmentService = {
    // GET /api/department
    getAllDepartments: async () => {
        const response = await api.get("/api/department");
        return response.data;
    },

    // POST /api/department
    createDepartment: async (data) => {
        const response = await api.post("/api/department", data);
        return response.data;
    },

    // GET /api/department/:id
    getDepartmentById: async (id) => {
        const response = await api.get(`/api/department/${id}`);
        return response.data;
    },

    // PATCH /api/department/:id
    updateDepartment: async (id, data) => {
        const response = await api.patch(
            `/api/department/${id}`,
            data
        );

        return response.data;
    },

    // PATCH /api/department/:id/status
    changeDepartmentStatus: async (id, data) => {
        const response = await api.patch(
            `/api/department/${id}/status`,
            data
        );

        return response.data;
    },

    // DELETE /api/department/:id
    deleteDepartment: async (id) => {
        const response = await api.delete(
            `/api/department/${id}`
        );

        return response.data;
    },
};

export default departmentService;