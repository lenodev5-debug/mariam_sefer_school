import api from "../api";

const studentAttendanceService = {
    // ============================================================
    // CREATE ATTENDANCE
    // ============================================================

    createStudentAttendance: async (attendanceData) => {
        const response = await api.post(
            "/api/student-attendance",
            attendanceData
        );

        return response.data;
    },


    // ============================================================
    // GET ALL ATTENDANCE
    // ============================================================

    getStudentAttendance: async (params = {}) => {
        const response = await api.get(
            "/api/student-attendance",
            {
                params,
            }
        );

        return response.data;
    },


    // ============================================================
    // GET ATTENDANCE BY ID
    // ============================================================

    getStudentAttendanceById: async (attendanceId) => {
        const response = await api.get(
            `/api/student-attendance/${attendanceId}`
        );

        return response.data;
    },


    // ============================================================
    // UPDATE ATTENDANCE
    // ============================================================

    updateStudentAttendance: async (
        attendanceId,
        attendanceData
    ) => {
        const response = await api.patch(
            `/api/student-attendance/${attendanceId}`,
            attendanceData
        );

        return response.data;
    },


    // ============================================================
    // DELETE ATTENDANCE
    // ============================================================

    deleteStudentAttendance: async (attendanceId) => {
        const response = await api.delete(
            `/api/student-attendance/${attendanceId}`
        );

        return response.data;
    },
};

export default studentAttendanceService;
