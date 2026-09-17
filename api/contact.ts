import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

type InquiryBody = {
  name?: string;
  email?: string;
  type?: string;
  budget?: string;
  message?: string;
};

const MAX_LENGTH = {
  name: 120,
  email: 254,
  type: 80,
  budget: 80,
  message: 5000,
} as const;

function isNonEmptyString(value: unknown, max: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseBody(raw: unknown): InquiryBody | null {
  try {
    if (raw == null) return null;
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
    return parsed as InquiryBody;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'himanshunagapure.official@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey) {
    return res.status(500).json({ error: 'Email is not configured' });
  }

  if (!fromEmail) {
    return res.status(500).json({ error: 'Sender address is not configured' });
  }

  const body = parseBody(req.body);
  if (!body) {
    return res.status(400).json({ error: 'Invalid form data' });
  }

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const type = body.type?.trim() ?? '';
  const budget = body.budget?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  if (
    !isNonEmptyString(name, MAX_LENGTH.name) ||
    !isNonEmptyString(email, MAX_LENGTH.email) ||
    !isValidEmail(email) ||
    !isNonEmptyString(type, MAX_LENGTH.type) ||
    !isNonEmptyString(budget, MAX_LENGTH.budget) ||
    !isNonEmptyString(message, MAX_LENGTH.message)
  ) {
    return res.status(400).json({ error: 'Invalid form data' });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${type}`,
        `Budget: ${budget}`,
        '',
        message,
      ].join('\n'),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Failed to send message' });
    }

    return res.status(200).json({ ok: true });
  } catch (sendError) {
    console.error('Resend exception:', sendError);
    return res.status(502).json({ error: 'Failed to send message' });
  }
}
