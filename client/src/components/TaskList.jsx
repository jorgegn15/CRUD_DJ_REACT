import React from "react";
import { useEffect, useState } from "react";
import { getAllTask } from "../api/TaskList.api";
import {TaskCard} from "../components/TaskCard"

export function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTask() {
      const res = await getAllTask();
      setTasks(res.data);
    }
    loadTask();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task}/>
      ))}
    </div>
  );
}
