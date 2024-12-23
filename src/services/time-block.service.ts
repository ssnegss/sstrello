import {
	TypeTimeBlock,
	TypeTimeBlockUpdate
} from '@/types/time-block.types';

import { axiosWithAuth } from '@/api/interceptors';

class TimeBlockService {
	private BASE_URL = 'user/time-blocks';

	async getAllTimeBlocks() {
		const response = await axiosWithAuth.get<TypeTimeBlock[]>(this.BASE_URL);
		return response;
	}

	async createTimeBlock(data: TypeTimeBlockUpdate) {
		const response = await axiosWithAuth.post(this.BASE_URL, data);
		return response;
	}

	async updateTimeBlock(id: string, data: TypeTimeBlockUpdate) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
		return response;
	}

	async updateTimeBlockOrder(ids: string[]) {
		const response = await axiosWithAuth.put(
			`${this.BASE_URL}/update-order`,
			ids
		);
		return response;
	}

	async deleteTimeBlock(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
		return response;
	}
}

export const timeBlockService = new TimeBlockService();
