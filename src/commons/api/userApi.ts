import axiosClient from "../lib/axiosClient";

export const userApi = {
  getProfile: () => axiosClient.get("/auth/profile"),
  getAllUsers: () => axiosClient.get("/users"),
};
