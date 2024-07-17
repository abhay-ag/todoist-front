import { createReducer, on, Action } from '@ngrx/store';
import { actionState, initalActionState } from '../interfaces/TodoInterface';
import { addAction, loadActions } from './actions.action';

const _actionReducer = createReducer(
  initalActionState,
  on(addAction, (state, { action }) => ({
    ...state,
    actions: [action, ...state.actions],
  })),
  on(loadActions, (state, { actions }) => ({
    ...state,
    actions: [...actions],
  }))
);

export function actionReducer(state: actionState | undefined, action: Action) {
  return _actionReducer(state, action);
}
