import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../redux/user/user.selectors";

import AddEntry from "./add-entry.component";
import ListEntry from "./list-entry.component";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

const TimeTracker = ({ currentUser }) => {
	const classes = useStyles();

	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<AddEntry email={currentUser.email} />
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<ListEntry email={currentUser.email} />
				</Grid>
			</Grid>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(TimeTracker);
