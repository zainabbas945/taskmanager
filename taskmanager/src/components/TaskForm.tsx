import React, { useState, useEffect } from 'react';
import { TaskFormData, Task } from '../types/task';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  initialData?: Task;
  submitLabel?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  initialData, 
  submitLabel = 'Create Task' 
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({
    title: false,
    dueDate: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        dueDate: initialData.dueDate.split('T')[0],
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      title: !formData.title.trim(),
      dueDate: !formData.dueDate
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
            ${errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
          placeholder="Task title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">Title is required</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Describe your task..."
        />
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
            ${errors.dueDate ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-600">Due date is required</p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;