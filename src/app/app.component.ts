
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoService } from './todo.service';
import { ErrorService } from './error.service';
import { Todo } from './model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AndyTodoAngular';

  todo$: Observable<any>;
  todos = [];
  @ViewChild('desc', {static: false}) desc: ElementRef;
  loading = true;

  constructor(
    private todoService: TodoService,
    public errorService: ErrorService) {

  }

  ngOnInit() {
    this.errorService.errorMessage = undefined;
    this.todoService.getAllTodos().subscribe(res => {
      this.todos = res;
      this.loading = false;
    },
    error => {
      this.errorService.errorMessage = error.message ? error.message : 'error in retrieving todo';
      this.loading = false;
    });

  }

  onEnterTodo(desc: string) {
    this.loading = true;
    this.todoService.createTodo(desc).subscribe(res => {
      this.todos.push(res);
      this.desc.nativeElement.value = '';
      this.loading = false;
    },
    error => {
      this.errorService.errorMessage = error.message ? error.message : 'error in creating todo';
      this.loading = false;
    });
  }

  onDeleteTodo(todo: Todo) {
    this.loading = true;
    this.todoService.deleteTodo(todo.id).subscribe(res => {
      const index = this.todos.indexOf(todo);
      if (index > -1) {
        this.todos.splice(index, 1);
      }
      this.loading = false;
    }, error => {
      this.errorService.errorMessage = error.message ? error.message : 'error in deleting todo';
      this.loading = false;
    });
  }

  onUpdateTodo(todo: Todo) {
    this.loading = true;
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo).subscribe(res => {
      console.log('todo is updated', todo);
      this.loading = false;
    },
    error => {
      this.errorService.errorMessage = error.message ? error.message : 'error in creating todo';
      this.loading = false;
    });
  }
}
