const Project = require("../models/project.model")

const getProjects = async (req, res) => {
    const uid = req.headers['authorization'];
    console.log('uid :>> ', uid);
    try {
        const projects = await Project.find({ uid })
        console.log('projects :>> ', projects);
        res.status(200).json(projects)
    } catch (error) {
        console.error(error)
        res.send(500).send(error.message)
    }
}

const getProject = async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findById(id)
        res.status(200).json(project)

    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
}


const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body)
        res.status(200).json(project)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
}


const updateProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};


const deleteProject = async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findByIdAndDelete(id)
        if (!project) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.status(200).json({ message: "Product deleted succesfully" })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
}


const addTodoToProject = async (req, res) => {
    try {
        const { projectId } = req.params; // Get the project ID from the request params
        const { description, status } = req.body; // Get the Todo details from the request body

        // Find the project by ID and push the new Todo into the todos array
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            {
                $push: {
                    todos: { description, status }
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const updateTodoInProject = async (req, res) => {
    try {
        const { projectId, todoId } = req.params;
        const { description, status } = req.body;

        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectId, "todos._id": todoId },
            {
                $set: {
                    "todos.$.description": description,
                    "todos.$.status": status
                }
            },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project or Todo not found" });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


const deleteTodoInProject = async (req, res) => {
    try {
        const { projectId, todoId } = req.params;

        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectId },
            {
                $pull: {
                    todos: { _id: todoId }
                }
            },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({
            message: "Todo deleted successfully",
            project: updatedProject
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject, addTodoToProject, updateTodoInProject, deleteTodoInProject }