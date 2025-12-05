import { useState, useEffect } from 'react';
import { ColumnType } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: { taskId: string; title: string; description: string; column: ColumnType }) => void;
  selectedColumn: ColumnType | null;
}

const columnOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'inProgress', label: 'In Progress' },
  { value: 'needReview', label: 'Need Review' },
  { value: 'completed', label: 'Completed' },
];

const AddTaskModal = ({ isOpen, onClose, onAdd, selectedColumn }: AddTaskModalProps) => {
  const [taskId, setTaskId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [column, setColumn] = useState<ColumnType>(selectedColumn || 'todo');

  useEffect(() => {
    if (selectedColumn) {
      setColumn(selectedColumn);
    }
  }, [selectedColumn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId.trim() || !title.trim()) return;

    onAdd({
      taskId: taskId.trim(),
      title: title.trim(),
      description: description.trim(),
      column,
    });

    setTaskId('');
    setTitle('');
    setDescription('');
    setColumn('todo');
    onClose();
  };

  const handleClose = () => {
    setTaskId('');
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="taskId">Task ID</Label>
            <Input
              id="taskId"
              placeholder="e.g., TASK-001"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="column">Column</Label>
            <Select value={column} onValueChange={(val) => setColumn(val as ColumnType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                {columnOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
