import React, { useState, useEffect } from "react";

import moment from "moment";

import { firestore } from "../firebase";

import ListEntry from "./list-entry.component";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  formField: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    textAlign: "center",
    color: "#222",
  },
  header: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

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

const DateList = ({ email, date }) => {
  const classes = useStyles();
  const entries = useEntries(email, date);
  const [hasComputed, setHasComputed] = useState(false);
  const formatedDate = moment(date, "YYYY-MM-DD").format("dddd, MMMM Do YYYY");

  const [totalDuration, setTotalDuration] = useState(0);

  if (!hasComputed && entries.length > 0) {
    const totalDurationInSeconds = entries.reduce((accumulator, entry) => {
      return accumulator + entry.duration;
    }, 0);
    setTotalDuration(moment.utc(totalDurationInSeconds).format("HH:mm"));
    setHasComputed(true);
  }

  return (
    <div>
      <Paper className={classes.dateList}>
        <div className={classes.header}>
          <Typography variant="subtitle1" display="block">
            {formatedDate}
          </Typography>
          <Typography variant="subtitle1" display="block">
            Total Time: {totalDuration}
          </Typography>
        </div>
        <ListEntry entries={entries} />
      </Paper>
    </div>
  );
};

export default DateList;
