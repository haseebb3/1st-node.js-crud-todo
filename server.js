let todos = [
    {
        id: "1",
        todoItem: "html",
        todoDetails: "html is a standard markup language used to create layouts...",
        createdAt : 1791999843796,
        updatedAt : null
    },
    {
        id: "2",
        todoItem: "ccsss",
        todoDetails: "css is a standard styling language used to create layouts...",
        createdAt : 1791999843000,
        updatedAt : null
    },
    {
        id: "3", 
        todoItem: "js",
        todoDetails: "js is a programming language used to create layouts...",
        createdAt : 1791999843767,
        updatedAt : null
    },
]


const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



//routes
//all get
app.get("/api/todos",(req, res) => {
    try {
        res.status(200).json({
            message: "successfully fetched todos...",
            ok: true,
            data: todos
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Errro while fetching todos",
            error: err.message
        })
    }
})

//single get 
app.get("/api/todos/:id", (req, res) => {
    try{
        const todoId = req.params.id;
        const todo = todos.find(t => t.id === todoId);
        if(!todo){
           return res.status(404).json({
            message : `Todo with id ${todoId} doesn't exist`,
            ok : false
           })
        }
        res.status(200).json({
            message : `Todo with id : ${todoId} is fetched successfully...`,
            ok : true,
            data : todo
        })
    } catch(err){
        res.status(500).json({
            ok: false, 
            message: `Errro while fetching todo`,
            error: err.message
        })
    }
})


//create
app.post("/api/todos", (req, res) => {
    try{
        let {todoItem,todoDetails,createdAt,updatedAt = null} = req.body;
        if(!todoItem || !todoDetails){
            return res.status(400).json({
                message : `TodoItem and TodoDetails are required fields...`,
                ok : false
            })
        }

        const newTodoObj = {
            id : Date.now(),
            todoItem : todoItem,
            todoDetails : todoDetails,
            createdAt : createdAt,
            updatedAt : updatedAt
        }

        todos.push(newTodoObj); 
        res.status(201).json({
            message : `Todo with id ${newTodoObj.id} is created successfully...`,
            ok : true,
            data : newTodoObj
        })

    }catch(err){
        res.status(500).json({
            message : `Error while adding new todo`,
            ok : false,
            error : err.message
        })
    }
})


//delete
app.delete("/api/todos/:id", (req,res) => {
    try{
        let deleteId = req.params.id;
        let deleteIndex = todos.findIndex(t => t.id === deleteId);
        if(deleteIndex === -1){
             return res.status(400).json({
                message : `Todo with id : ${deleteId} doesn't exist...`,
                ok : false
            })
        }

        todos.splice(deleteIndex,1);
        res.status(200).json({
            message : `Todo with id ${deleteId} is deleted successfully...`,
            ok : true,
        })

    }catch(err){
        res.status(500).json({
            message : `Error while deleting todo with id : ${deleteId}`,
            ok : false,
            error : err.message
        })
    }
})


//update
app.patch("/api/todos/:id", (req,res) => {
    try{
        const updateId = req.params.id;
        const {todoItem,todoDetails,createdAt,updatedAt = null} = req.body;
        const existingObj = todos.find(t => t.id === updateId);
        let updateIndex = todos.findIndex(t => t.id === updateId);
        if(updateIndex === -1) {
            return res.status(400).json({
                message : `Todo with id : ${deleteId} doesn't exist...`,
                ok : false
            })
        }

        const updatedObj = {
            ...existingObj,
            todoItem : todoItem,
            todoDetails : todoDetails,
            createdAt : createdAt,
        }
        todos[updateIndex] = updatedObj;
         res.status(200).json({
            message : `Todo with id ${updatedObj.id} is updated successfully...`,
            ok : true,
            data : updatedObj
        })

    }catch(err){
         res.status(500).json({
            message : `Error while updating todo with id : ${updateId}`,
            ok : false,
            error : err.message
        })
    }
})
app.listen(3000, () => {
    console.log("app is listening on port 3000");
})