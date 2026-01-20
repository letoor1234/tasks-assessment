import { toast } from "react-toastify";
import { updateTask } from "../api/tasks";
import { useCallback, useState } from "react";

/**
 * Custom hook to update the status of a task.
 * @param {{ id: number, status: string, callback: () => void }} param0
 * @returns
 */
const useUpdateTaskStatus = ({ id, status, callback }) => {
  const [newStatus, setNewStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTaskStatus = useCallback(
    async (newStatusParam) => {
      setIsLoading(true);
      setError(null);
      setNewStatus(newStatusParam);
      try {
        await updateTask(id, { status: newStatusParam });
        toast.success("Task status updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        callback?.();
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
    },
    [id, status],
  );

  return { updateTaskStatus, isLoading, error, status: newStatus };
};

export default useUpdateTaskStatus;
