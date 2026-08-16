import { z } from 'zod';
import { SupportedLang } from '../constants/enums';

// Zod schema for validation
export const CodeExecutionSchema = z.object({
  language: z.nativeEnum(SupportedLang, {
    required_error: 'Language is required.',
    invalid_type_error: 'Invalid language type.',
  }),
  code: z.string({ required_error: 'Code is required.' }).min(1, 'Code cannot be empty.'),
});
