import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaBolt, FaRunning, FaCheck } from 'react-icons/fa';
import TaskCard from './TaskCard';
import Modal from './Modal';
import './KanbanBoard.css';
import type { Task } from '../types';

const COLOR_OPTIONS = [
  { name: 'Red', value: '#FF5555' },
  { name: 'Blue', value: '#5555FF' },
  { name: 'Green', value: '#55FF55' },
  { name: 'Yellow', value: '#FFFF55' },
  { name: 'Purple', value: '#B155FF' },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('binusFlowTasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('To Do');
  const [color, setColor] = useState(COLOR_OPTIONS[0].value);

  useEffect(() => {
    localStorage.setItem('binusFlowTasks', JSON.stringify(tasks));
  }, [tasks]);

  const getTasksByStatus = (status: string) => tasks.filter(task => task.status === status);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('To Do');
    setColor(COLOR_OPTIONS[0].value);
  };

  const handleSaveTask = () => {
    if (!title.trim()) {
      alert("Judul tidak boleh kosong!");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status,
      color
    };

    setTasks([...tasks, newTask]);
    
    setIsCreateOpen(false);
    resetForm();
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter(t => t.id !== id);
      setTasks(updatedTasks);
      setSelectedTask(null);
    }
  };

  const handleDeleteAll = () => {
    setTasks([]);
    setIsDeleteAllOpen(false);
  };

  return (
    <div className="kanban-container">
      <div className="toolbar">
        <input type="text" placeholder="Search..." className="search-bar"/>
        <button className="icon-btn btn-add" onClick={() => {resetForm(); setIsCreateOpen(true)}}><FaPlus /></button>
        <button className="icon-btn btn-delete" onClick={() => setIsDeleteAllOpen(true)}><FaTrash /></button>
      </div>

      <div className="board-grid">
        {['To Do', 'In Progress', 'Done'].map((colStatus) => (
        <div key={colStatus} className="board-column">
          <div className="column-header">
              {colStatus === 'To Do' && <FaBolt color="#FFAA00" />}
              {colStatus === 'In Progress' && <FaRunning color="#FF4444" />}
              {colStatus === 'Done' && <FaCheck color="#00AA00" />}
              <span>{colStatus}</span>
          </div>
          <div className="task-list">
            {getTasksByStatus(colStatus).map(task => (<TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)}/>))}
          </div>
        </div>
        ))}
      </div>

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Task">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title..." style={inputStyle}/>
          </div>

          <div>
            <label>Description</label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description..." style={inputStyle}/>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as any)} style={inputStyle}>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label>Color</label>
              <div style={{ display: 'flex', gap: '5px' }}>
                {COLOR_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => setColor(opt.value)}
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: opt.value,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: color === opt.value ? '3px solid white' : 'none',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}/>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setIsCreateOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSaveTask}>Save</button>
          </div>

        </div>
      </Modal>

      <Modal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} title="View Task Details">
        {selectedTask && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label>Title</label>
              <input type="text" value={selectedTask.title} readOnly style={readOnlyStyle} />
            </div>
            <div>
              <label>Description</label>
              <textarea rows={3} value={selectedTask.description} readOnly style={readOnlyStyle} />
            </div>
            <div>
               <label>Status: </label>
               <span style={{fontWeight: 'bold', color: '#FFF8E7'}}>{selectedTask.status}</span>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary" style={{ backgroundColor: '#FF0000' }}onClick={() => handleDeleteTask(selectedTask.id)}>Delete Task</button>
              <button className="btn btn-primary" onClick={() => setSelectedTask(null)}>Close</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isDeleteAllOpen} onClose={() => setIsDeleteAllOpen(false)} title="Delete All Tasks">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3 style={{color: '#FF5555'}}>Are you sure?</h3>
          <p>This will delete ALL tasks permanently.</p>
          <div className="modal-footer" style={{justifyContent: 'center', marginTop: '20px'}}>
             <button className="btn btn-primary" onClick={() => setIsDeleteAllOpen(false)}>Cancel</button>
             <button className="btn btn-secondary" onClick={handleDeleteAll}>Yes, Delete All</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '10px', borderRadius: '5px', border: 'none', color: 'black' };
const readOnlyStyle = { ...inputStyle, backgroundColor: '#e0e0e0', color: '#555' };

export default KanbanBoard;