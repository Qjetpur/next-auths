"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function Login() {
  const params = useSearchParams();
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ email?: string, password?: string }>();

  const submitForm = async () => {
    setLoading(true);
    console.log("This auth State is", authState);
    
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", authState);
      setLoading(false);
      const response = res.data;
      console.log("Response:", response);
      if (response.status === 200) {
        console.log("User signed in");
        alert("user Login")
      } else if (response?.status === 400) {
        setErrors(response?.errors);
      }
    } catch (err) {
      setLoading(false);
      console.log("Something went wrong", err);
      if (axios.isAxiosError(err)) {
        setErrors(err.response?.data?.errors);
      }
    }
  }

  return (
    <section>
      <div className="h-screen">
        <div className="flex items-center justify-center px-4 py-50 sm:px-6 sm:py-40 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?
              <Link
                href="/register"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>
            {params.get("message") && <p className='bg-green-400 font-bold rounded-4 p-4'>{params.get("message")}</p>}
            <form className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">Email address</label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={(e) => setAuthState({ ...authState, email: e.target.value })}
                    />
                    <span className="text-red-500 font-bold">{errors?.email}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-gray-900">Password</label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      id="password"
                      placeholder="Password"
                      onChange={(e) => setAuthState({ ...authState, password: e.target.value })}
                    />
                    <span className="text-red-500 font-bold">{errors?.password}</span>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white ${loading ? "bg-gray" : "bg-black"} hover:bg-black/80`}
                    onClick={submitForm}
                    disabled={loading}
                  >
                    {loading ? "Processing" : "Login"}
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
