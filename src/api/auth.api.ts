import { ResetPasswordProps } from "@/pages/ResetPassword";
import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";
import { LoginProps } from "@/pages/Login";

export const signup = async (userData: SignupProps) => {
  const response = await httpClient.post("/api/members/join", userData);

  return response.data;
};

export const resetRequest = async (data: ResetPasswordProps) => {
  const response = await httpClient.post("/api/members/reset", data);

  return response.data;
};

export const resetPassword = async (data: ResetPasswordProps) => {
  const response = await httpClient.put("/api/members/reset", data);

  return response.data;
};

interface LoginResponse {
  token: string;
}

export const login = async (data: LoginProps) => {
  const response = await httpClient.post<LoginResponse>("/api/members/login", data);

  return response.data;
};

export const logout = async () => {
  try {
    await httpClient.post("/api/members/logout", {}, { withCredentials: true });

    // 새로고침하여 상태 반영
    window.location.href = "/";
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};
