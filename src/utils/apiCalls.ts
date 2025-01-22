import { API_ENDPOINTS } from "./endpoints";
import { Task } from "./interfaces";

export const createTask = async ({
  title,
  color,
}: {
  title: string;
  color: string;
}) => {
  const URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${API_ENDPOINTS.CREATE}`;
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        color,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllTasks = async () => {
  const URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${API_ENDPOINTS.GET_ALL}`;
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOneTask = async (id: string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${API_ENDPOINTS.GET_ONE(
    id
  )}`;
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const editTask = async (task: Task) => {
  const URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${API_ENDPOINTS.EDIT(
    task.id
  )}`;
  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        color: task.color,
        completed: task.completed,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${API_ENDPOINTS.DELETE(
    id
  )}`;
  try {
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
