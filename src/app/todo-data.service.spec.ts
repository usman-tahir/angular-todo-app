import { TestBed, inject } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });

  it('should be created', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTodos', () => {
    it('should return an empty array by default', inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#saveTodo', () => {
    it('should automatically assign an incrementing id', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));
  });

  describe('#deleteTodoById(id)', () => {
    it('should remove a todo with the corresponding id', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not remove anything if a todo with the corresponding id is not found', inject([TodoDataService], (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#updateTodoById(id, values)', () => {
    it('should return a todo with the corresponding id, and updated values', inject([TodoDataService], (service: TodoDataService) => {
      let todo = new Todo({title: 'Hello', complete: false});
      service.addTodo(todo);
      let updatedTodo = service.updateTodoById(1, {
        title: 'Updated'
      });
      expect(updatedTodo.title).toEqual('Updated');
    }));

    it('should return null if the todo with the corresponding id is not found', inject([TodoDataService], (service: TodoDataService) => {
      let todo = new Todo({title: 'Hello', complete: false});
      service.addTodo(todo);
      let updatedTodo = service.updateTodoById(2, {
        title: 'Updated'
      });
      expect(updatedTodo).toEqual(null);
    }));
  });

  describe('#toggleTodoComplete(todo)', () => {
    it('should return the updated todo, with an inverse completion status', inject([TodoDataService], (service: TodoDataService) => {
      let todo = new Todo({title: 'Hello', complete: false});
      service.addTodo(todo);
      let updatedTodo = service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toEqual(true);
      service.toggleTodoComplete(updatedTodo);
      expect(updatedTodo.complete).toEqual(false);
    }));
  });
});
