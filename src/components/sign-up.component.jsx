import React from "react";

// import { withRouter } from "react-router";
// import { Link } from "react-router-dom";

import { emailAndPasswordSignUp } from "../firebase";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme) => ({
  formCard: {
    width: "20rem",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  content: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Signup = () => {
  const classes = useStyles();

  const handleSignup = (event) => {
    event.preventDefault();
    const { email, password, name } = event.target.elements;

    emailAndPasswordSignUp(email.value, password.value, name.value);
  };

  //   const { currentUser } = useContext(AuthContext);

  //   if (currentUser) {
  //     return <Redirect to="/" />;
  //   }

  return (
    <Card className={classes.formCard}>
      <CardHeader title="Sign up"></CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className={classes.content}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            type="text"
            autoComplete="on"
            size="small"
          />
          <TextField
            label="Email address"
            variant="outlined"
            name="email"
            type="email"
            autoComplete="on"
            size="small"
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            autoComplete="on"
            size="small"
          />

          <Button variant="contained" color="primary" type="submit">
            Sign up
          </Button>
          <hr />
          <p>Already have an account?</p>
          {
            //     <Button variant="contained" component={Link} to="/signin">
            // Login your account
            // </Button>
          }
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
