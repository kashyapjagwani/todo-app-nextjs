const CLIENT_ENDPOINTS = {
  CREATE: "/create",
  EDIT: (id: string) => `/edit/${id}`,
};

const API_ENDPOINTS = {
  GET_ALL: "/tasks",
  GET_ONE: (id: string) => `/tasks/${id}`,
  CREATE: "/tasks",
  EDIT: (id: string) => `/tasks/${id}`,
  DELETE: (id: string) => `/tasks/${id}`,
};

export { CLIENT_ENDPOINTS, API_ENDPOINTS };
