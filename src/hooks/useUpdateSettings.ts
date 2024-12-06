import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TypeUserForm } from '@/types/auth.types';

import { userService } from '@/services/user.service';

export const useUpdateSettings = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: ['updateSettings'],
		mutationFn: (data: TypeUserForm) => userService.update(data),
		onSuccess() {
			toast.success('Profile was updated!');
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
		onError() {
			toast.error('Error updating profile!');
		}
	});

	return { mutate, isPending };
};
