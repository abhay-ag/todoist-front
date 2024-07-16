import { createFeatureSelector, createSelector } from '@ngrx/store';
import { todoState } from '../interfaces/TodoInterface';

export const selectTodoState = createFeatureSelector<todoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: todoState) => state.todos
);
