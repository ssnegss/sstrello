import { forwardRef } from 'react';

interface IFieldProps {
	label?: string;
	type: string;
	name: string;
	id: string;
	autoComplete?: string;
	placeholder?: string;
	isRequired?: boolean;
	disabled?: boolean;
	isNumber?: boolean;
	isPassword?: boolean;
}

export const Field = forwardRef<HTMLInputElement, IFieldProps>(
	(
		{
			label,
			type,
			id,
			name,
			autoComplete = '',
			placeholder = '',
			isRequired = true,
			disabled = false,
			isNumber = false,
			isPassword = false,
			...rest
		},
		ref
	) => {
		return (
			<div>
				<div className='flex items-center justify-between'>
					<label
						htmlFor={id}
						className='block text-xs font-medium text-gray-200'
					>
						{label}
					</label>
					{isPassword ? (
						<div className='text-xs'>
							<a
								href='#'
								className='font-semibold text-indigo-600 hover:text-indigo-500'
							>
								Forgot password?
							</a>
						</div>
					) : (
						''
					)}
				</div>
				<div className='mt-2'>
					<input
						type={type}
						id={id}
						ref={ref}
						name={name}
						autoComplete={autoComplete}
						placeholder={placeholder}
						required={isRequired}
						disabled={disabled}
						className='block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-gray-200 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-xs'
						onKeyDown={event => {
							if (
								isNumber &&
								!/[0-9]/.test(event.key) &&
								event.key !== 'Backspace' &&
								event.key !== 'Tab' &&
								event.key !== 'Enter' &&
								event.key !== 'ArrowLeft' &&
								event.key !== 'ArrowRight'
							) {
								event.preventDefault();
							}
						}}
						{...rest}
					/>
				</div>
			</div>
		);
	}
);

Field.displayName = 'Field';
