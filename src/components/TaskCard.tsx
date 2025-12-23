import type { Task } from "../types";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div 
      style={{
        backgroundColor: task.color,
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'grab',
        minHeight: '80px',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: '500'
      }}
    >
      {task.title}
    </div>
  );
};

export default TaskCard;