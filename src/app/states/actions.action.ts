import { createAction, props } from '@ngrx/store';
import { TodoEdit } from '../interfaces/TodoInterface';

export const addAction = createAction(
  '[TodoEdit] Add Action',
  props<{ action: TodoEdit }>()
);

export const loadActions = createAction(
  '[TodoEdit] Load Actions',
  props<{ actions: TodoEdit[] }>()
);
