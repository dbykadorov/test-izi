import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Task {
	id: string;
	title: string;
	completed: boolean;
}

export interface CreateTaskRequest {
	title: string;
	completed?: boolean;
}

export interface UpdateTaskRequest {
	title?: string;
	completed?: boolean;
}

@Injectable({ providedIn: 'root' })
export class TasksApiService {
	private readonly http = inject(HttpClient);
	private readonly baseUrl = '/api/tasks';

	list() {
		return firstValueFrom(this.http.get<Task[]>(this.baseUrl));
	}

	create(body: CreateTaskRequest) {
		return firstValueFrom(this.http.post<Task>(this.baseUrl, body));
	}

	update(id: string, body: UpdateTaskRequest) {
		return firstValueFrom(this.http.patch<Task>(`${this.baseUrl}/${id}`, body));
	}

	remove(id: string) {
		return firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
	}
}


