import { Test } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TaskService } from '../application/task.service';


describe('TasksController', () => {
	let controller: TasksController;
	let service: jest.Mocked<TaskService>;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [TasksController],
			providers: [
				{
					provide: TaskService,
					useValue: {
						getAll: jest.fn(),
						create: jest.fn(),
						update: jest.fn(),
						delete: jest.fn(),
					},
				},
			],
		}).compile();

		controller = moduleRef.get(TasksController);
		service = moduleRef.get(TaskService);
	});

	it('delegates to service', async () => {
		service.getAll.mockResolvedValue([] as any);
		await controller.getAll();
		expect(service.getAll).toHaveBeenCalled();
	});
});
