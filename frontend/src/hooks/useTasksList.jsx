import { useCallback, useEffect, useState } from "react";
import { fetchTasks } from "../api/tasks";

const useTasksList = ({ order, sortBy, priority, status }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const fetchTaskList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTasks({
        order,
        sortBy,
        priority,
        status,
      });

      const tasksResult = data.tasks || data; // Adjust based on API response structure

      setTasks(tasksResult);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [order, sortBy, priority, status]);

  useEffect(() => {
    fetchTaskList();
  }, [fetchTaskList]);

  return { isLoading, tasks, error, refetch: fetchTaskList };
};

export default useTasksList;
