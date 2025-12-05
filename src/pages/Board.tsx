import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Task, ColumnType } from '@/types';
import Sidebar from '@/components/layout/Sidebar';
import BoardColumn from '@/components/board/BoardColumn';
import AddTaskModal from '@/components/board/AddTaskModal';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

const columns = [
  { id: 'todo' as ColumnType, title: 'To Do' },
  { id: 'inProgress' as ColumnType, title: 'In Progress' },
  { id: 'needReview' as ColumnType, title: 'Need Review' },
  { id: 'completed' as ColumnType, title: 'Completed' },
];

const initialTasks: Task[] = [
  { id: '1', taskId: 'VET-001', title: 'Layout usability test', description: '', column: 'todo' },
  { id: '2', taskId: 'VET-002', title: 'SWIFT UI exploration', description: '', column: 'todo' },
  { id: '3', taskId: 'VET-003', title: 'Mobile specs - Priority', description: '', column: 'todo' },
  { id: '4', taskId: 'VET-004', title: 'Workflow spec - editing transition', description: '', column: 'inProgress' },
  { id: '5', taskId: 'VET-005', title: 'Cards spec - show more carousel', description: '', column: 'inProgress' },
  { id: '6', taskId: 'VET-006', title: 'Item 3: Update an assignee', description: '', column: 'inProgress' },
  { id: '7', taskId: 'VET-007', title: 'Terminology testing - issues', description: '', column: 'needReview' },
  { id: '8', taskId: 'VET-008', title: 'Project settings - navigation text', description: '', column: 'needReview' },
  { id: '9', taskId: 'VET-009', title: 'Technology testing - issues New', description: '', column: 'completed' },
  { id: '10', taskId: 'VET-010', title: 'Project settings - navigation text New', description: '', column: 'completed' },
];

const Board = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useLocalStorage<Task[]>('jira_tasks', initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<ColumnType | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, columnId: ColumnType) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.column === columnId) return;

    const updatedTasks = tasks.map((task) =>
      task.id === draggedTask.id ? { ...task, column: columnId } : task
    );
    setTasks(updatedTasks);
    setDraggedTask(null);
    toast.success(`Task moved to ${columns.find((c) => c.id === columnId)?.title}`);
  };

  const handleAddTask = (column: ColumnType) => {
    setSelectedColumn(column);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setSelectedColumn(null);
    setIsModalOpen(true);
  };

  const handleCreateTask = (taskData: { taskId: string; title: string; description: string; column: ColumnType }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
    };
    setTasks([...tasks, newTask]);
    toast.success('Task created successfully!');
  };

  const getTasksByColumn = (columnId: ColumnType) => {
    return tasks.filter((task) => task.column === columnId);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar onAddTask={handleOpenModal} />
      
      <main className="flex-1 p-6 overflow-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="text-primary" size={24} />
            Jira board (Vetty)
            <Sparkles className="text-primary" size={24} />
          </h1>
        </header>
        
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <BoardColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={getTasksByColumn(column.id)}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
      </main>
      
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleCreateTask}
        selectedColumn={selectedColumn}
      />
    </div>
  );
};

export default Board;
