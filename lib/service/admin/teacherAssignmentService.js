import api from "../api";

const teacherAssignmentService = {
    getAllTeacherAssignments: async (params = {}) => {
        const response = await api.get(
            "/api/teacher/assignments",
            { params }
        );

        return response.data;
    },

    createTeacherAssignment: async (data) => {
        const response = await api.post(
            "/api/teacher/assignments",
            data
        );

        return response.data;
    },

    getTeacherAssignmentById: async (id) => {
        const response = await api.get(
            `/api/teacher/assignments/${id}`
        );

        return response.data;
    },

    updateTeacherAssignment: async (id, data) => {
        const response = await api.patch(
            `/api/teacher/assignments/${id}`,
            data
        );

        return response.data;
    },

    changeTeacherAssignmentStatus: async (id, data) => {
        const response = await api.patch(
            `/api/teacher/assignments/${id}/status`,
            data
        );

        return response.data;
    },

    deleteTeacherAssignment: async (id) => {
        const response = await api.delete(
            `/api/teacher/assignments/${id}`
        );

        return response.data;
    },
};

export default teacherAssignmentService;