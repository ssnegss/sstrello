import { NextRequest, NextResponse } from 'next/server';

import { DASHBOARD_PAGES } from './config/page-url.config';
import { EnumTokens } from './services/auth-token.service';

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request;
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

	const res = NextResponse.next();
	res.headers.set('x-check-token', `${refreshToken}`);
	console.error(refreshToken);

	const isAuthPage = url.includes('/auth');

	if (isAuthPage && refreshToken) {
		res.headers.set('x-check-token-ok', `${refreshToken}`);
		console.error('isAuth ', + refreshToken);
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
	}

	if (isAuthPage) {
		return NextResponse.next();
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth', url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/i/:path*', '/auth', '/auth/:path']
};
