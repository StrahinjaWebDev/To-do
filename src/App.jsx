import { useState, useEffect } from "react";
import { getDocs } from "@firebase/firestore";
import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  onSnapshot,
  addDoc,
} from "@firebase/firestore";
import { async } from "@firebase/util";



function App() {
  const tasksColectionRef = collection(db, "tasks");
  const [tasks, setTasks] = useState([]);

  

  useEffect(() => {
    const handleNew = async () => {
      const collectionRef = collection(db, "tasks");
      const payload = { tasks: "Tezak zadatak" };
      await addDoc(collectionRef, payload);
    };
    handleNew();
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksColectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
    };
    getTasks();
  }, []);

  return (
    <div>
      <form>
        <input
          type="text"
          id="name"
          placeholder="name"
          onChange={(e) => setTasks(e.target.value)}
        />

        <button>send</button>
      </form>
    </div>
  );
}

export default App;
