import { z } from 'zod';
export const registerValidation = z
  .object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email('Invalid email.'),
    login: z.string().min(6, 'Login is shorter of 6 s.'),
    password: z
      .string()
      .min(6, 'Password is too short.')
      .refine((password) => {
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasLowercase && hasUppercase && hasNumber;
      }, 'Password must contain at least one lowercase letter, one uppercase letter, and one number.'),
    check_password: z.string(),
    name: z.string().min(1, 'Name is required'),
  })
  .refine((data) => data.password === data.check_password, {
    path: ['check_password'],
    message: 'Passwords are diff',
  });

export const incomeValidation = z.object({
  title: z.string().min(1, 'Title is required.'),
  amount: z.number().min(0.01, 'Amount must be greater than or equal to 0.01.'),
  description: z.string().max(150, 'Description is too long.'),
  category: z.number().int(),
});

export const expenceValidation = z.object({
  title: z.string().min(1, 'Title is required.'),
  amount: z.number().min(0.01, 'Amount must be greater than or equal to 0.01.'),
  description: z.string().max(150, 'Description is too long.'),
  category: z.number().int().min(1, 'Invalid category.'),
});
