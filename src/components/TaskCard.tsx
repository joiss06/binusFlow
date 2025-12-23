import type { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  return (
    <div 
      onClick={onClick}
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
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {task.title}
    </div>
  );
};

export default TaskCard;