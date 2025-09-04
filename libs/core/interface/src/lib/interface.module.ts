import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { TaskService, TASK_REPOSITORY } from '@izi/core/application';
import { InMemoryTaskRepository } from '@izi/core/infrastructure';

@Module({
  controllers: [TasksController],
  providers: [TaskService, { provide: TASK_REPOSITORY, useClass: InMemoryTaskRepository }],
})
export class InterfaceModule {}
