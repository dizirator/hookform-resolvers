import { Field, InternalFieldName } from 'react-hook-form';
import * as z from 'zod';

export const schema = z
  .object({
    username: z.string().regex(/^\w+$/).min(3).max(30),
    password: z
      .string()
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'One special character',
      )
      .min(8, 'Must be at least 8 characters in length'),
    repeatPassword: z.string(),
    accessToken: z.union([z.string(), z.number()]).optional(),
    birthYear: z.number().min(1900).max(2013).optional(),
    email: z.string().email().optional(),
    tags: z.array(z.string()),
    enabled: z.boolean(),
    like: z
      .array(
        z.object({
          id: z.number(),
          name: z.string().length(4),
        }),
      )
      .optional(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['confirm'], // set path of error
  });

export const validData: z.infer<typeof schema> = {
  username: 'Doe',
  password: 'Password123_',
  repeatPassword: 'Password123_',
  birthYear: 2000,
  email: 'john@doe.com',
  tags: ['tag1', 'tag2'],
  enabled: true,
  like: [
    {
      id: 1,
      name: 'name',
    },
  ],
};

export const invalidData = {
  password: '___',
  email: '',
  birthYear: 'birthYear',
  like: [{ id: 'z' }],
};

export const fields: Record<InternalFieldName, Field['_f']> = {
  username: {
    ref: { name: 'username' },
    name: 'username',
  },
  password: {
    ref: { name: 'password' },
    name: 'password',
  },
  email: {
    ref: { name: 'email' },
    name: 'email',
  },
  birthday: {
    ref: { name: 'birthday' },
    name: 'birthday',
  },
};