const express = require("express")
const cors = require('cors');
const mongoose = require('mongoose');
const Project = require("./models/project.model.js")

//router
const ProjectRoute = require("./routes/project.route.js")

const app = express()

app.use(cors());

//middle ware for json files
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//route
app.use("/projects", ProjectRoute)

app.get("/", (req, res) => {
    res.send("hello world! iam dilin")
})
app.get('/project/:uid', async (req, res) => {
    const { uid } = req.params
    try {
        const projects = await Project.find({ uid })
        res.status(200).json(projects)
    } catch (error) {
        console.error(error)
        res.send(500).send(error.message)
    }
});

mongoose.connect("mongodb+srv://dilinjose:dilin@cluster0.kxrev.mongodb.net/project_crud?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("connnected to database")
    })
    .catch((error) => {
        console.error("connection failed", error)
    })

app.listen(5000, () => {
    console.log("listening on port 5000");
})