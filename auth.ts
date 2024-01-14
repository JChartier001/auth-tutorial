import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';

declare module 'next-auth' {
	interface User {
		role: 'ADMIN' | 'USER';
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
	update,
} = NextAuth({
	callbacks: {
		// async signIn({ user }) {
		// 	const existingUser = await getUserById(user.id);
		// 	if (!existingUser || !existingUser.emailVerified) return false;
		// 	return true
		// },

		async session({ session, token }) {
			return {
				...session,
				id: token.sub,
				role: token.role,
			};
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			token.role = existingUser.role;

			return token;
		},
	},
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},

	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
});
