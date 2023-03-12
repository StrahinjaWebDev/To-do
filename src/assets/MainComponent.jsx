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
  const [employees, setEmployees] = useState([]);
  const [employeesName, setEmployeesName] = useState("");
  const [employeesEmail, setEmployeesEmail] = useState("");
  const [employeesPhoneNumber, setEmployeesPhoneNumber] = useState("");
  const [employeesDateOfBirth, setEmployeesDateOfBirth] = useState("");
  const [employeesMontlySalary, setEmployeesMontlySalary] = useState("");
  const [isEmployeesUploading, setIsEmployeesUploading] = useState(false);
  const [topEmployees, setTopEmployees] = useState([]);
  const TASKS_COLLECTION_REF = collection(db, "tasks");
  const EMPLOYEES_COLLECTION_REF = collection(db, "employees");

  const deleteEmployee = async (id) => {
    await deleteDoc(doc(db, "employees", id));
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const handleTaskUpdate = async (id) => {
    const completedRef = doc(db, "tasks", id);
    await updateDoc(completedRef, {
      completed: true,
    });
    setIsCompleted(!isCompleted);
  };

  useEffect(() => {
    if (isEmployeesUploading) {
      const handleNewEmployeeUpload = async () => {
        const collectionEmployeeRef = collection(db, "employees");
        const payloadEmployee = {
          name: employeesName,
          email: employeesEmail,
          phone_number: employeesPhoneNumber,
          date_of_birth: employeesDateOfBirth,
          montly_salary: employeesMontlySalary,
        };
        await addDoc(collectionEmployeeRef, payloadEmployee);
        if (
          (isEmployeesUploading === true && employeesName,
          employeesEmail,
          employeesPhoneNumber,
          employeesDateOfBirth,
          employeesMontlySalary !== "")
        ) {
          setIsEmployeesUploading(false);
        }
      };
      const newEmployee = {
        name: employeesName,
        email: employeesEmail,
        phone_number: employeesPhoneNumber,
        date_of_birth: employeesDateOfBirth,
        montly_salary: employeesMontlySalary,
      };

      if (
        (employeesName,
        employeesEmail,
        employeesPhoneNumber,
        employeesPhoneNumber,
        employeesDateOfBirth,
        employeesMontlySalary !== "")
      ) {
        handleNewEmployeeUpload();
        setEmployees([...employees, newEmployee]);
      }
    }
  }, [isEmployeesUploading]);

  useEffect(() => {
    const getEmployees = async () => {
      const data = await getDocs(EMPLOYEES_COLLECTION_REF);
      setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getEmployees();
  }, []);

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
      <div className="flex flex-row justify-start items-start h-[5em] w-[80em]">
        <div className="flex flex-col gap-3">
          <div className="flex justify-start  items-start gap-3">
            <p>Employees:</p>
            <input
              type="text"
              id="name"
              placeholder="name"
              value={employeesName}
              onChange={(e) => setEmployeesName(e.target.value)}
            />
            <input
              type="email"
              id="email"
              placeholder="email"
              value={employeesEmail}
              onChange={(e) => setEmployeesEmail(e.target.value)}
            />
            <input
              type="number"
              id="phoneNumber"
              placeholder="phone number"
              value={employeesPhoneNumber}
              onChange={(e) => setEmployeesPhoneNumber(e.target.value)}
            />
            <input
              type="date"
              id="date"
              placeholder="date of birth"
              value={employeesDateOfBirth}
              onChange={(e) => setEmployeesDateOfBirth(e.target.value)}
            />
            <input
              type="number"
              id="salary"
              placeholder="salary"
              value={employeesMontlySalary}
              onChange={(e) => setEmployeesMontlySalary(e.target.value)}
            />

            <button onClick={() => setIsEmployeesUploading(true)}>send</button>
          </div>
          <div className="flex justify-start  items-start gap-10">
            <p>Tasks:</p>
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
      </div>
     
      {tasks.map((task) => (
        <div key={task.id} className="flex flex-row gap-5 ">
          <p>{task.title}</p>
          <p>{task.description}</p>
          <p>{task.due_date}</p>
          <button onClick={() => deleteTask(task.id)}>Delete Task</button>
          <button onClick={() => handleTaskUpdate(task.id)}>Update</button>
          <p>Assigned To:</p>
          {employees.map((employees) => (
            <div className="flex flex-row gap-8">
          <p>{employees.name}</p>
          <p>{employees.email}</p>
          <p>{employees.phone_number}</p>
          <p>{employees.date_of_birth}</p>
          <p>{employees.montly_salary}</p>
          <button onClick={() => deleteEmployee(employees.id)}>
            Delete Employee
          </button>
          </div>
            )  )
          }</div>
      ))}
    </div>
  );
}

export default MainComponent;
