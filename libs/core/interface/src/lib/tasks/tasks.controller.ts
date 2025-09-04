import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from '@izi/core/application';
import { ApiOkResponse, ApiCreatedResponse, ApiTags, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TaskService) {}

  @ApiOkResponse({ description: 'List all tasks', type: TaskDto, isArray: true })
  @Get()
  getAll() {
    return this.service.getAll();
  }

  @ApiCreatedResponse({ description: 'Create task', type: TaskDto })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.service.create(dto);
  }

  @ApiOkResponse({ description: 'Update task', type: TaskDto })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.service.update(id, dto);
  }

  @ApiOkResponse({ description: 'Delete task' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
