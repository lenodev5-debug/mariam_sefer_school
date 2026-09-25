import api from "../api";



// TIMETABLE SERVICE


const timetableService = {

    // CREATE TIMETABLE
    // POST /api/timetable

    createTimetable: async (timetableData) => {

        const response = await api.post(
            "/api/timetable",
            timetableData
        );

        return response.data;
    },


    // GET ALL TIMETABLES
    // GET /api/timetable

    getAllTimetables: async (params = {}) => {

        const response = await api.get(
            "/api/timetable",
            {
                params,
            }
        );

        return response.data;
    },


    // GET TIMETABLE BY ID
    // GET /api/timetable/:id

    getTimetableById: async (id) => {

        const response = await api.get(
            `/api/timetable/${id}`
        );

        return response.data;
    },


    // UPDATE TIMETABLE
    // PATCH /api/timetable/:id

    updateTimetable: async (
        id,
        timetableData
    ) => {

        const response = await api.patch(
            `/api/timetable/${id}`,
            timetableData
        );

        return response.data;
    },


    // CHANGE TIMETABLE STATUS
    // PATCH /api/timetable/:id/status

    changeTimetableStatus: async (
        id,
        status
    ) => {

        const response = await api.patch(
            `/api/timetable/${id}/status`,
            {
                status,
            }
        );

        return response.data;
    },


    // DELETE TIMETABLE
    // DELETE /api/timetable/:id

    deleteTimetable: async (id) => {

        const response = await api.delete(
            `/api/timetable/${id}`
        );

        return response.data;
    },

};


export default timetableService;