import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'

const ToDoListForm = ({ addTask }) => {
    const [userInput, setUserInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit clicked!");
        await addTask(userInput);
        setUserInput('');
    }
    const handleClick = (e) => {
        e.preventDefault();
        setUserInput(e.currentTarget.value);
        console.log("userInput: " + userInput);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField id="standard-basic" value={userInput} fullWidth label="Enter Task..." onChange={handleClick} variant="standard" />
                {/* <input type="text" value={userInput} onChange={handleClick} placeholder="Enter Task..."></input> */}
                <Button onClick={handleSubmit}>Submit!</Button>
            </form>
        </div>
    )
};

export default ToDoListForm;