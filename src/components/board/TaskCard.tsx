import { Task } from '@/types';
import { GripVertical } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task) => void;
}

const TaskCard = ({ task, onDragStart }: TaskCardProps) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className="bg-card rounded-md p-3 shadow-sm border border-border cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group"
    >
      <div className="flex items-start gap-2">
        <GripVertical 
          size={16} 
          className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0" 
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-card-foreground truncate">
            {task.title}
          </h4>
          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          <span className="inline-block mt-2 px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
            {task.taskId}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
