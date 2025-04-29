import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, Circle, Clock } from 'lucide-react';
import { Task } from '../types/task';
import { formatDate, isOverdue } from '../utils/dateUtils';

interface TaskCardProps {
  task: Task;
  onToggleStatus: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleStatus }) => {
  const overdueAndNotCompleted = isOverdue(task.dueDate) && !task.completed;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <Link to={`/task/${task.id}`}>
              <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                {task.title}
              </h3>
            </Link>
            
            <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
              {task.description}
            </p>
          </div>
          
          <button
            onClick={onToggleStatus}
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
        
        <div className="mt-3 flex items-center text-sm">
          <div className={`flex items-center ${
            overdueAndNotCompleted ? 'text-red-500' : 
            task.completed ? 'text-gray-400' : 'text-blue-500'
          }`}>
            {overdueAndNotCompleted ? <Clock size={16} /> : <Calendar size={16} />}
            <span className="ml-1">{formatDate(task.dueDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;