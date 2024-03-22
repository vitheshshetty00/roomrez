"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {auth} from '../../firebase/config';
import {  createUserWithEmailAndPassword } from "firebase/auth";

import { useRouter } from 'next/navigation'; 



export default function Home() {
  
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;
    e.preventDefault();
  
    if (password !== confirmpassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      // Check if the user already exists
      const { user } = await createUserWithEmailAndPassword(auth,email, password);
      if (user) {
        // If the user was successfully created, you can add additional logic here
        setSuccess('Account created successfully!!');
        router.push('/');
        
      }
    } catch (error) {
      // console.error('Error creating user:', error);
      setError(error.message);
    }
  };
  




  const toggle = () => {
    const password = document.getElementById('password');
    const confirmpassword = document.getElementById('confirmpassword')
    if (password.getAttribute('type') === 'password' || confirmpassword?.getAttribute('type') === 'password') {
      password.setAttribute('type', 'text');
      confirmpassword?.setAttribute('type', 'text');

    } else {
      password.setAttribute('type', 'password');
      confirmpassword?.setAttribute('type', 'password');

    }
  }
  return (
    <div className="bg-gray-50 text-black h-[100vh] w-full relative">
    
        <div className="flex justify-between items-center p-4 shadow-sm absolute w-full">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">RoomRez</h1>
          </div>
        </div>
      <div className="flex justify-center items-center h-full relative">
        
        <div className="bg-black bg-opacity-60 h-[400px auto] w-[500px] p-8 rounded-lg shadow-lg">
          {/* Add your login form components here */}
          <h2 className="text-2xl font-bold mb-4 flex mx-auto items-center justify-center uppercase font-serif text-white">Register</h2>
          {/* error/success */}
        {error && (
          <div className=" text-red-400 font-serif font-semibold p-2">
            {error}
          </div>
        )}
        {success && (
          <div className= "text-green-500 font-serif font-semibold p-2">
            {success}
          </div>
        )}
          <form onSubmit={handleRegister}>
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              <div className="mt-1 relative">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Password
              </label>
                <div className='flex items-center'>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
                {/* <svg></svg> */}
                <Image
                  src="/eye-off.svg"
                  alt="Background Image"
                  width={20}
                  height={20}
                  className='absolute right-2 bottom-2 hover:cursor-pointer'
                  onClick={toggle}
                 
                />
                </div>
              </div>
              <div className="mt-1 relative">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Confirm Password
              </label>
                <div className='flex items-center'>
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
                {/* <svg></svg> */}
                <Image
                  src="/eye-off.svg"
                  alt="Background Image"
                  width={20}
                  height={20}
                  className='absolute right-2 bottom-2 hover:cursor-pointer'
                  onClick={toggle}
                 
                />
                </div>
              </div>
              <div className='mt-2'>
                <input type='checkbox' className=''/>
                <span className='m-2 p-2 text-lg space-x-2 text-white'>Remember Me</span>
              </div>
            </div>
            <div className='m-2 p-3 mx-auto items-center justify-center shadow-xlg flex'>
              <button type='submit'  className='bg-gray-200 text-xl p-1 rounded-sm font-serif font-extrabold hover:bg-gray-50 hover:delay-75 hover:shadow-lg'>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}   