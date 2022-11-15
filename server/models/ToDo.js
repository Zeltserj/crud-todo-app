const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        required: true,
        default: false,
    },
    created : { type : Date, default: Date.now }

});

const todo = mongoose.model("ToDo", ToDoSchema)
module.exports = todo;
