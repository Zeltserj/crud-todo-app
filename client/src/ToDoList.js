import React from "react";
import ToDo from  "./ToDo.js"
import {v4 as uuidv4} from 'uuid';
import List from "@mui/material/List"
const ToDoList = ({toDoList, handleToggle, handleEdit, handleDelete, showCompleted}) => {
    if (showCompleted){
        return (
            <List>
                {toDoList.map((todo) => {
                    return <ToDo key={uuidv4()} todo={todo} handleEdit={handleEdit} handleDelete={handleDelete} handleToggle={handleToggle}/> 
                    })
                }
            </List>
        )
    } else {
       return( 
        <List>
                {toDoList.filter(todo => !todo.complete).map((todo) => {
                    return <ToDo key={uuidv4()} todo={todo} handleDelete={handleDelete} handleEdit={handleEdit} handleToggle={handleToggle}/> 
                    })
                }
        </List>
        )
    }

}

export default ToDoList;