"use client";
import AddEditTaskForm from "@/components/AddEditTaskForm";
import Button from "@/components/global/Button";
import { getOneTask } from "@/utils/apiCalls";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function EditTask() {
  const [task, setTask] = useState();
  const [fetchingTask, setFetchingTask] = useState(true);

  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const fetchOneTask = async (id: string) => {
    try {
      setFetchingTask(true);
      const task = await getOneTask(id);
      setTask(task);
    } catch (error: any) {
      alert("Error fetching task. Please try again");
      router.push("/");
    } finally {
      setFetchingTask(false);
    }
  };

  useEffect(() => {
    fetchOneTask(String(id));
  }, []);
  const LeftArrow = (
    <Image
      src="../left-arrow.svg"
      alt="Left Arrow Icon"
      width={20}
      height={20}
    />
  );

  return (
    <div className="relative w-full flex flex-col items-center p-8">
      <div className="absolute left-8">
        <Button icon={LeftArrow} link="/" />
      </div>
      <h1 className="text-xl font-bold">Edit Task</h1>
      <div className="w-full max-w-4xl mt-8">
        {fetchingTask ? (
          <div className="text-center">Fetching your task...</div>
        ) : task ? (
          <AddEditTaskForm task={task} />
        ) : (
          <div className="text-center">No task found</div>
        )}
      </div>
    </div>
  );
}
