import React from "react";

// import { Redirect } from "react-router";
// import { Link } from "react-router-dom";

import { signInWithGoogle, emailAndPasswordSignIn } from "../firebase";

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

const SignIn = () => {
  const classes = useStyles();

  const handleLogin = (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    emailAndPasswordSignIn(email.value, password.value);
  };

  //   const { currentUser } = useContext(AuthContext);

  //   if (currentUser) {
  //     return <Redirect to="/" />;
  //   }

  return (
    <Card className={classes.formCard}>
      <CardHeader title="Log In"></CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className={classes.content}>
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
            Log in
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={signInWithGoogle}
          >
            Sign in with google
          </Button>
          <hr />
          <p>Don't have an account?</p>
          {
            //       <Button variant="contained" component={Link} to="/signup">
            //     Create new account
            //   </Button>
          }
        </form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
