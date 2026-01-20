import { toast } from "react-toastify";
import { updateTask } from "../api/tasks";
import { useCallback, useState } from "react";
import * as yup from "yup";

import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../constants/taskStatus";

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const taskUpdateSchema = yup.object({
  title: yup
    .string()
    .transform((value) => value?.trim())
    .required("Title is required"),

  description: yup
    .string()
    .nullable()
    .transform((value) => value?.trim() || null),

  priority: yup
    .string()
    .oneOf(PRIORITY_OPTIONS, "Invalid priority")
    .required("Priority is required"),

  status: yup
    .string()
    .oneOf(STATUS_OPTIONS, "Invalid status")
    .nullable()
    .optional(),

  dueDate: yup.string().nullable().matches(ISO_DATE_REGEX, {
    message: "Invalid date format (YYYY-MM-DD)",
    excludeEmptyString: true,
  }),
});

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
        const validatedData = await taskUpdateSchema.validate(payload, {
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
