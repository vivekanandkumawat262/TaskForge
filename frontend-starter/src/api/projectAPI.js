import api from "./apiClient";

/**
 * Get all projects (current user)
 * @param {Object} params - { page, limit, search }
 * @returns {Array} projects
 */
export const getProjects = async (params = {}) => {
  try {
    const res = await api.get("/projects", { params });

    console.log("Projects:", res.data);

    return res.data;
  } catch (err) {
    console.error("Get projects error:", err);
    throw err;
  }
};

/**
 * Get a single project by ID
 * @param {String|Number} projectId
 * @returns {Object} project
 */
export const getProjectById = async (projectId) => {
    try {
        const res = await api.get(`/projects/${projectId}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

/**
 * Create a new project (Authenticated users)
 * @param {Object} projectData - { name, description }
 * @returns {Object} created project
 */
export const createProject = async (projectData) => {
    try {
        const res = await api.post("/projects", projectData);
        return res.data;
    } catch (err) {
        throw err;
    }
};

/**
 * Update an existing project (Owner/Admin)
 * @param {String|Number} projectId
 * @param {Object} updateData - { name?, description? }
 * @returns {Object} updated project
 */
export const updateProject = async (projectId, updateData) => {
    try {
        const res = await api.put(`/projects/${projectId}`, updateData);
        return res.data;
    } catch (err) {
        throw err;
    }
};

/**
 * Delete a project (Owner/Admin)
 * @param {String|Number} projectId
 * @returns {Object} message
 */
export const deleteProject = async (projectId) => {
    try {
        const res = await api.delete(`/projects/${projectId}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};
