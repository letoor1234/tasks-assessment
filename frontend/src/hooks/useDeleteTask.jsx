import { toast } from "react-toastify";
import { deleteTask, updateTask } from "../api/tasks";
import { useCallback, useState } from "react";

/**
 * Custom hook to update the status of a task.
 * @param {{ id: number, callback?: () => void }} param0
 * @returns
 */
const useDeleteTask = ({ id, callback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteTask = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTask(id);
      toast.success("Task status deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      if (callback) callback();
    } catch (err) {
      setError(err);
      toast.error("Failed to delete task", {
        position: "top-right",
        autoClose: 3000,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [id, callback]);

  return { handleDeleteTask, isLoading, error };
};

export default useDeleteTask;
