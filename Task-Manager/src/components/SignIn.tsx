import { useState } from "react";
import { Link } from "react-router-dom";
import type { FormErrors, SignInFormData } from "../types/auth";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function SignIn() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => console.log(data);

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-linear-to-br from-purple-600 to-purple-800">
      <div className="bg-white rounded-xl p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Sign in to your Task Manager account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/*Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={`px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
              }`}
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-0.5">
                {errors.email.message}
              </span>
            )}
          </div>

          {/*Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+\\|;:'",.<>\/?])[A-Za-z\d@$!%*?&^#()[\]{}\-_=+\\|;:'",.<>\/?]{8,}$/,
                  message:
                    "Password must be at least 8 characters and include a letter, a number, and a special character",
                },
              })}
              className={`px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                errors.password
                  ? "border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
              }`}
            />
            {errors.password && (
              <span className="text-xs text-red-500 mt-0.5">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 py-3.5 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-lg text-base font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-400/40 active:translate-y-0"
          >
            Sign In
          </button>
        </form>

        <DevTool control={control} />

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 font-semibold hover:text-purple-800 hover:underline transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
