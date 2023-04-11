const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sathish:msk@msk.sxiew.mongodb.net/todo-app-graphql?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database');
});

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', (req, res) => {
  Todo.find((err, todos) => {
    if (err) return console.error(err);
    res.send(todos);
  });
});

app.post('/api/todos', (req, res) => {
  const todo = new Todo(req.body);
  todo.save((err, todo) => {
    if (err) return console.error(err);
    res.send(todo);
  });
});

app.put('/api/todos/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, todo) => {
    if (err) return console.error(err);
    res.send(todo);
  });
});

app.delete('/api/todos/:id', (req, res) => {
  Todo.findByIdAndDelete(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    res.send(todo);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
