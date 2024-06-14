import z from 'zod';

import { zEmail, zPhoneNumber, zString } from '../shared.validation';

export const zContactFormSchema = z.object({
  name: zString.min(3, 'Name must be at least 3 characters'),
  email: zEmail,
  phone: zPhoneNumber,
  message: zString.min(10, 'Message must be at least 10 characters'),
});
