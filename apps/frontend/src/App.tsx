import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AuthScreen from "./components/AuthScreen";
import Dashboard from "./components/Dashboard";
import AnimatedSwitch from "./components/AnimatedSwitch";
import { withAuth } from "./services/auth.service";
import "./App.css";

const App: React.FC = () => (
	<BrowserRouter>
		<AnimatedSwitch>
			<Route exact path="/sign-(in|up)" component={AuthScreen} />
			<Route exact path="/im-in" component={withAuth(Dashboard)} />
		</AnimatedSwitch>
		<Route exact path="/" render={redirectToAuth} />
	</BrowserRouter>
);

const redirectToAuth = () => <Redirect to="/sign-in" />;

export default App;
