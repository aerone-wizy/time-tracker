import React from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

import { auth, createUserProfileDocument } from "./firebase";

import PrivateRoute from "./PrivateRoute";

import SignInPage from "./components/sign-in.component";
import SignUpPage from "./components/sign-up.component";
import DrawerNav from "./components/drawer-nav.component";

import { setCurrentUser } from "./redux/user/user.actions";

import LinearProgress from "@material-ui/core/LinearProgress";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pending: true,
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
			}

			setCurrentUser(userAuth);

			//posible issue: Loading or waiting for the action dispatch

			this.setState({
				pending: false,
			});
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return this.state.pending ? (
			<LinearProgress />
		) : (
			<div className="App">
				<Switch>
					<PrivateRoute exact path="/" component={DrawerNav} />
					<Route path="/signin" component={SignInPage} />
					<Route path="/signup" component={SignUpPage} />
				</Switch>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
