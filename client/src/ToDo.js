import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ButtonGroup from "@mui/material/ButtonGroup"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const ToDo = ({ todo, handleToggle, handleEdit, handleDelete }) => {
    const [open, setOpen] = React.useState(false);
    const [userInput, setUserInput] = React.useState(todo.task);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (e) => {
        console.log("clicked, e.currentTarget: ")
        console.log(e)
        e.preventDefault();
        handleToggle(e.currentTarget.id);


    }

    const handeEditInput = (e) => {
        e.preventDefault();
        setUserInput(e.currentTarget.value);
        console.log("userInput: " + userInput);
    }

    const handleDeleteClick = (e, id) => {
        console.log("handleDeleteClick clicked, id: ")
        console.log(id)
        e.preventDefault();
        handleDelete(id)
    }
    const handleEditClick = (e, userInput, id) => {
        e.preventDefault();
        console.log(userInput)
        handleEdit(userInput, id);
        setUserInput('');
        handleClose();
    }
    return (
        <ListItem divider secondaryAction={<ButtonGroup aria-label="primary button group">
            <IconButton color='secondary' onClick={handleClickOpen} aria-label="edit">
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id={todo.uuid}
                        defaultValue={todo.task}
                        fullWidth
                        onChange={handeEditInput}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleEditClick(e, userInput, todo.uuid)}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <IconButton onClick={(e) => handleDeleteClick(e, todo.uuid)} color='primary' aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </ButtonGroup>}>
            <FormGroup sx={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }} >
                <FormControlLabel value={todo.uuid} control={<Checkbox id={todo.uuid} checked={todo.complete} onChange={handleClick} />} label={todo.task} />
            </FormGroup>
        </ListItem>
    )
}

export default ToDo;