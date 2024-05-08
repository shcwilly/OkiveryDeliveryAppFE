import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import logoImage from "../../assets/images/AppLogo.png";
import Button from "@components/common/button/Button";
import "./LoginPage.css";
import googleLogoImage from "../../assets/images/GoogleLogoImage.png";
import FloatingLabelInput from "@components/common/input/FloatingLabelInput";
import { useNavigate } from "react-router-dom";
import SocialLoginButton from "../../components/login/SocialLoginButton";

type userDataType = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const initialUserData: userDataType = {
    email: "",
    password: "",
  };
  const [isAllFilled, setIsAllFilled] = useState<boolean>(false);
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    // 모두 입력되어있는지 검사 후 로그인 버튼 활성화
    const isAllFieldsFilled =
      userData.email !== "" &&
      userData.password !== "" &&
      userData.password.length >= 8;

    setIsAllFilled(isAllFieldsFilled);
  }, [userData]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const inputName = event.target.name;
    const inputData = event.target.value;
    setUserData({
      ...userData,
      [inputName]: inputData,
    });
  };

  const handleGoSignUp = () => {
    navigate("/sign");
  };

  const handleLogin = () => {
    // db에 있는 사용자 정보와 비교해 일치하면 /home으로 이동시킴
    isAllFilled
      ? navigate("/home")
      : alert("Please re-enter your email and password.");
  };

  return (
    <>
      <Header hasBackIcon={true} title="" hasCartIcon={false} />
      <div className="loginMainContainer">
        <div className="logoContainer">
          <img src={logoImage} width="128px" height="128px" />
        </div>
        <form className="loginInputForm">
          <FloatingLabelInput
            inputType="email"
            name="email"
            value={userData.email}
            placeHolder="E-mail"
            label="E-MAIL"
            handleInputChange={handleInputChange}
          />
          <FloatingLabelInput
            inputType="password"
            name="password"
            value={userData.password}
            placeHolder="password"
            label="PASSWORD"
            handleInputChange={handleInputChange}
          />
        </form>
        <div className="loginButtonSection">
          <div className="loginButton">
            <Button
              name="Login"
              backgroundColor={isAllFilled ? "#FF6347" : "#767676"}
              handleClick={handleLogin}
              buttonType="bigButton"
            />
          </div>
          <div className="signUpButton">
            <Button
              name="Create an account"
              backgroundColor="#FF6347"
              handleClick={handleGoSignUp}
              buttonType="bigButton"
              type="button"
            />
          </div>
        </div>
        <div className="socialLoginButtonSection">
          <div className="googleButton">
            <SocialLoginButton
              name="googleLogoImage"
              text="Continue with Google"
              imageUrl={googleLogoImage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;