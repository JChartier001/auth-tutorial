'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schemas';

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
import { register } from '@/actions/register';

const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = React.useState<string | undefined>('');
	const [success, setSuccess] = React.useState<string | undefined>('');
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		mode: 'onBlur',
		defaultValues: {
			email: '',
      password: '',
      name: '',
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError('');
		setSuccess('');
		startTransition(() =>
			register(values).then(data => {
				setError(data.error);
				setSuccess(data.success);
			})
		);
	};

	return (
		<CardWrapper
			headerLabel='Create an account'
			backButtonHref='/auth/login'
			backButtonLabel="Already have an account?"
			showSocial
		>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>

									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder='John Doe'
											
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>

									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder='john.doe@example.com'
											type='email'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='********'
											type='password'
											disabled={isPending}
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
						Register
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default RegisterForm;
