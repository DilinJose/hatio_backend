const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema(
    {
        description: { type: String, required: true },
        status: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true
    }
);


const ProjectSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true },
        title: { type: String, required: true },
        todos: { type: [TodoSchema], default: [] }
    },
    { timestamps: { "createdAt": true, "updatedAt": false } }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project