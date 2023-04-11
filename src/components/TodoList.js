import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import FilterTodos from './FilterTodos';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('/api/todos')
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const addTodo = todo => {
    axios.post('/api/todos', todo)
      .then(res => {
        setTodos([...todos, res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const editTodo = (id, todo) => {
    axios.put(`/api/todos/${id}`, todo)
      .then(res => {
        const index = todos.findIndex(todo => todo._id === res.data._id);
        const newTodos = [...todos];
        newTodos[index] = res.data;
        setTodos(newTodos);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteTodo = id => {
    axios.delete(`/api/todos/${id}`)
      .then(res => {
        const newTodos = todos.filter(todo => todo._id !== res.data._id);
        setTodos(newTodos);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const filterTodos = status => {
    setFilter(status);
  };

  const filteredTodos = filter === 'all' ? todos : todos.filter(todo => todo.completed === (filter === 'completed'));

  return (
    <div>
      <AddTodo addTodo={addTodo} />
      <FilterTodos filterTodos={filterTodos} />
      {filteredTodos.map(todo => (
        <TodoItem key={todo._id} todo={todo} editTodo={editTodo} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
};

export default TodoList;
