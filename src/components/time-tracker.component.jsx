import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../redux/user/user.selectors";
import { firestore } from "../firebase";

import AddEntry from "./add-entry.component";
import DateList from "./date-list.component";

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

function useDateEntries(email) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("entry")
      .where("userEmail", "==", email)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (!dates.includes(doc.data().date)) {
            setDates([...dates, doc.data().date]);
          }
          return null;
        });
      });

    return () => unsubscribe();
  }, [email, dates]);

  return dates;
}

const TimeTracker = ({ currentUser }) => {
  const classes = useStyles();
  const dates = useDateEntries(currentUser.email);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AddEntry email={currentUser.email} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {dates
            .sort()
            .reverse()
            .map((date) => (
              <div key={date}>
                <DateList email={currentUser.email} date={date} />
              </div>
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(TimeTracker);
