import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';

const CompletedTasks: React.FC = () => {
  const { tasks, toggleTaskStatus } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  const completedTasks = tasks.filter(task => task.completed);
  
  const filteredTasks = completedTasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Completed Tasks</h1>
        <p className="text-sm text-gray-500 mt-1">
          View all your completed tasks
        </p>
      </div>
      
      <div className="relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Search completed tasks..."
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
          message={searchTerm ? "No matching completed tasks" : "No completed tasks yet"} 
          subMessage={searchTerm 
            ? "Try adjusting your search terms" 
            : "Tasks will appear here once you mark them as completed"
          }
        />
      )}
    </div>
  );
};

export default CompletedTasks;