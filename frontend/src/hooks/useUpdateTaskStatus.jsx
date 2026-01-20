import { toast } from "react-toastify";
import { updateTask } from "../api/tasks";
import { useState } from "react";

/**
 * Custom hook to update the status of a task.
 * @param id - ID of the task to be updated.
 * @param status - Current status of the task.
 * @returns
 */
const useUpdateTaskStatus = ({ id, status }) => {
  const [newStatus, setNewStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTaskStatus = async (taskId, newStatusParam) => {
    setIsLoading(true);
    setError(null);
    setNewStatus(newStatusParam);
    try {
      await updateTask(taskId, { status: newStatusParam });
      toast.success("Task status updated successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setError(err);
      setNewStatus(status); // revert status on error
      toast.error("Failed to update task status", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTaskStatus, isLoading, error, status: newStatus };
};

export default useUpdateTaskStatus;
