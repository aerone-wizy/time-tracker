import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../redux/user/user.selectors";
import { firestore } from "../firebase";

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

function useDateEntries(email) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("entry")
      .where("userEmail", "==", email)
      .onSnapshot((snapshot) => {
        // setDates(
        snapshot.docs.map(
          (doc) => {
            console.log(doc.data().date);

            if (dates.includes(doc.data().date)) {
              console.log("true");
            } else {
              setDates([...dates, doc.data().date]);
              console.log("false");
            }
            return null;
          }
          // ? [...dates]
          // : [doc.data().date, ...dates]
        );
        // );
      });

    return () => unsubscribe();
  }, [email, dates]);

  return dates;
}

const TimeTracker = ({ currentUser }) => {
  const classes = useStyles();
  const dates = useDateEntries(currentUser.email);

  console.log(dates);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AddEntry email={currentUser.email} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {dates.map((date) => {
            console.log(date);
            return (
              <div key={date}>
                <Paper>
                  <div>{date}</div>
                  <ListEntry email={currentUser.email} date={date} />
                </Paper>
                <br />
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(TimeTracker);
