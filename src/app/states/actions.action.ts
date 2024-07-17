import { createAction, props } from '@ngrx/store';
import { TodoEdit } from '../interfaces/TodoInterface';

export const loadActions = createAction(
  '[TodoEdit] Load Actions',
  props<{ actions: TodoEdit[] }>()
);
