import type { Task } from "../types";
import { FaTrash } from 'react-icons/fa';

interface TaskCardProps {
  task: Task;
  isFocused: boolean;
  onClick: () => void;
  onDeleteClick: () => void;
}

const TaskCard = ({ task, isFocused, onClick, onDeleteClick }: TaskCardProps) => {
  return (
    <div 
      className="task-card-wrapper"
      onClick={(e) => {
        e.stopPropagation(); // Supaya klik tidak tembus ke background
        onClick();
      }}
      style={{
        position: 'relative',
        transform: isFocused ? 'scale(1.05)' : 'scale(1)', // Efek Membesar
        zIndex: isFocused ? 10 : 1, // Supaya muncul di paling atas saat membesar
        transition: 'transform 0.2s ease',
      }}
    >
    <div 
      style={{
        backgroundColor: task.color,
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        minHeight: '80px',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: '500',
        transition: 'transform 0.2s',
        border: isFocused ? '2px solid #0044FF' : 'none'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {task.title}
    </div>
    
    {isFocused && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Jangan trigger klik kartu
            onDeleteClick();
          }}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'red',
            color: 'white',
            border: '2px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            animation: 'popIn 0.2s ease'
          }}
        >
          <FaTrash size={12} />
        </button>
      )}
    </div>
  );
};

export default TaskCard;