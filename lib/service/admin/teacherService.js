import api from "../api";

const teacherService = {
    // Get all teachers
    getAllTeachers: async () => {
        const response = await api.get(
            "/api/teacher"
        );

        return response.data;
    },

    // Create teacher
    createTeacher: async (data) => {
        const response = await api.post(
            "/api/teacher",
            data
        );

        return response.data;
    },

    // Get teacher by ID
    getTeacherById: async (id) => {
        const response = await api.get(
            `/api/teacher/${id}`
        );

        return response.data;
    },

    // Update teacher
    updateTeacher: async (id, data) => {
        const response = await api.patch(
            `/api/teacher/${id}`,
            data
        );

        return response.data;
    },

    // Change teacher status
    changeTeacherStatus: async (id, data) => {
        const response = await api.patch(
            `/api/teacher/${id}/status`,
            data
        );

        return response.data;
    },

    // Delete / deactivate teacher
    deleteTeacher: async (id) => {
        const response = await api.delete(
            `/api/teacher/${id}`
        );

        return response.data;
    },
};

export default teacherService;