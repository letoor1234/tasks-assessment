import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useTasksList from "../hooks/useTasksList";
import Loader from "./Loader";
import TaskListItem from "./TaskListItem";
import TaskCreateFormDialog from "./TaskCreateFormDialog";
import ErrorCard from "./ErrorCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import getReadableText from "../lib/getReadableText";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../constants/taskStatus";
import { getPriorityColor, getStatusColor } from "./TaskBadges";
import { getSortLabels, SORT_BY_OPTIONS } from "../constants/filterOptions";

/**
 * Item animation variants for framer-motion
 */
const itemAnimation = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? 80 : -80,
  }),

  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
    },
  }),

  exit: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? 80 : -80,
    transition: {
      duration: 0.2,
    },
  }),
};

/**
 *  TasksList component to display and manage a list of tasks
 * @returns JSX.Element
 */
const TasksList = () => {
  const [order, setOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("dueDate");
  const [priority, setPriority] = useState(null);
  const [status, setStatus] = useState(null);

  const { tasks, isLoading, error, refetch } = useTasksList({
    order,
    sortBy,
    priority,
    status,
  });

  const [selectedSort, setSelectedSort] = useState(null);
  const handleUpdateSort = (newSortBy) => {
    setSelectedSort(newSortBy);
    const [sortField, sortOrder] = newSortBy.split(":");
    setSortBy(sortField);
    setOrder(sortOrder);
  };

  return (
    <div className={`flex flex-col md:px-4 py-2 gap-4 h-full`}>
      {/**
       * Filter and Sort Controls. Hidden when loading or error occurs
       */}
      {!isLoading && !error ? (
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <Select value={selectedSort} onValueChange={handleUpdateSort}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="flex flex-col gap-1">
              {SORT_BY_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {getSortLabels(s)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="flex flex-col gap-1">
              {[null, ...STATUS_OPTIONS].map((s) => (
                <SelectItem key={s} value={s}>
                  {getReadableText(s, "All statuses")}
                  {s !== null ? (
                    <span
                      className={`inline-block h-2 w-2 rounded-full ml-2 ${getStatusColor(
                        s,
                      )}`}
                    />
                  ) : null}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {[null, ...PRIORITY_OPTIONS].map((s) => (
                <SelectItem key={s} value={s}>
                  {`${getReadableText(s, "All priorities")}`}
                  {s !== null ? (
                    <span
                      className={`inline-block h-2 w-2 rounded-full ml-2 ${getPriorityColor(
                        s,
                      )}`}
                    />
                  ) : null}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="ml-auto">
            <TaskCreateFormDialog callback={refetch} />
          </div>
        </div>
      ) : null}
      {/**
       * Loader and ErrorCard components
       */}
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
      <AnimatePresence>
        {error && <ErrorCard message={error.message} />}
      </AnimatePresence>
      {/**
       * Tasks List
       */}
      <ul className="flex flex-col gap-4">
        <AnimatePresence>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <motion.li
                key={task.id}
                custom={index}
                variants={itemAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <TaskListItem
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  dueDate={task.dueDate}
                  priority={task.priority}
                  status={task.status}
                  refetch={refetch}
                />
              </motion.li>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center text-gray-500 mt-10 border border-dashed border-gray-300 px-4 py-6 rounded-xl shadow-sm bg-slate-100"
            >
              No tasks found with the selected filters.
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default TasksList;
