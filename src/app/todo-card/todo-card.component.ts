import { Component, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoEdit } from '../interfaces/TodoInterface';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  oldTodo: any;

  titleDisabled: boolean = true;
  contentDisabled: boolean = true;

  toggleDisabled() {
    this.titleDisabled = false;
  }

  blurred() {
    this.titleDisabled = true;
    this.contentDisabled = true;
  }

  toggleContentEditing() {
    this.contentDisabled = false;
  }

  @Input() todo: any;

  constructor(private _todoService: TodoService) {}

  ngOnInit(): void {
    this.todo.dueDate = this.todo.dueDate.split('T')[0];

    this.deepCopyTodo();
  }

  deepCopyTodo() {
    this.oldTodo = JSON.parse(JSON.stringify(this.todo));
  }

  setTitle(e: any) {
    this.todo.title = e.target.innerText;
    this.titleDisabled = true;
    this.onChange('Update Title');
  }

  setContent(e: any) {
    this.todo.content = e.target.innerText;
    this.contentDisabled = true;
    this.onChange('Update Content');
  }

  onChange(action: TodoEdit['action']): any {
    switch (action) {
      case 'Update Priority':
        this._todoService
          .updateTodo(this.todo._id, {
            action: action,
            newValue: this.todo.priority,
            oldValue: this.oldTodo.priority,
          })
          .subscribe((e) => {
            console.log(e);
          });
        return;
      case 'Update Status':
        return;
      case 'Update Content':
        return;
      case 'Update Title':
        return;
      case 'Update Due Date':
        return;
    }
  }
}
