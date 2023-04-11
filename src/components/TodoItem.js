import React, { useState } from 'react';
import EditTodo from './EditTodo';

const TodoItem = ({ todo, editTodo, deleteTodo }) => {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = todo => {
    editTodo(todo._id, todo);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo._id);
  };

  return (
    <div>
      {editing ? (
        <EditTodo todo={todo} handleSave={handleSave} handleCancel={handleCancel} />
      ) : (
        <div>
          <input type="checkbox" checked={todo.completed} />
          <span>{todo.title}</span>
          <span>{todo.description}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem
