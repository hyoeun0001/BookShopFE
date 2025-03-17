import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { SignupProps } from "@/pages/Signup";
import { useState } from "react";
import { ResetPasswordProps } from "@/pages/ResetPassword";

export const useAuth = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const { storeLogin, storeLogout, isloggedIn } = useAuthStore();

  const userLogin = (data: LoginProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token);
        showAlert("로그인이 완료되었습니다.");
        navigate("/");
      },
      (error) => {
        showAlert("로그인에 실패하였습니다.");
      }
    );
  };

  const userSignup = (data: SignupProps) => {
    signup(data).then((res) => {
      showAlert("회원가입 성공");
      navigate("/login");
    });
  };

  const userResetPassword = (data: ResetPasswordProps) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 초기화되었습니다.");
      navigate("/login");
    });
  };

  const [resetRequested, setResetRequested] = useState(false);

  const userResetRequest = (data: ResetPasswordProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };

  return {
    userLogin,
    userSignup,
    userResetPassword,
    userResetRequest,
    resetRequested,
  };
};
