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

const Employees = () => {
  const EMPLOYEES_COLLECTION_REF = collection(db, "employees");
  const [employees, setEmployees] = useState([]);
  const [employeesName, setEmployeesName] = useState("");
  const [employeesEmail, setEmployeesEmail] = useState("");
  const [employeesPhoneNumber, setEmployeesPhoneNumber] = useState("");
  const [employeesDateOfBirth, setEmployeesDateOfBirth] = useState("");
  const [employeesMontlySalary, setEmployeesMontlySalary] = useState("");
  const [isEmployeesUploading, setIsEmployeesUploading] = useState(false);

  const deleteEmployee = async (id) => {
    await deleteDoc(doc(db, "employees", id));
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

  return (
    <div>
      <div className="flex flex-row h-[10em] w-[10em] ">
        <div> 
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
      </div>
      {employees.map((employees) => (
        <div
          key={employees.id}
          className="flex flex-col items-center justify-between w-[20em] gap-2 border-[1px] border-black"
        >
          <p className="min-w-5 ">{employees.name}</p>
          <p>{employees.email}</p>
          <p>{employees.phone_number}</p>
          <p>{employees.date_of_birth}</p>
          <p>{employees.montly_salary}</p>
          <div className="flex items-center gap-3">
            <button onClick={() => deleteEmployee(employees.id)}>
              Delete Employee
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Employees;
