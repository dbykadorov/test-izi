import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from '../application/task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
	constructor(private readonly service: TaskService) {}

	@ApiResponse({ status: 200, description: 'List all tasks' })
	@Get()
	getAll() {
		return this.service.getAll();
	}

	@ApiResponse({ status: 201, description: 'Create task' })
	@Post()
	create(@Body() dto: CreateTaskDto) {
		return this.service.create(dto);
	}

	@ApiResponse({ status: 200, description: 'Update task' })
	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
		return this.service.update(id, dto);
	}

	@ApiResponse({ status: 200, description: 'Delete task' })
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.service.delete(id);
	}
}
