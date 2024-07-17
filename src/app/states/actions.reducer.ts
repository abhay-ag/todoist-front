import { createReducer, on, Action } from '@ngrx/store';
import { actionState, initalActionState } from '../interfaces/TodoInterface';
import { loadActions } from './actions.action';

const _actionReducer = createReducer(
  initalActionState,
  on(loadActions, (state, { actions }) => ({
    ...state,
    actions: [...actions],
  }))
);

export function actionReducer(state: actionState | undefined, action: Action) {
  return _actionReducer(state, action);
}
