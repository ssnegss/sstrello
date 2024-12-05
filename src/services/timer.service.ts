import {
	TypeTimerRoundUpdate,
	TypeTimerSession,
	TypeTimerSessionUpdate
} from '@/types/timer.types';

import { axiosWithAuth } from '@/api/interceptors';

class TimerService {
	private BASE_URL = 'user/timer';

	async getTodaySession() {
		const response = axiosWithAuth.get<TypeTimerSession>(
			`${this.BASE_URL}/today`
		);

		return response;
	}

	async createSession() {
		const response = axiosWithAuth.post(this.BASE_URL);

		return response;
	}

	async updateSession(id: string, data: TypeTimerSessionUpdate) {
		const response = axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
		return response;
	}

	async deleteSession(id: string) {
		const response = axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
		return response;
	}

	async updateRound(id: string, data: TypeTimerRoundUpdate) {
		const response = axiosWithAuth.put(`${this.BASE_URL}/round/${id}`, data);

		return response;
	}
}

export const timerService = new TimerService();
