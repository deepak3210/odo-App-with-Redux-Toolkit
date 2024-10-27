import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addTask, deleteTask, editTask} from '../store/todoSlice'
const Todo = () => {
    const [newTask, setNewTask] = useState('')
    const [editing, setEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null)
    const [editTaskValue, setEditTaskValue] = useState('')
    const tasks = useSelector((state) => state.todos.tasks);
    const dispatch = useDispatch();

    console.log(tasks)
    const handleNewTask = (e) => {
        e.preventDefault();
        if(newTask.trim()){
            dispatch(addTask(newTask));
            setNewTask('')
        }
    }
    const handleEditing = (index) => {
        setEditing(true)
        setEditIndex(index)
        setEditTaskValue(tasks[index])
    }
    const handleSaveEdit = (e) => {
        e.preventDefault();
        if (editTaskValue.trim()) {
          dispatch(editTask({ index: editIndex, updatedTask: editTaskValue }));
          setEditing(false);
          setEditIndex(null);
          setEditTaskValue('');
          setNewTask('')
        }
      };
    const handleCancelEdit = () => {
        setEditing(false);
        setEditIndex(null);
        setEditTaskValue('');
    }
    const handleRemove = (index) => {
        dispatch(deleteTask(index))
    }
    
    return (
        <div className="flex flex-col items-center max-w-md mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">ToDo App</h1>
            <form onSubmit={editing ? handleSaveEdit : handleNewTask} className="flex w-full gap-2 mb-4">
                <input 
                    placeholder={editing ? "Edit task" : "add new task"}
                    type="text" 
                    value={editing ? editTaskValue : newTask}
                    onChange={(e) => (editing ? setEditTaskValue(e.target.value) : setNewTask(e.target.value))}
                    className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600" >{editing ? 'Save' : 'Add'} </ button>
                {editing && (
                <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
                >
                    Cancel
                </button>
                )}
            </form>
            <ul className="w-full"> 
                {tasks.map((data, index) => {
                    return (
                    <li key={index} className="flex justify-between items-center p-2 mb-2 bg-gray-100 rounded shadow">
                      <span className="text-gray-700">{data}</span>
                      <button
                      onClick={() => handleEditing(index)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                      onClick={() => handleRemove(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >Delete</button>
                    </li>
                    )
                })}
            </ul>
        </div>
    );
}
export default Todo;