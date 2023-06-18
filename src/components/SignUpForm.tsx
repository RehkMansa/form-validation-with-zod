import { useState } from "react";
import { ValidationError, handleZodValidation } from "../lib/zodhandlers";
import { SignUpSchema } from "../schema/signup";

const fields = [
  {
    name: "fullName",
    placeholder: "Enter Full name",
    type: "text",
  },
  { name: "username", placeholder: "Enter Username", type: "text" },
  /** We can ue zod to validate that our value is of type email */
  { name: "email", placeholder: "Enter email", type: "email" },
  { name: "password", placeholder: "Enter password", type: "password" },
] as const;

const SignUpForm = () => {
  const [errors, setErrors] = useState<ValidationError<typeof SignUpSchema>>({});
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    /** conversion of the input from FormData to an object */
    const data = Object.fromEntries(new FormData(e.currentTarget));

    handleZodValidation({
      onError: setErrors,
      data: data,
      onSuccess: (res) => {
        /**
         * res is of type:
         * { fullName: string; username: string; email: string; password: string; }
         */
        console.log(res);
      },
      schema: SignUpSchema,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 py-10 max-w-md mx-auto w-full">
      <h2 className="text-2xl font-bold">Complete the form to sign up</h2>
      <div className="space-y-4">
        {fields.map(({ name, placeholder, type }) => (
          <div className="grid" key={name}>
            <label htmlFor={name} className="capitalize text-sm">
              {name}
            </label>
            <input
              name={name}
              placeholder={placeholder}
              type={type}
              className="border p-3 placeholde	r:capitalize"
              id={name}
            />
            {errors[name] && <span className="text-red-500 text-sm">{errors[name]}</span>}
          </div>
        ))}
      </div>
      <pre>{JSON.stringify(payload)}</pre>
      <button type="submit" className="bg-black text-white px-4 py-2 w-full">
        Submit
      </button>
    </form>
  );
};

export default SignUpForm;
