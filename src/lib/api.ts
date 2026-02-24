import axios from "axios";
import { Task, TaskFormData } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const { data } = await apiClient.get<Task[]>("/tasks");
    return data;
  },

  getById: async (id: number): Promise<Task> => {
    const { data } = await apiClient.get<Task>(`/tasks/${id}`);
    return data;
  },

  create: async (payload: TaskFormData): Promise<Task> => {
    const { data } = await apiClient.post<Task>("/tasks", payload);
    return data;
  },

  update: async (id: number, payload: Partial<Task>): Promise<Task> => {
    const { data } = await apiClient.patch<Task>(`/tasks/${id}`, payload);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },
};
