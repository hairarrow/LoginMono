import React from "react";
import { useCallback, useState } from "react";
import { useSignUp } from "../../services/auth.service";
import {
	SignForm,
	ActualForm,
	Legend,
	Section,
	TextField,
	Button,
	ErrorMessage,
} from "./form-components";
import { RouteComponentProps } from "react-router-dom";

const SignUpForm: React.FC<RouteComponentProps<any>> = ({ history }) => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [error, setError] = useState("");
	const [signUp] = useSignUp();

	const updateName = useCallback(({ target }) => {
		setError("");
		setName(target.value);
	}, []);

	const updateUsername = useCallback(({ target }) => {
		setError("");
		setUsername(target.value);
	}, []);

	const updatePassword = useCallback(({ target }) => {
		setError("");
		setPassword(target.value);
	}, []);

	const updatePasswordConfirm = useCallback(({ target }) => {
		setError("");
		setPasswordConfirm(target.value);
	}, []);

	const maySignUp = useCallback(() => {
		return !!(name && username && password && password === passwordConfirm);
	}, [name, username, password, passwordConfirm]);

	const handleSignUp = useCallback(() => {
		signUp({ variables: { username, password, passwordConfirm, name } })
			.then(() => {
				history.replace("/sign-in");
			})
			.catch(error => {
				setError(error.message || error);
			});
	}, [name, username, password, passwordConfirm, history, signUp]);

	return (
		<SignForm>
			<ActualForm>
				<Legend>Sign up</Legend>
				<Section
					style={{
						float: "left",
						width: "calc(50% - 10px)",
						paddingRight: "10px",
					}}
				>
					<TextField
						data-testid="name-input"
						placeholder="Name"
						value={name}
						onChange={updateName}
						autoComplete="off"
					/>
					<TextField
						data-testid="username-input"
						placeholder="Username"
						value={username}
						onChange={updateUsername}
						autoComplete="off"
					/>
				</Section>
				<Section
					style={{
						float: "right",
						width: "calc(50% - 10px)",
						paddingLeft: "10px",
					}}
				>
					<TextField
						data-testid="password-input"
						placeholder="Password"
						type="password"
						value={password}
						onChange={updatePassword}
						autoComplete="off"
					/>
					<TextField
						data-testid="password-confirm-input"
						placeholder="Confirm password"
						type="password"
						value={passwordConfirm}
						onChange={updatePasswordConfirm}
						autoComplete="off"
					/>
				</Section>
				<Button
					data-testid="sign-up-button"
					type="button"
					disabled={!maySignUp()}
					onClick={handleSignUp}
				>
					Sign up
				</Button>
				<ErrorMessage data-testid="error-message">{error}</ErrorMessage>
			</ActualForm>
		</SignForm>
	);
};

export default SignUpForm;
