import React from "react";
import { useSignOut } from "../services/auth.service";

export default () => {
	const signOut = useSignOut();

	return (
		<main style={{ padding: 48 }}>
			<h1>This is a dashboard.</h1>
			<button onClick={signOut}>Sign Out</button>
		</main>
	);
};
