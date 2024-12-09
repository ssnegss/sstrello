'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/field/Field';

import { TypeUserForm } from '@/types/auth.types';

import { useLoadInitialData } from '@/hooks/useLoadInitialData';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';

export const Settings = () => {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	});

	useLoadInitialData(reset);
	const { mutate, isPending } = useUpdateSettings();

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data;

		mutate({
			...rest,
			password: password || undefined
		});
	};

	return (
		<div>
			<form
				className='w-2/4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-10 mb-8'>
					<div>
						<Field
							id='email'
							label='Email:'
							placeholder='Enter email:'
							type='email'
							{...register('email', {
								required: 'Email is required!'
							})}
						/>
						<Field
							id='name'
							type='text'
							label='Name:'
							placeholder='Enter name:'
							{...register('name')}
						/>
						<Field
							id='password'
							label='Password:'
							placeholder='Enter password:'
							autoComplete='new-password'
							type='password'
							{...register('password')}
						/>
					</div>
					<div>
						<Field
							id='workInterval'
							type='text'
							label='Work interval (min.):'
							placeholder='Enter work interval (min.):'
							isNumber
							{...register('workInterval', {
								valueAsNumber: true
							})}
						/>
						<Field
							id='breakInterval'
							type='text'
							label='Break interval (min.):'
							placeholder='Enter break interval (min.):'
							isNumber
							{...register('breakInterval', {
								valueAsNumber: true
							})}
						/>
						<Field
							id='intervalsCount'
							type='text'
							label='Intervals count (max 10):'
							placeholder='Enter intervals count (max 10):'
							isNumber
							{...register('intervalsCount', {
								valueAsNumber: true
							})}
						/>
					</div>
				</div>
				<Button
					type='submit'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	);
};
