'use client'

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";


import React from 'react';
import CardWrapper from './card-wrapper';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const LoginForm = () => {
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
		}
	});
	
	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		console.log(values)
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
											// disabled={isPending}
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
										<Input {...field} placeholder='********' type='password' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message='' />
					<FormSuccess message='' />
					<Button type='submit' className='w-full'>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default LoginForm;
