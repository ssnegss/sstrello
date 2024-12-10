import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/field/Field';
import { SingleSelect } from '@/components/ui/task-actions/SingleSelect';

import { TypeTimeBlockUpdate } from '@/types/time-block.types';

import { useCreateTimeBlock } from './useCreateTimeBlock';
import { useUpdateTimeBlock } from './useUpdateTimeBlock';
import { COLORS } from '@/app/data/timeBlockingColors.data';

export const TimeBlockingForm = () => {
	const { register, control, watch, reset, handleSubmit, getValues } =
		useFormContext<TypeTimeBlockUpdate>();

	const existingId = watch('id');

	const { createTimeBlock, isPending } = useCreateTimeBlock();
	const { updateTimeBlock } = useUpdateTimeBlock();

	const onSubmit: SubmitHandler<TypeTimeBlockUpdate> = data => {
		const { color, id, ...rest } = data;
		const dto = { ...rest, color: color || undefined };

		if (id) {
			updateTimeBlock({ id, data: dto });
		} else {
			// TODO: check types
			createTimeBlock(dto);
		}

		reset({
			color: COLORS[COLORS.length - 1],
			duration: 0,
			name: '',
			id: undefined,
			order: 1
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-3/5'
		>
			<Field
				{...register('name', {
					required: true
				})}
				type='text'
				id='name'
				label='Enter name:'
				placeholder='Enter name:'
			/>
			<Field
				{...register('duration', {
					required: true,
					valueAsNumber: true
				})}
				type='text'
				id='duration'
				label='Enter duration (min.):'
				placeholder='Enter duration (min.):'
				isNumber
			/>
			<div>
				<span className='inline-block mb-1.5'>Color:</span>
				<Controller
					control={control}
					name='color'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={COLORS.map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || COLORS[COLORS.length - 1]}
							isColorSelected
						/>
					)}
				/>
			</div>

			<Button
				type='submit'
				disabled={isPending}
			>
				{existingId ? 'Update' : 'Create'}
			</Button>
		</form>
	);
};
