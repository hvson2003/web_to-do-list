import { TodoEntity } from 'src/todo/entity/todo.entity';
import { TodoDto } from 'src/todo/dto/todo.dto';

export const toTodoDto = (data: TodoEntity): TodoDto => {
  const { id, name, description } = data;

  const todoDto: TodoDto = { id, name, description };
  return todoDto;
};
