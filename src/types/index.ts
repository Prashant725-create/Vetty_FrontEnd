export interface Task {
  id: string;
  taskId: string;
  title: string;
  description: string;
  column: ColumnType;
}

export type ColumnType = 'todo' | 'inProgress' | 'needReview' | 'completed';

export interface Column {
  id: ColumnType;
  title: string;
  tasks: Task[];
}

export interface User {
  email: string;
  name: string;
}
