import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TasksApiService, Task } from '../../shared/data-access/tasks-api.service';

@Component({
	standalone: true,
	selector: 'app-tasks-page',
	imports: [CommonModule, TableModule, ButtonModule, CheckboxModule, InputTextModule, FormsModule],
	template: `
		<div class="container">
			<h2>Tasks</h2>
			<div class="actions">
				<input type="text" pInputText placeholder="New task title" [ngModel]="newTitle()" (ngModelChange)="newTitle.set($event)" />
				<button pButton label="Add" (click)="create()" [disabled]="!newTitle().trim()"></button>
			</div>
			<p-table [value]="tasks()" dataKey="id" [tableStyle]="{ 'min-width': '40rem' }">
				<ng-template pTemplate="header">
					<tr>
						<th style="width: 3rem"></th>
						<th>Title</th>
						<th style="width: 10rem">Actions</th>
					</tr>
				</ng-template>
				<ng-template pTemplate="body" let-row>
					<tr>
						<td>
							<p-checkbox [binary]="true" [(ngModel)]="row.completed" (onChange)="toggle(row)"></p-checkbox>
						</td>
						<td>{{ row.title }}</td>
						<td>
							<button pButton label="Delete" severity="danger" (click)="remove(row)"></button>
						</td>
					</tr>
				</ng-template>
			</p-table>
		</div>
	`,
	styles: [
		`.container{padding:1rem;}
		.actions{display:flex; gap:.5rem; margin-bottom:1rem; align-items:center;}
		`],
})
export class TasksPage {
	private readonly api = inject(TasksApiService);

	tasks = signal<Task[]>([]);
	loading = signal<boolean>(false);
	newTitle = signal<string>('');

	constructor() {
		this.refresh();
	}

	async refresh() {
		this.loading.set(true);
		try {
			const data = await this.api.list();
			this.tasks.set(data);
		} finally {
			this.loading.set(false);
		}
	}

	async create() {
		const title = this.newTitle().trim();
		if (!title) return;
		const created = await this.api.create({ title, completed: false });
		this.tasks.update((arr) => [created, ...arr]);
		this.newTitle.set('');
	}

	async toggle(row: Task) {
		const updated = await this.api.update(row.id, { completed: row.completed });
		this.tasks.update((arr) => arr.map((t) => (t.id === row.id ? updated : t)));
	}

	async remove(row: Task) {
		await this.api.remove(row.id);
		this.tasks.update((arr) => arr.filter((t) => t.id !== row.id));
	}
}
