'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import React from 'react';
import CardWrapper from './card-wrapper';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { newPassword } from '@/actions/new-password';
import { PasswordSchema } from '@/schemas';
import { useSearchParams } from 'next/navigation';

const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = React.useState<string | undefined>('');
	const [success, setSuccess] = React.useState<string | undefined>('');
	const form = useForm<z.infer<typeof PasswordSchema>>({
		resolver: zodResolver(PasswordSchema),
		mode: 'onBlur',
		defaultValues: {
			password: '',
		},
	});

	const token = searchParams?.get('token');

	const onSubmit = (values: z.infer<typeof PasswordSchema>) => {
		setError('');
		setSuccess('');
		startTransition(() =>
			newPassword(values, token).then(data => {
				setError(data?.error);
				setSuccess(data?.success);
			})
		);
	};

	return (
		<CardWrapper
			headerLabel='Enter a new password'
			backButtonHref='/auth/login'
			backButtonLabel='Back to login'
		>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field, formState }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>

									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder='******'
											type='password'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type='submit' className='w-full' disabled={isPending}>
						Reset Password
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default NewPasswordForm;
