import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Trash, Edit, CheckCircle, Circle } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import { TaskFormData } from '../types/task';
import { formatDate } from '../utils/dateUtils';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask, toggleTaskStatus } = useTaskContext();
  
  const [isEditing, setIsEditing] = useState(false);
  
  const task = getTaskById(id || '');
  
  if (!task) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900">Task not found</h2>
        <p className="mt-2 text-gray-500">The task you're looking for doesn't exist or has been deleted.</p>
        <Link 
          to="/"
          className="mt-4 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }
  
  const handleUpdate = (data: TaskFormData) => {
    updateTask({
      ...task,
      ...data,
    });
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      navigate('/');
    }
  };
  
  return (
    <div className="pb-16 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to All Tasks
        </Link>
      </div>
      
      {isEditing ? (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
          </div>
          <TaskForm 
            initialData={task} 
            onSubmit={handleUpdate} 
            submitLabel="Save Changes"
          />
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h1 className={`text-xl font-bold ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                {task.title}
              </h1>
              
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className="ml-2 text-gray-400 hover:text-blue-500 focus:outline-none transition-colors duration-200"
                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {task.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6" />
                )}
              </button>
            </div>
            
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Due: {formatDate(task.dueDate)}</span>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700">Description</h3>
              <div className="mt-2 text-gray-600 whitespace-pre-line">
                {task.description || <span className="text-gray-400 italic">No description provided</span>}
              </div>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash className="h-4 w-4 mr-2 text-red-500" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;