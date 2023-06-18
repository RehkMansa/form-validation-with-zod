import { ZodError, ZodType } from "zod";

/** @argument ErrorType : if you need to assert your error type, just pass it as a generics via asserting with the as keyword */
export const handleOneLevelZodError = ({ issues }: ZodError<unknown>) => {
  const formData: Record<string, string> = {};

  /** line of code should be true if the schema is not an object */
  if (issues.length === 1 && issues[0].path.length < 1) return issues[0].message;

  issues.forEach(({ path, message }) => {
    formData[path.join("-")] = message;
  });

  return formData;
};

type ZodParams<T extends ZodType<Record<string | number, unknown>>> = {
  onSuccess(data: T["_output"]): void;
  /**
   * use type definition `ValidationError` to create your error object shape
   * @example ```tsx
   * const handleError (err: ValidationError<typeof schema>)=>{
   * 		// do something with the error
   * }
   * ```
   */
  onError(error: Partial<Record<keyof T["_output"], string>>): void;
  /** to provide better error handling, data has to be narrowed down to an object, so our error return can remain consistent
   */
  data: Record<string, unknown>;
  schema: T;
};

export type ValidationError<T extends ZodType<Record<string | number, unknown>>> = Partial<
  Record<keyof T["_output"], string>
>;

/**
 * handleZodValidation cannot be used to validate zod primitives
 * use z.object when creating schema, that way error is a key value pair.
 * @example
 * ```tsx
 * // do this
 * const schema = z.object({
 * 	 name: z.string()
 * })
 * // instead of this
 * const nameSchema = z.string()
 *
 * ```
 */

export const handleZodValidation = <T extends ZodType<Record<string | number, unknown>>>(params: ZodParams<T>) => {
  const { data, onError, onSuccess, schema } = params;

  try {
    const res = schema.parse(data);
    //   ^?

    onSuccess(res);

    /** returns an empty error object, i.e reset error state */
    onError({});
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErr = handleOneLevelZodError(error);
      onError(formattedErr as Record<keyof T["_output"], string>);
    } else {
      throw new Error(String(error));
    }
  }
};
