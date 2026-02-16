import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignInFormData } from "../types/auth.type";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { authService } from "../services/auth.service";

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    // control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await authService.login(data);
      // Navigate to dashboard or home page after successful login
      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to sign in. Please try again.";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#1f006c] via-[#2d0a8f] to-[#53b3cb]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#f9c22e] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-[#f15946] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#53b3cb] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 w-full max-w-md shadow-2xl backdrop-blur-sm">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            {/* Logo Circle */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1f006c] to-[#53b3cb] rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#1f006c] to-[#53b3cb] bg-clip-text text-transparent mb-2">
            Task
          </h1>
          <p className="text-gray-600 text-center text-sm sm:text-base">
            Welcome back! Sign in to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:gap-5"
        >
          {/* API Error Message */}
          {apiError && (
            <div className="p-3 sm:p-4 bg-tomato/10 border border-tomato/30 rounded-xl animate-shake">
              <p className="text-sm text-tomato font-medium">{apiError}</p>
            </div>
          )}

          {/*Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-navy flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={`px-4 py-3 sm:py-3.5 border-2 rounded-xl text-sm sm:text-base transition-all outline-none ${
                errors.email
                  ? "border-[#f15946] bg-[#f15946]/5 focus:ring-4 focus:ring-[#f15946]/20"
                  : "border-gray-200 focus:border-[#53b3cb] focus:ring-4 focus:ring-[#53b3cb]/20 hover:border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-xs sm:text-sm text-[#f15946] flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.email.message}
              </span>
            )}
          </div>

          {/*Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-navy flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+\\|;:'",.<>\/?])[A-Za-z\d@$!%*?&^#()[\]{}\-_=+\\|;:'",.<>\/?]{8,}$/,
                  message:
                    "Password must be at least 8 characters and include a letter, a number, and a special character",
                },
              })}
              className={`px-4 py-3 sm:py-3.5 border-2 rounded-xl text-sm sm:text-base transition-all outline-none ${
                errors.password
                  ? "border-[#f15946] bg-[#f15946]/5 focus:ring-4 focus:ring-[#f15946]/20"
                  : "border-gray-200 focus:border-[#53b3cb] focus:ring-4 focus:ring-[#53b3cb]/20 hover:border-gray-300"
              }`}
            />
            {errors.password && (
              <span className="text-xs sm:text-sm text-[#f15946] flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 sm:mt-6 py-3.5 sm:py-4 bg-linear-to-r from-[#1f006c] to-[#53b3cb] text-white rounded-xl text-base sm:text-lg font-semibold transition-all hover:shadow-xl hover:shadow-[#53b3cb]/30 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-[#53b3cb] to-[#1f006c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>

        {/* <DevTool control={control} /> */}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#53b3cb] font-semibold hover:text-navy hover:underline transition-colors inline-flex items-center gap-1"
            >
              Sign Up
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
