import { z } from 'zod';

const invalid_type_error = 'Invalid type provided for this field';
const required_error = 'This field cannot be blank';

export const SignUpSchema = z.object({
	fullName: z
		.string({ invalid_type_error, required_error })
		.min(1, { message: required_error }),
	username: z
		.string({ invalid_type_error, required_error })
		.min(1, { message: required_error }),
	email: z
		.string({ invalid_type_error, required_error })
		.email('Please provide a valid email')
		.min(1, { message: required_error }),
	password: z
		.string({ invalid_type_error, required_error })
		.min(6, 'Password is too short'),
});

/**
 * Things to note:
 *  1. By default, all values are required
 *  2. "" is valid as string cc: `https://github.com/colinhacks/zod/issues/63`
 */
