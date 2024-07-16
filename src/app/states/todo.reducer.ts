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
    let idx = -1;
    state.todos.map((el, i) => {
      if (el._id === edit.id) {
        idx = i;
        return;
      }
    });

    const tds = [...state.todos];

    switch (edit.action) {
      case 'Update Priority':
        tds[idx].priority = edit.newValue;
        break;
      case 'Update Status':
        tds[idx].status = edit.newValue;
        break;
      case 'Update Content':
        tds[idx].content = edit.newValue;
        break;
      case 'Update Title':
        tds[idx].title = edit.newValue;
        break;
      case 'Update Due Date':
        tds[idx].dueDate = edit.newValue;
        break;
    }

    return {
      ...state,
      todos: [...tds],
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
