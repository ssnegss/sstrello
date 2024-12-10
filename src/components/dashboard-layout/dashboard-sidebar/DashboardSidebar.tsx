import { GanttChartSquare } from 'lucide-react';
import Link from 'next/link';

import { LogoutButton } from '@/components/logout-button/LogoutButton';

import { COLORS } from '@/constants/color.constants';

import { DashboardSidebarItem } from './DashboardSidebarItem';
import { MENU } from '@/app/data/menu.data';

export const DashboardSidebar = () => {
	return (
		<aside className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between'>
			<div>
				<Link
					href='/'
					className='flex items-center gap-2.5 p-layout border-b border-b-border'
				>
					<GanttChartSquare
						color={COLORS.primary}
						size={38}
					/>
					<span className='text-2xl font-bold relative'>
						SStrello
						<span className='absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal'>
							beta
						</span>
					</span>
				</Link>
				<div className='p-3 relative'>
					<LogoutButton />
					{MENU.map(item => (
						<DashboardSidebarItem
							item={item}
							key={item.link}
						/>
					))}
				</div>
			</div>
			<footer className='text-xs opacity-40 font-normal text-center p-layout'>
				2024 &copy; With love from{' '}
				<a
					href='https://www.youtube.com/c/redgroup/?sub_confirmation=1'
					target='_blank'
					rel='noreferrer'
					className='hover:text-primary text-brand-300 transition-colors'
				>
					ssnegss
				</a>
				. <br /> All rights reserved.
			</footer>
		</aside>
	);
};
