import { LucideChevronDown } from "lucide-react";
import getReadableText from "../lib/getReadableText";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { STATUS_OPTIONS } from "../constants/taskStatus";

/**
 *  Get the color class for a given priority
 * @param {{ priority: "low" | "medium" | "high" | "" }} priority
 * @returns
 */
export const getPriorityColor = (priority) => {
  switch (getReadableText(priority)) {
    case "High":
      return "bg-red-500";
    case "Medium":
      return "bg-yellow-500";
    case "Low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

/**
 *  TaskPriorityBadge component to display task priority
 * @param {{ priority: "low" | "medium" | "high" | "" }} param0
 * @returns JSX.Element
 */
export const TaskPriorityBadge = ({ priority }) => {
  return (
    <Badge
      className={`text-white px-2 py-1 rounded-full text-xs ${getPriorityColor(priority)}`}
    >
      {`${getReadableText(priority)} Priority`}
    </Badge>
  );
};

/**
 *  Get the color class for a given status
 * @param {{ status: "completed" | "in_progress" | "pending" | "" }} status
 * @returns string
 */
export const getStatusColor = (status) => {
  switch (getReadableText(status)) {
    case "Completed":
      return "bg-green-500";
    case "In Progress":
      return "bg-blue-500";
    case "Pending":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

/**
 *  TaskStatusBadge component to display task status
 * @param {{ status: "completed" | "in_progress" | "pending" | "" }} param0
 * @returns JSX.Element
 */
export const TaskStatusBadge = ({ status }) => {
  return (
    <Badge
      className={`text-white px-2 py-1 rounded-full text-xs ${getStatusColor(status)}`}
    >
      {getReadableText(status)}
    </Badge>
  );
};

/**
 * TaskStatusBadgeWithUpdate component allows updating the task status via a dropdown menu.
 * @param {{ status: "completed" | "in_progress" | "pending" | "" }} status - Current status of the task.
 * @param {(status: "completed" | "in_progress" | "pending" | "") => void} onChange - Callback function to handle status change.
 * @param {boolean} [disabled] - Boolean to disable the dropdown (optional).
 * @returns JSX.Element
 */
export const TaskStatusBadgeWithUpdate = ({ status, onChange, disabled }) => {
  return (
    <DropdownMenu disabled={disabled}>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <button
          type="button"
          className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          disabled={disabled}
        >
          <Badge
            className={`flex gap-2 items-center justify-center cursor-pointer select-none text-white px-2 py-1 rounded-full text-xs ${getStatusColor(
              status,
            )}`}
          >
            <div>{getReadableText(status)}</div>
            <LucideChevronDown size={12} />
          </Badge>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {STATUS_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option}
            onSelect={() => onChange(option)}
            className="flex items-center gap-2"
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${getStatusColor(
                option,
              )}`}
            />
            {getReadableText(option)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
