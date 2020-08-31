import React, { useState } from "react";

import { firestore } from "../firebase";

import { makeStyles } from "@material-ui/core/styles";
import {
	ListItem,
	ListItemText,
	Checkbox,
	Button,
	Modal,
	Input,
	Card,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	todo: {
		display: "flex",
		flexDirection: "row",
		width: "80vw",
	},
}));

const EntryList = ({ entries }) => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const [input, setInput] = useState(entries.entry);

	console.log(entries.userEmail);

	const updateTodo = (event) => {
		event.preventDefault();
		setOpen(false);
		firestore.collection("entry").doc(entries.id).set(
			{
				entry: input,
			},
			{ merge: true }
		);
	};

	return (
		<div>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div className={classes.paper}>
					<form onSubmit={updateTodo}>
						<h3 style={{ textAlign: "center" }}>
							Change your todo
						</h3>
						<Input
							value={input}
							onChange={(event) => setInput(event.target.value)}
						/>
						<Button
							type="submit"
							disabled={!input}
							onClick={updateTodo}
						>
							Update Todo
						</Button>
					</form>
				</div>
			</Modal>
			<ListItem>
				<Card className={classes.todo}>
					<Checkbox />
					<ListItemText
						primary={entries.entry}
						secondary={entries.date}
						style={{ whiteSpace: "nowrap" }}
					/>
					Project:{entries.project} From:{entries.from} To:
					{entries.to}
					<Button onClick={() => setOpen(true)}>
						<EditIcon />
					</Button>
					<Button
						onClick={() => {
							firestore
								.collection("entry")
								.doc(entries.id)
								.delete();
						}}
					>
						<DeleteIcon />
					</Button>
				</Card>
			</ListItem>
		</div>
	);
};

export default EntryList;
