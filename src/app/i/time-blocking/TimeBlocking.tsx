'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { TimeBlockingForm } from './form/TimeBlockingForm';

export const TimeBlocking = () => {
	const methods = useForm();

	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
				<TimeBlockingForm />
			</div>
		</FormProvider>
	);
};
