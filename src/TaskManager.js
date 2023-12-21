import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const addTask = () => {
    if (taskName.trim() !== "" && taskDescription.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        complete: false
      };
      setTasks([...tasks, newTask]);
      setTaskName("");
      setTaskDescription("");
    }
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, complete: !task.complete };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className='bg-teal-500 min-h-screen '>
      <div className='container mx-auto px-4 py-2'>
        <h1 className='text-4xl font-bold mb-8 text-center text-white'>TASK MANAGER</h1>
        <div className='flex flex-col items-center mb-8'>
          <input
            type="text"
            className='border border-gray-200 px-4 py-2 mb-4 w-80 rounded'
            placeholder='Add Task'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <input
            type="text"
            className='border border-gray-200 px-4 py-2 mb-4 w-80 rounded'
            placeholder='Enter Description'
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />

          <button
            className='bg-blue-600 text-white rounded hover:bg-teal-800 font-bold py-2 px-8 focus:outline-none focus:rind-2 focus:ring-blue-400'
            onClick={addTask}
            disabled={taskName.trim() === "" || taskDescription.trim() === ""}
          >
            Submit
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className='text-center text-white'> No Current tasks </p>
      ) : (
        <ul className='flex flex-col items-center'>
          {tasks.map((task) => (
            <li key={task.id} className='flex items-center bg-white mb-4 rounded shadow p-4 w-80'>
              <input
                type='checkbox'
                className='mr-4'
                checked={task.complete}
                onChange={() => toggleTask(task.id)}
              />
              <div className={`${task.complete ? "line-through" : ""}`}>
                <strong className='text-lg'>{task.name}</strong>:{""}
                {task.description}
              </div>
              <button
                className='bg-red-500 hover:bg-red-500 text-white font-bold py-1 px-2 rounded ml-auto'
                onClick={() => deleteTask(task.id)}
              >
                Delete Task
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskManager;
