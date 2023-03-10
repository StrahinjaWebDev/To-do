import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "@firebase/firestore";

function MainComponent() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAssigne, setTaskAssigne] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [isTaskUploading, setIsTaskUploading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const TASKS_COLLECTION_REF = collection(db, "tasks");

  const handleTaskUpdate = async (id) => {
    const completedRef = doc(db, "tasks", id);
    await updateDoc(completedRef, {
      completed: true,
    });
    setIsCompleted(!isCompleted);
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  useEffect(() => {
    if (isTaskUploading) {
      const handleNewTaskUpload = async () => {
        const collectionRef = collection(db, "tasks");
        const payload = {
          title: taskName,
          description: taskDescription,
          assigne: taskAssigne,
          due_date: taskDueDate,
        };
        await addDoc(collectionRef, payload);
        if (
          (isTaskUploading === true && taskName,
          taskDescription,
          taskAssigne,
          taskDueDate !== "")
        ) {
          setIsTaskUploading(false);
        }
      };
      const newTask = {
        title: taskName,
        description: taskDescription,
        assigne: taskAssigne,
        due_date: taskDueDate,
        completed: false,
      };

      if ((taskName, taskDescription, taskAssigne, taskDueDate !== "")) {
        handleNewTaskUpload();
        setTasks([...tasks, newTask]);
      }
    }
  }, [isTaskUploading]);

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(TASKS_COLLECTION_REF);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTasks();
  }, []);
  return (
    <div>
      <div className="flex flex-row  h-[10em] w-[10em]">
        <div className="p-5">
          <input
            type="text"
            id="title"
            placeholder="title"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            id="description"
            placeholder="description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <input
            type="text"
            id="assigne"
            placeholder="assigne"
            value={taskAssigne}
            onChange={(e) => setTaskAssigne(e.target.value)}
          />
          <input
            type="date"
            id="dueDate"
            placeholder="Due Date"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
          />
          <button onClick={() => setIsTaskUploading(true)}>send</button>
        </div>
      </div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-col items-center justify-between w-[20em] gap-2 border-[1px] border-black"
        >
          <p className="min-w-5">{task.title}</p>
          <p>{task.description}</p>
          <div className="flex items-center gap-3">
            <button onClick={() => deleteTask(task.id)}>Delete Task</button>
            <input type="checkbox" onChange={() => handleTaskUpdate(task.id)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainComponent;
