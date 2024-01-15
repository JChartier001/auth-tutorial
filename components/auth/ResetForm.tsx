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
import { reset } from '@/actions/reset-password';
import { ResetSchema } from '@/schemas';

const ResetForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = React.useState<string | undefined>('');
	const [success, setSuccess] = React.useState<string | undefined>('');
	const form = useForm<z.infer<typeof ResetSchema>>({
		resolver: zodResolver(ResetSchema),
		mode: 'onBlur',
		defaultValues: {
			email: '',
		
		},
	});

	const onSubmit = (values: z.infer<typeof ResetSchema>) => {
		setError('');
		setSuccess('');
		startTransition(() =>
			reset(values).then(data => {
				setError(data?.error);
				setSuccess(data?.success);
			})
		);
	};

	return (
		<CardWrapper
			headerLabel='Forgot your password?'
			backButtonHref='/auth/login'
			backButtonLabel="Back to login"
		>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field, formState }) => (
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
					
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type='submit' className='w-full' disabled={isPending}>
						Send reset email
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default ResetForm;
