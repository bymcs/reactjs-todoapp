import React, { useState,useEffect} from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Footer from "./components/Footer";

import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

import './index.css'


// Firebase yapılandırması (config .env dosyasında saklanıyor)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_ID
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Firestore'deki verileri dinle
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const taskList = snapshot.docs.map((doc) => {
        return { id: doc.id, text: doc.data().text };
      });
      setTasks(taskList);
    });
    return () => unsubscribe();
  }, []);

  // Görevi Firestore'e ekleyen fonksiyon
  const addTask = async (e) => {
    e.preventDefault(e);
    if (task === '') {
      alert('Lütfen geçerli bir yapılacak görev girin');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: task
    });
    setTask('');
  };

  // Görevi silmek
  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "todos", taskId));
  };  

  return (
    <>
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 rounded-md p-4 w-full max-w-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
        <form onSubmit={addTask} className="flex items-center mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-grow mr-2 border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none"
            placeholder="Yapılacak görevi girin"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Ekle
          </button>
        </form>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white rounded-md shadow-md flex items-center justify-between py-2 px-4 mb-2"
            >
              <p className="flex-grow">{task.text}</p>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer/>
    </>
  );

}

export default App
