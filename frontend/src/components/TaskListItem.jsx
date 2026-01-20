import useUpdateTaskStatus from "../hooks/useUpdateTaskStatus";
import { TaskPriorityBadge, TaskStatusBadgeWithUpdate } from "./TaskBadges";
import TaskDeleteDialog from "./TaskDeleteDialog";
import TaskUpdateFormDialog from "./TaskUpdateFormDialog";
import IconButton from "./ui/IconButton";

/**
 *  TaskListItem component to display individual task details
 * @param {{ id: number, title: string, description: string, dueDate: string, priority: string, status: string, refetch: () => void }} param0
 * @returns JSX.Element
 */
const TaskListItem = ({
  id,
  title,
  description,
  dueDate,
  priority,
  status,
  refetch,
}) => {
  const {
    isLoading,
    updateTaskStatus,
    status: updatedStatus,
  } = useUpdateTaskStatus({ id, status });

  return (
    <>
      <div className="relative border border-slate-300 shadow-xl shadow-slate-700/20 rounded-2xl px-4 py-2">
        <div className="absolute top-2 right-2 flex flex-row gap-2">
          <IconButton>
            <TaskUpdateFormDialog
              id={id}
              title={title}
              description={description}
              status={status}
              priority={priority}
              dueDate={dueDate}
              callback={refetch}
            />
          </IconButton>

          <IconButton>
            <TaskDeleteDialog id={id} title={title} callback={refetch} />
          </IconButton>
        </div>
        <h3 className="text-lg font-semibold mb-2 mr-9">{title}</h3>
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
              onChange={(newStatus) => updateTaskStatus(newStatus)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskListItem;
