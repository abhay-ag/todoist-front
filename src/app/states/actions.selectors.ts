import { createFeatureSelector, createSelector } from '@ngrx/store';
import { actionState } from '../interfaces/TodoInterface';

export const selectedActionState =
  createFeatureSelector<actionState>('actions');

export const selectAllActions = createSelector(
  selectedActionState,
  (state: actionState) => state.actions
);
