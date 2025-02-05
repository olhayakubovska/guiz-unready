// const express = require("express");
// const mongoose = require("mongoose");
// // const Question = require("./model/Question");
// const getQuestions = require("./controller");
// const app = express();
// const port = 3000;

// app.set("view engine", "ejs");

// // Указываем папку, где будут храниться ваши шаблоны
// app.set("views", "views");
// app.use(express.json()); // Обработка тела запроса в формате JSON
// app.use(express.static("public"));

// app.get("/", async (req, res) => {
//   const questions = await getQuestions();
//   console.log(questions, "questions");
//   res.render("index", {
//     title: "hello world",
//     questions: questions,
//   });
// });

// mongoose
//   .connect(
//     "mongodb+srv://oyakubovska:qwerty123@cluster0.abt5c.mongodb.net/questions?retryWrites=true&w=majority&appName=Cluster0"
//   )
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Сервер запущен на http://localhost:${port}`);
//     });
//   });

import express from "express";
import mongoose from "mongoose";
import { addQuestion, getAnswers, getQuestions } from "./controller.js"; // Импортируем функцию через ES Modules

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  // const questions = await getQuestions();
  // console.log(questions, "questions");
  res.render("index", {
    title: "hello world",
    // questions: questions,
  });
});
app.get("/api/questions", getQuestions);

app.get("/answers", getAnswers);

app.post("/answers", async (req, res) => {
  // console.log(req.body, "reqBody");
  // console.log("fetchPost")
  await addQuestion(req.body);
});

mongoose
  .connect(
    "mongodb+srv://oyakubovska:qwerty123@cluster0.abt5c.mongodb.net/questions?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Сервер запущен на http://localhost:${port}`);
    });
  });
