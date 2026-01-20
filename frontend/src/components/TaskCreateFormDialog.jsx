import { useCallback, useEffect, useState } from "react";
import useUpdateTask from "../hooks/useUpdateTask";
import getReadableText from "../lib/getReadableText";
import DateInput from "./ui/DateInput";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

import { LucidePlusCircle } from "lucide-react";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../constants/taskStatus";
import useCreateTask from "../hooks/useCreateTask";

const TaskCreateFormDialog = ({ callback }) => {
  const [open, setOpen] = useState(false);
  const { handleCreateTask, isLoading } = useCreateTask({
    callback: () => {
      setOpen(false);
      callback?.();
    },
  });

  const [controlledTitle, setTitle] = useState();
  const [controlledDescription, setDescription] = useState();
  const [controlledDueDate, setDueDate] = useState();
  const [controlledPriority, setPriority] = useState();
  const [controlledStatus, setStatus] = useState();

  const handleCreate = useCallback(async () => {
    await handleCreateTask({
      title: controlledTitle,
      description: controlledDescription,
      dueDate: controlledDueDate,
      priority: controlledPriority,
      status: controlledStatus,
    });
  }, [
    handleCreateTask,
    callback,
    controlledTitle,
    controlledDescription,
    controlledDueDate,
    controlledPriority,
    controlledStatus,
  ]);

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setDescription("");
    setPriority("");

    const today = new Date().toISOString().split("T")[0];
    setDueDate(today);
    setStatus("pending");
    setPriority("low");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group font-bold flex items-center gap-2 border border-blue-200 shadow-md bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 px-3 py-1.5 rounded-md text-sm"
        >
          New Task{" "}
          <LucidePlusCircle
            size={16}
            className="text-blue-600 md:group-hover:animate-bounce"
          />
        </button>
      </DialogTrigger>

      <DialogContent className="space-y-4 max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>

        {/* TITLE */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Title</label>
          <Input
            value={controlledTitle}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={controlledDescription}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            rows={4}
          />
        </div>

        {/* DUE DATE */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Due date</label>
          <DateInput value={controlledDueDate} onChange={setDueDate} />
        </div>

        {/* PRIORITY */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Priority</label>
          <Select value={controlledPriority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {PRIORITY_OPTIONS.map((p) => (
                <SelectItem key={p} value={p}>
                  {getReadableText(p)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* STATUS */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Status</label>
          <Select value={controlledStatus} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {getReadableText(s)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <button
              type="button"
              disabled={isLoading}
              className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md text-sm disabled:opacity-70"
            >
              Close
            </button>
          </DialogClose>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleCreate}
            className="border border-blue-600 bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 px-4 py-2 rounded-md text-sm disabled:opacity-70"
          >
            {isLoading ? "Creating..." : "Create Task"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCreateFormDialog;
