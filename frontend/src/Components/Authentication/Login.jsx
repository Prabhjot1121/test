import React from 'react';
import email from '../images/mail.png';
import password from '../images/password-lock.png'

const Login = () => {
    return (
        <>
            <div className='border-2 flex justify-center w-[80vw] md:w-[70vw] lg:w-[100%] border-black bg-gradient-to-bl from-blue-100 items-center to-red-100 h-[70vh] md:px-20 py-10 rounded-xl'>
                <div className='flex flex-col space-y-6 lg:w-[25vw]'>
                    <span className='text-center mb-10 font-semibold text-3xl' style={{ fontFamily: 'sans-serif' }}>Sign In</span>

                    <form className='h-fit flex w-[100%] flex-col'>
                        <div className='flex  w-[100%] space-x-5 mb-3 border-2 py-2 border-b-black'>
                            <img className='w-6 h-6' src={email} alt="" />
                            <input className='w-full placeholder:text-xl outline-none bg-inherit border-0' id='email' type="text" placeholder='Email address' />
                        </div>
                        <div className='flex  w-[100%] space-x-5 mb-3 border-2 py-2 border-b-black'>
                            <img className='w-6 h-6' src={password} alt="" />
                            <input className='w-full placeholder:text-xl outline-none bg-inherit border-0' id='password' type="password" placeholder='Password' />
                        </div>

                        <button className='text-white bg-red-600 mt-6 rounded-md py-2 px-6'>Sign In</button>
                    </form>

                    <span className='w-full text-center font-medium text-xl cursor-pointer hover:text-red-700'>Forgot Password?</span>
                    <hr className='border-[.5px] border-black' />

                    <div className='text-center font-medium' style={{ fontFamily: 'sans-serif' }}>Don't have an account? <span className='text-red-600 font-medium text-lg'>Create one</span></div>
                </div>
            </div>
        </>
    )
}

export default Login
