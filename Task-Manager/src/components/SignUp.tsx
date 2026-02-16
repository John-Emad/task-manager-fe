import { useState, use } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignUpFormData } from "../types/auth.type";
import { useForm } from "react-hook-form";
import { authService } from "../services/auth.service";
import { UserContext } from "../Context/UserContext";
import {
  MdTaskAlt,
  MdPerson,
  MdAlternateEmail,
  MdLock,
  MdError,
  MdArrowForward,
  MdChevronRight,
} from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";

export default function SignUp() {
  const navigate = useNavigate();
  const { setUser } = use(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const user = await authService.register(data);
      setUser(user);
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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-linear-to-br from-navy via-purple-800 to-pacific-blue">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-tuscan-sun rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-tomato rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pacific-blue rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 w-full max-w-md shadow-2xl backdrop-blur-sm">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="relative mb-3 sm:mb-4">
            {/* Logo Circle */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-navy to-pacific-blue rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <MdTaskAlt className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-navy to-pacific-blue bg-clip-text text-transparent mb-2">
            Task
          </h1>
          <p className="text-gray-600 text-center text-sm sm:text-base">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* API Error Message */}
          {apiError && (
            <div className="p-3 sm:p-4 bg-tomato/10 border border-tomato/30 rounded-xl animate-shake">
              <p className="text-sm text-tomato font-medium">{apiError}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="firstName"
                className="text-sm font-semibold text-navy flex items-center gap-2"
              >
                <MdPerson className="w-4 h-4" />
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="John"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: 3,
                  maxLength: 25,
                })}
                className={`px-4 py-3 border-2 rounded-xl text-sm sm:text-base transition-all outline-none ${
                  errors.firstName
                    ? "border-tomato bg-tomato/5 focus:ring-4 focus:ring-tomato/20"
                    : "border-gray-200 focus:border-pacific-blue focus:ring-4 focus:ring-pacific-blue/20 hover:border-gray-300"
                }`}
              />
              {errors.firstName && (
                <span className="text-xs text-tomato flex items-center gap-1">
                  <MdError className="w-3 h-3" />
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lastName"
                className="text-sm font-semibold text-navy flex items-center gap-2"
              >
                <MdPerson className="w-4 h-4" />
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Doe"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: 3,
                  maxLength: 25,
                })}
                className={`px-4 py-3 border-2 rounded-xl text-sm sm:text-base transition-all outline-none ${
                  errors.lastName
                    ? "border-tomato bg-tomato/5 focus:ring-4 focus:ring-tomato/20"
                    : "border-gray-200 focus:border-pacific-blue focus:ring-4 focus:ring-pacific-blue/20 hover:border-gray-300"
                }`}
              />
              {errors.lastName && (
                <span className="text-xs text-tomato flex items-center gap-1">
                  <MdError className="w-3 h-3" />
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          {/* username */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-navy flex items-center gap-2"
            >
              <MdPerson className="w-4 h-4" />
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="johndoe"
              {...register("username", {
                required: "Username is required",
                minLength: 3,
                maxLength: 20,
              })}
              className={`px-4 py-3 border-2 rounded-xl text-sm sm:text-base transition-all outline-none ${
                errors.username
                  ? "border-tomato bg-tomato/5 focus:ring-4 focus:ring-tomato/20"
                  : "border-gray-200 focus:border-pacific-blue focus:ring-4 focus:ring-pacific-blue/20 hover:border-gray-300"
              }`}
            />
            {errors.username && (
              <span className="text-xs text-tomato flex items-center gap-1">
                <MdError className="w-3 h-3" />
                {errors.username.message}
              </span>
            )}
          </div>

          {/*Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-navy flex items-center gap-2"
            >
              <MdAlternateEmail className="w-4 h-4" />
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
              className={`px-4 py-3 border-2 rounded-xl text-sm sm:text-base transition-all outline-none ${
                errors.email
                  ? "border-tomato bg-tomato/5 focus:ring-4 focus:ring-tomato/20"
                  : "border-gray-200 focus:border-pacific-blue focus:ring-4 focus:ring-pacific-blue/20 hover:border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-xs text-tomato flex items-center gap-1">
                <MdError className="w-3 h-3" />
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
              <MdLock className="w-4 h-4" />
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a strong password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+\\|;:'",.<>\/?])[A-Za-z\d@$!%*?&^#()[\]{}\-_=+\\|;:'",.<>\/?]{8,}$/,
                  message:
                    "Password must be at least 8 characters and include a letter, a number, and a special character",
                },
              })}
              className={`px-4 py-3 border-2 rounded-xl text-sm sm:text-base transition-all outline-none ${
                errors.password
                  ? "border-tomato bg-tomato/5 focus:ring-4 focus:ring-tomato/20"
                  : "border-gray-200 focus:border-pacific-blue focus:ring-4 focus:ring-pacific-blue/20 hover:border-gray-300"
              }`}
            />
            {errors.password && (
              <span className="text-xs text-tomato flex items-center gap-1">
                <MdError className="w-3 h-3" />
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 sm:mt-6 py-3.5 sm:py-4 bg-linear-to-r from-navy to-pacific-blue text-white rounded-xl text-base sm:text-lg font-semibold transition-all hover:shadow-xl hover:shadow-pacific-blue/30 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <ImSpinner2 className="animate-spin h-5 w-5" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <MdArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-pacific-blue to-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
        {/* <DevTool control={control} /> */}

        <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-pacific-blue font-semibold hover:text-navy hover:underline transition-colors inline-flex items-center gap-1"
            >
              Sign In
              <MdChevronRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
