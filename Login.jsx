import React, { useState } from 'react';
//import React from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userslice';

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
      });
      const dispatch = useDispatch();
      const navigate = useNavigate();
    
      const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`http://localhost:3000//api/v1/user/login`, user, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          });
          navigate("/");
          console.log(res);
          dispatch(setAuthUser(res.data));
        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
        }
        setUser({
          username: "",
          password: ""
        })
      }
    return  (
   <div className="min-w-96 mx-auto">
    <div className='h-full w-full bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-50 saturate-100 backdrop-contrast-100'>
      <h1 className='text-3xl font-bold text-center'>Login</h1>
      <form onSubmit={onSubmitHandler} action="">

        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Username</span>
          </label>
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className='w-full input input-bordered h-10'
            type="text"
            placeholder='Username' />
        </div>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className='w-full input input-bordered h-10'
            type="password"
            placeholder='Password' />
        </div>
        <p className='text-center my-2'>Don't have an account? <Link to="/Signup"> Signup </Link></p>
        <div>
          <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Login</button>
        </div>
      </form>
    </div>
  </div>
)
}
export default Login ;