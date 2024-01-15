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