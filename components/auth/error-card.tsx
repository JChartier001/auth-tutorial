
import CardWrapper from '@/components/auth/card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel='Oops! Something went wrong!'
			backButtonHref='/auth/login'
			backButtonLabel='Back to login'
		>
			<div className='w-full items-center justify-center flex'>
				<ExclamationTriangleIcon className='h-5 w-5 text-destructive' />
			</div>
		</CardWrapper>
	);
};

export default ErrorCard;
