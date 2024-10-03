// src/pages/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import logo from './../assets/Logo.png'
import { Link, navigate, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  interface LoginResponse
  {
    token : string;
  }
  const send = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    axios.post<LoginResponse>('https://test1.focal-x.com/api/login', {
      
      email: email,
      password: password,
    })
    .then((response) =>{
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
      console.log(response);
      localStorage.setItem('token' , `Bearer ${response.data.token}`)} )
      .catch(err => console.log(err));
    };


  return (
    <div className=" w-full h-screen flex items-center justify-center bg-gradient-to-r from-orange to-light-orange">
      <div className='sm:w-[476px] w-[90%]  py-[42px] px-[30.6px] rounded-[20px] bg-white'>
      <form className="flex flex-col" onSubmit={send}>
        <div className="text-3xl text-center">
          <img className='mx-auto mb-[43px] ' src={logo} alt="" />
          <h2 className='font-semibold text-[22px]'>SIGN IN</h2>
          <p className='text-sm text-light-gray-2 mb-[24px] '> Enter your credentials to access your account</p>
        </div>
        <label className='text-light-gray-2 text-sm mb-[10px] ' htmlFor="">Email</label>
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
          className="p-2 border w-full rounded-[4px] placeholder-gray-300 text-sm mb-[20px]"
        />
        <label className='text-light-gray-2 text-sm mb-[10px] ' htmlFor="">Password</label>
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
          className="p-2 border w-full rounded-[4px] placeholder-gray-300 text-sm mb-[30px]"
        />
        <input type="submit" value="send" className="p-2 bg-orange cursor-pointer rounded-[4px] mb-[27px] text-white" />
        <p className='text-sm text-light-gray-2 text-center '>Don’t have an account? <Link to={'/signup'}  className='text-orange underline underline-offset-1  decoration-orange '>Create one</Link> </p>
      </form>
    </div>
    </div>
  );
};

export default Login;
