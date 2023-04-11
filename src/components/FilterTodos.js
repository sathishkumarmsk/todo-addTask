import React from 'react';

const FilterTodos = ({ filterTodos }) => {
  const handleChange = e => {
    filterTodos(e.target.checked ? e.target.value : '');
  };

  return (
    <div>
      <label>
        <input type="checkbox" value="completed" onChange={handleChange} />
        Completed
      </label>
      <label>
        <input type="checkbox" value="incomplete" onChange={handleChange} />
        Incomplete
      </label>
    </div>
  );
};

export default FilterTodos;

