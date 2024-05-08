import { useState } from "react";
import Button from "@components/common/button/Button";
import Header from "@components/common/header/Header";
import InputItem from "@components/common/input/InputItem";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex, phoneRegex } from "../../utils/regex";
import BirthdayInput from "@components/common/input/BirthdayInput";
import Term from "@components/signup/Term";
import "./SignupPage.css";

export type inputType = {
  value: string;
  error: string;
};

type userDataType = {
  name: inputType;
  email: inputType;
  password: inputType;
  repeatPassword: inputType;
  phone: inputType;
  birthDay: inputType;
  [key: string]: inputType;
};

const SignupPage: React.FC = () => {
  const userInitialData: userDataType = {
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    repeatPassword: { value: "", error: "" },
    phone: { value: "", error: "" },
    birthDay: { value: "", error: "" },
  };
  const [userData, setUserData] = useState(userInitialData);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const navigate = useNavigate();

  const isAllFieldsFilled = (): boolean => {
    for (const key in userData) {
      const value = userData[key].value;
      if (key !== "birthDay" && value === "") return false;
    }
    return true;
  };

  const isAllFieldsValidated = (): boolean => {
    for (const key in userData) {
      const error = userData[key].error;
      console.log(error);
      if (error !== "") return false;
    }
    return true;
  };

  console.log(userData);

  const isButtonActive =
    isAllFieldsFilled() && isAllFieldsValidated() && isTermChecked;

  const handleTermCheck = (): void => {
    setIsTermChecked((prev) => !prev);
  };

  const handleButtonClick = () => {
    navigate("/login");
  };

  const handleInputChange = (field: string, value: string): void => {
    let error = "";

    switch (field) {
      case "email":
        error = !isValidateEmail(value) ? "이메일이 유효하지 않습니다." : "";
        break;
      case "password":
        error = !isValidatePassword(value)
          ? "비밀번호는 8글자 이상 입력해주십시오"
          : "";
        break;
      case "repeatPassword":
        error = !isPasswordMatch(userData.password.value, value)
          ? "비밀번호가 일치하지 않습니다."
          : "";
        break;
      case "phone":
        error = !isValidatePhone(value)
          ? "핸드폰 번호가 유효하지 않습니다."
          : "";
        break;
      default:
        break;
    }

    setUserData((prev) => ({
      ...prev,
      [field]: { value, error },
    }));
  };

  const isValidateEmail = (email: string): boolean => {
    return emailRegex.test(email);
  };

  const isValidatePassword = (password: string): boolean => {
    return passwordRegex.test(password);
  };

  const isPasswordMatch = (
    password: string,
    repeatPassword: string
  ): boolean => {
    return password === repeatPassword;
  };

  const isValidatePhone = (phone: string): boolean => {
    return phoneRegex.test(phone);
  };

  console.log(userData);

  return (
    <>
      <Header hasBackIcon={true} title="" hasCartIcon={false} isFixed={false} />
      <div className="signupContainer">
        <h1 className="signupTitle">Sign Up</h1>
        <form>
          <InputItem
            label="Name"
            name="name"
            type="text"
            place="Please enter your name"
            value={userData.name.value}
            handleInputChange={(e) => {
              handleInputChange("name", e.target.value);
            }}
          />
          <InputItem
            label="E-Mail"
            name="email"
            type="email"
            place="ex) abcd1234@gmail.com"
            value={userData.email.value}
            className={userData.email.error ? "error" : ""}
            errorMessage={userData.email.error}
            handleInputChange={(e) => {
              handleInputChange("email", e.target.value);
            }}
          />
          <InputItem
            label="Password"
            name="password"
            type="password"
            place="Please enter a password of at least 8 characters"
            value={userData.password.value}
            className={userData.password.error ? "error" : ""}
            errorMessage={userData.password.error}
            handleInputChange={(e) => {
              handleInputChange("password", e.target.value);
            }}
          />
          <InputItem
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            place="Please re-enter your password"
            value={userData.repeatPassword.value}
            className={userData.repeatPassword.error ? "error" : ""}
            errorMessage={userData.repeatPassword.error}
            handleInputChange={(e) => {
              handleInputChange("repeatPassword", e.target.value);
            }}
          />
          <InputItem
            label="Phone Number"
            name="phone"
            type="phone"
            place="Please enter except for hyphen (-)"
            value={userData.phone.value}
            className={userData.phone.error ? "error" : ""}
            errorMessage={userData.phone.error}
            handleInputChange={(e) => {
              handleInputChange("phone", e.target.value);
            }}
          />
          <BirthdayInput
            handleBirthChange={(birthDay) =>
              setUserData((prev) => ({ ...prev, birthDay }))
            }
          />
          <Term
            isTermChecked={isTermChecked}
            handleTermCheck={handleTermCheck}
          />
          <div className="signupBtn">
            <Button
              name="Sign up"
              backgroundColor={isButtonActive ? "#FF6347" : "#767676"}
              buttonType="bigButton"
              handleClick={handleButtonClick}
              disabled={!isButtonActive}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;