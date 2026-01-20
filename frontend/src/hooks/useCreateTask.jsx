import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { createTask } from "../api/tasks";
import { taskCreateUpdateSchema } from "../validators/taskCreateUpdateValidator";

/**
 *  Custom hook to create a task.
 * @param {{ callback?: () => void }} param0
 * @returns
 */
const useCreateTask = ({ callback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateTask = useCallback(
    async (payload) => {
      setIsLoading(true);
      setError(null);

      try {
        const validatedData = await taskCreateUpdateSchema.validate(payload, {
          abortEarly: false,
          stripUnknown: true,
        });

        await createTask(validatedData);

        toast.success("Task created successfully", {
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
          toast.error("Failed to create task", {
            position: "top-right",
            autoClose: 3000,
          });
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [callback],
  );

  return { handleCreateTask, isLoading, error };
};

export default useCreateTask;
