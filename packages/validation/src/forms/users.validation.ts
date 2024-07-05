import { z } from 'zod';

import { zString } from '../core';

export const zSelfUpdateUserSchema = z.object({
  name: zString,
});

export type SelfUpdateUserForm = z.infer<typeof zSelfUpdateUserSchema>;
