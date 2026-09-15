import api from "../api";

// ============================================================
// GET PARENT STUDENTS
// ============================================================

export const getParentStudents = async () => {
    const response = await api.get(
        "/api/parent/students"
    );

    return response.data;
};

// ============================================================
// SEARCH STUDENT
// ============================================================

export const searchStudent = async (params) => {
    const response = await api.get(
        "/api/parent/students/search",
        {
            params,
        }
    );

    return response.data;
};

// ============================================================
// ADD STUDENT TO PARENT
// ============================================================

export const addStudentToParent = async (data) => {
    const response = await api.post(
        "/api/parent/students",
        data
    );

    return response.data;
};

// ============================================================
// UPDATE PARENT-STUDENT CONNECTION
// ============================================================

export const updateParentStudent = async (
    id,
    data
) => {
    const response = await api.patch(
        `/api/parent/students/${id}`,
        data
    );

    return response.data;
};

// ============================================================
// REMOVE STUDENT FROM PARENT
// ============================================================

export const removeStudentFromParent = async (id) => {
    const response = await api.delete(
        `/api/parent/students/${id}`
    );

    return response.data;
};
