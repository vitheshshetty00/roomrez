"use client"

import Image from 'next/image';
import Link from 'next/link';
import { auth } from '../firebase/config';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import {  signInWithEmailAndPassword,GoogleAuthProvider ,signInWithPopup} from "firebase/auth";




export default function Login() {

  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const router = typeof window !== 'undefined' ? useRouter() : null;

  const handleEmailSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in successfully');
      setSuccess('User signed in successfully')
      setTimeout(() => {
        setSuccess('');
        if(user.email==="vitheshshetty23@gmail.com"){
          router.push('/admin'); // Redirect to /admin if user is 'vithesh'
        } else {
          router.push('/home'); // Redirect to /home for other users
        }
      }, 3000);
    } catch (error) {
      setError(error.message);
      console.error('Error signing in with email and password:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider)
      // You can access the user information from the result object
      console.log(result.user);
      
        if(result.user.email==="vitheshshetty23@gmail.com"){
          router.push('/admin'); // Redirect to /admin if user is 'vithesh'
        } else {
          router.push('/home'); // Redirect to /home for other users
        }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
    // signInWithPopup(auth, provider)
    //   .then((result) => {
  
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
        
    //     const user = result.user;
    //     if(result.user.email==="vitheshshetty23@gmail.com"){
    //       router.push('/admin'); // Redirect to /admin if user is 'vithesh'
    //     } else {
    //       router.push('/home'); // Redirect to /home for other users
    //     }
        
    //   }).catch((error) => {
    //     console.error('Error signing in with Google:', error);
    //   });
  };


  const toggle = () => {
    const password = document.getElementById('password');
    if (password.getAttribute('type') === 'password') {
      password.setAttribute('type', 'text');
     

    } else {
      password.setAttribute('type', 'password');
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
          <h2 className="text-2xl font-bold mb-4 flex mx-auto items-center justify-center uppercase font-serif text-white">Login</h2>
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
          <form onSubmit={handleEmailSignIn}>
            <div className="space-y-4">
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
                  // required
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
                  // required
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
              <button type='submit' className='bg-gray-50 text-xl p-1 rounded-sm font-serif font-extrabold hover:bg-gray-400 hover:delay-75 hover:shadow-lg'>Login</button>
              {/* <a href='login' className='text-white text-md hover:underline m-2 '>Sign In</a> */}
              <Link href={'/register'} className='text-white text-md hover:underline m-2 '>Sign Up</Link>
            </div>
            </form>
            <div className='flex flex-row mx-auto items-center justify-center'>
              <div className='items-start m-1 p-2'>
                <button onClick={handleGoogleSignIn} className='bg-gray-300 p-2 rounded-md hover:bg-gray-50 flex justify-between'>
                <Image
                  src="/google.png"
                  alt="Background Image"
                  width={20}
                  height={20}
                  className='hover:cursor-pointer mr-1'
                />
                  Sign In With Google</button>
              </div>
              <div className='items-end m-1 p-2'>
                <button className='bg-gray-300 p-2 rounded-md hover:bg-gray-50 flex space-x-2'>
                <Image
                  src="/github.png"
                  alt="Background Image"
                  width={20}
                  height={20}
                  className='hover:cursor-pointer mr-1'
                />
                  Sign In With Github</button>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
}