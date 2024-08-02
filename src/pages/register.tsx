"use client";
import React,{useState} from "react";
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from "next/navigation"


export default function  Register() {
  const router=useRouter();
    const [authState,setAuthState]=useState({
        name:"",
        email:"",
        phone_no:"",
        dob:"",
        password:"",
        password_confirmation:"",

    });
 const [loading,setLoading]=useState<boolean>(false)
 const [errors,setErrors]=useState<registerErrorType>();
 
const submitForm = () => {
  setLoading(true);
  console.log("This auth State is", authState);
  axios.post("http://localhost:3000/api/auth/register", authState)
    .then((res) => {
      setLoading(false);
      const response = res.data;
      console.log("Response:", response);
      if (response.status === 200) {
        console.log("user signed up");
        console.log("Router:", router);
        router.push(`/login`);
        // alert(`message=${response.message}`)
      } else if (response?.status === 400) {
        setErrors(response?.errors);
      }
    }).catch((err) => {
      setLoading(false);
      console.log("went wrong", err);
    });
};
  return (
    <section>
      <div className=" h-screen">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign Up</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?
              <Link
                href="/login"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
               Login
              </Link>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
               <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      onChange={(e)=>setAuthState({...authState,name:e.target.value})}
                    ></input>
                    <span className="text-red-500 font-bold">
                      {errors?.name}
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      onChange={(e)=>setAuthState({...authState,email:e.target.value})}
                    ></input>
                        <span className="text-red-500 font-bold">
                      {errors?.email}
                    </span>
                  </div>
                </div>
         
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    Phone no
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="tel"
                      pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" 
                      placeholder="Phone no"
                      onChange={(e)=>setAuthState({...authState,phone_no:e.target.value})}
                    ></input>
                        <span className="text-red-500 font-bold">
                      {errors?.phone_no}
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                   Date Of Birth
                  </label>
                  <div className="mt-2">
                    <input
                      className=" h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="date"
                       
                      placeholder="Date Of Birth"
                      onChange={(e)=>setAuthState({...authState,dob:e.target.value})}
                    ></input>
                      <span className="text-red-500 font-bold">
                      {errors?.dob}
                    </span>
                  </div>
                </div>    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      Password
                    </label>
                    
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      onChange={(e)=>setAuthState({...authState,password:e.target.value})}
                    ></input>
                        <span className="text-red-500 font-bold">
                      {errors?.password}
                    </span>
                  </div>
                </div>


                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      
                      Confirm Password
                    </label>
                    
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e)=>setAuthState({...authState,password_confirmation:e.target.value})}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 ${loading?"bg-gray":"bg-black"}`}
                  onClick={submitForm}
                  >
                   {loading?"Processing":"Sign Up "} 
                  </button>
                </div>
              </div>
            </form>
      
          </div>
        </div>
      </div>
    </section>
  )
}



