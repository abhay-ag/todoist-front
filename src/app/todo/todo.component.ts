import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

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

  createTodoFormOpen: boolean = false;

  setFormOpen() {
    this.createTodoFormOpen = !this.createTodoFormOpen;
  }

  constructor(private _todoService: TodoService) {}

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
    this._todoService.addTodo(this.todoData).subscribe((e) => {
      console.log(e);
    });
  }

  fetchTodos() {
    this._todoService.getTodosForUser().subscribe(
      (e: any) => {
        console.log(e);
        this.todos = e.todos;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
