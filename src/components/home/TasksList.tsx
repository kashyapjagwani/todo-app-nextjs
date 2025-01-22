import { deleteTask, editTask } from "@/utils/apiCalls";
import { Task } from "@/utils/interfaces";
import TaskItem from "./TaskItem";
import { useState } from "react";
import EmptyTasksList from "../global/EmptyTasksList";

interface TasksListProps {
  tasks: Task[];
}

export default function TasksList({ tasks }: TasksListProps) {
  const [taskList, setTaskList] = useState(tasks);

  const completedTasks = taskList.filter((task) => task.completed).length;

  const handleTaskCompleteToggle = async (updatedTask: Task) => {
    const previousTasks = [...taskList];
    const newTaskList = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(newTaskList);
    try {
      await editTask(updatedTask);
    } catch (error: any) {
      alert("Error updating task. Please try again");
      setTaskList(previousTasks);
    }
  };

  const handleTaskDelete = async (id: string) => {
    const previousTasks = [...taskList];
    const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(newTaskList);

    try {
      await deleteTask(id);
    } catch (error: any) {
      alert("Error deleting task. Please try again");
      setTaskList(previousTasks);
    }
  };

  return taskList.length ? (
    <div className="w-full md:max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">
          <span className="text-primary">Tasks</span>{" "}
          <span className="bg-dark px-2 py-1 rounded-lg">
            {taskList.length}
          </span>
        </div>
        <div className="text-sm font-bold">
          <span className="text-secondary">Completed</span>{" "}
          <span className="bg-dark px-2 py-1 rounded-lg">
            {completedTasks} of {taskList.length}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {taskList.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleTaskDelete}
            onToggle={(completed: boolean) =>
              handleTaskCompleteToggle({
                ...task,
                completed,
              })
            }
          />
        ))}
      </div>
    </div>
  ) : (
    <EmptyTasksList />
  );
}
