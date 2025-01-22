import AddEditTaskForm from "@/components/AddEditTaskForm";
import Button from "@/components/global/Button";
import Image from "next/image";
import React from "react";

export default function CreateTodo() {
  const LeftArrow = (
    <Image src="left-arrow.svg" alt="Left Arrow Icon" width={20} height={20} />
  );

  return (
    <div className="relative w-full flex flex-col items-center p-8">
      <div className="absolute left-8">
        <Button icon={LeftArrow} link="/" />
      </div>
      <h1 className="text-xl font-bold">Create a Task</h1>
      <div className="w-full max-w-4xl mt-8">
        <AddEditTaskForm />
      </div>
    </div>
  );
}
