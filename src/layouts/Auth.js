import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import { Redirect, Route, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

import styles from "../assets/jss/auth";
const useStyles = makeStyles(styles);

function Auth() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" height="65px">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Welcome
          </Typography>
          <Button color="inherit" component={Link} to="/auth/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/auth/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <Box className={classes.authWrapper}>
        <Box component={Grid} container justifyContent="center">
          <Switch>
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/register" component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
        </Box>
      </Box>
    </>
  );
}
export default Auth;
