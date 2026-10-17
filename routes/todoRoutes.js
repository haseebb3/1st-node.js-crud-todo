const express = require("express");
const {
    getTodos,
    getTodoById,
    createTodo,
    deleteTodo,
    updateTodo
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);

module.exports = router;
