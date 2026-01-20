import * as yup from "yup";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../constants/taskStatus";
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
/**
 * Custom yup schema for task creation and update validation.
 */
export const taskCreateUpdateSchema = yup.object({
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
