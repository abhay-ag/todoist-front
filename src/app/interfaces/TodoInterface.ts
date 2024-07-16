export interface Todo {
  _id: string;
  title: string;
  content: string;
  priority: any | 'P-0' | 'P-1' | 'P-2' | 'P-3' | 'P-4';
  status: any | 'Completed' | 'In Progress' | 'Todo';
  dueDate: string;
  createdAt: string;
}

export interface TodoEdit {
  action:
    | 'Update Priority'
    | 'Update Status'
    | 'Update Content'
    | 'Creation'
    | 'Update Title'
    | 'Update Due Date';
  oldValue: string;
  newValue: string;
  id: string;
}

export interface todoState {
  todos: Todo[];
}

export const initialTodoState: todoState = {
  todos: [],
};

export enum SortCriteria {
  DUE_DATE_ASC = 'ddasc',
  DUE_DATE_DSC = 'dddsc',
  PRIORITY_ASC = 'stasc',
  PRIORITY_DSC = 'stdsc',
}
