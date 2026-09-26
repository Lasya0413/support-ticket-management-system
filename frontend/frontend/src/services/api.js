const API_BASE_URL = "http://localhost:3000/api";

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ==================== AUTH ====================

export const registerUser = (userData) => {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

// ==================== TICKETS ====================

export const getTickets = () => {
  return request("/tickets");
};

export const getTicketById = (id) => {
  return request(`/tickets/${id}`);
};

export const createTicket = (ticketData) => {
  return request("/tickets", {
    method: "POST",
    body: JSON.stringify(ticketData),
  });
};

export const updateTicket = (id, ticketData) => {
  return request(`/tickets/${id}`, {
    method: "PUT",
    body: JSON.stringify(ticketData),
  });
};

export const deleteTicket = (id) => {
  return request(`/tickets/${id}`, {
    method: "DELETE",
  });
};

// ==================== COMMENTS ====================

export const getComments = (ticketId) => {
  return request(`/tickets/${ticketId}/comments`);
};

export const createComment = (ticketId, commentData) => {
  return request(`/tickets/${ticketId}/comments`, {
    method: "POST",
    body: JSON.stringify(commentData),
  });
};

// ==================== USERS ====================

export const getUsers = () => {
  return request("/users");
};

export const getAgents = () => {
  return request("/users/agents");
};