import api from "./apiClient";

/**
 * Get all tasks with pagination & filters
 * @param {Object} params - { page, limit, status, priority, search }
 * @returns {Object} { tasks, total, page, limit }
 */
export const getTasks = async (params = {}) => {
    try {
        const res = await api.get("/tasks", { params });
        return res.data;
    } catch (err) {
        throw err;
    }
};

/**
 * Get a single task by ID
 * @param {String} taskId
 * @returns {Object} task
 */
export const getTaskById = async (taskId) => {
    try {
        const res = await api.get(`/tasks/${taskId}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

/**
 * Create a new task (Manager/Admin only)
 * @param {Object} taskData
 * @returns {Object} created task
 */
export const createTask = async (taskData) => {
    try {
        const res = await api.post("/tasks", taskData);
        return res.data;
    } catch (err) {
        throw err;
    }
};

/**
 * Update an existing task (Manager/Admin only)
 * @param {String} taskId
 * @param {Object} updateData
 * @returns {Object} updated task
 */
export const updateTask = async (taskId, updateData) => {
    try {
        const res = await api.put(`/tasks/${taskId}`, updateData);
        return res.data;
    } catch (err) {
        throw err;
    }
};

/**
 * Update task status (User/Manager/Admin)
 * @param {String} taskId
 * @param {String} status - "todo" | "in-progress" | "done"
 * @returns {Object} updated task
 */
export const updateTaskStatus = async (taskId, status) => {
    try {
        const res = await api.patch(`/tasks/${taskId}/status`, { status });
        return res.data;
    } catch (err) {
        throw err;
    }
};

/**
 * Delete a task (Admin only)
 * @param {String} taskId
 * @returns {Object} message
 */
export const deleteTask = async (taskId) => {
    try {
        const res = await api.delete(`/tasks/${taskId}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};
