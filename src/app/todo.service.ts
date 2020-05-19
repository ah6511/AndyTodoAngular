
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';

import { ErrorService } from './error.service';
import { Todo } from './model';

export class TodoService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService) { }

  // baseAddress = 'http://localhost:7071';
  baseAddress = 'https://andy-todo-func-node.azurewebsites.net';        // Node Func app

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseAddress}/api/todo`)
      .pipe(
        shareReplay()
      );
  }

  createTodo(desc: string): Observable<Todo> {
    const body = {
      taskDescription: desc
    };

    return this.http.post<Todo>(
      `${this.baseAddress}/api/todo`,
      body
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const body = {
      isCompleted: todo.isCompleted
    };

    return this.http.put<Todo>(
      `${this.baseAddress}/api/todo/${todo.id}`,
      body
    );
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.baseAddress}/api/todo/${id}`);
  }

}
