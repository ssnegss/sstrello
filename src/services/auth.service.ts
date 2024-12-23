import { IAuthForm, IAuthResponse, TAuth } from '@/types/auth.types';

import { axiosClassic } from '../api/interceptors';

import { removeFromStorage, saveTokenStorage } from './auth-token.service';

export const authService = {
	async main(type: TAuth, data: IAuthForm) {
		try {
			const response = await axiosClassic.post<IAuthResponse>(
				`/auth/${type}`,
				data
			);

			if (response.data.accessToken) {
				saveTokenStorage(response.data.accessToken);
			}

			return response;
		} catch (e) {
			console.error(e);
		}
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		);

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken);
		}

		return response;
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('auth/logout');

		if (response.data) {
			removeFromStorage();
		}

		return response;
	}
};
