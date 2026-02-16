import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TaskFormDialog from "./TaskFormDialog";
import type { Task, TaskFormData, TaskStatistics } from "../types/task.type";
import {
  RiAddLine,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiAlertLine,
  RiFileListLine,
  RiPercentLine,
  RiCalendarEventLine,
} from "react-icons/ri";
import { taskService } from "../services/task.service";
import TaskCard from "./TaskCard";

type FilterType = "total" | "completed" | "pending" | "overdue" | "upcoming";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);
  const [statistics, setStatistics] = useState<TaskStatistics | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("total");
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [upcomingDays, setUpcomingDays] = useState<number>(7);
  const [showUpcomingDialog, setShowUpcomingDialog] = useState(false);
  const [tempUpcomingDays, setTempUpcomingDays] = useState<string>("7");

  // Fetch all tasks and statistics on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [tasksData, statsData] = await Promise.all([
          taskService.getAllForUser(),
          taskService.getStatistics(),
        ]);
        setAllTasks(tasksData);
        setStatistics(statsData);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setIsLoadingStats(false);
        setIsLoadingTasks(false);
      }
    };

    fetchInitialData();
  }, []);

  // Refetch statistics when all Tasks change
  useEffect(() => {
    const refetchStatistics = async () => {
      try {
        const stats = await taskService.getStatistics();
        setStatistics(stats);
      } catch (error) {
        console.error("Failed to refetch statistics:", error);
      }
    };

    if (allTasks.length > 0) {
      refetchStatistics();
    }
  }, [allTasks]);

  // Apply filtering based on selected filter and search term
  useEffect(() => {
    const applyFilters = async () => {
      setIsLoadingTasks(true);
      try {
        // If search term exists, override filter and search in all tasks
        if (searchTerm.trim()) {
          const searchLower = searchTerm.toLowerCase();
          const filtered = allTasks.filter(
            (task) =>
              task.title.toLowerCase().includes(searchLower) ||
              task.description.toLowerCase().includes(searchLower),
          );
          setDisplayedTasks(filtered);
          setIsLoadingTasks(false);
          return;
        }

        // Apply filter based on selected statistics box
        switch (selectedFilter) {
          case "total":
            setDisplayedTasks(allTasks);
            break;

          case "completed":
            setDisplayedTasks(allTasks.filter((task) => task.isDone === true));
            break;

          case "pending":
            // Pending: not done and not overdue
            setDisplayedTasks(
              allTasks.filter((task) => {
                if (task.isDone) return false;
                if (!task.dueDate) return true;
                const dueDate = new Date(task.dueDate);
                const now = new Date();
                return dueDate >= now;
              }),
            );
            break;

          case "overdue":
            // Fetch overdue tasks from API
            const overdueTasks = await taskService.getOverdue();
            setDisplayedTasks(overdueTasks);
            break;

          case "upcoming":
            // Fetch upcoming tasks from API with specified days
            const upcomingTasks = await taskService.getUpcoming({
              days: upcomingDays,
            });
            setDisplayedTasks(upcomingTasks);
            break;

          default:
            setDisplayedTasks(allTasks);
        }
      } catch (error) {
        console.error("Failed to apply filters:", error);
        setDisplayedTasks(allTasks);
      } finally {
        setIsLoadingTasks(false);
      }
    };

    applyFilters();
  }, [selectedFilter, searchTerm, allTasks, upcomingDays]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddTask = async (taskData: TaskFormData) => {
    const newTask = await taskService.create(taskData);
    setAllTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEditTask = async (taskData: TaskFormData) => {
    if (!selectedTask) return;
    const updatedTask = await taskService.update(selectedTask.id, taskData);
    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  const handleTaskDeleted = (taskId: string) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleFilterClick = (filter: FilterType) => {
    if (filter === "upcoming") {
      setShowUpcomingDialog(true);
    } else {
      setSelectedFilter(filter);
      setShowUpcoming(false);
    }
  };

  const handleUpcomingSubmit = () => {
    const days = parseInt(tempUpcomingDays);
    if (isNaN(days) || days < 1) {
      alert("Please enter a valid number of days (minimum 1)");
      return;
    }
    if (days > 365) {
      alert("Please enter a number of days less than or equal to 365");
      return;
    }
    setUpcomingDays(days);
    setSelectedFilter("upcoming");
    setShowUpcoming(true);
    setShowUpcomingDialog(false);
  };

  const handleUpcomingCancel = () => {
    setShowUpcomingDialog(false);
    setTempUpcomingDays(upcomingDays.toString());
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  const handleViewClick = (task: Task) => {
    setSelectedTask(task);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-navy/5 to-pacific-blue/5">
      <Navbar onSearch={handleSearch} />

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-navy to-pacific-blue text-white rounded-lg font-medium hover:shadow-lg hover:shadow-pacific-blue/30 transition-all active:scale-95"
          >
            <RiAddLine size={20} />
            Add Task
          </button>
        </div>

        {/* Statistics Section */}
        {isLoadingStats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-md animate-pulse"
              >
                <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : statistics ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {/* Total Tasks */}
            <button
              onClick={() => handleFilterClick("total")}
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 group text-left w-full ${
                selectedFilter === "total" && !searchTerm
                  ? "border-pacific-blue bg-pacific-blue/5 ring-2 ring-pacific-blue/20"
                  : "border-gray-100 hover:border-pacific-blue/30"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-pacific-blue/10 rounded-lg group-hover:bg-pacific-blue/20 transition-colors">
                  <RiFileListLine className="w-6 h-6 text-pacific-blue" />
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium mb-1">
                Total Tasks
              </p>
              <p className="text-3xl font-bold text-navy">{statistics.total}</p>
            </button>

            {/* Completed Tasks */}
            <button
              onClick={() => handleFilterClick("completed")}
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 group text-left w-full ${
                selectedFilter === "completed" && !searchTerm
                  ? "border-green-500 bg-green-500/5 ring-2 ring-green-500/20"
                  : "border-gray-100 hover:border-green-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <RiCheckboxCircleLine className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium mb-1">
                Completed
              </p>
              <p className="text-3xl font-bold text-green-600">
                {statistics.completed}
              </p>
            </button>

            {/* Pending Tasks */}
            <button
              onClick={() => handleFilterClick("pending")}
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 group text-left w-full ${
                selectedFilter === "pending" && !searchTerm
                  ? "border-tuscan-sun bg-tuscan-sun/5 ring-2 ring-tuscan-sun/20"
                  : "border-gray-100 hover:border-tuscan-sun/30"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-tuscan-sun/10 rounded-lg group-hover:bg-tuscan-sun/20 transition-colors">
                  <RiTimeLine className="w-6 h-6 text-tuscan-sun" />
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium mb-1">Pending</p>
              <p className="text-3xl font-bold text-tuscan-sun">
                {statistics.pending}
              </p>
            </button>

            {/* Overdue Tasks */}
            <button
              onClick={() => handleFilterClick("overdue")}
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 group text-left w-full ${
                selectedFilter === "overdue" && !searchTerm
                  ? "border-tomato bg-tomato/5 ring-2 ring-tomato/20"
                  : "border-gray-100 hover:border-tomato/30"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-tomato/10 rounded-lg group-hover:bg-tomato/20 transition-colors">
                  <RiAlertLine className="w-6 h-6 text-tomato" />
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium mb-1">Overdue</p>
              <p className="text-3xl font-bold text-tomato">
                {statistics.overdue}
              </p>
            </button>

            {/* Completion Rate - Shows all tasks like Total */}
            <button
              onClick={() => handleFilterClick("total")}
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 group text-left w-full ${
                selectedFilter === "total" && !searchTerm
                  ? "border-navy bg-navy/5 ring-2 ring-navy/20"
                  : "border-gray-100 hover:border-navy/30"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-navy/10 rounded-lg group-hover:bg-navy/20 transition-colors">
                  <RiPercentLine className="w-6 h-6 text-navy" />
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium mb-1">
                Completion Rate
              </p>
              <p className="text-3xl font-bold text-navy">
                {statistics.completionRate.toFixed(0)}%
              </p>
            </button>
          </div>
        ) : null}

        {/* Filter Status and Upcoming Tasks Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {searchTerm ? (
              <div className="flex items-center gap-2">
                <p className="text-gray-600">
                  Searching for:{" "}
                  <span className="font-semibold">{searchTerm}</span>
                </p>
                <span className="text-sm text-gray-500">
                  ({displayedTasks.length} result
                  {displayedTasks.length !== 1 ? "s" : ""})
                </span>
              </div>
            ) : (
              <p className="text-gray-600">
                Showing:{" "}
                <span className="font-semibold capitalize">
                  {selectedFilter === "total"
                    ? "All Tasks"
                    : selectedFilter === "upcoming"
                      ? "Upcoming Tasks"
                      : `${selectedFilter} Tasks`}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  ({displayedTasks.length} task
                  {displayedTasks.length !== 1 ? "s" : ""})
                </span>
              </p>
            )}
          </div>

          {/* Upcoming Tasks Toggle Button */}
          <button
            onClick={() => handleFilterClick("upcoming")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              showUpcoming
                ? "bg-pacific-blue text-white shadow-lg shadow-pacific-blue/30"
                : "bg-white text-pacific-blue border-2 border-pacific-blue hover:bg-pacific-blue/10"
            }`}
          >
            <RiCalendarEventLine size={20} />
            {showUpcoming
              ? `Showing Next ${upcomingDays} Day${upcomingDays !== 1 ? "s" : ""}`
              : "View Upcoming"}
          </button>
        </div>

        {/* Task List */}
        {isLoadingTasks ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-md animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTasks.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchTerm
                    ? `No tasks found matching "${searchTerm}"`
                    : selectedFilter === "upcoming"
                      ? `No upcoming tasks in the next ${upcomingDays} day${upcomingDays !== 1 ? "s" : ""}`
                      : selectedFilter === "overdue"
                        ? "No overdue tasks - great job!"
                        : selectedFilter === "completed"
                          ? "No completed tasks yet"
                          : selectedFilter === "pending"
                            ? "No pending tasks"
                            : 'No tasks yet. Click "Add Task" to create your first task!'}
                </p>
              </div>
            ) : (
              displayedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditClick}
                  onView={handleViewClick}
                  onDelete={handleTaskDeleted}
                  onTaskUpdated={handleTaskUpdated}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Add Task Dialog */}
      <TaskFormDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        mode="add"
        onSubmit={handleAddTask}
      />

      {/* Edit Task Dialog */}
      <TaskFormDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        mode="edit"
        taskData={selectedTask}
        onSubmit={handleEditTask}
      />

      {/* View Task Dialog */}
      <TaskFormDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        mode="view"
        taskData={selectedTask}
        onSubmit={() => {}}
      />

      {/* Upcoming Days Dialog */}
      {showUpcomingDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slideUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-pacific-blue/10 rounded-lg">
                <RiCalendarEventLine className="w-6 h-6 text-pacific-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">
                  View Upcoming Tasks
                </h3>
                <p className="text-sm text-gray-600">
                  Enter the number of days to look ahead
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="upcomingDays"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Number of Days
              </label>
              <input
                id="upcomingDays"
                type="number"
                min="1"
                max="365"
                value={tempUpcomingDays}
                onChange={(e) => setTempUpcomingDays(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpcomingSubmit();
                  } else if (e.key === "Escape") {
                    handleUpcomingCancel();
                  }
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pacific-blue focus:ring-2 focus:ring-pacific-blue/20 outline-none transition-all text-lg"
                placeholder="e.g., 7"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter a value between 1 and 365 days
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUpcomingCancel}
                className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpcomingSubmit}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-navy to-pacific-blue text-white rounded-lg font-medium hover:shadow-lg hover:shadow-pacific-blue/30 transition-all active:scale-95"
              >
                Show Tasks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
