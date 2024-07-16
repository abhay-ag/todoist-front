import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/TodoInterface';
import { Store } from '@ngrx/store';
import { addTodo, loadTodo } from '../states/todo.action';
import { selectAllTodos } from '../states/todo.selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  todoData: any = {
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'P-4',
    status: 'Todo',
  };

  todos$: Observable<Todo[]>;

  createTodoFormOpen: boolean = false;

  setFormOpen() {
    this.createTodoFormOpen = !this.createTodoFormOpen;
  }

  constructor(private _todoService: TodoService, private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
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
