import api from "../api";

// ==========================================
// PARENT DOCUMENT SERVICE
// ==========================================

// GET ALL PARENT DOCUMENTS
export const getParentDocuments = async () => {
    const response = await api.get("/api/parent/documents");
    return response.data;
};

// ==========================================
// GET DOCUMENT BY ID
// ==========================================

export const getParentDocumentById = async (id) => {
    const response = await api.get(
        `/api/parent/documents/${id}`
    );

    return response.data;
};

// ==========================================
// CREATE / UPLOAD PARENT DOCUMENT
// ==========================================

export const createParentDocument = async (formData) => {
    const response = await api.post(
        "/api/parent/documents",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

// ==========================================
// UPDATE DOCUMENT METADATA
// ==========================================

export const updateParentDocument = async (
    id,
    data
) => {
    const response = await api.patch(
        `/api/parent/documents/${id}`,
        data
    );

    return response.data;
};

// ==========================================
// ARCHIVE DOCUMENT
// ==========================================

export const archiveParentDocument = async (id) => {
    const response = await api.patch(
        `/api/parent/documents/${id}/archive`
    );

    return response.data;
};

// ==========================================
// DELETE DOCUMENT
// ==========================================

export const deleteParentDocument = async (id) => {
    const response = await api.delete(
        `/api/parent/documents/${id}`
    );

    return response.data;
};