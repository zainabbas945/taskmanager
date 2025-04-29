import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import { TaskFormData } from '../types/task';

const NewTask: React.FC = () => {
  const { addTask } = useTaskContext();
  const navigate = useNavigate();
  
  const handleSubmit = (data: TaskFormData) => {
    addTask(data);
    navigate('/');
  };
  
  return (
    <div className="pb-16 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
        <p className="text-sm text-gray-500 mt-1">
          Add details for your new task
        </p>
      </div>
      
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewTask;