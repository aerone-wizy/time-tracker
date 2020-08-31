import React, { useState, useEffect } from "react";

import { firestore } from "../firebase";

import EntryList from "./entry-list.component";

function useEntries(email) {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		const unsubscribe = firestore
			.collection("entry")
			.where("userEmail", "==", email)
			.onSnapshot((snapshot) => {
				setEntries(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
				);
			});
		return () => unsubscribe();
	}, [email]);

	return entries;
}

const ListEntry = ({ email }) => {
	const entries = useEntries(email);
	console.log(entries);
	return (
		<div>
			{entries.map((entries) => (
				<EntryList entries={entries} key={entries.id} />
			))}
		</div>
	);
};

export default ListEntry;
