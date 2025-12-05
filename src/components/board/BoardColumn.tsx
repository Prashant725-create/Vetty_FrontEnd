import { useState } from 'react';
import { Task, ColumnType } from '@/types';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

interface BoardColumnProps {
  id: ColumnType;
  title: string;
  tasks: Task[];
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDrop: (e: React.DragEvent, columnId: ColumnType) => void;
  onAddTask: (columnId: ColumnType) => void;
}

const BoardColumn = ({ id, title, tasks, onDragStart, onDrop, onAddTask }: BoardColumnProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragOver(false);
    onDrop(e, id);
  };

  return (
    <div
      className={`flex-1 min-w-[280px] max-w-[320px] bg-column rounded-lg p-3 transition-colors ${
        isDragOver ? 'ring-2 ring-primary ring-inset bg-primary/5' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        <button
          onClick={() => onAddTask(id)}
          className="p-1 rounded hover:bg-muted transition-colors"
          title={`Add task to ${title}`}
        >
          <Plus size={18} className="text-muted-foreground" />
        </button>
      </div>
      
      <div className="space-y-2 min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;
