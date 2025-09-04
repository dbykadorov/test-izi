import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CreateTaskDialogComponent } from '@izi/shared/ui';
import { TasksApiService, Task } from '@izi/tasks/data-access';

@Component({
	standalone: true,
	selector: 'app-tasks-page',
	imports: [
		CommonModule,
		TableModule,
		ButtonModule,
		CheckboxModule,
		InputTextModule,
		DialogModule,
		FormsModule,
		CreateTaskDialogComponent,
	],
	templateUrl: './tasks-page.component.html',
	styleUrl: './tasks-page.component.scss',
})
export class TasksPageComponent {
	public tasks = signal<Task[]>([]);
	public loading = signal<boolean>(false);
	public newTitle = signal<string>('');
	public isCreateOpen = signal<boolean>(false);

	private readonly api = inject(TasksApiService);

	public constructor() {
		this.refresh();
	}

	public async refresh(): Promise<void> {
		this.loading.set(true);
		try {
			const data = await this.api.list();
			this.tasks.set(data);
		} finally {
			this.loading.set(false);
		}
	}

	public async create(): Promise<void> {
		const title = this.newTitle().trim();
		if (!title) {
			return;
		}

		const created = await this.api.create({ title, completed: false });
		this.tasks.update((arr) => [created, ...arr]);
		this.newTitle.set('');
		this.isCreateOpen.set(false);
	}

	public openCreate(): void {
		this.newTitle.set('');
		this.isCreateOpen.set(true);
	}

	public async toggle(row: Task): Promise<void> {
		const updated = await this.api.update(row.id, { completed: row.completed });
		this.tasks.update((arr) => arr.map((t) => (t.id === row.id ? updated : t)));
	}

	public async remove(row: Task): Promise<void> {
		await this.api.remove(row.id);
		this.tasks.update((arr) => arr.filter((t) => t.id !== row.id));
	}
}


