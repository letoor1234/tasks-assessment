import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useTasksList from "../hooks/useTasksList";
import Loader from "./Loader";
import TaskListItem from "./TaskListItem";

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

  return (
    <div className={`flex flex-col md:px-4 py-2 gap-4 h-full`}>
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
      {error && <p>Error loading tasks: {error.message}</p>}
      <ul className="flex flex-col gap-4">
        <AnimatePresence>
          {tasks.map((task, index) => (
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
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default TasksList;
