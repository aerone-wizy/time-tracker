import React from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

import { auth, createUserProfileDocument } from "./firebase";

import PrivateRoute from "./PrivateRoute";

import SignInPage from "./components/sign-in.component";
import SignUpPage from "./components/sign-up.component";
import TimeTrackerPage from "./components/TimeTrackerPage.component";

import { setCurrentUser } from "./redux/user/user.actions";
// import { selectCurrentUser } from "./redux/user/user.selectors";

import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selectors";

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
				console.log("Subscribe");
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
			<div>LOADING.....................</div>
		) : (
			<div className="App">
				<Switch>
					<PrivateRoute exact path="/" component={TimeTrackerPage} />
					<Route path="/signin" component={SignInPage} />
					<Route path="/signup" component={SignUpPage} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
