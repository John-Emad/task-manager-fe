import { useState } from "react";
import {
  RiCheckboxCircleLine,
  RiCheckboxBlankCircleLine,
  RiEditLine,
  RiDeleteBinLine,
  RiCalendarLine,
  RiLoader4Line,
} from "react-icons/ri";
import { taskService } from "../services/task.service";
import type { Task } from "../types/task.type";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onView?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onTaskUpdated?: (task: Task) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onView,
  onDelete,
  onTaskUpdated,
}: TaskCardProps) {
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleCheckboxClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTogglingStatus(true);
    try {
      const updatedTask = await taskService.toggleIsDone(task.id);
      onTaskUpdated?.(updatedTask);
    } catch (error) {
      console.error("Failed to toggle task status:", error);
    } finally {
      setIsTogglingStatus(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(task);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await taskService.delete(task.id);
      onDelete?.(task.id);
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const handleCardClick = () => {
    onView?.(task);
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return null;
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-100 hover:border-pacific-blue/30 transform hover:-translate-y-1"
      >
        {/* Status Indicator Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-colors ${
            task.isDone ? "bg-green-500" : "bg-pacific-blue"
          }`}
        />

        {/* Header Section */}
        <div className="flex items-start justify-between gap-4 mb-3">
          {/* Checkbox and Title */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button
              onClick={handleCheckboxClick}
              disabled={isTogglingStatus}
              className="flex-shrink-0 mt-1 text-gray-400 hover:text-pacific-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={
                task.isDone ? "Mark as incomplete" : "Mark as complete"
              }
            >
              {isTogglingStatus ? (
                <RiLoader4Line className="w-6 h-6 animate-spin text-pacific-blue" />
              ) : task.isDone ? (
                <RiCheckboxCircleLine className="w-6 h-6 text-green-500" />
              ) : (
                <RiCheckboxBlankCircleLine className="w-6 h-6" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-semibold text-navy transition-all ${
                  task.isDone
                    ? "line-through text-gray-400"
                    : "group-hover:text-pacific-blue"
                }`}
              >
                {task.title}
              </h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-400 hover:text-pacific-blue hover:bg-pacific-blue/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Edit task"
            >
              <RiEditLine className="w-5 h-5" />
            </button>
            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="p-2 text-gray-400 hover:text-tomato hover:bg-tomato/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
              aria-label="Delete task"
            >
              {isDeleting ? (
                <RiLoader4Line className="w-5 h-5 animate-spin" />
              ) : (
                <RiDeleteBinLine className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p
            className={`text-sm text-gray-600 mb-3 line-clamp-2 ml-9 ${
              task.isDone ? "text-gray-400" : ""
            }`}
          >
            {task.description}
          </p>
        )}

        {/* Footer - Due Date */}
        {task.dueDate && (
          <div className="flex items-center gap-2 text-sm text-gray-500 ml-9">
            <RiCalendarLine className="w-4 h-4" />
            <span className={task.isDone ? "text-gray-400" : ""}>
              {formatDate(task.dueDate)}
            </span>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={handleCancelDelete}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-tomato/10 rounded-full">
                <RiDeleteBinLine className="w-6 h-6 text-tomato" />
              </div>
              <h3 className="text-xl font-bold text-navy">Delete Task</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{task.title}"? This action cannot
              be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-tomato text-white rounded-lg font-medium hover:bg-tomato/90 hover:shadow-lg hover:shadow-tomato/30 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <RiLoader4Line className="animate-spin h-5 w-5" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
