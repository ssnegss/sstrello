'use client';

import { GlobalLoader } from '@/components/global-loader/GlobalLoader';

import DashboardProfile from './dashboard-profile/DashboardProfile';

export default function DashboardHeader() {
	return (
		<header>
			<GlobalLoader />
			<DashboardProfile />
		</header>
	);
}
