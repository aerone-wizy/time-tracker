import React from "react";

import moment from "moment";

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

const DateList = ({ email, date }) => {
  const classes = useStyles();
  const formatedDate = moment(date, "YYYY-MM-DD").format("dddd, MMMM Do YYYY");

  return (
    <div>
      <Paper className={classes.dateList}>
        <div className={classes.header}>
          <Typography variant="subtitle1" display="block">
            {formatedDate}
          </Typography>
          <Typography variant="subtitle1" display="block">
            00:00
          </Typography>
        </div>
        <ListEntry email={email} date={date} />
      </Paper>
    </div>
  );
};

export default DateList;
