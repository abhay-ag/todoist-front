import { createFeatureSelector, createSelector, Selector } from '@ngrx/store';
import { Todo, todoState } from '../interfaces/TodoInterface';

export const selectTodoState = createFeatureSelector<todoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: todoState) => state.todos
);

export const filtereTodosByStatus = (status: Todo['status']): any =>
  createSelector(selectTodoState, (todos: todoState) => {
    return todos.todos.filter((el) => el.status === status);
  });
