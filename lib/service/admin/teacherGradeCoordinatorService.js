import api from "../api";

const teacherGradeCoordinatorService = {
    getAllGradeCoordinators: async () => {
        const response = await api.get(
            "/api/teacher/grade-coordinators"
        );

        return response.data;
    },

    createGradeCoordinator: async (data) => {
        const response = await api.post(
            "/api/teacher/grade-coordinators",
            data
        );

        return response.data;
    },

    getGradeCoordinatorById: async (id) => {
        const response = await api.get(
            `/api/teacher/grade-coordinators/${id}`
        );

        return response.data;
    },

    updateGradeCoordinator: async (id, data) => {
        const response = await api.patch(
            `/api/teacher/grade-coordinators/${id}`,
            data
        );

        return response.data;
    },

    changeGradeCoordinatorStatus: async (id, data) => {
        const response = await api.patch(
            `/api/teacher/grade-coordinators/${id}/status`,
            data
        );

        return response.data;
    },

    deleteGradeCoordinator: async (id) => {
        const response = await api.delete(
            `/api/teacher/grade-coordinators/${id}`
        );

        return response.data;
    },
};

export default teacherGradeCoordinatorService;