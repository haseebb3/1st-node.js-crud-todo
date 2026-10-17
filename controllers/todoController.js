let todos = [
    {
        id: "1",
        todoItem: "html",
        todoDetails: "html is a standard markup language used to create layouts...",
        createdAt: 1791999843796,
        updatedAt: null
    },
    {
        id: "2",
        todoItem: "ccsss",
        todoDetails: "css is a standard styling language used to create layouts...",
        createdAt: 1791999843000,
        updatedAt: null
    },
    {
        id: "3",
        todoItem: "js",
        todoDetails: "js is a programming language used to create layouts...",
        createdAt: 1791999843767,
        updatedAt: null
    }
];

const getTodos = (req, res) => {
    try {
        res.status(200).json({
            message: "successfully fetched todos...",
            ok: true,
            data: todos
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Errro while fetching todos",
            error: err.message
        });
    }
};

const getTodoById = (req, res) => {
    const todoId = req.params.id;

    try {
        const todo = todos.find((item) => String(item.id) === todoId);
        if (!todo) {
            return res.status(404).json({
                message: `Todo with id ${todoId} doesn't exist`,
                ok: false
            });
        }

        res.status(200).json({
            message: `Todo with id : ${todoId} is fetched successfully...`,
            ok: true,
            data: todo
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Errro while fetching todo",
            error: err.message
        });
    }
};

const createTodo = (req, res) => {
    try {
        const { todoItem, todoDetails, createdAt, updatedAt = null } = req.body;
        if (!todoItem || !todoDetails) {
            return res.status(400).json({
                message: "TodoItem and TodoDetails are required fields...",
                ok: false
            });
        }

        const newTodo = {
            id: Date.now(),
            todoItem,
            todoDetails,
            createdAt,
            updatedAt
        };

        todos.push(newTodo);
        res.status(201).json({
            message: `Todo with id ${newTodo.id} is created successfully...`,
            ok: true,
            data: newTodo
        });
    } catch (err) {
        res.status(500).json({
            message: "Error while adding new todo",
            ok: false,
            error: err.message
        });
    }
};

const deleteTodo = (req, res) => {
    const todoId = req.params.id;

    try {
        const todoIndex = todos.findIndex((item) => String(item.id) === todoId);
        if (todoIndex === -1) {
            return res.status(400).json({
                message: `Todo with id : ${todoId} doesn't exist...`,
                ok: false
            });
        }

        todos.splice(todoIndex, 1);
        res.status(200).json({
            message: `Todo with id ${todoId} is deleted successfully...`,
            ok: true
        });
    } catch (err) {
        res.status(500).json({
            message: `Error while deleting todo with id : ${todoId}`,
            ok: false,
            error: err.message
        });
    }
};

const updateTodo = (req, res) => {
    const todoId = req.params.id;

    try {
        const { todoItem, todoDetails, createdAt } = req.body;
        const todoIndex = todos.findIndex((item) => String(item.id) === todoId);
        if (todoIndex === -1) {
            return res.status(400).json({
                message: `Todo with id : ${todoId} doesn't exist...`,
                ok: false
            });
        }

        const updatedTodo = {
            ...todos[todoIndex],
            todoItem,
            todoDetails,
            createdAt
        };

        todos[todoIndex] = updatedTodo;
        res.status(200).json({
            message: `Todo with id ${updatedTodo.id} is updated successfully...`,
            ok: true,
            data: updatedTodo
        });
    } catch (err) {
        res.status(500).json({
            message: `Error while updating todo with id : ${todoId}`,
            ok: false,
            error: err.message
        });
    }
};

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    deleteTodo,
    updateTodo
};
