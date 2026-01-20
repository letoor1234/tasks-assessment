import useUpdateTaskStatus from "../hooks/useUpdateTaskStatus";
import { TaskPriorityBadge, TaskStatusBadgeWithUpdate } from "./TaskBadges";

const TaskListItem = ({
  id,
  title,
  description,
  dueDate,
  priority,
  status,
}) => {
  const {
    isLoading,
    updateTaskStatus,
    status: updatedStatus,
  } = useUpdateTaskStatus({ id, status });

  const handleUpdateStatus = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <div className="border border-slate-300 shadow-xl shadow-slate-700/20 rounded-2xl px-4 py-2">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-1">{description}</p>
      <p className="text-sm text-gray-500 mb-1">
        Due: {new Date(dueDate).toLocaleDateString()}
      </p>
      <div className="flex justify-between items-center mt-2">
        <div className="flex flex-col items-start gap-2">
          <TaskPriorityBadge priority={priority} />
        </div>
        <div className="flex flex-col items-start gap-2">
          <TaskStatusBadgeWithUpdate
            status={updatedStatus}
            disabled={isLoading}
            onChange={(newStatus) => {
              handleUpdateStatus(id, newStatus);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskListItem;
