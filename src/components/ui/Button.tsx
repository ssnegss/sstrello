interface ButtonProps {
	type: 'submit' | 'reset' | 'button' | undefined;
	children: string;
	disabled?: boolean;
	onClick?: () => void;
}

export const Button = ({
	type,
	onClick,
	disabled = false,
	children
}: ButtonProps) => {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
		>
			{children}
		</button>
	);
};
