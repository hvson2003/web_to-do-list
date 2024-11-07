import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { v4 as uuidv4 } from 'uuid';
import { TodoEntity } from './entity/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { toPromise } from 'src/shared/utils';
import { toTodoDto } from 'src/shared/mapper';
import { TodoCreateDto } from './dto/todo.create';

@Injectable()
export class TodoService {
  todos: TodoEntity[] = todos;

  async getAllTodo(): Promise<TodoDto[]> {
    return toPromise(this.todos.map(toTodoDto));
  }

  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = this.todos.find((todo) => todo.id == id);

    if (!todo) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPromise(toTodoDto(todo));
  }

  async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    const todo: TodoEntity = {
      id: uuidv4(),
      name,
      description,
    };

    this.todos.push(todo);
    return toPromise(toTodoDto(todo));
  }

  async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      throw new HttpException(
        `Todo item with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedTodo = { ...this.todos[index], ...todoDto };
    this.todos[index] = updatedTodo;

    return Promise.resolve(toTodoDto(updatedTodo));
  }

  // Phương thức xóa Todo
  async destroyTodo(id: string): Promise<TodoDto> {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      throw new HttpException(
        `Todo item with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const deletedTodo = this.todos.splice(index, 1)[0];
    return Promise.resolve(toTodoDto(deletedTodo));
  }
}
