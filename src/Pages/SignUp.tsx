import React, { useState } from "react";
import axios from "axios";
import logo from "./../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import FileUpload from "../Components/FileUpload";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  interface LoginResponse {
    token: string;
    user: {
      first_name: string;
      last_name: string;
      email: string;
      profile_image_url: string;
    };
  }

  const generateUserName = (firstName: string, lastName: string) => {
    const timestamp = Date.now();
    return `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${timestamp}`;
  };

  const send = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== passwordConf) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const userName = generateUserName(firstName, lastName);

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConf);
    formData.append("user_name", userName);

    if (image) {
      formData.append("profile_image", image);
    }

    try {
      const res = await axios.post<LoginResponse>(
        'https://test1.focal-x.com/api/register',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate('/home');
      }
    } catch (err) {
      console.error("API error:", err.response ? err.response.data : err.message);
      setErrorMessage("Error during registration. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-orange to-light-orange">
      <div className="w-[276px] md:w-[476px] py-[42px] px-[30.6px] rounded-[20px] bg-white">
        <form className="flex flex-col" onSubmit={send}>
          <div className="text-3xl text-center">
            <img className="mx-auto mb-[43px]" src={logo} alt="" />
            <h2 className="font-semibold text-[22px]">SIGN UP</h2>
            <p className="text-sm text-light-gray-2">
              Fill in the following fields to create an account
            </p>
          </div>

          <label className="text-light-gray-2 text-sm mb-[10px]">Name</label>
          <div className="flex justify-between flex-col md:flex-row">
            <input
              type="text"
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="First Name"
              required
              className="p-2 border w-[200px] rounded-[4px] placeholder-gray-300 text-sm mb-[20px]"
            />
            <input
              type="text"
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Last Name"
              required
              className="p-2 border w-[200px] rounded-[4px] placeholder-gray-300 text-sm mb-[20px]"
            />
          </div>

          <label className="text-light-gray-2 text-sm mb-[10px]">Email</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            className="p-2 border w-full rounded-[4px] placeholder-gray-300 text-sm mb-[30px]"
          />

          <label className="text-light-gray-2 text-sm mb-[10px]">Password</label>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-[10px]">{errorMessage}</p>
          )}
          <div className="flex justify-between flex-col md:flex-row">
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
              className="p-2 border w-[200px] rounded-[4px] placeholder-gray-300 text-sm mb-[20px]"
            />
            <input
              type="password"
              onChange={(event) => setPasswordConf(event.target.value)}
              placeholder="Re-enter your password"
              required
              className="p-2 border w-[200px] rounded-[4px] placeholder-gray-300 text-sm mb-[20px]"
            />
          </div>
          <FileUpload setImage={setImage} />
          <input
            type="submit"
            value="SIGN UP"
            className="p-2 bg-orange cursor-pointer rounded-[4px] mb-[27px] text-white font-medium"
          />
          <p className="text-sm text-light-gray-2 text-center">
            Already have an account?{" "}
            <Link
              to={"/"}
              className="text-orange underline underline-offset-1 decoration-orange"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;