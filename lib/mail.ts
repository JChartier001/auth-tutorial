import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => { 
  const confirmLink = `${process.env.FRONTEND_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email address',
    html: `
      <h1>Confirm your email address</h1>
      <p>Click the link below to confirm your email address.</p>
      <a href="${confirmLink}">Confirm email address</a>
    `,
  })

}


export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `${process.env.FRONTEND_URL}/auth/new-password?token=${token}`;
console.log(email, token, resetLink)
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Reset your Password',
		html: `
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password.</p>
      <a href="${resetLink}">Confirm email address</a>
    `,
	});
};