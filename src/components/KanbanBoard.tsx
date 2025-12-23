import { useState } from 'react';
import { FaPlus, FaTrash, FaBolt, FaRunning, FaCheck } from 'react-icons/fa';
import TaskCard from './TaskCard';
import './KanbanBoard.css';
import type { Task } from '../types';

const initialTasks: Task[] = [
  { id: '1', title: 'Task 1...', description: 'Desc', status: 'To Do', color: '#CCFF33' },
  { id: '2', title: 'Task 2...', description: 'Desc', status: 'To Do', color: '#33FF57' },
  { id: '3', title: 'Task 3...', description: 'Desc', status: 'In Progress', color: '#FF33FF' },
  { id: '4', title: 'Task 4...', description: 'Desc', status: 'In Progress', color: '#FF3333' },
  { id: '5', title: 'Task 5...', description: 'Desc', status: 'Done', color: '#33FFFF' },
];

const KanbanBoard = () => {
  const [tasks] = useState<Task[]>(initialTasks);

  const getTasksByStatus = (status: string) => tasks.filter(task => task.status === status);

  return (
    <div className="kanban-container">
      <div className="toolbar">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-bar"
        />
        <button className="icon-btn btn-add"><FaPlus /></button>
        <button className="icon-btn btn-delete"><FaTrash /></button>
      </div>

      <div className="board-grid">
        <div className="board-column">
          <div className="column-header">
            <FaBolt color="#FFAA00" /> <span>To Do</span>
          </div>
          <div className="task-list">
            {getTasksByStatus('To Do').map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div className="board-column">
          <div className="column-header">
            <FaRunning color="#FF4444" /> <span>In Progress</span>
          </div>
          <div className="task-list">
            {getTasksByStatus('In Progress').map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div className="board-column">
          <div className="column-header">
            <FaCheck color="#00AA00" /> <span>Done</span>
          </div>
          <div className="task-list">
            {getTasksByStatus('Done').map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default KanbanBoard;