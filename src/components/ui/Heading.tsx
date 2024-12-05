interface IHeading {
	title: string;
}

export const Heading = ({ title }: IHeading) => {
	return (
		<div>
			<h1 className='text-3xl font-medium'>{title}</h1>
			<div className='my-3 h-0.5 bg-border w-fullF'></div>
		</div>
	);
};
