const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const FILE = __dirname + "/tasks.json";

app.use(cors());
app.use(express.json());

if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "[]");
}

app.get("/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  const newTask = { id: Date.now(), value: req.body.value, done: false };
  tasks.push(newTask);
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
  res.json(newTask);
});

app.patch("/tasks/:id/done", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = !task.done;
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
    res.json(task);
  } else {
    res.status(404).json({ error: "Task topilmadi" });
  }
});

app.put("/tasks/:id", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.value = req.body.value;
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
    res.json(task);
  } else {
    res.status(404).json({ error: "Task topilmadi" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  let tasks = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  const id = Number(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server http://localhost:${PORT} da ishlayapti`));
