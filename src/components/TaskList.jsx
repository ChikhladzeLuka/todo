import React, { useState, useEffect } from 'react';

const TaskList = () => {
    // Load tasks from localStorage or set default tasks
    const [task, setTask] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [
            { id: 1, description: "task1", completed: false },
            { id: 2, description: "task2", completed: false }
        ];
    });

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // Save tasks to localStorage whenever the task list changes
        localStorage.setItem('tasks', JSON.stringify(task));
    }, [task]);

    const inputChange = (event) => {
        setInputValue(event.target.value);
    };

    const addTask = (event) => {
        event.preventDefault();
        const newTask = {
            id: task.length + 1,
            description: inputValue,
            completed: false
        };
        setTask([...task, newTask]);
        setInputValue('');
    };

    const completeTask = (id) => {
        setTask(
            task.map(task => 
                task.id === id ? { ...task, completed: true } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTask(task.filter(task => task.id !== id));
    };

    return (
        <div className='wrapper'>
            <div className='content-box'>
                <form onSubmit={addTask}>
                    <input 
                        type="text" 
                        className='add-input' 
                        onChange={inputChange} 
                        value={inputValue} 
                    />
                    <button className='add-btn'>Add</button>
                </form>
                <div className="content">
                    <h1>Not Completed</h1>
                    {task.filter(task => !task.completed).map(task => (
                        <div className='box1' key={task.id}>
                            <h4 className='text'>{task.description}</h4>
                            <button onClick={() => completeTask(task.id)} className='btn'>Complete</button>
                            <button onClick={() => deleteTask(task.id)} className='btn'>Delete</button>
                        </div>
                    ))}
                    <h1>Completed</h1>
                    {task.filter(task => task.completed).map(task => (
                        <div className='box2' key={task.id}>
                            <h4 className='text'>{task.description}</h4>
                            <button onClick={() => deleteTask(task.id)} className='btn'>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
