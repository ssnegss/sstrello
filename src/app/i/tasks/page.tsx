import type { Metadata } from 'next';

import { Heading } from '@/components/ui/Heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { TasksView } from './TasksView';

export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
};
export default function TasksPage() {
	return (
		<div>
			<Heading title='Tasks' />
			<TasksView />
		</div>
	);
}
