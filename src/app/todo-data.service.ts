import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoDataService {
  lastId: number = 0;
  todos: Todo[] = [];

  constructor() { }

  // Simulate POST for Todos
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // Simulate DELETE for Todos (/todos/:id)
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  // Simulate PUT for Todos (/todos/:id)
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET for todos (/todos)
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // Simulate GET for Todos (/todos/:id)
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle the Todo's 'complete' status
  toggleTodoComplete(todo: Todo) {
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }
}
