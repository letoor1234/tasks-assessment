import { toast } from "react-toastify";
import { updateTask } from "../api/tasks";
import { useCallback, useState } from "react";
import * as yup from "yup";
import { taskCreateUpdateSchema } from "../validators/taskCreateUpdateValidator";

/**
 *  Custom hook to update a task.
 * @param {{ id: string, callback?: () => void }} param0
 * @returns
 */
const useUpdateTask = ({ id, callback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateTask = useCallback(
    async (payload) => {
      setIsLoading(true);
      setError(null);

      try {
        const validatedData = await taskCreateUpdateSchema.validate(payload, {
          abortEarly: false,
          stripUnknown: true,
        });

        await updateTask(id, validatedData);

        toast.success("Task updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });

        callback?.();
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          err.inner.forEach((e) => {
            toast.error(e.message, {
              position: "top-right",
              autoClose: 4000,
            });
          });
        } else {
          setError(err);
          toast.error("Failed to update task", {
            position: "top-right",
            autoClose: 3000,
          });
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [id, callback],
  );

  return { handleUpdateTask, isLoading, error };
};

export default useUpdateTask;
