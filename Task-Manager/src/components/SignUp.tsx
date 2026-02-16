import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignUpFormData } from "../types/auth.type";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { authService } from "../services/auth.service";

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await authService.register(data);
      // Navigate to dashboard or home page after successful registration
      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to sign up. Please try again.";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-linear-to-br from-purple-600 to-purple-800">
      <div className="bg-white rounded-xl p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Create Account
        </h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Sign up to get started with Task Manager
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* API Error Message */}
          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* First name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: 3,
                  maxLength: 25,
                })}
                className={`px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                  errors.firstName
                    ? "border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                }`}
              />
              {errors.firstName && (
                <span className="text-xs text-red-500 mt-0.5">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: 3,
                  maxLength: 25,
                })}
                className={`px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                  errors.lastName
                    ? "border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                }`}
              />
              {errors.lastName && (
                <span className="text-xs text-red-500 mt-0.5">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          {/* username */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Username is required",
                minLength: 3,
                maxLength: 20,
              })}
              className={`px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                errors.username
                  ? "border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
              }`}
            />
          </div>
          {errors.username && (
            <span className="text-xs text-red-500 mt-0.5">
              {errors.username.message}
            </span>
          )}

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
            disabled={isLoading}
            className="mt-2 py-3.5 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-lg text-base font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-400/40 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <DevTool control={control} />

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-purple-600 font-semibold hover:text-purple-800 hover:underline transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
