import { z } from 'zod';

export const zString = z.string().min(1, 'Field cannot be empty').trim();

export const zPhoneNumber = zString
  .min(10, 'Phone number must be at least 10 digits')
  .max(15, 'Phone number must be at most 15 digits')
  .regex(/^\+?\d+$/);

export const zEmail = zString.email('Invalid email address');

export const zFile = z.instanceof(File);

export const zClientFile = z.object({
  '0': z.any(),
});
