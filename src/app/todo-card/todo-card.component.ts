import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoEdit } from '../interfaces/TodoInterface';
import { Store } from '@ngrx/store';
import { loadTodo, updateTodo } from '../states/todo.action';
import { Observable } from 'rxjs';
import { loadActions } from '../states/actions.action';
import { selectAllActions } from '../states/actions.selectors';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @ViewChild('title') titleEl: ElementRef;
  @ViewChild('content') contentEl: ElementRef;
  oldTodo: any;

  todoHistory$: Observable<any[]>;

  titleDisabled: boolean = false;
  contentDisabled: boolean = false;

  blurred() {
    this.titleEl.nativeElement.innerText = this.oldTodo.title;
    this.contentEl.nativeElement.innerText = this.oldTodo.content;
  }

  @Input() todo: any;

  viewingHistory: boolean = false;

  setVisible() {
    this.viewingHistory = !this.viewingHistory;
    if (this.viewingHistory) {
      this._todoService.getEdits(this.todo._id).subscribe((e: any) => {
        this.store.dispatch(loadActions({ actions: e.actions.actions }));
      });
    }
  }

  constructor(private _todoService: TodoService, private store: Store) {
    this.todoHistory$ = this.store.select(selectAllActions);
  }

  ngOnInit(): void {
    this.todo = {
      ...this.todo,
      dueDate: this.todo.dueDate.split('T')[0],
    };

    this.deepCopyTodo();
  }

  deepCopyTodo() {
    this.oldTodo = JSON.parse(JSON.stringify(this.todo));
  }

  setTitle(e: any) {
    e.preventDefault();
    if (e.target.innerText !== this.todo.title) {
      this.todo = { ...this.todo, title: e.target.innerText };
      this.onChange('Update Title');
    }
  }

  setContent(e: any) {
    e.preventDefault();
    if (e.target.innerText !== this.todo.content) {
      this.todo = { ...this.todo, content: e.target.innerText };
      this.onChange('Update Content');
    }
  }

  onChange(action: TodoEdit['action']): any {
    switch (action) {
      case 'Update Priority':
        this._todoService
          .updateTodo(this.todo._id, {
            id: this.todo._id,
            action: action,
            newValue: this.todo.priority,
            oldValue: this.oldTodo.priority,
          })
          .subscribe((e) => {
            this.store.dispatch(
              updateTodo({
                edit: {
                  id: this.todo._id,
                  action: action,
                  newValue: this.todo.priority,
                  oldValue: this.oldTodo.priority,
                },
              })
            );
          });
        return;
      case 'Update Status':
        this._todoService
          .updateTodo(this.todo._id, {
            id: this.todo._id,
            action: action,
            newValue: this.todo.status,
            oldValue: this.oldTodo.status,
          })
          .subscribe((e) => {
            this.store.dispatch(
              updateTodo({
                edit: {
                  id: this.todo._id,
                  action: action,
                  newValue: this.todo.status,
                  oldValue: this.oldTodo.status,
                },
              })
            );
          });
        return;
      case 'Update Content':
        this._todoService
          .updateTodo(this.todo._id, {
            id: this.todo._id,
            action: action,
            newValue: this.todo.content,
            oldValue: this.oldTodo.content,
          })
          .subscribe((e) => {
            this.store.dispatch(
              updateTodo({
                edit: {
                  id: this.todo._id,
                  action: action,
                  newValue: this.todo.content,
                  oldValue: this.oldTodo.content,
                },
              })
            );
          });
        return;
      case 'Update Title':
        this._todoService
          .updateTodo(this.todo._id, {
            id: this.todo._id,
            action: action,
            newValue: this.todo.title,
            oldValue: this.oldTodo.title,
          })
          .subscribe((e) => {
            this.store.dispatch(
              updateTodo({
                edit: {
                  id: this.todo._id,
                  action: action,
                  newValue: this.todo.title,
                  oldValue: this.oldTodo.title,
                },
              })
            );
          });
        return;
      case 'Update Due Date':
        this._todoService
          .updateTodo(this.todo._id, {
            id: this.todo._id,
            action: action,
            newValue: this.todo.dueDate,
            oldValue: this.oldTodo.dueDate,
          })
          .subscribe((e) => {
            this.store.dispatch(
              updateTodo({
                edit: {
                  id: this.todo._id,
                  action: action,
                  newValue: this.todo.dueDate,
                  oldValue: this.oldTodo.dueDate,
                },
              })
            );
          });
        return;
    }
  }

  // circle classes booleans

  get p0(): boolean {
    return this.todo.priority === 'P-0';
  }
  get p1(): boolean {
    return this.todo.priority === 'P-1';
  }
  get p2(): boolean {
    return this.todo.priority === 'P-2';
  }
  get p3(): boolean {
    return this.todo.priority === 'P-3';
  }
  get p4(): boolean {
    return this.todo.priority === 'P-4';
  }
  get imp(): boolean {
    return this.todo.status === 'In Progress';
  }
  get comp(): boolean {
    return this.todo.status === 'Completed';
  }
  get td(): boolean {
    return this.todo.status === 'Todo';
  }
}
