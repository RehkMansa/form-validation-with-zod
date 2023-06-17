const fields = [
	{ name: 'fullName', placeholder: 'Enter Full name' },
	{ name: 'username', placeholder: 'Enter Username' },
	/** We can ue zod to validate that our value is of type email */
	{ name: 'email', placeholder: 'Enter email', type: 'email' },
	{ name: 'password', placeholder: 'Enter password' },
];

const SignUpForm = () => (
	<form>
		<h2>
			{fields.map(({ name, placeholder, type }) => (
				<input
					name={name}
					placeholder={placeholder}
					type={type ?? 'email'}
				/>
			))}
		</h2>
	</form>
);

export default SignUpForm;
