import api from "../api";

const studentService = {

    createStudentProfile: async (studentProfileData) => {
        const response = await api.post(
            "/api/student",
            studentProfileData
        );

        return response.data;
    },

    getStudents: async (params = {}) => {
        const response = await api.get(
            "/api/student",
            {
                params,
            }
        );

        return response.data;
    },


    getStudent: async (studentId) => {
        const response = await api.get(
            `/api/student/${studentId}`
        );

        return response.data;
    },

    updateStudent: async (
        studentId,
        studentProfileData
    ) => {
        const response = await api.patch(
            `/api/student/${studentId}`,
            studentProfileData
        );

        return response.data;
    },

    changeStudentStatus: async (
        studentId,
        status
    ) => {
        const response = await api.patch(
            `/api/student/${studentId}/status`,
            {
                status,
            }
        );

        return response.data;
    },

    deleteStudent: async (studentId) => {
        const response = await api.delete(
            `/api/student/${studentId}`
        );

        return response.data;
    },
};

export default studentService;