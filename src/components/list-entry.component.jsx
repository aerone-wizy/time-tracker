import React, { useState, useEffect } from "react";

import { firestore } from "../firebase";

import EntryList from "./entry-list.component";

function useEntries(email, date) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("entry")
      .where("userEmail", "==", email)
      .where("date", "==", date)
      .onSnapshot((snapshot) => {
        setEntries(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    return () => unsubscribe();
  }, [email, date]);

  return entries;
}

const ListEntry = ({ email, date }) => {
  const entries = useEntries(email, date);
  return (
    <div>
      {entries.map((entries) => (
        <EntryList entries={entries} key={entries.id} />
      ))}
    </div>
  );
};

export default ListEntry;
