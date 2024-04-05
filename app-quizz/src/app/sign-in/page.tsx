"use client";

import React, {useState, FormEvent} from "react";
import Button from "../components/Button/button";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const bodyContainerStyles =
    "md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100 pb-20";

  const handleEmailChange = (e: {target: {value: any}}) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: {target: {value: any}}) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: FormErrors = {};

    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }

    // If there are validation errors, set the state and stop form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset
    setEmail("");
    setPassword("");
  };

  const handleSignup = () => {
    window.location.href = "/sign-up";
  };

  const btnSignInStyle = {width: "100%"};

  const classButtonOne = {
    marginRight: "20px",
    padding: "5px 60px",
    background: "#fff",
    width: "100%",
    color: "#058076",
    border: "1px solid #058076",
    fontWeight: "normal",
  };

  const errorStyle = "text-red-500 text-sm";

  return (
    <div className={bodyContainerStyles}>
      <div className="flex flex-column pt-8 pb-8 pl-10 pr-10 ">
        <form onSubmit={handleSubmit}>
          <div>
            <p className="font-bold text-2xl pb-8">Log in</p>
          </div>
          <div className="flex flex-col">
            <label className="font-bold pr-2  pb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && <span className={errorStyle}>{errors.email}</span>}
          </div>
          <div className="flex flex-col mb-4 mt-4">
            <label className="font-bold pr-2  pb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {errors.password && (
              <span className={errorStyle}>{errors.password}</span>
            )}
          </div>
          <Button
            type="submit"
            title="Sign In"
            handlerEvent={handleSubmit}
            style={btnSignInStyle}
          />
          <p className="mr-2 text-center">or</p>
          <Button
            title="Sign up"
            handlerEvent={handleSignup}
            style={classButtonOne}
          />
        </form>
      </div>
    </div>
  );
}
