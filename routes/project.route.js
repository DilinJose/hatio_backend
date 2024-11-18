const express = require("express")
const router = express.Router()

const { getProjects, getProject, createProject, updateProject, deleteProject, addTodoToProject,updateTodoInProject, deleteTodoInProject } = require("../controllers/project.controller")

router.get("/", getProjects)
router.get("/:id", getProject)
router.post("/", createProject)
router.put("/:id", updateProject)
router.delete("/:id", deleteProject)

router.post("/:projectId/todos", addTodoToProject);
router.put("/:projectId/todos/:todoId", updateTodoInProject);
router.delete("/:projectId/todos/:todoId", deleteTodoInProject);

module.exports = router