import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async (userData: SignupProps) => {
  const response = await httpClient.post("/api/members/join", userData);

  return response.data;
};

export const resetRequest = async (data: SignupProps) => {
  const response = await httpClient.post("/api/members/reset", data);

  return response.data;
};

export const resetPassword = async (data: SignupProps) => {
  const response = await httpClient.put("/api/members/reset", data);

  return response.data;
};

interface LoginResponse {
  token: string;
}

export const login = async (data: SignupProps) => {
  const response = await httpClient.post<LoginResponse>("/api/members/login", data);

  return response.data;
};

export const logout = async () => {
  await httpClient.post("/api/members/logout", {}, { withCredentials: true });

  document.cookie = "jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};
