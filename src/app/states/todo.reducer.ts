import { createReducer, on, Action } from '@ngrx/store';
import { initialTodoState, todoState } from '../interfaces/TodoInterface';
import { addTodo, loadTodo, updateTodo } from './todo.action';

const _todoReducer = createReducer(
  initialTodoState,
  on(addTodo, (state, { todo }) => ({
    ...state,
    todos: [todo, ...state.todos],
  })),
  on(updateTodo, (state, { edit }) => {
    const idx = state.todos.findIndex((el) => el._id === edit.id);
    if (idx === -1) {
      return state;
    }

    const tds = [...state.todos];

    switch (edit.action) {
      case 'Update Priority':
        tds[idx] = { ...tds[idx], priority: edit.newValue };
        break;
      case 'Update Status':
        tds[idx] = { ...tds[idx], status: edit.newValue };
        break;
      case 'Update Content':
        tds[idx] = { ...tds[idx], content: edit.newValue };
        break;
      case 'Update Title':
        tds[idx] = { ...tds[idx], title: edit.newValue };
        break;
      case 'Update Due Date':
        tds[idx] = { ...tds[idx], dueDate: edit.newValue };
        break;
    }

    return {
      ...state,
      todos: tds,
    };
  }),
  on(loadTodo, (state, { todos }) => {
    return {
      ...state,
      todos: [...todos],
    };
  })
);

export function todoReducer(state: todoState | undefined, action: Action) {
  return _todoReducer(state, action);
}
