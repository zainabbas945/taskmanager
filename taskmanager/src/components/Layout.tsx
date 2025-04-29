import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ListTodo, Plus, CheckSquare, Home } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
            <ListTodo className="h-6 w-6" />
            <span>Task Manager</span>
          </h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      
      <nav className="bg-white shadow-md py-3 border-t border-gray-200 fixed bottom-0 w-full z-10">
        <div className="container mx-auto flex justify-around items-center">
          <Link 
            to="/" 
            className={`flex flex-col items-center px-3 py-2 rounded-lg ${isActive('/')}`}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link 
            to="/new" 
            className={`flex flex-col items-center px-3 py-2 rounded-lg ${isActive('/new')}`}
          >
            <Plus size={20} />
            <span className="text-xs mt-1">New Task</span>
          </Link>
          
          <Link 
            to="/completed" 
            className={`flex flex-col items-center px-3 py-2 rounded-lg ${isActive('/completed')}`}
          >
            <CheckSquare size={20} />
            <span className="text-xs mt-1">Completed</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;