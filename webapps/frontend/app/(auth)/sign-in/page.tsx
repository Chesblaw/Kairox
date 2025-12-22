"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen">
      {/* Left Image Section */}
      <section className="relative w-1/2 h-screen hidden lg:block">
        <Image
          src="/assets/images/login-image.jpeg"
          alt="Login Image"
          fill
          className="object-cover"
        />
      </section>

      {/* Form Section */}
      <section className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center bg-[#001219]">
        <div className="w-[80%] lg:w-[70%] md:p-6 mt-6 flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-[#0FA5AA]">Welcome Back</h1>
            <p className="text-gray-400 mt-2">Sign in to continue</p>
          </div>

          <form className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="p-3 border border-gray-400 focus:border-white rounded-lg outline-none bg-transparent text-white"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label htmlFor="password" className="mb-1 text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="p-3 pr-10 border border-gray-400 focus:border-white rounded-lg outline-none bg-transparent text-white w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button className="bg-[#0FA5AA] text-white p-3 rounded-lg w-full mt-5 hover:scale-105 transition-all duration-300">
              Sign In
            </button>

            {/* Sign Up Link */}
            <p className="text-center mt-4 text-gray-400">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-[#0FA5AA] hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
