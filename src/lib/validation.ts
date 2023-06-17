import z from 'zod';

declare const data: {
	name: unknown;
	age: unknown;
};

const SimpleSchema = z.object({
	name: z.string(),
	age: z.number(),
});

try {
	const res = SimpleSchema.parse(data);
} catch (error) {
	console.error(error);
}
