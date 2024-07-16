import { createAction, props } from '@ngrx/store';
import { Todo, TodoEdit } from '../interfaces/TodoInterface';

export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());
export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ edit: TodoEdit }>()
);
export const loadTodo = createAction(
  '[Todo] Load Todos',
  props<{ todos: Todo[] }>()
);
