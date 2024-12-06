'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button/Button';
import { Field } from '@/components/ui/field/Field';

import { IAuthForm } from '@/types/auth.types';

import { DASHBOARD_PAGES } from '@/config/page-url.config';

import { authService } from '@/services/auth.service';

export const Auth = () => {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	});

	const [isLoginForm, setIsLoginForm] = useState(false);

	const { push } = useRouter();

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfully login!');
			reset();
			push(DASHBOARD_PAGES.HOME);
		},
		onError() {
			toast.error('An error occurred!');
		}
	});

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data);
	};

	return (
		<div className='flex min-h-screen'>
			<div className='w-1/2 m-auto shadow bg-sidebar rounded-xl p-layout'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<img
						className='mx-auto h-10 w-auto'
						src='https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600'
						alt='Your Company'
					/>
					<h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-200'>
						Sign in to your account
					</h2>
				</div>
				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form
						className='space-y-6'
						action='#'
						method='POST'
						onSubmit={handleSubmit(onSubmit)}
					>
						<Field
							type='email'
							id='email'
							autoComplete='email'
							placeholder='Enter Email'
							label='Email:'
							{...register('email', { required: 'Email is required!' })}
						/>
						<Field
							type='password'
							id='password'
							autoComplete='password'
							placeholder='Enter Password'
							label='Password:'
							isPassword={true}
							{...register('password', { required: 'Password is required!' })}
						/>
						<div>
							<Button
								type='submit'
								onClick={() => setIsLoginForm(true)}
							>
								Sign in
							</Button>
							<Button
								type='submit'
								onClick={() => setIsLoginForm(false)}
							>
								Register
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
