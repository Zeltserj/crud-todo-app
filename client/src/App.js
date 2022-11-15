import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header.js"
import { v4 as uuidv4 } from "uuid"
// import data from "./data.json"
import ToDoListForm from "./ToDoListForm.js"
import ToDoList from "./ToDoList.js"
import Axios from 'axios';
import Switch from '@mui/material/Switch';
import Container from '@mui/material/Container';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);


  const handleFilter = () => {
    setShowCompleted(!showCompleted);
    setTodoList(todoList)
    setLoaded(false);
  }
  const addTask = async (userInput) => {
    console.log("hit user task with: " + userInput);
    let newTask = { task: userInput, uuid: uuidv4(), complete: false };
    await Axios.post("http://localhost:3001/insert", newTask);
    setLoaded(false);
  }

  const editTask = async (userInput, id) => {
    console.log("hit user task with: " + userInput);
    let newTask = { task: userInput, uuid: id };
    let newLlist = todoList.map((todo) => {
      if (todo.uuid === id) {
        return { uuid: todo.uuid, complete: todo.complete, task: userInput }
      }
      return { ...todo };
    })
    setTodoList(newLlist);
    await Axios.post("http://localhost:3001/edit", newTask);
    setLoaded(false);
  }


  useEffect(() => {
    const getToDoList = async () => {
      await Axios.get("http://localhost:3001/read").then(response => { console.log(response.data); setTodoList(response.data) })
    }
    if (!loaded) {
      console.log("useEffect triggered");
      getToDoList();
      setLoaded(true);
    }
  }, [loaded]);

  const handleDelete = (id) => {
    console.log("handle delete: " + id)
    // let toDelete = todoList.find(todo => todo.uuid === String(id))
    Axios.put("http://localhost:3001/delete", { uuid: id });
    let todoListMapped = todoList.filter(todo => todo.uuid !== String(id))
    setTodoList(todoListMapped);
  };

  const handleToggle = (id) => {
    console.log("handle toggle with id: " + id)
    let todoListMapped = todoList.map(task => {
      if (task.uuid === String(id)) {
        Axios.put("http://localhost:3001/toggle", { uuid: id, task: task.task, complete: !task.complete }
        )
        return { ...task, complete: !task.complete }
      }
      else {
        return { ...task }
      }
    });
    setTodoList(todoListMapped);
  };



  return (
    <div className='App'>
      <Container maxWidth="sm">
        <Header className="header" />
        <ToDoList toDoList={todoList} handleDelete={handleDelete} showCompleted={showCompleted} handleToggle={handleToggle} handleEdit={editTask} />
        <ToDoListForm addTask={addTask} />
        <Switch className="form-check-input" type="checkbox" checked={showCompleted} onChange={handleFilter}></Switch>Show Completed
      </Container>
    </div>
  );
}

export default App;
