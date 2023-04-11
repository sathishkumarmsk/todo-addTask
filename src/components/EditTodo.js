import React, { useState } from 'react';

const EditTodo = ({ todo, handleSave, handleCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    handleSave({
      ...todo,
      title,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditTodo;
