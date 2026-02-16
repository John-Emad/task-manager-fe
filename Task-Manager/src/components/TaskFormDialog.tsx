import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Task, TaskFormData } from "../types/task.type";
import {
  RiCloseLine,
  RiSaveLine,
  RiFileTextLine,
  RiErrorWarningLine,
  RiAlignLeft,
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiLoader4Line,
} from "react-icons/ri";

interface TaskFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "view";
  taskData?: Task;
  onSubmit: (taskData: TaskFormData) => void;
}

export default function TaskFormDialog({
  isOpen,
  onClose,
  mode,
  taskData,
  onSubmit,
}: TaskFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      isDone: false,
    },
  });

  // Reset form when dialog opens or taskData changes
  useEffect(() => {
    if (isOpen) {
      if ((mode === "edit" || mode === "view") && taskData) {
        reset({
          title: taskData.title || "",
          description: taskData.description || "",
          dueDate: taskData.dueDate
            ? new Date(taskData.dueDate).toISOString().split("T")[0]
            : "",
          isDone: taskData.isDone || false,
        });
      } else {
        reset({
          title: "",
          description: "",
          dueDate: "",
          isDone: false,
        });
      }
    }
  }, [isOpen, mode, taskData, reset]);

  const handleFormSubmit = async (data: TaskFormData) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-navy to-pacific-blue px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">
            {mode === "add"
              ? "Add New Task"
              : mode === "edit"
                ? "Edit Task"
                : "View Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            aria-label="Close dialog"
          >
            <RiCloseLine size={24} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-5"
        >
          {/* Task Title */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-navy flex items-center gap-2"
            >
              <RiFileTextLine className="w-4 h-4" />
              Task Title <span className="text-tomato">*</span>
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter task title"
              disabled={mode === "view"}
              {...register("title", {
                required: "Task title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
                maxLength: {
                  value: 40,
                  message: "Title must not exceed 40 characters",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                errors.title
                  ? "border-tomato focus:ring-tomato/30"
                  : "border-gray-300 focus:ring-pacific-blue focus:border-pacific-blue"
              } ${mode === "view" ? "bg-gray-50 cursor-not-allowed" : ""}`}
            />
            {errors.title && (
              <p className="text-sm text-tomato flex items-center gap-1">
                <RiErrorWarningLine className="w-4 h-4" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Task Description */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-navy flex items-center gap-2"
            >
              <RiAlignLeft className="w-4 h-4" />
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Enter task description (optional)"
              disabled={mode === "view"}
              {...register("description", {
                maxLength: {
                  value: 300,
                  message: "Description must not exceed 300 characters",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                errors.description
                  ? "border-tomato focus:ring-tomato/30"
                  : "border-gray-300 focus:ring-pacific-blue focus:border-pacific-blue"
              } ${mode === "view" ? "bg-gray-50 cursor-not-allowed" : ""}`}
            />
            {errors.description && (
              <p className="text-sm text-tomato flex items-center gap-1">
                <RiErrorWarningLine className="w-4 h-4" />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Due Date and Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Due Date */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="dueDate"
                className="text-sm font-semibold text-navy flex items-center gap-2"
              >
                <RiCalendarLine className="w-4 h-4" />
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                disabled={mode === "view"}
                {...register("dueDate", {
                  validate: (value) => {
                    if (!value) return true; // Optional field
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Reset time to start of day
                    return (
                      selectedDate >= today || "Due date cannot be before today"
                    );
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.dueDate
                    ? "border-tomato focus:ring-tomato/30"
                    : "border-gray-300 focus:ring-pacific-blue focus:border-pacific-blue"
                } ${mode === "view" ? "bg-gray-50 cursor-not-allowed" : ""}`}
              />
              {errors.dueDate && (
                <p className="text-sm text-tomato flex items-center gap-1">
                  <RiErrorWarningLine className="w-4 h-4" />
                  {errors.dueDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Status Checkbox */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="isDone"
              disabled={mode === "view"}
              {...register("isDone")}
              className="w-5 h-5 text-pacific-blue border-gray-300 rounded focus:ring-2 focus:ring-pacific-blue cursor-pointer disabled:cursor-not-allowed"
            />
            <label
              htmlFor="isDone"
              className={`text-sm font-medium text-navy flex items-center gap-2 ${mode === "view" ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <RiCheckboxCircleLine className="w-5 h-5" />
              Mark as completed
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all active:scale-95"
            >
              {mode === "view" ? "Close" : "Cancel"}
            </button>
            {mode !== "view" && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-navy to-pacific-blue text-white rounded-lg font-medium hover:shadow-lg hover:shadow-pacific-blue/30 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RiLoader4Line className="animate-spin h-5 w-5" />
                    Saving...
                  </>
                ) : (
                  <>
                    <RiSaveLine size={20} />
                    {mode === "add" ? "Add Task" : "Update Task"}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
