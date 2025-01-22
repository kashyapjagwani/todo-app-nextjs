"use client";
import Button from "@/components/global/Button";
import TasksList from "@/components/home/TasksList";
import { getAllTasks } from "@/utils/apiCalls";
import { CLIENT_ENDPOINTS } from "@/utils/endpoints";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [fetchingTasks, setFetchingTasks] = useState(true);

  const fetchAllTasks = async () => {
    try {
      setFetchingTasks(true);
      const tasks = await getAllTasks();
      setTasks(tasks);
    } catch (error: any) {
      alert("Error fetching tasks. Please try again");
    } finally {
      setFetchingTasks(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const AddIcon = (
    <Image src="/add.svg" alt="Add Icon" width={20} height={20} />
  );

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 gap-y-8">
      <Button
        title="Create Task"
        icon={AddIcon}
        link={CLIENT_ENDPOINTS.CREATE}
      />
      {fetchingTasks ? (
        <div>Fetching your tasks...</div>
      ) : (
        <TasksList tasks={tasks} />
      )}
    </div>
  );
}
