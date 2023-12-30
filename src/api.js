import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState('');
  const [dataArray, setDataArray] = useState([]);
  const [filterType, setFilterType] = useState('all');

  const onChangeHandler = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };

  const onClickHandler = () => {
    setDataArray((prevValue) => [...prevValue, { text: data, completed: false }]);
    setData('');
  };

  const handleCheck = (index) => {
    const updatedList = dataArray.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setDataArray(updatedList);
  };

  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  const renderTasks = () => {
    switch (filterType) {
          case 'completed':
        return dataArray.filter((item) => item.completed);
        case 'uncompleted':
        return dataArray.filter((item) => !item.completed);
         default:
        return dataArray
    }
  };

  return (
    <div style={{width: '250px', height: '400px', backgroundColor: 'grey', padding:"50px", marginLeft:"450px", marginTop:"70px", borderRadius:"25%"}}>
    <div>
      <input style={{outline: "none", backgroundColor:"silver", borderBottom: "1px solid"}} placeholder="Todo" value={data} onChange={(e) => onChangeHandler(e)} />
      <button onClick={onClickHandler}>Add</button>

      <div>
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('completed')}>Completed</button>
        <button onClick={() => handleFilterChange('uncompleted')}>Uncompleted</button>
      </div>

      <ul>
        {renderTasks().map((item, index) => (
          <li
            key={index}
            style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheck(index)}
            />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default App;
