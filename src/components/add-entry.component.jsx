import React, { useState } from "react";

import { createNewEntry } from "../firebase";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
	formField: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	form: {
		display: "flex",
		flexWrap: "nowrap",
	},
	option: {
		display: "flex",
		flexDirection: "column",
		marginTop: theme.spacing(1.5),
		margin: theme.spacing(1),
	},
}));

const AddEntry = ({ email }) => {
	const classes = useStyles();
	const [project, setProject] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { entry, from, to, date } = event.target.elements;

		createNewEntry(
			email,
			entry.value,
			project,
			from.value,
			to.value,
			date.value
		);

		entry.value = "";
		from.value = "";
		to.value = "";
		date.value = "";
		setProject("");
	};

	const handleChange = (event) => {
		setProject(event.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className={classes.form}>
				<TextField
					name="entry"
					className={classes.formField}
					label="What have you worked on?"
					variant="outlined"
				/>

				<FormControl variant="outlined" className={classes.formField}>
					<InputLabel id="select-project">Project</InputLabel>
					<Select
						labelId="select-project"
						name="project"
						label="Project"
						value={project}
						onChange={handleChange}
					>
						<MenuItem value="WizyEMM">WizyEMM</MenuItem>
						<MenuItem value="WizyVision">WizyVision</MenuItem>
						<MenuItem value="FormWorkflow">FormWorkflow</MenuItem>
						<MenuItem value="GoWizApp">GoWizApp</MenuItem>
						<MenuItem value="Add">Add New Project</MenuItem>
					</Select>
				</FormControl>

				<TextField
					name="from"
					label="From"
					type="time"
					className={classes.formField}
					variant="outlined"
					InputLabelProps={{
						shrink: true,
					}}
				/>

				<TextField
					name="to"
					label="To"
					type="time"
					className={classes.formField}
					variant="outlined"
					InputLabelProps={{
						shrink: true,
					}}
				/>

				<TextField
					name="date"
					label="Date"
					type="date"
					className={classes.formField}
					variant="outlined"
					InputLabelProps={{
						shrink: true,
					}}
				/>

				<Button
					className={classes.formField}
					size="large"
					variant="contained"
					color="primary"
					type="submit"
				>
					ADD
				</Button>

				<div className={classes.option}>
					<IconButton size="small">
						<AccessTimeIcon />
					</IconButton>
					<IconButton size="small">
						<FormatListBulletedIcon />
					</IconButton>
				</div>
			</form>
		</div>
	);
};

export default AddEntry;
