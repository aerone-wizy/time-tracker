import React, { useState } from "react";

import { deleteEntry, updateEntry } from "../firebase";

import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  Button,
  Card,
  InputBase,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  InputLabel,
  FormControl,
  DialogActions,
  Typography,
  MenuItem,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

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
    width: "100%",
    justifyContent: "space-between",
  },
  flexItem: {
    display: "flex",
    flexWrap: "nowrap",
  },
  entryField: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
    minWidth: 300,
  },
  projectField: {
    margin: theme.spacing(1),
    minWidth: 150,
    textAlign: "center",
  },
  margin: {
    margin: theme.spacing(1),
    width: "50px",
  },
  dash: {
    margin: theme.spacing(1),
  },
}));

const EntryList = ({ entries }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [entry, setEntry] = useState(entries.entry);
  const [project, setProject] = useState(entries.project);
  const [timeFrom, setTimeFrom] = useState(entries.timeFrom);
  const [timeTo, setTimeTo] = useState(entries.timeTo);
  //   const [duration, setDuration] = useState(
  //     moment("00:00:00", "HH:mm:ss").format("HH:mm:ss")
  //   );
  //   const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const update = (event) => {
    event.preventDefault();
    const value = event.target.value;

    switch (event.target.name) {
      case "entry":
        setEntry(value);
        break;
      case "project":
        setProject(value);
        break;
      case "timeFrom":
        setTimeFrom(value);
        break;
      case "timeTo":
        setTimeTo(value);
        break;
      //   case "duration":
      //     setDuration(value);
      //     break;
      //   case "date":
      //     setDate(value);
      //     break;
      default:
        break;
    }

    updateEntry(entries.id, {
      entry: entry,
    });
  };

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Change Project</DialogTitle>
        <DialogContent>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formField}
          >
            <InputLabel id="select-project">Project</InputLabel>
            <Select
              labelId="select-project"
              name="project"
              label="Project"
              value={project}
              //   onChange={handleChange}
            >
              <MenuItem value="WizyEMM">WizyEMM</MenuItem>
              <MenuItem value="WizyVision">WizyVision</MenuItem>
              <MenuItem value="FormWorkflow">FormWorkflow</MenuItem>
              <MenuItem value="GoWizApp">GoWizApp</MenuItem>
              <MenuItem value="Add">Add New Project</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem>
        <Card className={classes.todo}>
          <div className={classes.flexItem}>
            <InputBase
              className={classes.entryField}
              defaultValue={entry}
              // onChange={(event) => setInput(event.target.value)}
              onBlur={(event) => update(event)}
              inputProps={{ "aria-label": "naked" }}
            />

            <Divider orientation="vertical" flexItem />

            <Typography
              variant="button"
              display="block"
              gutterBottom
              className={classes.projectField}
              onClick={() => setOpen(true)}
            >
              {project}
            </Typography>
          </div>

          <div className={classes.flexItem}>
            <InputBase
              name="timeFrom"
              className={classes.margin}
              defaultValue={timeFrom}
              // onChange={(event) => setInput(event.target.value)}
              // onBlur={(event) => update(event)}
              inputProps={{ "aria-label": "naked" }}
            />
            <div className={classes.dash}>{" - "}</div>
            <InputBase
              name="timeTo"
              className={classes.margin}
              defaultValue={timeTo}
              // onChange={(event) => setInput(event.target.value)}
              // onBlur={(event) => update(event)}
              inputProps={{ "aria-label": "naked" }}
            />
            <Divider orientation="vertical" flexItem />
            <Button onClick={() => deleteEntry(entries.id)}>
              <DeleteIcon />
            </Button>
          </div>
        </Card>
      </ListItem>
    </div>
  );
};

export default EntryList;
