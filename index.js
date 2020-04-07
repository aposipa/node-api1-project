const express = require('express');

const server = express();

let users = [
    {
        id: 1,
        name: "Frodo",
        bio: "Hobbit."
    },
    {
        id: 2,
        name: "Samwise",
        bio: "Hobbit 2."
    },
    {
        id: 3,
        name: "Gandalf",
        bio: "Wizard."
    }

];

//middleware
server.use(express.json());

//endpoints

//GET
server.get('/', (req, res) => {
    res.json({ api: 'running.....'});
})

server.get('/api/users', (req, res) => {
    res.json(users);
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    const user = users.find(user => user.id == id);

    if(user){
        res.json(user);
    } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist."});
    }
});

//POST
server.post("/api/users", (req, res) => {
const userInfo = req.body;

    if (userInfo.name == null || userInfo.bio == null) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
    } else {
        users.push(userInfo);
        res.status(201).json(users);
    }

})

//DELETE

server.delete("/api/users/:id", (req, res) => {
    let id = req.params.id;
    const deleteUser = users.find((user) => user.id == id);
    if (deleteUser) {
        res.status(200).json(deleteUser);
        users = users.filter(user => user !== deleteUser);
    } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist."})
    }
})


const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`))




