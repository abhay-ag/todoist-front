import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/TodoInterface';
import { Store } from '@ngrx/store';
import { addTodo, loadTodo } from '../states/todo.action';
import {
  filtereTodosByStatus,
  selectAllTodos,
  sortTodos,
} from '../states/todo.selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todoData: any = {
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'P-4',
    status: 'Todo',
  };

  todos$: Observable<Todo[]>;
  filterVal: string = '--';
  sortVal: any = '--';

  createTodoFormOpen: boolean = false;

  setFormOpen() {
    this.createTodoFormOpen = !this.createTodoFormOpen;
  }

  constructor(private _todoService: TodoService, private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
  }

  filterTodos(value: any) {
    const val = value.target.value;
    this.filterVal = val;
    if (val !== '--') {
      this.todos$ = this.store.select(filtereTodosByStatus(value.target.value));
    } else {
      this.todos$ = this.store.select(selectAllTodos);
    }
  }

  sortTodos(value: any) {
    const val = value.target.value;
    this.sortVal = val;
    if (val !== '--') this.todos$ = this.store.select(sortTodos(val));
    else {
      this.todos$ = this.store.select(selectAllTodos);
    }
  }

  clearfilters() {
    this.filterVal = '--';
    this.sortVal = '--';
    this.todos$ = this.store.select(selectAllTodos);
  }

  get showClearFilter(): boolean {
    return this.filterVal !== '--' || this.sortVal !== '--';
  }

  get buttonDisabled(): boolean {
    let flag = true;
    Object.keys(this.todoData).map((e) => {
      if (this.todoData[e] === '') {
        flag = false;
      }
    });
    return flag && Object.keys(this.todoData).length === 5;
  }

  ngOnInit(): void {
    this.fetchTodos();
  }

  createTodo() {
    this._todoService.addTodo(this.todoData).subscribe((e: any) => {
      this.store.dispatch(addTodo({ todo: e.todo }));
      this.setFormOpen();
    });
  }

  fetchTodos() {
    this._todoService.getTodosForUser().subscribe(
      (e: any) => {
        this.store.dispatch(loadTodo({ todos: e.todos }));
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
