'use client'

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas";


import React from 'react';
import CardWrapper from './card-wrapper';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { login } from "@/actions/login";
import Link from "next/link";

const LoginForm = () => {
	const searchParams = useSearchParams();
	const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? "Email already in use with different provider": ""
	const [isPending, startTransition] = useTransition();
	const [error, setError] = React.useState<string | undefined>('');
	const [success, setSuccess] = React.useState<string | undefined>('');
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
		}
	});
	
	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('')
		setSuccess('')
		startTransition(() => login(values)
			.then(data => { 
				setError(data?.error)
				setSuccess(data?.success)
			}))
		
	}

	return (
		<CardWrapper
			headerLabel='Welcome Back'
			backButtonHref='/auth/register'
			backButtonLabel="Don't have an account?"
			showSocial
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
						<FormField
							control={form.control}
							name='password'
							render={({ field, formState }) => (
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
									<Button size='sm' variant='link' asChild className='px-0 font-normal'><Link href="/auth/reset">Forgot password?</Link></Button>
									<FormMessage />
								</FormItem>
							)}
						/>
						
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button type='submit' className='w-full' disabled={isPending}>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default LoginForm;
