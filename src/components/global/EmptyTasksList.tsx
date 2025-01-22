import Image from "next/image";
import React from "react";

export default function EmptyTasksList() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Image
        src="notepad.svg"
        alt="Empty Tasks List Icon"
        className="mb-2"
        width={40}
        height={40}
      />
      <div>You don't have any tasks registered yet</div>
      <div>Click on Create Task button above to add a new task</div>
    </div>
  );
}
