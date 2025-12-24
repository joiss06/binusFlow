import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaBolt, FaRunning, FaCheck } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import Modal from './Modal';
import './KanbanBoard.css';
import type { Task } from '../types';

interface KanbanBoardProps {
  availableColors: { id: string; value: string }[];
}

const KanbanBoard = ({ availableColors }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('binusFlowTasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
  const [focusedTaskId, setFocusedTaskId] = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('To Do');
  
  const [color, setColor] = useState(availableColors[0]?.value || '#FF8C42');

  useEffect(() => {
    localStorage.setItem('binusFlowTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (availableColors.length > 0) {
      setColor(availableColors[0].value);
    }
  }, [availableColors]);

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => {
      const matchesStatus = task.status === status;
      const matchesSearch = 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('To Do');
    setColor(availableColors[0]?.value || '#FF8C42');
  };

  const handleSaveTask = () => {
    if (title === "") {
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

  const confirmDeleteTask = (task: Task) => {
    setTaskToDelete(task);
  };

  const executeDeleteTask = () => {
    if (taskToDelete) {
      const updatedTasks = tasks.filter(t => t.id !== taskToDelete.id);
      setTasks(updatedTasks);
      
      setTaskToDelete(null); 
      setFocusedTaskId(null);
      setSelectedTask(null);
    }
  };

  const handleDeleteAll = () => {
    setTasks([]);
    setIsDeleteAllOpen(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const newStatus = destination.droppableId as Task['status'];
    const updatedTasks = tasks.map(t => {
      if (t.id === draggableId) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const handleCardClick = (task: Task) => {
    if (focusedTaskId === task.id) {
      setSelectedTask(task);
      setFocusedTaskId(null);
    } else {
      setFocusedTaskId(task.id);
    }
  };

  const handleBackgroundClick = () => {
    if (focusedTaskId) setFocusedTaskId(null);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-container" onClick={handleBackgroundClick}>
        <div className="toolbar">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-bar" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="icon-btn btn-add" onClick={() => { resetForm(); setIsCreateOpen(true); }}>
            <FaPlus />
          </button>
          <button className="icon-btn btn-delete" onClick={() => setIsDeleteAllOpen(true)}>
            <FaTrash />
          </button>
        </div>

        <div className="board-grid">
          {['To Do', 'In Progress', 'Done'].map((colStatus) => (
            <Droppable key={colStatus} droppableId={colStatus}>
              {(provided) => (
                <div 
                  className="board-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="column-header">
                    {colStatus === 'To Do' && <FaBolt color="#FFAA00" />}
                    {colStatus === 'In Progress' && <FaRunning color="#FF4444" />}
                    {colStatus === 'Done' && <FaCheck color="#00AA00" />}
                    <span>{colStatus}</span>
                  </div>

                  <div className="task-list">
                    {getTasksByStatus(colStatus).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style, marginBottom: '15px' }}
                          >
                            <TaskCard task={task} isFocused={focusedTaskId === task.id} onClick={() => handleCardClick(task)} onDeleteClick={() => confirmDeleteTask(task)} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>

        <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Task">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title..." style={inputStyle} />
            </div>
            <div>
              <label>Description</label>
              <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description..." style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as any)} style={inputStyle}>
                  <option>To Do</option><option>In Progress</option><option>Done</option>
                </select>
              </div>
              
              <div style={{ flex: 1 }}>
                <label>Color</label>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {availableColors.map((opt) => (
                    <div key={opt.id} onClick={() => setColor(opt.value)}
                      style={{
                        width: '30px', height: '30px', backgroundColor: opt.value, borderRadius: '50%', cursor: 'pointer',
                        border: color === opt.value ? '3px solid white' : 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                      }} 
                      title={opt.value}
                    />
                  ))}
                  {availableColors.length === 0 && <span style={{fontSize: '0.8rem', color: '#888'}}>No colors in config</span>}
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
              <div><label>Title</label><input type="text" value={selectedTask.title} readOnly style={readOnlyStyle} /></div>
              <div><label>Description</label><textarea rows={3} value={selectedTask.description} readOnly style={readOnlyStyle} /></div>
              <div><label>Status: </label><span style={{fontWeight: 'bold', color: '#FFF8E7'}}>{selectedTask.status}</span></div>
              <div className="modal-footer">
                <button className="btn btn-secondary" style={{ backgroundColor: '#FF0000' }} onClick={() => confirmDeleteTask(selectedTask)}>Delete Task</button>
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

        <Modal 
          isOpen={!!taskToDelete} 
          onClose={() => setTaskToDelete(null)} 
          title="Delete Task"
        >
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <h3 style={{color: 'white', marginBottom: '15px'}}>
              Are you sure you want to delete this task?
            </h3>
            
            <div style={{
              backgroundColor: '#FFF8E7',
              color: 'black',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              {taskToDelete?.title}
            </div>

            <div className="modal-footer" style={{justifyContent: 'center'}}>
               <button className="btn btn-primary" onClick={() => setTaskToDelete(null)}>Cancel</button>
               <button className="btn btn-secondary" onClick={executeDeleteTask}>Delete</button>
            </div>
          </div>
        </Modal>

      </div>
    </DragDropContext>
  );
};

const inputStyle = { width: '100%', padding: '10px', borderRadius: '5px', border: 'none', color: 'black' };
const readOnlyStyle = { ...inputStyle, backgroundColor: '#e0e0e0', color: '#555' };

export default KanbanBoard;