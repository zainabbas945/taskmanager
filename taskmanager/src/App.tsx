import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewTask from './pages/NewTask';
import TaskDetails from './pages/TaskDetails';
import CompletedTasks from './pages/CompletedTasks';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<NewTask />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </Layout>
      </Router>
    </TaskProvider>
  );
}

export default App;