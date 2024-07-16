import { createFeatureSelector, createSelector, Selector } from '@ngrx/store';
import { SortCriteria, Todo, todoState } from '../interfaces/TodoInterface';

export const selectTodoState = createFeatureSelector<todoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: todoState) => state.todos
);

export const filtereTodosByStatus = (status: Todo['status']): any =>
  createSelector(selectTodoState, (todos: todoState) => {
    return todos.todos.filter((el) => el.status === status);
  });

export const sortTodos = (sort: SortCriteria): any =>
  createSelector(selectTodoState, (td: todoState): any => {
    const { todos } = td;
    switch (sort) {
      case SortCriteria.DUE_DATE_ASC:
        return [...todos].sort((a, b) => {
          const aDate = new Date(a.dueDate).getTime();
          const bDate = new Date(b.dueDate).getTime();

          return aDate - bDate;
        });
      case SortCriteria.DUE_DATE_DSC:
        return [...todos].sort((a, b) => {
          const aDate = new Date(a.dueDate).getTime();
          const bDate = new Date(b.dueDate).getTime();

          return bDate - aDate;
        });
      case SortCriteria.PRIORITY_ASC:
        return [...todos].sort((a, b) => {
          const priorityA = parseInt(a.priority.split('-')[1], 10);
          const priorityB = parseInt(b.priority.split('-')[1], 10);
          return priorityA - priorityB;
        });

      case SortCriteria.PRIORITY_DSC:
        return [...todos].sort((a, b) => {
          const priorityA = parseInt(a.priority.split('-')[1], 10);
          const priorityB = parseInt(b.priority.split('-')[1], 10);
          return priorityB - priorityA;
        });
    }
  });
