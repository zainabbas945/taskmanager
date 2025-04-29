import React from 'react';
import { ClipboardList } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  subMessage?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, subMessage, action }) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="flex justify-center">
        <ClipboardList className="h-16 w-16 text-gray-300" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{message}</h3>
      {subMessage && (
        <p className="mt-2 text-sm text-gray-500">{subMessage}</p>
      )}
      {action && (
        <div className="mt-6">{action}</div>
      )}
    </div>
  );
};

export default EmptyState;