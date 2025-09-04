import { TaskService } from './task.service';
import { InMemoryTaskRepository } from '../../tasks/infrastructure/in-memory.task.repository';

describe('TaskService', () => {
	let service: TaskService;

	beforeEach(() => {
		service = new TaskService(new InMemoryTaskRepository() as any);
	});

	it('creates and lists tasks', async () => {
		await service.create({ title: 'Test' });
		const all = await service.getAll();
		expect(all.length).toBe(1);
		expect(all[0].title).toBe('Test');
		expect(all[0].completed).toBe(false);
	});

	it('updates task', async () => {
		const created = await service.create({ title: 'A' });
		const updated = await service.update(created.id, { completed: true });
		expect(updated.completed).toBe(true);
	});

	it('deletes task', async () => {
		const created = await service.create({ title: 'A' });
		await service.delete(created.id);
		const all = await service.getAll();
		expect(all.length).toBe(0);
	});
});
