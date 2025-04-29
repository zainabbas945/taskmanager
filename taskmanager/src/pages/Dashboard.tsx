import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';

const Dashboard: React.FC = () => {
  const { tasks, toggleTaskStatus } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  const pendingTasks = tasks.filter(task => !task.completed);
  
  const filteredTasks = pendingTasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <Link 
          to="/new" 
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Task
        </Link>
      </div>
      
      <div className="relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredTasks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={() => toggleTaskStatus(task.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          message={searchTerm ? "No matching tasks found" : "No pending tasks"} 
          subMessage={searchTerm 
            ? "Try adjusting your search terms" 
            : "Add a new task to get started"
          }
          action={
            !searchTerm && (
              <Link 
                to="/new" 
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Task
              </Link>
            )
          }
        />
      )}
    </div>
  );
};

export default Dashboard;