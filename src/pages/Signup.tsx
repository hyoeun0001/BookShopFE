import { useForm } from "react-hook-form";
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export interface SignupProps {
  email: string;
  nickname: string;
  password: string;
  checkedPassword: string;
}

function Signup() {
  const { userSignup } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    userSignup(data);
  };

  // 현재 입력된 password 값 가져오기
  const password = watch("password");

  return (
    <>
      <Title size="large">회원가입</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="email"
              {...register("email", { required: "이메일을 입력해주세요." })}
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </fieldset>

          <fieldset>
            <InputText
              placeholder="닉네임"
              inputType="text"
              {...register("nickname", {
                required: "닉네임을 입력해주세요.",
                minLength: { value: 2, message: "닉네임이 너무 짧습니다." },
              })}
            />
            {errors.nickname && <p className="error-text">{errors.nickname.message}</p>}
          </fieldset>

          <fieldset>
            <InputText
              placeholder="비밀번호"
              inputType="password"
              {...register("password", { required: "비밀번호를 입력해주세요." })}
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </fieldset>

          <fieldset>
            <InputText
              placeholder="비밀번호 확인"
              inputType="password"
              {...register("checkedPassword", {
                required: "비밀번호 확인을 입력해주세요.",
                validate: (value) => value === password || "비밀번호가 일치하지 않습니다.",
              })}
            />
            {errors.checkedPassword && <p className="error-text">{errors.checkedPassword.message}</p>}
          </fieldset>

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              회원가입
            </Button>
          </fieldset>

          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
}

export const SignupStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
      font-size: 0.875rem;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;

export default Signup;
