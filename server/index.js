const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/CrudOperationMern");
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});
app.get("/", async (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.get("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.put("/updateUser/:id", async (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.post("/createUser", async (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.listen(3001, () => {
  console.log("Server has started!");
});
