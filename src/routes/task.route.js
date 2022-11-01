import express from "express";
import Task from "../models/task.model.js";
import Person from "../models/person.model.js";

export const taskRouter = express.Router();

// get all
taskRouter.get("/tasks", async (req, res) => {
  const tasks = await Task.find().select({
    _id: 1,
    title: 1,
    done: 1,
    user_email: 1,
    user_id: 1,
    date: 1,
  });
  res.json(tasks);
});
// get one
taskRouter.get("/task/:id", async (req, res) => {
  const task = await Task.findById({ _id: req.params.id }).select({
    _id: 1,
    title: 1,
    done: 1,
    user_email: 1,
    user_id: 1,
    date: 1,
  });
  res.json(task);
});
// post
taskRouter.post("/task", async (req, res) => {
  const { title, done, user_email } = req.body;
  let user = await Person.findOne({ email: user_email }).select({ _id: 1 });
  user = user._id.toString();
  if (!user) {
    res.status(409).send("User email does not exist");
    return;
  }
  const newTask = new Task({ title, done, user_email, user_id: user });
  await newTask.save();
  res.status(200).send("task registered succesfully");
});
// put
taskRouter.put("/task/:id", async (req, res) => {
  const { title, done, user_email, user_id } = req.body;
  await Task.updateOne(
    { _id: req.params.id },
    { $set: { title, done, user_email, user_id } }
  );
  res.status(200).send("Task updated succesfully");
});
// delete
taskRouter.delete("/task/:id", async (req, res) => {
  await Task.deleteOne({ _id: req.params.id });
  res.status(200).send("Task deleted succesfully");
});
