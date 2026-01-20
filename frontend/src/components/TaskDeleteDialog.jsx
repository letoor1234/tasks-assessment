import { LucideTrash } from "lucide-react";
import { useCallback, useState } from "react";
import useDeleteTask from "../hooks/useDeleteTask";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

/**
 *  TaskDeleteDialog component to confirm and delete a task
 * @param {{ id: number, callback?: () => void }} param0
 * @returns JSX.Element
 */
const TaskDeleteDialog = ({ id, callback }) => {
  const [open, setOpen] = useState(false);
  const { handleDeleteTask, isLoading } = useDeleteTask({ id, callback });

  const handleConfirmDelete = useCallback(async () => {
    try {
      await handleDeleteTask();

      setOpen(false);
      if (callback) callback();
    } catch (error) {}
  }, [id, handleDeleteTask, callback]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger>
        <LucideTrash
          size={16}
          className="text-red-600 md:hover:animate-bounce cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure to delete this task?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your task
            from our servers. (Unless you restart the server, just kidding!)
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start flex flex-row justify-between items-center">
          <DialogClose asChild>
            <button
              type="button"
              className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-70 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70"
              disabled={isLoading}
            >
              Close
            </button>
          </DialogClose>
          <button
            type="button"
            className="border border-red-600 bg-red-600/10 text-red-600 hover:bg-red-600/20 focus:ring-red-600 disabled:cursor-not-allowed disabled:opacity-70 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70"
            disabled={isLoading}
            onClick={handleConfirmDelete}
          >
            {isLoading ? "Deleting..." : "Delete Task"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDeleteDialog;
