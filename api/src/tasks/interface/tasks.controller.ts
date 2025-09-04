import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from '../application/task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
	constructor(private readonly service: TaskService) {}

	@Get()
	getAll() {
		return this.service.getAll();
	}

	@Post()
	create(@Body() dto: CreateTaskDto) {
		return this.service.create(dto);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
		return this.service.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.service.delete(id);
	}
}
