import { TypeTask, TypeTaskCreate, TypeTaskUpdate } from '@/types/task.types';

import { axiosWithAuth } from '@/api/interceptors';

class TaskService {
	private BASE_URL = 'user/tasks';

	async getAllTasks() {
		const response = await axiosWithAuth.get<TypeTask[]>(this.BASE_URL);
		return response;
	}

	async createTask(data: TypeTaskUpdate) {
		const response = await axiosWithAuth.post<TypeTaskUpdate>(
			this.BASE_URL,
			data
		);
		return response;
	}

	async updateTask(id: string, data: TypeTaskUpdate) {
		const response = await axiosWithAuth.put<TypeTaskUpdate>(
			`${this.BASE_URL}/${id}`,
			data
		);
		return response;
	}

	async deleteTask(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
		return response;
	}
}

export const taskService = new TaskService();
