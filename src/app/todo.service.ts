import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Todo, TodoEdit } from './interfaces/TodoInterface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _apiUrl = 'https://todoist-backend-7qgh.onrender.com/todo';
  constructor(private http: HttpClient, private _authService: AuthService) {}

  getTodosForUser() {
    return this.http.get(`${this._apiUrl}/user`, {
      headers: {
        Authorization: this._authService.getToken() as string,
      },
    });
  }

  addTodo(value: Todo) {
    return this.http.post(
      `${this._apiUrl}/new`,
      { ...value },
      {
        headers: {
          Authorization: this._authService.getToken() as string,
        },
      }
    );
  }

  updateTodo(id: string, editAction: TodoEdit) {
    return this.http.put(
      `${this._apiUrl}/update/${id}`,
      { ...editAction },
      {
        headers: {
          Authorization: this._authService.getToken() as string,
        },
      }
    );
  }

  getEdits(id: string) {
    return this.http.get(`${this._apiUrl}/updates/${id}`, {
      headers: {
        Authorization: this._authService.getToken() as string,
      },
    });
  }
}
