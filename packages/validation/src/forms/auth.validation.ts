import { z } from 'zod';

import { zString } from '../core';

export const zLoginSchema = z.object({
  email: zString,
  password: zString,
});

export type LoginSchema = z.infer<typeof zLoginSchema>;
