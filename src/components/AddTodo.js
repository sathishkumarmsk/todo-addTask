import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    addTodo({
      title,
      description,
      completed: false,
    });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      <button>Add Task</button>
    </form>
  );
};

export default AddTodo;
