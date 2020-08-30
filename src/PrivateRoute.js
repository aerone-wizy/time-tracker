import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selectors";

const PrivateRoute = ({ component: RouteComponent, currentUser, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(routeProps) => {
				return currentUser ? (
					<RouteComponent {...routeProps} />
				) : (
					<Redirect to={"/signin"} />
				);
			}}
		/>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(PrivateRoute);
