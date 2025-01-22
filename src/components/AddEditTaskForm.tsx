"use client";
import { createTask, editTask } from "@/utils/apiCalls";
import { Task } from "@/utils/interfaces";
import React, { useEffect, useRef, useState } from "react";
import ColorSelector from "./form/ColorSelector";
import Button from "./global/Button";
import { usePathname, useRouter } from "next/navigation";

interface AddEditTaskFormProps {
  task?: Task;
}

export default function AddEditTaskForm({ task }: AddEditTaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [titleError, setTitleError] = useState(false);
  const [color, setColor] = useState("red");
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const path = usePathname();

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (title.length) {
      setTitleError(false);
    }
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      setTitleError(true);
      titleInputRef.current?.focus();
    } else {
      try {
        setSaving(true);
        setTitleError(false);
        path.includes("create")
          ? await createTask({
              title,
              color,
            })
          : task &&
            (await editTask({
              ...task,
              title,
              color,
            }));
        router.push("/");
      } catch (error: any) {
        alert("Error saving task. Please try again");
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label
          htmlFor="title"
          className={`${
            titleError ? "text-red-600" : "text-primary"
          } font-bold text-lg`}
        >
          Title *
        </label>
        <input
          ref={titleInputRef}
          id="title"
          type="text"
          autoFocus
          className="w-full text-white bg-dark p-2 rounded-lg border-gray-500 mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p
          className={`absolute mt-1 text-red-600 ${
            titleError ? "visible" : "invisible"
          }`}
        >
          Title is required
        </p>
      </div>
      <ColorSelector selectedColor={color} setSelectedColor={setColor} />
      <Button
        title={saving ? "Saving..." : "Save"}
        type="submit"
        disabled={saving}
      />
    </form>
  );
}
