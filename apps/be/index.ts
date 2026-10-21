import express from "express";
import { prisma } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/create-user", async (req, res) => {
    try {
        const result = await prisma.user.create({
            data: {
                email: `${Math.random()}@gmail.com`,
                password: "123"
            }
        });

        res.json({
            message: "user created",
            data: { email: result.email }
        });
    } catch (e) {
        res.status(500).send(`Error creating a user: ${e}`);
    }
});

app.get("/users", async (req, res)=>{
    try{
        const users =  await prisma.user.findMany();
        if(users.length > 0){
            res.status(200).json({
                message : "Users found",
                users : users
            });
        }

        return res.json({
            message : "no users found",
        });
    }
    catch(e){
        res.json({

        });
    }
})

app.post("/create-todo", async (req, res) => {
    const { email, task } = req.body;
    try {
        const findUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!findUser) {
            return res.status(404).send("User doesn't exist");
        }

        const result = await prisma.todo.create({
            data: {
                task: task,
                userId: findUser.id
            }
        });

        res.json({
            message: "Todo created",
            data: { task: result.task }
        });
    } catch (e) {
        res.status(500).send(`Error creating a todo: ${e}`);
    }
});

app.put("/complete/:id", async (req, res) => {
    const todoId = req.params.id;
    try {
        const findTodo = await prisma.todo.findUnique({ where: { id: todoId } });
        if (!findTodo) {
            return res.status(404).send("Todo not found");
        }

        await prisma.todo.update({
            where: { id: todoId },
            data: { done: true }
        });

        res.send(`task marked as done ${todoId}`);
    } catch (e) {
        res.status(500).send(`Error completing the todo: ${e}`);
    }
});

app.put("/update-todo/:id", async (req, res) => {
    const todoId = req.params.id;
    const { task } = req.body;
    try {
        const findTodo = await prisma.todo.findUnique({
            where: { id: todoId }
        });
        if (!findTodo) {
            return res.status(404).send("Todo not found");
        }

        await prisma.todo.update({
            where: { id: todoId },
            data: { task: task }
        });

        res.json({
            message: "todo updated",
            task: task
        });
    } catch (e) {
        res.status(500).send(`Error updating the todo: ${e}`);
    }
});

app.delete("/delete-todo/:id", async (req, res) => {
    const todoId = req.params.id;
    try {
        const findTodo = await prisma.todo.findUnique({
            where: { id: todoId }
        });
        if (!findTodo) {
            return res.status(404).send("Todo not found");
        }

        await prisma.todo.delete({ where: { id: todoId } });
        res.send(`Todo deleted: ${todoId}`);
    } catch (e) {
        res.status(500).send(`Error deleting the todo: ${e}`);
    }
});

app.get("/", (req, res) => {
    res.send("default be route!");
});

app.listen(8080, () => {
    console.log("Running on 8080 port");
});