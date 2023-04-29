import { useEffect, useState } from 'react';

import { ITask } from '@/types/task';

export default function useTasksCount(tasks: ITask[]) {
  const [totalTasks, setTotalTasks] = useState(0);
  const [activeTasks, setActiveTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    setTotalTasks(tasks.length);
    setActiveTasks(tasks.filter((task) => !task.isDone).length);
    setCompletedTasks(tasks.filter((task) => task.isDone).length);
  }, [tasks]);

  return {
    totalTasks,
    activeTasks,
    completedTasks
  };
}
