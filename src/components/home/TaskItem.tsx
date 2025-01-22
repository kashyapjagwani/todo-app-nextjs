"use client";
import { Task } from "@/utils/interfaces";
import React, { useEffect, useState } from "react";
import Button from "../global/Button";
import Image from "next/image";
import { CLIENT_ENDPOINTS } from "@/utils/endpoints";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (completed: boolean) => void;
}

export default function TaskItem({ task, onDelete, onToggle }: TaskProps) {
  const [completed, setCompleted] = useState(task.completed);

  const router = useRouter();

  const TrashIcon = (
    <Image src="/trash.svg" alt="Trash Icon" width={20} height={20} />
  );

  const handleTaskKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(CLIENT_ENDPOINTS.EDIT(task.id));
    }
  };

  const handleTaskClick = () => {
    router.push(CLIENT_ENDPOINTS.EDIT(task.id));
  };

  const handleToggleTaskComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setCompleted(e.target.checked);
    onToggle(e.target.checked);
  };

  const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <div
      aria-label={task.title}
      role="button"
      tabIndex={0}
      onKeyDown={handleTaskKeyDown}
      onClick={handleTaskClick}
      className={`bg-dark px-8 py-4 rounded-lg border border-gray-500 flex items-center justify-between gap-2 border-l-8`}
      style={{
        borderLeftColor: task.color,
      }}
    >
      <div className="flex gap-4">
        <label
          className={completed ? "line-through" : ""}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            id={`checkbox-${task.id}`}
            type="checkbox"
            className="mr-2"
            checked={completed}
            onChange={handleToggleTaskComplete}
          />

          {task.title}
        </label>
      </div>
      <div className="">
        <Button icon={TrashIcon} handleClick={handleDeleteTask} />
      </div>
    </div>
  );
}
