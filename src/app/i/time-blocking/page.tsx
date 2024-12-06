import type { Metadata } from 'next';

import { Heading } from '@/components/ui/Heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Time blocks',
	...NO_INDEX_PAGE
};
export default function DashboardPage() {
	return (
		<div>
			<Heading title='Time blocks' />
		</div>
	);
}
