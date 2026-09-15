import api from "../api";

const teacherAssignmentService = {
    // Get all teacher assignments
    getAllTeacherAssignments: async () => {
        const response = await api.get(
            "/api/teacher/assignments"
        );

        return response.data;
    },

    // Create teacher assignment
    createTeacherAssignment: async (data) => {
        const response = await api.post(
            "/api/teacher/assignments",
            data
        );

        return response.data;
    },

    // Get teacher assignment by ID
    getTeacherAssignmentById: async (id) => {
        const response = await api.get(
            `/api/teacher/assignments/${id}`
        );

        return response.data;
    },

    // Update teacher assignment
    updateTeacherAssignment: async (id, data) => {
        const response = await api.patch(
            `/api/teacher/assignments/${id}`,
            data
        );

        return response.data;
    },

    // Change teacher assignment status
    changeTeacherAssignmentStatus: async (id, data) => {
        const response = await api.patch(
            `/api/teacher/assignments/${id}/status`,
            data
        );

        return response.data;
    },

    // Delete / deactivate teacher assignment
    deleteTeacherAssignment: async (id) => {
        const response = await api.delete(
            `/api/teacher/assignments/${id}`
        );

        return response.data;
    },
};

export default teacherAssignmentService;