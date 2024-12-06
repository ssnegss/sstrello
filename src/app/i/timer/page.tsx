import type { Metadata } from 'next';

import { Heading } from '@/components/ui/Heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Pomodoro',
	...NO_INDEX_PAGE
};
export default function TimerPage() {
	return (
		<div>
			<Heading title='Pomodoro' />
		</div>
	);
}
