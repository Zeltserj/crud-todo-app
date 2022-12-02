const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const ToDoModel = require('./models/ToDo');
const port = 3001
app.use(express.json())
app.use(cors());
mongoose.connect('mongodb+srv://AlexLevy:AlexLevyTMS@cluster0.rure9cv.mongodb.net/todo?retryWrites=true&w=majority',{
  useNewUrlParser: true,
})

let filter = false; //default value

app.post('/insert', async (req,res) => {
  const toDoTask = req.body.task;
  const ToDo = new ToDoModel({task:toDoTask, uuid:req.body.uuid, complete:req.body.complete});
  try{
    await ToDo.save();
    res.send('inserted data')
  }catch(err){
    console.log(err)
  }

})


app.post('/filter', async(req, res) => {
  filter = req.body.filter
}
)

app.put('/toggle', async (req, res)=>{
  const updatedId = req.body.uuid;
  console.log(req.body.complete)
  try{
    await ToDoModel.findOneAndUpdate({uuid:updatedId}, {complete: req.body.complete}, {new:true});
    res.send("update task")
  }catch(err){
    console.log(err)
  }
})

app.post('/edit', async (req, res) => {
  const updateId = req.body.uuid;
  try{
    await ToDoModel.findOneAndUpdate({uuid: updateId}, { task:req.body.task});
    res.send("updated task " + updateId);
  }catch(err){
    console.log(err);
  }
  
})

app.get('/read', async (req, res) => {
  ToDoModel.find({}, (err,result) => {
    if(err){
      res.send(err)
    }
    console.log(req)
    let copy = [...result]
    if (filter){
      res.send(copy.filter((todo) => !todo.complete))
    } else{
    res.send(result)
    }
  })
})

app.put('/delete', async (req, res) => {
  try{
      await ToDoModel.findOneAndDelete({uuid: req.body.uuid});
      res.send("deleted task: " + req.body.uuid)
    }catch(err){
      console.log(err)
    }
  }
)
app.get('/', (req, res) => {
  res.send(`<h1>API Works!!!</h1>`)
});


app.listen(port, () => {
  console.log(`Server running on ${port}`)
})