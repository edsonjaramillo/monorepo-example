import { z } from 'zod';

import { zString } from '../core';

export const zSignInSchema = z.object({
  email: zString,
  password: zString,
});

export type SignInSchema = z.infer<typeof zSignInSchema>;

export const zSignupSchema = z.object({
  name: zString,
  email: zString,
  password: zString,
});

export type SignupSchema = z.infer<typeof zSignupSchema>;
