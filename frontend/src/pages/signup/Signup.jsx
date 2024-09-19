import React, { useState } from 'react'
import Gendercheckbox from './Gendercheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

function Signup() {

    const [inputs, setinputs] = useState({
        fullName:"",
        username:"",
        password:"",
        confirmpassword:"",
        gender:''
    });

    const {loading, signup} = useSignup();

    const handelcheckbok = (gender)=>{
        setinputs({...inputs,gender})
    }

    const handelsubmit = async(e)=>{
        e.preventDefault();
        await signup(inputs)
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          signup
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handelsubmit}>
            <div>
                <label className='label p-2'>
                    <span className="text-base label-text">Full Nane</span>
                </label>
                <input
                type="text"
                placeholder="Enter Fullname"
                className="w-full input input-bordered h-10"
                value={inputs.fullName}
                onChange={(e)=> setinputs({...inputs,fullName: e.target.value})}
            />
            </div>

            <div>
                <label className='label p-2'>
                    <span className="text-base label-text">usernane</span>
                </label>
                <input
                type="text"
                placeholder="Enter username"
                className="w-full input input-bordered h-10"
                value={inputs.username}
                onChange={(e)=>{setinputs({...inputs,username:e.target.value})}}
            />
            </div>

            <div>
                <label className='label p-2'>
                    <span className="text-base label-text">Password</span>
                </label>
                <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10"
                value={inputs.password}
                onChange={(e)=>{setinputs({...inputs,password:e.target.value})}}

            />
            </div>

            <div>
                <label className='label p-2'>
                    <span className="text-base label-text">Confirm Password</span>
                </label>
                <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10"
                value={inputs.confirmpassword}
                onChange={(e)=>{setinputs({...inputs,confirmpassword:e.target.value})}}
            />
            </div>

            <Gendercheckbox onCheckboxchange = {handelcheckbok} selectedgender={inputs.gender} />

            <Link to='/login' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Already have account?</Link>

            <div>
            <button className="btn btn-block btn-sm mt-2"
            disabled={loading}>
            {loading? <span className='loading loading-spinner'></span> : "Sign Up" }</button>
          </div>
        </form>
        </div>
    </div>
  )
}

export default Signup