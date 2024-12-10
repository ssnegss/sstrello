import cn from 'clsx';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { X } from 'lucide-react';
import { useState } from 'react';
import { DayPicker, type OnSelectHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { useOutside } from '@/hooks/useOutside';

import './DatePicker.scss';
import { formatCaption } from './DatePickerCaption';

dayjs.extend(LocalizedFormat);

interface IDatePicker {
	onChange: (value: string) => void;
	value: string;
	position?: 'left' | 'right';
}

export const DatePicker = ({
	onChange,
	value,
	position = 'right'
}: IDatePicker) => {
	const [selected, setSelected] = useState<Date>();
	const { isShown, setIsShown, ref } = useOutside(false);

	const handleDaySelect: OnSelectHandler<Date | undefined> = date => {
		const ISOdate = date?.toISOString();

		setSelected(date);
		if (ISOdate) {
			onChange(ISOdate);
			setIsShown(false);
		} else {
			onChange('');
		}
	};

	return (
		<div
			className='relative'
			ref={ref}
		>
			<button onClick={() => setIsShown(!isShown)}>
				{value ? dayjs(value).format('LL') : 'Click for select'}
			</button>
			{value && (
				<button
					className='absolute -top-2 -right-4 opacity-30 hover:opacity-100 transition-opacity'
					onClick={() => onChange('')}
				>
					<X size={14} />
				</button>
			)}
			{isShown && (
				<div
					className={cn(
						'absolute p-2.5 slide bg-sidebar z-10 shadow rounded-lg',
						position === 'left' ? '-left-4' : ' -right-4'
					)}
					style={{
						top: 'calc(100% + .7rem)'
					}}
				>
					<DayPicker
						startMonth={new Date(2024, 0)}
						endMonth={new Date(2054, 0)}
						autoFocus={isShown}
						mode='single'
						defaultMonth={selected}
						selected={selected}
						onSelect={handleDaySelect}
						weekStartsOn={1}
						formatters={{ formatCaption }}
					/>
				</div>
			)}
		</div>
	);
};
